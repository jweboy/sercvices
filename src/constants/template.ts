import dayjs from 'dayjs';

export const FEISHU_BOT_CHECJIN_TEMPLATE = {
  header: {
    title: {
      tag: 'plain_text',
      content: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
  },
  elements: [
    {
      tag: 'div',
      text: {
        content: '**当前状态：**✅ 🥳🥳',
        tag: 'lark_md',
      },
    },
    {
      actions: [
        {
          tag: 'button',
          text: {
            content: '掘金签到',
            tag: 'lark_md',
          },
          url: 'https://juejin.cn/user/center/signin?from=sign_in_menu_bar',
          type: 'default',
        },
      ],
      tag: 'action',
    },
  ],
};
