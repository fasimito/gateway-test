const localStorage = require('node-localstorage').LocalStorage;
const debug = require('debug')('dev:localstorage');

/**
 * supply service cache
 */

class ServiceLocalStorage {
    constructor() {
        this.localStorage = new Map();
    }
    getItem(key) {
        return this
            .localStorage
            .get(key) || [];
    }
    setItem(key, value = []) {
        const ipValues = value.map(item => {
            // get the service ip and port
            return `${item.ServiceAddress}:${item.ServicePort}`
        });
        debug(`set key:${key},value:${ipValues.toString()}`);
        this
            .localStorage
            .set(key, ipValues);
    }
    removeItem(key) {
        this
            .localStorage
            .delete(key);
    }
    clear() {
        this
            .localStorage
            .clear();
    }
}
module.exports = new ServiceLocalStorage();