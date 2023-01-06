import { Context } from 'koa';
import { fetch, request } from 'undici';
import { FEISHU_BOT_HOOK_URL, JUEJIN_REQUEST_URL } from '../../../constants/index';
import { ErrorCode, ErrorMessage } from '../../../constants/locale';
import { FEISHU_BOT_CHECJIN_TEMPLATE } from '../../../constants/template';
import redis from '../../../utils/redis';
import { post } from '../../../utils/request';

const headers: Record<string, string> = {
  'content-type': 'application/json; charset=utf-8',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
  'sec-ch-ua': '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
  'sec-ch-ua-mobile': '?0',
  referer: 'https://juejin.cn/',
  accept: '*/*',
};

// 查询今日是否已经签到
export const getTodayCheckinStatus = async (ctx: Context, next) => {
  try {
    const [cookie] = await redis.hmget('juejin', 'cookie');
    const result = await request(`${JUEJIN_REQUEST_URL}/get_today_status`, {
      headers: {
        ...headers,
        cookie: cookie != null ? cookie : '',
      },
    }).then(({ body }) => body.json());
    if (result.err_no === 0) {
      await post(FEISHU_BOT_HOOK_URL, {
        msg_type: 'interactive',
        card: FEISHU_BOT_CHECJIN_TEMPLATE,
      });
    }
    ctx.body = result;
  } catch (err) {
    console.log('request error =>', err.message);
    ctx.body = {
      err_msg: ErrorMessage[ErrorCode.ServerError],
      err_no: ErrorCode.ServerError,
    };
  }
  next();
};
