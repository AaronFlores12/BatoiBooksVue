<script>
import { useStore } from '../stores/piniaStore'
import { mapState, mapActions } from 'pinia'
import BookItem from './BookItem.vue'

export default {
    components: {
        BookItem
    },
    computed: {
        ...mapState(useStore, ['books']),
    },
    methods: {
        ...mapActions(useStore, ['removeBook', 'addBookToCart']),
        editBook() {
            this.$router.push({ name: 'AddBook', params: { id: this.book.id } })
        },
        addBook(book) {
            this.addBookToCart(book);
        }
    }
}
</script>

<template>
    <div id="list" class="books-container">
        <BookItem v-for="book in books" :id="book.id" :book="book">
            <button @click="addBook(book)" class="add">
                <span class="material-icons">add_shopping_cart</span>
            </button>
            <button @click="editBook" class="edit">
                <span class="material-icons">edit</span>
            </button>
            <button @click="removeBook(book.id)" class="delete">
                <span class="material-icons">delete</span>
            </button>
        </BookItem>
    </div>
</template>