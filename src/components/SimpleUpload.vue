<template>
    <upload :multiplefile="false" :value="value" @input="changed">
        <button class="btn btn-secondary" @click="jddClick">
            <i class="fas fa-upload"></i>
        </button>
    </upload>
</template>

<script>
    import Component from '../mixins/Component';
    import Upload from './Upload';
    export default {
        mixins: [Component],
        components: {
            Upload,
        },
        props: {
            value: null,
        },
        methods: {
            changed(event) {
                this.$emit('input', event.value);
            }
        },
        computed: {
            innerValue() {
                return this.value;
            },
        },
    }
</script>
