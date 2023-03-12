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

// const { createClient } = require("icqq")
const client = createClient({platform:3})

client.on("system.online", () => console.log("Logged in!"))
client.on("message", e => {
  console.log(e)
  e.reply("hello world", true) //true表示引用对方的消息
})

client.on("system.login.qrcode", function (e) {
  //扫码后按回车登录
  process.stdin.once("data", () => {
    this.login()
  })
}).login()
