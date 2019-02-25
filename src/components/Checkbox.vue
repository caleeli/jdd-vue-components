<template>
    <input class="form-control" type="checkbox" v-model="innerValue" @input="change" @click="jddClick" />
</template>

<script>
    import Component from '../mixins/Component';
    export default {
        mixins: [Component],
        props: {
            value: null,
        },
        methods: {
        },
        watch: {
            innerValue() {
                this.$emit('input', this.innerValue);
            },
            value() {
                this.innerValue = this.value;
            }
        },
        data() {
            return {
                innerValue: '',
            };
        }
    }
</script>
