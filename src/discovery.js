const consul = require('consul'); // 默认连接的是127.0.0.1:8500
const debug = require('debug')('dev:discovery');
const utils = require('./utils');
class Discovery {
    connect(...args) {
        //建立连接
        this.consul = consul({
            ...args,
            promisify: utils.fromCallback  //转化为promise类型
        });
        return this;
    }
    async getServices(...opts) {
        if (!this.consul) {
            throw new Error('请先用connect方法进行连接');
        }
        //根据参数获取相关服务
        let result = await this
            .consul
            .catalog
            .service
            .nodes(...opts);
        return result[0];
    }

}

module.exports = new Discovery();