

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
  
  // const robot = new ChatBot({
  //   webhook: 'https://oapi.dingtalk.com/robot/send?access_token=5c02655a42771a797139c0ee285da13d092af46e5994b354d1d79f7e7c4091d9'
  // });
  //
  // const robotXunF = new ChatBot({
  //   webhook: 'https://oapi.dingtalk.com/robot/send?access_token=db700aae6fb9ff30ee7f9f7965853f8fc014717964eb972dbd20ec2dc59eb42d'
  // });
  //
  const robotXun = new ChatBot({
    webhook: 'https://oapi.dingtalk.com/robot/send?access_token=b4b439fd1fed677758c92910c5dd77210ee720245fec6507611a1d7e4c6191d6'
  });
  
// 发送钉钉消息
//   robot.markdown('商城上新通知', text, {
//     "isAtAll": isAtAll
//   })
//   .then((res) => {
//     // TODO
//     console.log('通知成功')
//   }, () => {
//     console.log('通知失败')
//   });
//
//   robotXunF.markdown('商城上新通知', text, {
//     "isAtAll": isAtAll
//   })
  robotXun.markdown('集市上新通知', text, {
    "isAtAll": isAtAll
  })
  
}

export const SendDingTalkUserCantUse = (text, {isAtAll = false} = {}) => {
 
  const robotXun = new ChatBot({
    webhook: 'https://oapi.dingtalk.com/robot/send?access_token=196cf577658f5dc1cd8d69bbeb802a99f22008f6ecf4f845578ca06ab7dc2818'
  });

  robotXun.markdown('监控失效通知', text, {
    "isAtAll": isAtAll
  })
  
}

export const SendDingTalkTest = (text, {isAtAll = false} = {}) => {
  
  const robotXunTest = new ChatBot({
    webhook: 'https://oapi.dingtalk.com/robot/send?access_token=196cf577658f5dc1cd8d69bbeb802a99f22008f6ecf4f845578ca06ab7dc2818'
  });
  
  robotXunTest.markdown('商城上新通知', text, {
    "isAtAll": isAtAll
  });
}
