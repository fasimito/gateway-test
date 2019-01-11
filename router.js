const Router = require('koa-router');
const router = new Router();
const debug = require('debug')('dev:router');
const discovery = require('./discovery').connect();
const request = require('superagent');

router.get('/microservice-gate/microservice-web/getServerIp', async(ctx, next) => {
    const host = await getServiceHost('microservice-web');
    const fetchUrl = `http://${host}/getServerIp`;
    const result = await request.get(fetchUrl);
    debug(`getServerIp:${result.text}`);
    ctx.body = result.text;
});

/**
 * get the microservice working host name
 */
async function getServiceHost(name) {
    const services = await discovery.getService({service: name});
    //获取随机数据
    random = Math.floor(Math.random() * (services.length));
    const host = services[random];
    debug(`service host ${services[random]}`)
    return host;
}

module.exports = router;