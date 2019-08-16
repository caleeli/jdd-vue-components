import jQuery from 'jquery';
import moment from 'moment';
// localeIndexOf find multilanguage strings
String.prototype.localeIndexOf = require('locale-index-of').prototypeLocaleIndexOf(Intl);

/**
 * COMPONENTES
 */
export const components = {};
const com = require.context('./components/', true, /\.(vue)$/i);
com.keys().map(key => {
    const name = key.match(/\w+/)[0];
    const definition = com(key);
    components[name] = definition.default ? definition.default : definition;
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

export const boot = function (Vue, $) {
    if ($ === undefined) {
        $ = jQuery;
    }
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

// Setup plugin install
export default {
    install: function (Vue, {jQuery, prefix}) {
        boot(Vue, jQuery);
        Object.keys(components).forEach((name) => {
            Vue.component((prefix ? prefix + '-':'') + name, components[name]);
        });
    }
}
