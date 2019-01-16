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
