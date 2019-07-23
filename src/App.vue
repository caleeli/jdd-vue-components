<template>
    <div id="app">
        <center><img alt="Vue logo" src="./assets/icon/icon_83.5@2x.png"></center>
        <error v-model="errors" property="message"></error>
        <datetime v-model="datetime" type="datetime"></datetime>
        <grid v-model="grid">
            <template slot="header">
                <row :widths="[50,350,200,150,150]" class="font-weight-bold bg-primary text-white">
                    <div slot="c1">A</div>
                    <div slot="c2">Column B</div>
                    <div slot="c3">Column C</div>
                    <div slot="c4">Column D</div>
                    <div slot="c5">Column E</div>
                </row>
            </template>
            <template slot-scope="{ row }">
                <row :widths="[50,350,200,150,150]" class="border-bottom">
                    <div slot="c1">{{row.a}}</div>
                    <div slot="c2"><b>{{row.b}}</b></div>
                    <div slot="c3"><u>{{row.c}}</u></div>
                    <div slot="c4"><i>{{row.d}}</i></div>
                    <div slot="c5"><p>{{row.e}}</p></div>
                </row>
            </template>
        </grid>
    </div>
</template>

<script>

    import {components} from './index.js';

    export default {
        name: 'app',
        components,
        data() {
            return {
                grid: [
                    {a:'Abc',b:'Definition',c:'Clei',d:'Alex',e:'Luthor'},
                    {a:'Def',b:'Action',c:'Axon',d:'Martin',e:'King'},
                ],
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
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
