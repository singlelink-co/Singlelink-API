const express = require('express');
const getPort = require('get-port');


const app = express();
const environment = process.env.NODE_ENV || 'development';
let port;

(async () => {
    if(environment === 'development') {
        port = await getPort({port: 8081});
    } else if(environment === 'production') {
        port = await getPort({port: 80});
    }

    app.get('/', require('./functions/Misc/status'));

    app.listen(port, () => {
        console.log(`🔗 Singlelink API listening on port ${port}`)
    })
})();