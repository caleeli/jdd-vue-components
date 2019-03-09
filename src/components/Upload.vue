<template>
    <div class="upload-region" @click="click">
        <slot></slot>
        <div class="form-file-progress" v-bind:style="style">
            <input type="file"
                   v-on:change="changeFile($event, multiplefile)"
                   v-bind:multiple="multiplefile">
        </div>
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
        data() {
            return {
                style: "background-size: 0% 100%!important"
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
                $.ajax({
                    url: this.url,
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    success: function(json) {
                        self.$emit('input', JSON.stringify(json));
                        self.$emit('change', json);
                        self.style = "background-size: 0% 100%!important";
                    },
                    error: function(json) {
                        self.style = "background-size: 0% 100%!important";
                    },
                    cache: false,
                    contentType: false,
                    processData: false,
                    chunking: true,
                    progress: function(data) {
                        if (data.lengthComputable) {
                            var progress = parseInt(((data.loaded / data.total) * 100), 10);
                            self.style = "background-size: " + progress + "% 100%!important";
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
        background-image: require('../assets/upload.svg');
    }
    .form-file-progress input {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        opacity: 0;
    }
</style>
