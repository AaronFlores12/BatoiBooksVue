import { reactive } from 'vue';
import { addDBBook, removeDBBook, getDBBooks, getDBModules, changeDBBook, getDBBook } from './api.js';

export const store = {
    state: reactive({
        books: [],
        modules: [],
        messages: []
    }),

    async addBook(book) {
        try {
            const newBook = await addDBBook(book);
            this.state.books.push(newBook);
            return newBook;
        } catch (error) {
            this.state.messages.push(`Error adding book: ${error.message}`);
        }
    },

    async removeBook(id) {
        try {
            await removeDBBook(id);
            this.state.books = this.state.books.filter(book => book.id !== id);
        } catch (error) {
            this.state.messages.push(`Error removing book: ${error.message}`);
        }
    },

    async getBooks() {
        try {
            const books = await getDBBooks();
            this.state.books = books;
        } catch (error) {
            this.state.messages.push(`Error fetching books: ${error.message}`);
        }
    },

    async getModules() {
        try {
            const modules = await getDBModules();
            this.state.modules = modules;
        } catch (error) {
            this.state.messages.push(`Error fetching modules: ${error.message}`);
        }
    },

    removeMessage(index) {
        try {
            this.state.messages.splice(index, 1);
        } catch (error) {
            this.state.messages.push(`Error removing message: ${error.message}`);
        }
    },
    async changeDBBook(book) {
        try {
            const newBook = await changeDBBook(book);
            const index = this.state.books.findIndex(b => b.id === newBook.id);
            store.state.books.splice(index, 1, newBook);
        } catch (error) {
            this.state.messages.push(`Error changing book: ${error.message}`);
        }
    },
    getDBBook(id) {
        try {
            return getDBBook(id);
        } catch (error) {
            this.state.messages.push(`Error fetching book: ${error.message}`);
        }
    }
};
