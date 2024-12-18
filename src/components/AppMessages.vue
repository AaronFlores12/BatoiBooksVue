<script>
import { useStore } from '../stores/piniaStore'
import { mapState, mapActions } from 'pinia'
export default {
    computed: {
        ...mapState(useStore, ['messages']),
    },
    methods: {
        ...mapActions(useStore, ['removeMessage']),
        removeMessage(index) {
            this.removeMessage(index)
        }
    }
}
</script>

<template>
    <div id="messages">
        <div class="_tipo-recibido_ alert alert-danger alert-dismissible" role="alert" v-for="(message, index) in messages" key="index">
            {{ message }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="removeMessage(index)">x</button>
        </div>
    </div>
</template>