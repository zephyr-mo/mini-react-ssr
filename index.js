require('@babel/polyfill');
const Koa         = require('koa');
const path        = require('path');
const staticCache = require("koa-static-cache");
const app         = new Koa();
const router      = require('./router');

console.log(path.resolve(__dirname, './'));

app.use(require('koa-static')(path.resolve(__dirname, './dist')));
app.use(staticCache(path.resolve(__dirname, './dist'), {
    maxAge: 365 * 24 * 60 * 60,
    gzip  : true
}));
app.use(router.routes());
;const port = process.env.PORT || '3008';

app.listen(port, () => {
    console.log('listen on:' + port);
});
