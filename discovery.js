const consul = require('consul'); // 默认连接的是127.0.0.1:8500
const debug = require('debug')('dev:discovery');
const utils = require('./utils');
const serviceLocalStorage = require('./serviceLocalStorage.js');
class Discovery {
    connect(...args) {
        if (!this.consul) {
            debug(`与consul server连接中...`);
            //建立连接
            this.consul = consul({
                ...args,
                promisify: utils.fromCallback //转化为promise类型
            });
        }
        return this;
    }
    /**
     * 根据名称获取服务
     * @param {*} opts
     */
    async getService(opts) {
        if (!this.consul) {
            throw new Error('请先用connect方法进行连接');
        }
        const {service} = opts;
        // 从缓存中获取列表
        const services = serviceLocalStorage.getItem(service);
        if (services.length > 0) {
            debug(`命中缓存，key:${service},value:${JSON.stringify(services)}`);
            return services;
        }
        //如果缓存不存在，则获取远程数据
        let result = await this
            .consul
            .catalog
            .service
            .nodes(opts);
        debug(`获取服务端数据，key：${service}：value:${JSON.stringify(result[0])}`);
        serviceLocalStorage.setItem(service, result[0])
        return result[0];
    }
}

module.exports = new Discovery();