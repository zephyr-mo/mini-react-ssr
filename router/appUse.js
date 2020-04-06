const router      = require('./index');
const path        = require('path');
const server      = require('koa-static');
const staticCache = require("koa-static-cache");

const use = (app) => new Promise((resolve, reject) => {
    try {
        app.use(server(__dirname + '../web/build'))
        app.use(staticCache(path.resolve(__dirname, '../web/build'), {
            maxAge: 365 * 24 * 60 * 60,
            gzip  : true
        }));
        app.use(router.routes());
        app.use(router.allowedMethods());
        resolve({ success: true, message: 'use middleware complete'});
    } catch (err) {
        reject({ success: false, message: err.message });
    }
});

module.exports = use;