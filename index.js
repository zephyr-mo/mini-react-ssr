
require('babel-polyfill');
require('koa-react-view');

const Koa         = require('koa');
const app         = new Koa();
const appUse      = require('./router/appUse');
const port = process.env.PORT || '3008';

appUse(app).then(() => {
    app.listen(port, () => {
        console.log('listen on:' + port);
    });
}).catch(err => { console.error(err); });
