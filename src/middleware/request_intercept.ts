import { Context } from 'koa';
import { ErrorCode, NOT_FOUND_CODE, NOT_FOUND_TEXT, SUCCEED_CODE, SUCCEED_TEXT } from '../constants/locale';

const requestIntercept = () => {
  return async (ctx: Context, next) => {
    const { status, body = {} } = ctx.response;
    const { url } = ctx.request;
    // console.log('body->', body);

    // 针对掘金的特殊逻辑
    if (/\/juejin/.test(url)) {
      // @ts-ignore
      const { err_no, err_msg } = body;
      const isCrash = err_no !== 0;
      // console.log('juejin request=>', body);
      ctx.body = {
        code: err_no,
        msg: err_msg,
        data: isCrash ? null : '可签到',
      };
      // @ts-ignore
    } else if (body.error) {
      // 常规业务逻辑
      // @ts-ignore
      // @ts-ignore
      const { error, code } = body;
      ctx.body = { code, msg: error, data: null };
    } else {
      // 正常返回
      ctx.body = { code: SUCCEED_CODE, msg: SUCCEED_TEXT, data: body || null };
    }

    try {
      await next();
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = '当前接口授权失败，请传入正确的token后重试';
      }
      if (err.status === 500) {
        ctx.status = 500;
        ctx.body = '服务器错误，请稍后重试';
      }

      ctx.status = err.statusCode || err.status;
      ctx.body = {
        message: err.message,
      };
    }
  };
};

export default requestIntercept;
