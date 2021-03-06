<template>
    <div class="dropdown" :class="{'box-disabled':readonly, 'adding': inputFocus}">
        <!-- Muestra el contenido definido en el slot cuando se tiene un valor seleccionado de la lista -->
        <div v-if="!multiple && selected" class="selected-option"><slot :row="selected" :format="textValue" :remove="remove"></slot></div>
        <div v-if="multiple && selected" class="selected-option"><slot v-for="(row,i) in selected" :row="row" :format="textValue" :remove="remove" :index="i"></slot></div>
        <!-- Muestra el valor textual cuando no se seleccion un valor de la lista de opciones -->
        <div v-if="!(selected && !inputFocus) && !inputFocus" class="selected-option">{{value}}</div>
        <!-- i class="fa fa-times select-box-clear text-muted" @click="clear"></!-->
        <input :readonly="readonly" class="selected-input dropdown-toggle" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false"
                :placeholder="value ? '' : placeholder"
                @focus="focus" @blur="blur" @click="click"
                v-model="text">
        <ul class="dropdown-menu select-list">
            <li v-for="(row, index) in dataFiltered.slice(0, rows)" :key="`select-box-${index}`" v-bind:value="getKey(row)" class="dropdown-item" @click="select(row)">
            <slot :row="row" :format="format" :index="index"></slot>
            </li>
        </ul>
    </div>
</template>

<script>
    const SEP = ',';
    export default {
        props: {
            placeholder: String,
            data: Array,
            value: null,
            filterBy: String,
            idField: {
                type: String,
                default: 'id'
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            readonly: {
                type: Boolean,
                default: false,
            },
            rows: {
                type: Number,
                default: 5,
            },
        },
        data() {
            return {
                localValue: null,
                text: '',
                dataFiltered: [],
                inputFocus: false
            }
        },
        computed: {
            textShown() {
                const text = this.text;
                const value = this.value;
                return this.inputFocus ? text : value;
            },
            selected() {
                this.data;
                let value = this.multiple ? this.value ? this.value.split(SEP) : [] : this.value;
                if (this.multiple) {
                    const selected = [];
                    value.forEach(id => {
                        const item = this.data.find(item => {
                            return id === String(this.getKey(item));
                        })
                        item ? selected.push(item) : null;
                    });
                    return selected;
                } else {
                    return this.data.find(item => {
                        return String(value) === String(this.getKey(item));
                    });
                }
            }
        },
        watch: {
            data() {
                this.filter();
            },
            text() {
                this.filter();
            }
        },
        methods: {
            clear() {
                this.$emit('input', this.multiple && this.value instanceof Array ? [] : '');
                this.$nextTick(() => {
                    this.$emit('change', this.selected);
                });
            },
            /**
             * Remove a selected item
             * @returns this
             */
            remove(item) {
                const value = this.value ? this.value.split(SEP) : [];
                const selected = String(this.getKey(item));
                const index = value.indexOf(selected);
                index !== -1 ? value.splice(index, 1) : null;
                this.$emit('input', value.join(SEP));
                this.$emit('change', this.selected);
            },
            updateText(event) {
                this.text = event.target.value;
            },
            getKey(row) {
                return Object.evaluateRef(row, this.idField ? this.idField : 'id');
            },
            textValue(value) {
                return window.$('<i></i>').text(value).html();
            },
            format(input) {
                let value = this.textValue(input);
                if (!this.text) {
                    return value;
                }
                let text = this.text;
                let length = text.length;
                let res = '';
                let u = -1;
                let i;
                while ((i = value.toLowerCase().localeIndexOf(text, 'en', {sensitivity: 'base'})) > -1) {
                    res += value.substr(0, i);
                    res += '<code>';
                    res += value.substr(i, length);
                    res += '</code>';
                    u = i + length;
                    value = value.substr(u);
                }
                res += value;
                return res;
            },
            filter() {
                var filterBy = this.filterBy ? this.filterBy.trim() : '';
                var filters = filterBy ? filterBy.split(/[, ]+/) : [];
                const dataFiltered = this.data.filterBy(filters, this.text, (item, value) => {
                    return this.textValue(item).localeIndexOf(value, 'en', {sensitivity: 'base'}) > -1;
                });
                this.dataFiltered.splice(0);
                for (let i = 0, l = dataFiltered.length; i < l; i++) {
                    this.dataFiltered.push(dataFiltered[i]);
                }
            },
            isOpen() {
                return window.$(this.$el).find("ul:first").is(':visible');
            },
            click() {
                setTimeout(() => {
                    if (!this.isOpen()) {
                        window.$(this.$el).find(".dropdown-menu").toggle();
                    }
                }, 100);
            },
            focus() {
                this.inputFocus = true;
                setTimeout(() => {
                    if (!this.isOpen()) {
                        window.$(this.$el).find(".dropdown-menu").toggle();
                    }
                }, 100);
            },
            blur() {
                this.inputFocus = false;
                setTimeout(() => {
                    if (this.isOpen()) {
                        window.$(this.$el).find(".dropdown-menu").toggle();
                    }
                }, 500);
            },
            select(row) {
                if (this.multiple) {
                    const value = this.value ? this.value.split(SEP) : [];
                    const selected = String(this.getKey(row));
                    value.indexOf(selected) === -1 ? value.push(selected) : null;
                    this.$emit('input', value.join(SEP));
                    this.$nextTick(() => {
                        this.$emit('change', this.selected);
                    });
                    this.text = '';
                } else {
                    this.$emit('input', String(this.getKey(row)));
                    this.$emit('change', row);
                }
                window.$(this.$el).find(".selected-option").focus();
            }
        },
        mounted() {
            this.filter();
        }
    }
</script>

<style lang="scss" scoped>
    .select-owner {
        position:relative;
    }
    .selected-option {
        //position: absolute;
        padding: 0.375rem 0.75rem;
        pointer-events: none;
        overflow: hidden;
        //white-space: nowrap;
        width: 100%;
    }
    .selected-input {
        color: transparent;
        background-color: lightgray;
        background-image: url('../assets/images/search-solid.svg');
        background-repeat: no-repeat;
        background-position: center;
        border:none;
        width: 100%;
        cursor: pointer;
    }
    .selected-input:read-only {
        background-color: #e9ecef;
    }
    .selected-input:focus {
        color: inherit;
        background-color: inherit;
        background-image: none;
    }
    .select-list {
        max-width: 80vw;
        overflow: hidden;
    }
    .select-list .dropdown-item {
        font-weight: normal;
    }
    .select-box-clear {
        position: absolute;
        margin-top: 1em;
        right: 1em;
    }
    .box-disabled {
        pointer-events: none;
    }
    .adding .selected-option {
        //top: 2em;
    }
    .adding input {
        //height: 4em;
        //padding-bottom: 2em;
    }
    .dropdown {
        border: 1px solid #ced4da;
        border-radius: 4px;
        padding-top: 0px;
        padding-left: 0px;
    }
</style>
