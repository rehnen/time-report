const Koa = require('koa');
const Router = require('koa-router');
const json = require('koa-json');

const app = new Koa();
const router = new Router();


let times = [];


router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body = {name: "potato"};
});

app.use(json())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);