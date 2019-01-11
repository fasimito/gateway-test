const consul = require('consul'); // by default is: 127.0.0.1:8500
const debug = require('debug')('dev:watch');
const utils = require('./utils');

class Watch {
    /**
     * establish consul connection
     * @param {*} args
     */
    connect(...args) {
        if (!this.consul) {
            //establish connection
            //需要注意的时，由于需要动态获取docker内的consul server的地址，
            //所以host需要配置为consulserver（来自docker-compose配置的consulserver）
            //发起请求时会经过docker内置的dns server，即可把consulserver替换为具体的consul 服务器 ip
            debug(`consul server connecting...`);
            this.consul = consul({
                host:'consulserver',
                ...args,
                promisify: utils.fromCallback //转化为promise类型
            });
        }
        return this;
    }
    /**
     * Listen required Services
     * @param {*} services
     * @param {*} onChanged
     */
    watch(services, onChanged) {
        const consul = this.consul;
        if (services === undefined) {
            throw new Error('service could not be null');
        }
        if (typeof services === 'string') {
            serviceWatch(services);
        } else if (services instanceof Array) {
            services.forEach(service => {
                serviceWatch(service);
            });
        }
        function serviceWatch(service) {
            const watch = consul.watch({method: consul.catalog.service.nodes, options: {service}});
            watch.on('change', data => {
                const result = {
                    name: service,data
                };
                debug(`Listen Service: ${service} contents changed ：${JSON.stringify(result)}`);
                onChanged(null, result);
            });

            watch.on('error', error => {
                debug(`Listen Service: ${service} error, the errors ：${error}`);
                onChanged(error, null);
            });
        }
        return this;
    }
}

module.exports = new Watch();