<script>
import BookItem from './BookItem.vue';
import { useStore } from '../stores/piniaStore'
import { mapActions, mapState } from 'pinia'
export default {
    components: {
        BookItem,
    },
    computed: {
        ...mapState(useStore, ['cart']),
    },
    methods: {
        ...mapActions(useStore, ['removeBookFromCart']),
        removeBook(id) {
            this.removeBookFromCart(id);
        }
    }
}
</script>

<template>
    <div id="cart">
        <h2>Carrito</h2>
        <div class="books-container">
            <BookItem v-for="book in cart" :key="book.id" :book="book">
                <button @click="removeBook(book.id)" class="add">
                    <span class="material-icons">cart-off</span>
                </button>
            </BookItem>
        </div>
    </div>
</template>