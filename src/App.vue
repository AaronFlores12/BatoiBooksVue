<script>
import logoBatoi from './assets/logoBatoi.png';
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue'
import BooksList from './components/BooksList.vue'
import AddBook from './components/AddBook.vue'
import AppAbout from './components/AppAbout.vue'
import { store } from './store';
export default {
  components: {
    AppMenu,
    AppMessages,
    BooksList,
    AddBook,
    AppAbout,
  },
  data() {
    return {
      logoBatoi
    }
  },
  mounted() {
    store.getBooks(),
      store.getModules()
  }
}
</script>

<template>
  <div>
    <img :src="logoBatoi" alt="batoiLogo" />
    <h1>BatoiBooks</h1>
    <AppMenu></AppMenu>
    <AppMessages></AppMessages>
    <BooksList></BooksList>
    <AddBook></AddBook>
    <AppAbout></AppAbout>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
