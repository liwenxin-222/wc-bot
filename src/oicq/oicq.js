// const { createClient } = require("oicq")

import {createClient} from 'icqq';
import {setSchedule} from '../gameXunFeng/schedule/index.js'
import {getMtList} from '../gameXunFeng/data/index.js'
import {aliasWhiteList, oldCommodityWhiteList, roomWhiteList} from '../../config.js'
function initXunFeng() {
  console.log(`定时任务已启动`);
  // let oldCommodityWhiteList = Object.assign([], oldCommodityWhiteList);
  setSchedule('30 * * * * *', async () => {
    
    let logMsg
    
    let newCommodity = [];
    
    try {
      const listRes = await getMtList();
      
      if (listRes.data.code === 0) {
        const list = listRes.data.data.list;
        
        list.forEach((itemCommodity) => {
          
          let isHas = false;
          
          for (let i = 0; i < oldCommodityWhiteList.length; i++) {
            if (itemCommodity.name.includes(oldCommodityWhiteList[i])) {
              // oldCommodityWhiteListClone.push(itemCommodity.name);
              isHas = true;
              break;
            }
          }
          
          if (!isHas) {
            newCommodity.push(itemCommodity);
          }
        })
        
      }
    } catch (e) {
      logMsg = e.message;
    }
    console.log(newCommodity, 1111);
    if (newCommodity.length > 0) {
      let str = '小巽提醒您，商城上新 <br>  ';
      newCommodity.forEach((item) => {
        const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
        str += `<br>名称：${item.name} <br>价格：${price} <br>库存：${item.inventory} <br>~~~~~`
      })
      
      try {
        
        // roomWhiteList.forEach(async (txtName) => {
        //   let room = (await bot.Room.find({topic: txtName}));
        //   if (room) {
        //     await room.say(str) // 发送消息
        //   }
        // });
        //
        // console.log(oldCommodityWhiteList, newCommodity, 66666);
  
        console.log(client.pickGroup(), 888888)
      } catch (e) {
        logMsg = e.message
      }
    }
    
    console.log(logMsg)
    
  })
}


const account=185996639
const password='lwx19930526'
const client=createClient()

client.on('system.login.slider', (e) => {
  console.log('输入滑块地址获取的ticket后继续。\n滑块地址:    ' + e.url)
  process.stdin.once('data', (data) => {
    client.submitSlider(data.toString().trim())
  })
})
client.on('system.login.qrcode', (e) => {
  console.log('扫码完成后回车继续:    ')
  process.stdin.once('data', () => {
    client.login()
  })
})
client.on('system.login.device', (e) => {
  console.log('请选择验证方式:(1：短信验证   其他：扫码验证)')
  process.stdin.once('data', (data) => {
    if (data.toString().trim() === '1') {
      client.sendSmsCode()
      console.log('请输入手机收到的短信验证码:')
      process.stdin.once('data', (res) => {
        client.submitSmsCode(res.toString().trim())
      })
    } else {
      console.log('扫码完成后回车继续：' + e.url)
      process.stdin.once('data', () => {
        client.login()
      })
    }
  })
})

client.login(account,password)
