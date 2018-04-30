const Router = require('koa-router');
const router = new Router();
const debug = require('debug')('dev:router');
const serviceLocalStorage = require('./serviceLocalStorage.js');
const proxy = require('./utils').proxy;
router.get('/service-web', async(ctx, next) => { // 获取到服务列表     const routers=
    const services = serviceLocalStorage.getItem('service-web'); // 随机获取列表中的一个     const
    random = Math.floor(Math.random() * (services.length))
    const host = services[random];
    debug(`router:${services}`);
    const url = `http://${host}`;
    debug(`proxy url:${url}`);
    // proxy(ctx.req,ctx.res,{     target: 'http://www.baidu.com',     changeOrigin:
    // true },e=>{     console.log(e); })
   return proxy({target: 'http://www.baidu.com', changeOrigin: false})(ctx, next);
});
module.exports = router;