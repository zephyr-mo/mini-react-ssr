require('@babel/polyfill');
const Koa         = require('koa');
const path        = require('path');
const staticCache = require("koa-static-cache");
const app         = new Koa();
const router      = require('./router');

app.use(require('koa-static')(__dirname + './'))
app.use(staticCache(path.resolve(__dirname, './'), {
    maxAge: 365 * 24 * 60 * 60,
    gzip  : true
}));
app.use(router.routes());
const port = process.env.PORT || '3008';

app.listen(port, () => {
    console.log('listen on:' + port);
});
