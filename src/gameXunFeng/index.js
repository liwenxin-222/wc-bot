import {setSchedule} from './schedule/index.js';
import {getMtList} from './data/index.js';
import {aliasWhiteList, botName, roomWhiteList, oldCommodityWhiteList} from '../../config.js'
import {aiCallInit} from '../aiCall/index.js';
import {wutouApi} from './data/wutou.js';
import {SendDingTalk, SendDingTalkMarkdown} from '../sendDingTalk/index.js';



export async function initXunFeng(bot) {
  let calledFlag = false;
  let currentStr = '';
  console.log(`定时任务已启动`, `今天电话通知：${calledFlag ? '已通知' : '未通知'}`);
  
  // 每天凌晨更新电话flag
  setSchedule('0 0 0 * * ? *', async () => {
    calledFlag = false;
  });
  
  
  wutouApi(function (list) {
    let newCommodity = [];
    
    list.forEach((itemCommodity) => {
      
      const orName = itemCommodity.name;
      let afterName = itemCommodity.name;
  
      oldCommodityWhiteList.forEach((wkk) => {
        afterName = afterName.replace(wkk, '');
      });
      
      if (orName === afterName && itemCommodity.inventory) {
        newCommodity.push(itemCommodity);
      }
      
    });
    
    console.log(list.length, newCommodity, 66666);
  
    if (newCommodity.length > 0) {
    
      let str = '### 集市上新品了！！！！！！！！\n ';
      newCommodity.forEach((item) => {
        const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
        str += `> 名称：${item.name} \n > 价格：${price} \n > 库存：${item.inventory} \n-------\n`
      })
      
      if (currentStr !== str) {
        try {
          currentStr = str;
          console.log('已发送钉钉消息');
          SendDingTalkMarkdown(str);
        } catch (e) {
          console.log(e);
        }
  
  
        //  电话通知
        try {

          if (!calledFlag) {
            calledFlag = true;
            aiCallInit();
          }

        } catch (e) {
          //   e
        }
  
      }
     
    }
    
  })
  
}
initXunFeng();
