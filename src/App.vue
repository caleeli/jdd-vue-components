<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/icon/icon_83.5@2x.png">
        <error v-model="errors" property="message"></error>
        <datetime v-model="datetime" type="datetime"></datetime>
    </div>
</template>

<script>

    import {components} from './index.js';

    export default {
        name: 'app',
        components,
        data() {
            return {
                errors: {message:'Hello error'},
                datetime: null,
            };
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
