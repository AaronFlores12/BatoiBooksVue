<script>
import { store } from '@/store';
export default {
    computed: {
        books() {
            return store.state.books
        },
        modules() {
            return store.state.modules
        }
    },
    data() {
        return {
            book: {}
        }
    },
    methods: {
        addBook() {
            store.addBook(this.book)
            this.book = {}
        }
    }
}

</script>

<template>
    <div id="form">
        <div id="list"></div>

        <form @submit.prevent="addBook" id="bookForm">
            <label id="titulo" for="titulo">Añadir Libro</label>
            <div>
                <label>Id:</label>
                <input id="id" type="text" disabled>
            </div>
            <div>
                <label for="id-module">Módulo:</label>
                <select id="id-module" class="modulo-id" v-model="book.moduleCode" required>
                    <option value="" disabled selected>Seleccionar Modulo</option>
                    <option v-for="module in modules" :value="module.code">{{ module.cliteral }}</option>
                </select>
                <span class="error"></span>
            </div>

            <div>
                <label for="publisher">Editorial:</label>
                <input type="text" id="publisher" v-model="book.publisher" required>
                <span class="error"></span>
            </div>

            <div>
                <label for="price">Precio:</label>
                <input type="number" id="price" v-model="book.price" required min="0" step="0.01">
                <span class="error"></span>
            </div>

            <div>
                <label for="pages">Páginas:</label>
                <input type="number" id="pages" v-model="book.pages" required min="0" step="1">
                <span class="error"></span>
            </div>

            <div>
                <label>Estado:</label>
                <input type="radio" id="new" value="Nuevo" v-model="book.status" name="status" required>
                <label for="new">Nuevo</label>
                <input type="radio" id="old" value="Viejo" v-model="book.status" name="status" required>
                <label for="old">Viejo</label>
                <span class="error"></span>
            </div>

            <div>
                <label for="comments">Comentarios:</label>
                <textarea id="comments" v-model="book.comments"></textarea>
            </div>
            <button id="boton-add" type="submit">Añadir</button>
            <button type="reset">Reset</button>
        </form>
    </div>
</template>