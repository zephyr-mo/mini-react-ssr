const router = require('koa-router')();
const render = require('../render').default;

router.get('*', render);
router.get('/api/hello', (ctx) => {
    ctx.body = 'reply hello!';
    console.log({ ctx });
})
module.exports = router;