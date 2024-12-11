<script>
import { store } from '@/store';
import BookItem from './BookItem.vue'

export default {
    components: {
        BookItem
    },
    computed: {
        books() {
            return store.state.books
        }
    },
    methods: {
        removeBook(id) {
            store.removeBook(id)
        }
    }
}
</script>

<template>
    <div id="list" class="books-container">
        <BookItem v-for="book in books" :id="book.id" :book="book" @deleteBook="removeBook"></BookItem>
    </div>
</template>