const router = require('koa-router')();

router.get('/hello', (ctx) => {
    console.log({ ctx });
    ctx.body = 'reply hello!';
})
module.exports = router;