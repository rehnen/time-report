const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');

const app = new Koa();
const router = new Router();


let times = [];


router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body = { times };
});

router.put('/:date', (cxt, next) => {
  console.log(Object.keys(cxt.request))
  console.log(cxt.request.body);

  times.push(cxt.request.body);


//  console.log(next);
  cxt.body = { times }
});

app.use(json())
  .use(bodyParser({
      extendTypes: {
        json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
      }
  }))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);