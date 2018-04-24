const localStorage = require('node-localstorag');

/**
 * 提供service 缓存
 */
class ServiceLocalStorage {
    constructor(){
        this.getItem = this.localStorage.getItem;
        this.setItem = this.localStorage.setItem;
        this.length = this.localStorage.length;
        this.removeItem= this.localStorage.removeItem;
        this.key = this.localStorage.key;
        this.clear = this.localStorage.clear;
    }
}
ServiceLocalStorage.localStorage = localStorage;

module.exports = new ServiceLocalStorage();