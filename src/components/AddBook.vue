<script>
import { useStore } from '../stores/piniaStore'
import { mapState, mapActions } from 'pinia'
export default {
    computed: {
        ...mapState(useStore, ['books', 'modules']),
    },
    data() {
        return {
            book: {},
            isEditing: false
        };
    },
    methods: {
        ...mapActions(useStore, ['changeDBBook', 'addBook', 'getDBBook']),
        async addOrUpdateBook() {
            if (this.isEditing) {
                await this.changeDBBook(this.book);
            } else {
                await this.addBook(this.book);
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
        $route () {
            this.loadForm();
        }
    }
};
</script>

<template>
    <div id="form">
        <form @submit.prevent="addOrUpdateBook" id="bookForm">
            <label id="titulo" for="titulo">
                {{ isEditing ? "Editar Libro" : "Añadir Libro" }}
            </label>
            
            <div>
                <label>Id: </label>
                <input id="id" type="text" v-model="book.id" disabled>
            </div>
            
            <div>
                <label for="id-module">Módulo:</label>
                <select id="id-module" class="modulo-id" v-model="book.moduleCode" required>
                    <option value="" disabled>Seleccionar Modulo</option>
                    <option v-for="module in modules" :value="module.code">{{ module.cliteral }}</option>
                </select>
            </div>

            <div>
                <label for="publisher">Editorial:</label>
                <input type="text" id="publisher" v-model="book.publisher" required>
            </div>

            <div>
                <label for="price">Precio:</label>
                <input type="number" id="price" v-model="book.price" required min="0" step="0.01">
            </div>

            <div>
                <label for="pages">Páginas:</label>
                <input type="number" id="pages" v-model="book.pages" required min="0" step="1">
            </div>

            <div>
                <label>Estado:</label>
                <input type="radio" id="new" value="Nuevo" v-model="book.status" name="status" required>
                <label for="new">Nuevo</label>
                <input type="radio" id="old" value="Viejo" v-model="book.status" name="status" required>
                <label for="old">Viejo</label>
            </div>

            <div>
                <label for="comments">Comentarios:</label>
                <textarea id="comments" v-model="book.comments"></textarea>
            </div>

            <button id="boton-add" type="submit">
                {{ isEditing ? "Guardar Cambios" : "Añadir" }}
            </button>
            <button type="reset" >Reset</button>
        </form>
    </div>
</template>
