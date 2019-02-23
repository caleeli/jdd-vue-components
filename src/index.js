import $ from 'jquery';
import moment from 'moment';

/**
 * COMPONENTES
 */
export const components = {};
const com = require.context('./components/', true, /\.(vue)$/i);
com.keys().map(key => {
    const name = key.match(/\w+/)[0];
    components[name] = com(key).default;
});

/**
 * Api
 */
export const api = {};
const apis = require.context('./api/', true, /\.(js)$/i);
apis.keys().map(key => {
    const name = key.match(/\w+/)[0];
    api[name] = apis(key).default;
});

export const boot = function () {
    // Boot
    window._ = require('lodash');
    window.Popper = require('popper.js').default;
    window.jQuery = $;
    window.$ = $;
    global.jQuery = $;
    require('clockpicker/dist/bootstrap-clockpicker.js');
    require('bootstrap-datepicker/js/locales/bootstrap-datepicker.es.js');
    moment.locale('es');
    window.Vue = Vue;
    Vue.config.productionTip = false;
}