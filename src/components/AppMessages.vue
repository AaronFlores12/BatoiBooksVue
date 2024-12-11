<script>
import { store } from '@/store';
export default {
    computed: {
        messages() {
            return store.state.messages
        }
    },
    methods: {
        removeMessage(index) {
            store.removeMessage(index)
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