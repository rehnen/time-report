const Router = require('koa-router');
const fetch = require('node-fetch');

const projectsRouter = new Router();
const secret = require('../conf/secret');

projectsRouter.get('/projects', async (cxt, next) => {
  // cxt.router available
  const response = await fetch(`https://api.github.com/users/rehnen/repos?client_id=${secret.client_id}&client_secret=${secret.client_secret}`, {
  });
  const result = await response.json();
  cxt.body = result.map((o) => {
      return { name: o.name , description: o.description };
  });
});

projectsRouter.get('/projects/:id', async (cxt, next) => {
  const projectP = fetch(`https://api.github.com/repos/rehnen/${cxt.params.id}/readme?client_id=${secret.client_id}&client_secret=${secret.client_secret}`, {
  });
  const readmeP = fetch(`https://api.github.com/repos/rehnen/${cxt.params.id}?client_id=${secret.client_id}&client_secret=${secret.client_secret}`, {
  });
  const objects = await Promise.all([projectP, readmeP]);
  const arr = await Promise.all([objects[0].json(), objects[1].json()]);
  cxt.body = { content: arr[0].content, name: arr[1].name }
});

module.exports = projectsRouter;