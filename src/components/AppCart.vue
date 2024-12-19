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
        totalBooksInCart() {
           return this.cart.length 
        },
        totalImport() {
            return this.cart.reduce((total, book) => total + book.price, 0);
        }
    },
    methods: {
        ...mapActions(useStore, ['removeBookFromCart', 'buyBooks', 'removeBooksFromCart']),
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
                    <span class="material-icons">remove_shopping_cart</span>
                </button>
            </BookItem>
        </div>
    </div>
    <h2>Total de libros: {{ totalBooksInCart }}</h2>
    <h2>Importe total: {{ totalImport }} €</h2>
    <button @click="buyBooks()">Comprar</button>
    <button @click="removeBooksFromCart()">Vaciar</button>
</template>