import { defineStore } from 'pinia'
import { addDBBook, removeDBBook, getDBBooks, getDBModules, changeDBBook, getDBBook } from '../api.js';

export const useStore = defineStore('store', {
    state: () => ({
        books: [],
        modules: [],
        messages: [],
        cart: []
    }),
    getters: {
        moduleNames: (state) => (code) => state.modules.find((module) => module.code == code)?.cliteral,
    },
    actions: {
        async addBook(book) {
            try {
                const newBook = await addDBBook(book);
                this.books.push(newBook);
                return newBook;
            } catch (error) {
                this.messages.push(`Error adding book: ${error.message}`);
            }
        },

        async removeBook(id) {
            try {
                if (confirm("Are you sure you want to delete this book?")) {
                    await removeDBBook(id);
                    this.books = this.books.filter(book => book.id !== id);
                }
            } catch (error) {
                this.messages.push(`Error removing book: ${error.message}`);
            }
        },

        async getBooks() {
            try {
                const books = await getDBBooks();
                this.books = books;
            } catch (error) {
                this.messages.push(`Error fetching books: ${error.message}`);
            }
        },

        async getModules() {
            try {
                const modules = await getDBModules();
                this.modules = modules;
            } catch (error) {
                this.messages.push(`Error fetching modules: ${error.message}`);
            }
        },

        removeMessage(index) {
            try {
                this.messages.splice(index, 1);
            } catch (error) {
                this.messages.push(`Error removing message: ${error.message}`);
            }
        },
        async changeDBBook(book) {
            try {
                const newBook = await changeDBBook(book);
                const index = this.books.findIndex(b => b.id === newBook.id);
                this.books.splice(index, 1, newBook);
            } catch (error) {
                this.messages.push(`Error changing book: ${error.message}`);
            }
        },
        getDBBook(id) {
            try {
                return getDBBook(id);
            } catch (error) {
                this.messages.push(`Error fetching book: ${error.message}`);
            }
        },
        addBookToCart(book) {
            try {
                this.cart.push(book);
            } catch (error) {
                this.messages.push(`Error adding book to cart: ${error.message}`);
            }
        },
        removeBookFromCart(book) {
            try {
                this.cart.splice(this.cart.indexOf(book), 1);
            } catch (error) {
                this.messages.push(`Error removing book from cart: ${error.message}`);
            }
        }
    }
})