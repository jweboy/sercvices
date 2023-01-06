import Router, { RouterContext } from 'koa-router';
import compose from 'koa-compose';

const router = new Router();

export function combineRouters(routers: any[]) {
  return () => {
    const middleware: any[] = [];

    routers.forEach((router) => {
      middleware.push(router.routes());
      middleware.push(
        router.allowedMethods({
          // throw: true,
        })
      );
    });

    return compose(middleware);
  };
}

export default router;
