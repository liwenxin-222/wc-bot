import {setSchedule} from './schedule/index.js';
import {getMtList} from './data/index.js';
import {aliasWhiteList, botName, roomWhiteList, oldCommodityWhiteList} from '../../config.js'
import {aiCallInit} from '../aiCall/index.js';

export async function initXunFeng(bot) {
  let calledFlag = false;
  console.log(`定时任务已启动`, `今天电话通知：${calledFlag ? '已通知' : '未通知'}`);
  
  // 每天凌晨更新电话flag
  setSchedule('0 0 0 * * ? *', async () => {
    calledFlag = false;
  });
  
  // let oldCommodityWhiteList = Object.assign([], oldCommodityWhiteList);
  setSchedule('0/5 * * * * ?', async () => {
    
    let logMsg
    
    let newCommodity = [];
    let maidanglaoNewCommodity = [];
    let gongyipanAndxiangfenji = [];
    
    try {
      const listRes = await getMtList();
      
      if (listRes.data.code === 0) {
        const list = listRes.data.data.list;
        
        list.forEach((itemCommodity) => {
          
          let isHas = false;
          
          if (itemCommodity.name.includes('文创套装')) {
            maidanglaoNewCommodity.push(itemCommodity);
          }
          
          if (
              (itemCommodity.name.includes('工艺盘') && itemCommodity.inventory > 0) ||
              (itemCommodity.name.includes('香氛机') && itemCommodity.inventory > 0)
          ) {
            gongyipanAndxiangfenji.push(itemCommodity)
          }
          
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
    console.log(newCommodity, maidanglaoNewCommodity, gongyipanAndxiangfenji, 1111)
    
    if (newCommodity.length > 0) {
      
      //  电话通知
      try {
        
        if (!calledFlag) {
          calledFlag = true;
          aiCallInit();
        }
        
      } catch (e) {
        logMsg = e.message
      }
      
      let str = '上新品了！！！！！！！！ <br>  ';
      newCommodity.forEach((item) => {
        const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
        str += `<br>名称：${item.name} <br>价格：${price} <br>库存：${item.inventory} <br>-------`
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
    
    // 麦当劳在逃鸡翅
    if (maidanglaoNewCommodity.length > 0) {
      let str = '上新品了！！！！！！！！ <br>  ';
      maidanglaoNewCommodity.forEach((item) => {
        const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
        str += `<br>名称：${item.name} <br>价格：${price} <br>库存：${item.inventory} <br>-------`
      })
      
      try {
        
        [
          '麦当劳在逃鸡翅',
          // '文创套装2',
          '文创套装3',
          '文创套装4',
          '文创套装5',
          '文创套装6',
          '文创套装8',
          '文创套装9',
          '文创套装10',
          '文创套装11',
        ].forEach(async (txtName) => {
          let contact =
              (await bot.Contact.find({name: txtName})) ||
              (await bot.Contact.find({alias: txtName})) // 获取你要发送的联系人
          
          if (contact) {
            await contact.say(str) // 发送消息
          }
        });
        console.log(oldCommodityWhiteList, newCommodity, 77777);
      } catch (e) {
        logMsg = e.message
      }
    }
    
    if (gongyipanAndxiangfenji.length > 0) {
      let str = '盘子或者香氛机更新库存！！！！！ <br>  ';
      gongyipanAndxiangfenji.forEach((item) => {
        const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
        str += `<br>名称：${item.name} <br>价格：${price} <br>库存：${item.inventory} <br>-------`
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
        
        console.log(gongyipanAndxiangfenji, newCommodity, 77777);
      } catch (e) {
        logMsg = e.message
      }
    }
    
    
    console.log(logMsg)
    
  })
}
