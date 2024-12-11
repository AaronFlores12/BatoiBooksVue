import { reactive } from 'vue'
import { addDBBook, removeDBBook, getDBBooks, getDBModules } from './api.js';
export const store = {
    state: reactive({
        books: [],
        modules: []
    }),
    async addBook(book){
        const newBook = await addDBBook(book)
        this.state.books.push(newBook)
        return newBook
    },
    async removeBook(id){
        await removeDBBook(id)
        this.state.books = this.state.books.filter(book => book.id != id)
    },
    async getBooks(){
        await getDBBooks().then(books => {
            this.state.books = books
        })
    },
    async getModules(){
        await getDBModules().then(modules => {
            this.state.modules = modules
        })
    }
}