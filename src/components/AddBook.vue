<script>
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useStore } from '../stores/piniaStore';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'BookForm',
    components: {
        Field,
        Form,
        ErrorMessage
    },
    computed: {
        ...mapState(useStore, ['books', 'modules']),
    },
    data() {
        const schema = yup.object({
            moduleCode: yup.string().required('Módulo es obligatorio'),
            publisher: yup.string().required('Editorial es obligatoria'),
            price: yup.number().required('Precio es obligatorio').min(0, 'El precio debe ser mayor o igual a 0'),
            pages: yup.number().required('Páginas es obligatorio').min(0, 'Las páginas deben ser mayor o igual a 0').integer('Las páginas deben ser un número entero'),
            status: yup.string().required('Estado es obligatorio'),
        });

        return {
            book: {},
            isEditing: false,
            schema,
        };
    },
    methods: {
        ...mapActions(useStore, ['changeDBBook', 'addBook', 'getDBBook', 'searchBookModuleInBooks']),
        async addOrUpdateBook() {
            const canModify = this.searchBookModuleInBooks(this.book);
            if (canModify) {
                alert("No puedes realizar acciones sobre libros con modulos iguales");
                return;
            } else {
                if (this.isEditing) {
                    await this.changeDBBook(this.book);
                } else {
                    await this.addBook(this.book);
                }
            }
            this.book = {};
            this.isEditing = false;
            this.$router.push('/');
        },
        async loadForm() {
            const bookId = this.$route.params.id;
            if (bookId) {
                this.isEditing = true;
                const book = await this.getDBBook(bookId);
                this.book = book;
            } else {
                this.isEditing = false;
                this.book = {};
            }
        }
    },
    mounted() {
        this.loadForm();
    },
    watch: {
        $route() {
            this.loadForm();
        }
    }
};
</script>

<template>
    <div id="form">
        <h1>{{ isEditing ? "Editar Libro" : "Añadir Libro" }}</h1>
        <Form @submit="addOrUpdateBook" :validation-schema="schema">
            <div>
                <label for="id">Id:</label>
                <Field id="id" name="id" v-model="book.id" type="text" disabled />
            </div>

            <div>
                <label for="id-module">Módulo:</label>
                <Field as="select" name="moduleCode" v-model="book.moduleCode" id="id-module">
                    <option value="" disabled>Seleccionar Módulo</option>
                    <option v-for="module in modules" :key="module.code" :value="module.code">
                        {{ module.cliteral }}
                    </option>
                </Field>
                <ErrorMessage name="moduleCode" class="error" />
            </div>

            <div>
                <label for="publisher">Editorial:</label>
                <Field name="publisher" v-model="book.publisher" type="text" id="publisher" />
                <ErrorMessage name="publisher" class="error" />
            </div>

            <div>
                <label for="price">Precio:</label>
                <Field name="price" v-model="book.price" type="number" id="price" step="0.01" />
                <ErrorMessage name="price" class="error" />
            </div>

            <div>
                <label for="pages">Páginas:</label>
                <Field name="pages" v-model="book.pages" type="number" id="pages" step="1" />
                <ErrorMessage name="pages" class="error" />
            </div>

            <div>
                <label>Estado:</label>
                <Field name="status" type="radio" value="Nuevo" v-model="book.status" />
                <label for="new">Nuevo</label>
                <Field name="status" type="radio" value="Viejo" v-model="book.status" />
                <label for="old">Viejo</label>
                <ErrorMessage name="status" class="error" />
            </div>

            <div>
                <label for="comments">Comentarios:</label>
                <textarea id="comments" v-model="book.comments"></textarea>
            </div>

            <button type="submit">{{ isEditing ? "Guardar Cambios" : "Añadir" }}</button>
            <button type="reset">Reset</button>
        </Form>
    </div>
</template>

<style scoped>
.error {
    color: red;
    font-size: 0.9em;
    margin-top: 0.25em;
}
</style>
