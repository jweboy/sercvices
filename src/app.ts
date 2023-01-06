import Koa from 'koa';
import logger from 'koa-logger';
import requestIntercept from './middleware/request_intercept';
import routes from './routes';

const server = new Koa();

server
  .use(logger())
  .use(routes())
  .use(requestIntercept());

server.listen(8080, () => {
  console.log(`Server listening at http://localhost:8080`);
});
