// Imports
import Vue from 'vue';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.vue';
import {api} from './index.js';

// Boot
window._ = require('lodash');
window.Popper = require('popper.js').default;
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
require('clockpicker/dist/bootstrap-clockpicker.js');
require('bootstrap-datepicker/js/locales/bootstrap-datepicker.es.js');
moment.locale('es');
window.Vue = Vue;
Vue.config.productionTip = false;
// localeIndexOf find multilanguage strings
String.prototype.localeIndexOf = require('locale-index-of').prototypeLocaleIndexOf(Intl);

// Api helpers
Object.assign(window, api);

new Vue({
    render: h => h(App),
}).$mount('#app')
