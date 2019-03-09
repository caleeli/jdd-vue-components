<template>
    <upload :multiplefile="false" :url="url" :value="value" @input="changed" @click="jddClick">
        <button class="btn btn-info w-100">
            <i class="fas fa-upload"></i> {{label}}
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
            url: String,
            label: String,
        },
        methods: {
            changed(event) {
                this.$emit('input', event.value);
            },
        },
        computed: {
            innerValue() {
                return this.value;
            },
        },
    }
</script>
