

// 直接使用 webhook
import ChatBot from 'dingtalk-robot-sender';

const robot = new ChatBot({
  webhook: 'https://oapi.dingtalk.com/robot/send?access_token=129c31e21e1e324d7ac160976cde05e83d547e503d8e447fb2f87fa58a261fcb'
});


export const SendDingTalk = (text, {isAtAll = false} = {}) => {

// 发送钉钉消息
  let textContent = {
    "msgtype": "text",
    "text": {
      "content": text
    },
    "at": {
      // "atMobiles": [
      //   "156xxxx8827",
      // ],
      "isAtAll": isAtAll
    }
  }
  robot.markdown(textContent)
  .then((res) => {
    // TODO
    console.log('通知成功')
  }, () => {
    console.log('通知失败')
  });
  
}


export const SendDingTalkMarkdown = (text, {isAtAll = false} = {}) => {

// 发送钉钉消息
  robot.markdown('商城通知', text, {
  
  })
  .then((res) => {
    // TODO
    console.log('通知成功')
  }, () => {
    console.log('通知失败')
  });
  
}
// SendDingTalk('上新。哈哈哈哈哈哈哈哈哈')
