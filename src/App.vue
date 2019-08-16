<template>
    <div id="app">
        <center><img alt="Vue logo" src="./assets/icon/icon_83.5@2x.png"></center>
        <error v-model="errors" property="message"></error>
        <datetime v-model="datetime" type="datetime"></datetime>
        <suggest v-model="suggest"
                    :data="suggestList"
                    id-field="attributes.name"
                    filter-by="attributes.name">
            <template slot-scope="{row,format}">
                <span v-html="format(row.attributes.name)" style="font-size: 1rem"></span>
            </template>
        </suggest>
        <br>
        <grid v-model="grid">
            <template slot="header">
                <row :widths="[50,350,200,150,150]" class="grid-header text-uppercase">
                    <p slot="c1">A</p>
                    <p slot="c2">Column B</p>
                    <p slot="c3">Column C</p>
                    <p slot="c4">Column D</p>
                    <p slot="c5">Column E</p>
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
                suggestList: [
                    {id:1,attributes:{name:"one"}},
                    {id:2,attributes:{name:"two"}},
                    {id:3,attributes:{name:"three"}},
                ],
                suggest: '',
                grid: [
                    {a:'Abc',b:'Definition',c:'Clei',d:'Alex',e:'Luthor'},
                    {a:'Def',b:'Action',c:'Axon',d:'Martin',e:'King'},
                    {a:'A',b:'Column B',c:'Column C',d:'Column D',e:'Column E'},
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
