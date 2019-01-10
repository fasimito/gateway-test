const Router = require('koa-router');
const router = new Router();
const debug = require('debug')('dev:router');
const discovery = require('./discovery').connect();
const request = require('superagent');

router.get('/service-web/getRemoteIp', async(ctx, next) => {
    const host = await getServiceHost('service-web');
    const fetchUrl = `http://${host}/getRemoteIp`;
    const result = await request.get(fetchUrl);
    debug(`getRemoteIp:${result.text}`);
    ctx.body = result.text;
});

router.get('/service-calluser/getUsername',async(ctx,next)=>{
   const host = await getServiceHost('service-calluser');
   const fetchUrl = `http://${host}/getRemoteIp`;
   const result = await request.get(fetchUrl);
   debug(`get RemoteIp:${result.text}`);
   ctx.body = result.text.append(" :zhangsan");
});

/**
 * 根据service name 获取 service 对应host
 */
async function getServiceHost(name) {
    const services = await discovery.getService({service: name});
    // 获取随机数据
    random = Math.floor(Math.random() * (services.length));
    const host = services[random];
    debug(`service host ${services[random]}`)
    return host;
}

module.exports = router;