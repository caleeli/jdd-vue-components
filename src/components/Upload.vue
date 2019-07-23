<template>
    <div class="upload-region" @click="click">
        <slot></slot>
        <div class="form-file-progress">
            <input type="file"
                   v-on:change="changeFile($event, multiplefile)"
                   v-bind:multiple="multiplefile">
        </div>
        <div class="form-file-progress-size" v-bind:style="style"></div>
    </div>
</template>

<script>
    export default {
        props: {
            "value": String,
            "multiplefile": Boolean,
            "url": {
                type: String,
                default: "/api/uploadfile",
            },
        },
        computed: {
            style() {
                return "left: " + this.progress + "%!important;"
                        + "width: " + (100 - this.progress) + "%!important;";
            },
        },
        data() {
            return {
                progress: 100,
            };
        },
        methods: {
            click(event) {
                this.$emit('click', event);
            },
            changeFile: function(event, multiple) {
                var self = this;
                var data = new FormData();
                for (var i = 0, l = event.target.files.length; i < l; i++) {
                    data.append('file' + (multiple ? '[]' : ''), event.target.files[i]);
                }
                this.progress = 0;
                window.$.ajax({
                    url: this.url,
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    success: function(json) {
                        self.$emit('input', JSON.stringify(json));
                        self.$emit('change', json);
                        self.progress = 100;
                    },
                    error: function() {
                        this.progress = 100;
                    },
                    cache: false,
                    contentType: false,
                    processData: false,
                    uploadProgress: function(data) {
                        if (data.lengthComputable) {
                            self.progress = parseInt(((data.loaded / data.total) * 100), 10);
                        }
                    }
                });
            },
        },
    }
</script>

<style scoped>
    .upload-region {
        position: relative;
    }
    .form-file-progress {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
    }
    .form-file-progress input {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        opacity: 0;
    }
    .form-file-progress-size {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        background-color: rgba(0,0,0,0.5);
    }
</style>
