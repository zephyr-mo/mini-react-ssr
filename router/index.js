const router = require('koa-router')();

router.get('/api/hello', (ctx) => {
    console.log({ ctx });
    ctx.body = 'reply hello!';
})
module.exports = router;