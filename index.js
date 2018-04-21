const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const files = require('koa-static');
const https = require('https');
const http = require('http');

const projects = require('./src/projects');

const app = new Koa();
const router = new Router();

app.use(json())
  .use(files('src/static'))
  .use(bodyParser({
    extendTypes: {
      json: ['application/x-javascript'],
    },
  }))
  .use(router.routes())
  .use(projects.routes())
  .use(router.allowedMethods());


https.createServer(app.callback()).listen(443);
http.createServer(app.callback()).listen(80);
