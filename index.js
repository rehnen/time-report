const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');

const app = new Koa();
const router = new Router();


const times = [];


router.get('/', (cxt) => {
  // ctx.router available
  cxt.body = { times };
});

router.put('/:date', (cxt) => {
  times.push(cxt.request.body);
  cxt.body = { times };
});

app.use(json())
  .use(bodyParser({
    extendTypes: {
      json: ['application/x-javascript'],
    },
  }))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
