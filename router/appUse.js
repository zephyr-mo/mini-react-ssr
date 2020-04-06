const router      = require('./index');
const path        = require('path');
const server      = require('koa-static');
const staticCache = require("koa-static-cache");

const use = (app) => new Promise((resolve, reject) => {
    try {
        app.use(server(__dirname + '../web/build'))
        console.log('1')
        app.use(staticCache(path.resolve(__dirname, '../web/build'), {
            maxAge: 365 * 24 * 60 * 60,
            gzip  : true
        }));
        console.log('2')
        app.use(router.routes());
        console.log('3')
        app.use(router.allowedMethods());
        console.log('4')
        resolve({ success: true, message: 'use middleware complete'});
    } catch (err) {
        reject({ success: false, message: err.message });
    }
});

module.exports = use;