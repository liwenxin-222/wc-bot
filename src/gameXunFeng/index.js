import {setSchedule} from './schedule/index.js';
import {getMtList} from './data/index.js';
import {aliasWhiteList, botName, roomWhiteList, oldCommodityWhiteList} from '../../config.js'

export async function initXunFeng(bot) {
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
    console.log(newCommodity, 1111)
    if (newCommodity.length > 0) {
      let str = '上新品了！！！！！！！！ <br>  ';
      newCommodity.forEach((item) => {
        const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
        str += `<br>名称：${item.name} <br>价格：${price} <br>-------`
      })
      
      try {
        
        aliasWhiteList.forEach(async (txtName) => {
          let contact =
              (await bot.Contact.find({name: txtName})) ||
              (await bot.Contact.find({alias: txtName})) // 获取你要发送的联系人
          
          if (contact) {
            await contact.say(str) // 发送消息
          }
        });
        
        roomWhiteList.forEach(async (txtName) => {
          let room = (await bot.Room.find({topic: txtName}));
          if (room) {
            await room.say(str) // 发送消息
          }
        });
        
        console.log(oldCommodityWhiteList, newCommodity, 66666);
      } catch (e) {
        logMsg = e.message
      }
    }
    
    console.log(logMsg)
    
  })
}
