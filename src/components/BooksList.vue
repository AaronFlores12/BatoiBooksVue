<script>
import { useStore } from '../stores/piniaStore'
import { mapState, mapActions } from 'pinia'
import BookItem from './BookItem.vue'

export default {
    components: {
        BookItem
    },
    computed: {
        ...mapState(useStore, ['books', 'cart']),
        totalBooks() {
            return this.books.length;
        }
    },
    methods: {
        ...mapActions(useStore, ['removeBook', 'addBookToCart']),
        editBook(id) {
            this.$router.push({ name: 'AddBook', params: { id: id } })
        },
        addBook(book) {
            this.addBookToCart(book);
        },
        bookInCart(book) {
            return !this.cart.find(libro => libro.id === book.id)
        }
    }
}
</script>

<template>
    <div id="list" class="books-container">
        <BookItem v-for="book in books" :id="book.id" :book="book">
            <button v-if="bookInCart(book)" @click="addBook(book)" class="add">
                <span class="material-icons">add_shopping_cart</span>
            </button>
            <button @click="editBook(book.id)" class="edit">
                <span class="material-icons">edit</span>
            </button>
            <button @click="removeBook(book.id)" class="delete">
                <span class="material-icons">delete</span>
            </button>
        </BookItem>
    </div>
    <h2>Total de libros: {{ totalBooks }}</h2>
</template>