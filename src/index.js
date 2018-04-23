const discovery = require('./discovery');
const http = require('http');


// 链接到集群
discovery.connect().getServices('service-web1').then(result=>{
    console.log(result);
});


async function getServices() {
    try {
        const result = await discovery.getServices('service-web');
        console.log(result);
    } catch (error) {
        console.log(error);
    }

}