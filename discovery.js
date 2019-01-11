const Consul = require('consul');
const debug = require('debug')('dev:discovery');
const utils = require('./utils');
const serviceLocalStorage = require('./serviceLocalStorage.js');
class Discovery {
    connect(...args) {
        if (!this.consul) {
            debug(`consul server connecting...`);
            //建立连接，
            //需要注意的时，由于需要动态获取docker内的consul server的地址，
            //所以host需要配置为consulserver（来自docker-compose配置的consulserver）
            //发起请求时会经过docker内置的dns server，即可把consulserver替换为具体的consul 服务器 ip
            this.consul =new Consul({
                host:'consulserver',
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
            throw new Error('please firstly use connect() to connect');
        }
        const {service} = opts;
        // 从缓存中获取列表
        const services = serviceLocalStorage.getItem(service);
        if (services.length > 0) {
            debug(`Hit cache; key:${service} -- value:${JSON.stringify(services)}`);
            return services;
        }
        //如果缓存不存在，则获取远程数据
        let result = await this
            .consul
            .catalog
            .service
            .nodes(opts);
        debug(`get the server data; key：${service}：-- value:${JSON.stringify(result[0])}`);
        serviceLocalStorage.setItem(service, result[0])
        return result[0];
    }
}

module.exports = new Discovery();