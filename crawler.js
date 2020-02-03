const axios = require('axios'),
    fs = require('fs'),
    baseUrl = 'http://huiyan.baidu.com/migration/cityrank.jsonp?dt=city&id=420100&type=move_out&date=2020',
    requests = [],
    results = {};

function crawl (date) {
    return axios.get(baseUrl + date).then(res=>{
        results[date] = JSON.parse(res.data.slice(3, -1)).data.list;
    }).catch(err => {
        console.log(err)
    })
}

for (let i = 101; i <= 126; i++) {
    requests.push(crawl('0' + i));
}

Promise.all(requests).then(() => {
    console.log(Object.keys(results).length)
    fs.writeFile('result.json', JSON.stringify(results), 'utf8', function () {
        console.log('saved')
    })
}).catch(err => {
    console.log(err)
})

