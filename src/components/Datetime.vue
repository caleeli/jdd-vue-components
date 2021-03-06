<template>
    <span v-bind:class="myClass" @click="click">
        <a v-if="!readOnly2 && type!='time'" href="javascript:void(0)" class="calendar-button">
            <i class="fa fa-calendar"></i>
            <input type="hidden">
        </a>
        <a v-if="readOnly2 && type!='time' && dateFormated && dateFormated!=emptyDate" href="javascript:void(0)" class="calendar-button">
            {{dateFormated}}
            <input type="hidden">
        </a>
        <span v-if="!readOnly2 && type!='date'" class="clock-button">
            <input type="hidden" value="09:30">
            <a class="input-group-addon" href="javascript:void(0)">
                <span class="fa fa-clock"></span>
            </a>
        </span>
        <template v-if="!readOnly2 || dateFormated == emptyDate">
            {{dateFormated}}
        </template>
    </span>
</template>
<script>
    import moment from 'moment';
    require('bootstrap-datepicker');

    export default {
        props: {
            value: null,
            format: String,
            type: String, //date,time,datetime
            readOnly: Boolean,
            readonly: Boolean,
            emptyDate: String
        },
        data() {
            return {
                time: Date.now()
            }
        },
        computed: {
            readOnly2() {
                return this.readOnly || this.readonly;
            },
            dateFormated() {
                const date = moment(this.value);
                return this.value && date.isValid() ? date.format(this.getDateFormat()) : this.emptyDate;
            },
            myClass() {
                return this.readOnly ? 'text-nowrap' : 'form-control form-datetime';
            }
        },
        created() {
            setInterval(() => {
                this.time = Date.now();
            }, 1000);
        },
        mounted: function() {

            var self = this;
            if (self.value) {
                var date = moment(self.value);
                window.$(this.$el).find('.calendar-button input').val(date.format('YYYY-MM-DD'));
                window.$(this.$el).find('.clock-button input').val(date.format('HH:SS'));
            } else {
                window.$(this.$el).find('.calendar-button input').val('');
                window.$(this.$el).find('.clock-button input').val('');
            }
            this.$nextTick(() => {
                window.$(this.$el).find('.calendar-button').datepicker({
                    autoclose: true,
                    format: 'yyyy-mm-dd',
                    language: 'es',
                    beforeShowDay: function() {
                        return !self.readOnly;
                    }
                }).on('changeDate', (e) => {
                    if (self.type !== "date") {
                        const time = self.getTime();
                        e.date.setHours(time.hour);
                        e.date.setMinutes(time.minute);
                    }
                    self.$emit('input', moment(e.date).format(this.getModelFormat()));
                    self.$emit('change', moment(e.date).format(this.getModelFormat()));
                });
                window.$(this.$el).find('.clock-button').clockpicker({
                    autoclose: true,
                    afterDone: () => {
                        const time = self.getTime();
                        const date = self.value ? moment(self.value) : moment();
                        date.set(time);
                        self.$emit('change', moment(date).format(this.getModelFormat()));
                    }
                });
            });
        },
        methods: {
            click(event) {
                if (event.target === this.$el) {
                    window.$(this.$el).find('.calendar-button').click();
                }
            },
            getTime() {
                const t = window.$(this.$el).find('.clock-button input')[0].value.split(':');
                const now = new Date();
                return t.length === 2 ? {hour: t[0] * 1, minute: t[1] * 1} : {hour: now.getHours(), minute: now.getMinutes()};
            },
            getModelFormat() {
                return this.type === 'date' ? "YYYY-MM-DD" : (this.type === 'time' ? "HH:mm" : "YYYY-MM-DD HH:mm:ss");
            },
            getDateFormat() {
                return this.format ? this.format : (this.type === 'date' ? "DD-MM-YYYY" : (this.type === 'time' ? "HH:mm" : "DD-MM-YYYY HH:mm"));
            }
        }
    }
</script>
<style src='bootstrap-datepicker/dist/css/bootstrap-datepicker.css'></style> 
<style src='clockpicker/dist/bootstrap-clockpicker.css'></style> 
<style>
    .input-group-addon {
    }
    .form-datetime {
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
    }
</style>
