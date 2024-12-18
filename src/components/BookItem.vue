<script>
import { useStore } from '../stores/piniaStore'
import { mapState, mapActions } from 'pinia'
export default {
    props: {
        book: {
            type: Object,
            required: true,
        }
    },
    computed: {
        ...mapState(useStore, ['modules', 'moduleNames']),
    }
}


</script>


<template>
    <div>
        <h2>Id: {{ book.id }}</h2>
        <p>Modulo: {{ moduleNames(book.moduleCode) }}</p>
        <p>Editorial: {{ book.publisher }}</p>
        <p>Precio: {{ book.price }}€</p>
        <p>Páginas: {{ book.pages }}</p>
        <p>Estado: {{ book.status }}</p>
        <p>{{ book.soldDate ? "Vendido el " + book.soldDate : "En venta" }}</p>
        <p>Comentarios: {{ book.comments }}</p>
        <slot></slot>
    </div>
</template>