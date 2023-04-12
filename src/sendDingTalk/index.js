

// 直接使用 webhook
import ChatBot from 'dingtalk-robot-sender';


// export const SendDingTalk = (text, {isAtAll = false} = {}) => {
//
// // 发送钉钉消息
//   let textContent = {
//     "msgtype": "text",
//     "text": {
//       "content": text
//     },
//     "at": {
//       // "atMobiles": [
//       //   "156xxxx8827",
//       // ],
//       "isAtAll": isAtAll
//     }
//   }
//   robot.markdown(textContent)
//   .then((res) => {
//     // TODO
//     console.log('通知成功')
//   }, () => {
//     console.log('通知失败')
//   });
//
// }


export const SendDingTalkMarkdown = (text, {isAtAll = false} = {}) => {
  
  const robot = new ChatBot({
    webhook: 'https://oapi.dingtalk.com/robot/send?access_token=129c31e21e1e324d7ac160976cde05e83d547e503d8e447fb2f87fa58a261fcb'
  });
  
  const robotXunF = new ChatBot({
    webhook: 'https://oapi.dingtalk.com/robot/send?access_token=db700aae6fb9ff30ee7f9f7965853f8fc014717964eb972dbd20ec2dc59eb42d'
  });
// 发送钉钉消息
  robot.markdown('商城上新通知', text, {

  })
  .then((res) => {
    // TODO
    console.log('通知成功')
  }, () => {
    console.log('通知失败')
  });
  
  robotXunF.text(text)
}
