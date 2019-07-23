<template>
    <div class="content" style="padding:5em 1em 1em 1em; width: 100vw; overflow: auto;">
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-6 col-12 text-center" v-for="(item, j) in links" :key="j">
                <dashboard-item :value="item">
                    <li v-for="(link, i) in item.links" :key="i">
                    <router-link v-if="link.href" :to="link.href">
                        <img class="access-link" :src="link.icon">
                        {{link.text}}
                    </router-link>
                    <a v-if="link.handler" href="javascript:void(0)" @click="link.handler">
                        <img class="access-link" :src="link.icon">
                        {{link.text}}
                    </a>
                    <a v-if="link.macro" href="javascript:void(0)" @click="runMacro(link.macro)">
                        <img class="access-link" :src="link.icon">
                        {{link.text}}
                    </a>
                    </li>
                </dashboard-item>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            links: null,
        },
        methods: {
            runMacro(macro) {
                const params = Object.assign({}, macro);
                delete params.macro;
                this[macro.macro](params);
            },
            completeTask(params) {
                window.Process.completeTask(params);
            },
            currentItems(query) {
                if (query.item !== undefined && this.links[query.item] && this.links[query.item].links instanceof Array) {
                    return this.links[query.item].links;
                }
                return this.links;
            },
        },
    };
</script>

<style lang="scss">
    .access-link {
        width: 1em;
    }
</style>
