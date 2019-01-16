/**
 * COMPONENTES
 */
export const components = {};
const com = require.context('./components/', true, /\.(vue)$/i);
com.keys().map(key => {
    const name = key.match(/\w+/)[0];
    components[name] = com(key).default;
});
