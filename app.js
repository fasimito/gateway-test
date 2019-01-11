const Application = require('koa');
const app = new Application();
const debug = require('debug');
const appDebug = debug('dev:app');
const forkDebug = debug('dev:workerProcess');
const child_process = require('child_process');
const router = require('./router');


const serviceLocalStorage = require('./serviceLocalStorage.js');

//listen port 3000
app.listen(3000, '0.0.0.0',() => {
    appDebug('Server running at 3000');
});

app
    .use(router.routes())
    .use(router.allowedMethods);

//fork a sub process used for listening servie list change
const workerProcess = child_process.fork('./startWatch.js');

// 子进程退出
workerProcess.on('exit', function (code) {
    forkDebug(`sub process quit, quite code：${code}`);
});

workerProcess.on('error', function (error) {
    forkDebug(`error: ${error}`);
});

// 监控线程中接收到数据
workerProcess.on('message', msg => {
    if (msg) {
        appDebug(`从监控中数据变化：${JSON.stringify(msg)}`);
        //通知缓存中service列表变化
        serviceLocalStorage.setItem(msg.name, msg.data);
    }
});