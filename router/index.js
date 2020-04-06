const router = require('koa-router')();
const render = require('../render');

console.log(render);
router.get('*', render);
router.get('/api/hello', async (ctx) => {
    console.log({ ctx });
    ctx.body = 'reply hello!';
})

module.exports = router;