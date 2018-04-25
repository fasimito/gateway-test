const consul = require('consul'); // 默认连接的是127.0.0.1:8500
const debug = require('debug')('dev:discovery');
const utils = require('./utils');
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
    async getService(...opts) {
        if (!this.consul) {
            throw new Error('请先用connect方法进行连接');
        }
        //根据参数获取相关服务
        let result = await this
            .consul
            .catalog
            .service
            .nodes(...opts);
        debug(`获取的service node：${JSON.stringify(result[0])}`)
        return result[0];
    }
}

module.exports = new Discovery();