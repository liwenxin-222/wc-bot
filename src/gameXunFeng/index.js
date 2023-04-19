import {setSchedule} from './schedule/index.js';
import {getMtList} from './data/index.js';
import {aliasWhiteList, botName, roomWhiteList, oldCommodityWhiteList} from '../../config.js'
import {aiCallInit} from '../aiCall/index.js';
// import {wutouApi} from './data/wutou.js';
import {getMall} from '../sendDingTalk/getMall.js';
import {SendDingTalkMarkdown, SendDingTalkTest} from '../sendDingTalk/index.js';
import pino from 'pino';

const LOG = pino({
      // prettyPrint: {
      //   colorize: true,
      //   levelFirst: true,
      //   translateTime: "yyyy-dd-mm, h:MM:ss TT",
      // },
    },
    pino.destination("./pino-logger.log")
);

export async function initXunFeng() {
  let calledFlag = false;
  let currentStr = '';
  let first = true;
  
  let testLog = [];
  
  console.log(`定时任务已启动`, `今天电话通知：${calledFlag ? '已通知' : '未通知'}`);
  
  // 每天凌晨更新电话flag
  setSchedule('0 0 0 * * ? *', async () => {
    calledFlag = false;
  });
  
  setSchedule('0 0 * * * ?', async () => {
    let str = '### 集市当前货品追踪！！！！！！！！\n ';
    testLog.forEach((item) => {
      const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
      str += `> 名称：${item.name} \n > 价格：${price} \n > 库存：${item.inventory} \n-------\n`
    })
    SendDingTalkTest(str);
  });
  
  setSchedule('0 */1 * * * ?', async () => {
    let newCommodity = [];
    let kucunGengxin = [];
    const list = await getMall();
    console.log(list, 88888)
    testLog = list;
    
    list.forEach((itemCommodity) => {
      
      const orName = itemCommodity.name;
      let afterName = itemCommodity.name;
      
      oldCommodityWhiteList.forEach((wkk) => {
        afterName = afterName.replace(wkk, '');
      });
      
      if (orName === afterName && (itemCommodity.inventory > 5)) {
        newCommodity.push(itemCommodity);
      }
      
      if (itemCommodity.inventory > 5) {
        kucunGengxin.push(itemCommodity);
      }
      
      
    });
    
    console.log(list.length, newCommodity, kucunGengxin, 66666);
    
    
    if (kucunGengxin.length > 0) {
      
      let str = '### 集市上新品了！！！！！！！！\n ';
      kucunGengxin.forEach((item) => {
        const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
        str += `> 名称：${item.name} \n > 价格：${price} \n > 库存：${item.inventory} \n > 比例：${item.sloganMap[1]} \n-------\n`
      })
      // SendDingTalkTest(str);
  
      LOG.info(str);
      
      if (
          currentStr !== str
      ) {
        try {
          currentStr = str;
          //  第一次不通知
          if (first) {
            first = false;
            
            console.log('第一次不通知');
            return;
          }
          console.log('已发送钉钉消息');
          SendDingTalkMarkdown(str);
          
          
          //  电话通知
          // if (
          //     (newCommodity.length > 0)
          // ) {
          //   try {
          //
          //     if (!calledFlag) {
          //
          //       calledFlag = true;
          //       aiCallInit();
          //     }
          //
          //   } catch (e) {
          //     //   e
          //   }
          // }
          //
          
        } catch (e) {
          console.log(e);
        }
        
      }
      
    }
    
  })
  
}

initXunFeng()
