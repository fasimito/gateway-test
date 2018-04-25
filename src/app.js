const Application = require('koa');
const app = new Application();
const debug = require('debug');
const appDebug = debug('dev:app');
const forkDebug = debug('dev:workerProcess');
const child_process = require('child_process');
const serviceLocalStorage = require('./serviceLocalStorage.js');

//监听3000端口
app.listen(3000, () => {
    appDebug('3000端口已启动');
});

// fork一个子进程，用于监听servie 列表变化
const workerProcess = child_process.fork('src/startWatch.js');

// 子进程退出
workerProcess.on('exit', function (code) {
    forkDebug(`子进程已退出，退出码：${code}`);
});
workerProcess.on('error', function (code) {
    forkDebug(`error: ${code}`);
});

// 监控线程中接收到数据
workerProcess.on('message', msg => {
    appDebug(`从监控中数据变化：${JSON.stringify(msg)}`);
    //通知缓存中service列表变化
    serviceLocalStorage.setItem(msg.name,msg.data);
});