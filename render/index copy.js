const React = require('react')
const ReactDOMServer = require('react-dom/server');
const { StaticRouter, matchPath } = require('react-router-dom');
const App = require('../web/src/App');
const { matchRoutes } = require('react-router-config');
const router = require('koa-router')();
/**
 * 匹配当前请求url是否跟客户端路由一致 不一致则执行next 进行静态资源处理等
 * @param {*} routesArray
 * @param {*} url
 */
const getMatch = (routesArray, url) => {
  return routesArray.some(router => matchPath(url, {
    path: router.path,
    exact: router.exact,
  }))
}
/**
 * 渲染服务端路由
 */
const render = async (ctx, next) => {
  const branch = matchRoutes(router, ctx.req.url);
  const promises = branch.map(({ route }) => {
    const fetch = route.component.fetch;
    return fetch instanceof Function ? fetch(store) : Promise.resolve(null)
  });
  await Promise.all(promises).catch((err) => {
    console.log(err);
  });
  let isMatch = getMatch(router, ctx.req.url);
  if (!isMatch) {
    await next();
  } else {
    const html = ReactDOMServer.renderToString(
      <StaticRouter
        location={ctx.url}
        context={{}}>
        <App />
      </StaticRouter>
    )

    const body = html;
    ctx.body = body;
  }
}

router.get('*', render);
router.get('/api/hello', async (ctx) => {
    console.log({ ctx });
    ctx.body = 'reply hello!';
})
module.exports = router;



