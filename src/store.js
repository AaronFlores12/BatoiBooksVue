import { reactive } from 'vue';
import { addDBBook, removeDBBook, getDBBooks, getDBModules } from './api.js';

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
    }
};
