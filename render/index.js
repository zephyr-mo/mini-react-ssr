import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { layout } from './layout';
import App from '../web/src/App';
import { matchRoutes } from 'react-router-config';
import router from '../web/src/router';

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
  const promises = branch.map(({
    route
  }) => {
    const fetch = route.component.fetch;
    return fetch instanceof Function ? fetch(store) : Promise.resolve(null)
  });
  await Promise.all(promises).catch((err) => {
    console.log(err);
  });

  let isMatch = getMatch(router, ctx.req.url);

  console.log('url', ctx.url);
  if (!isMatch) {
    await next();
  } else {
    const html = ReactDOMServer.renderToString(
      <StaticRouter
        location={ctx.url}
        context={{}}>
        <App/>
      </StaticRouter>
    )

    const body = layout(html);
    ctx.body = body;
  }
}

export default render;
