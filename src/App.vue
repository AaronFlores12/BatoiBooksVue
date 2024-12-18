<script>
import logoBatoi from './assets/logoBatoi.png';
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue'
import BooksList from './components/BooksList.vue'
import AddBook from './components/AddBook.vue'
import AppAbout from './components/AppAbout.vue'
import AppCart from './components/AppCart.vue'
import { useStore } from './stores/piniaStore'
import { mapActions } from 'pinia'
export default {
  components: {
    AppMenu,
    AppMessages,
    BooksList,
    AddBook,
    AppAbout,
    AppCart
  },
  data() {
    return {
      logoBatoi
    }
  },
  methods: {
    ...mapActions(useStore, ['getBooks', 'getModules'])
  },
  mounted() {
    this.getBooks(),
    this.getModules()
  }
}
</script>

<template>
  <div>
    <img :src="logoBatoi" alt="batoiLogo" />
    <h1>BatoiBooks</h1>

    <AppMenu></AppMenu>
    <AppMessages></AppMessages>
    <router-view></router-view>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
