import {setSchedule} from './schedule/index.js';
import {getMtList} from './data/index.js';
import {aliasWhiteList, botName, roomWhiteList, oldCommodityWhiteList} from '../../config.js'
import {aiCallInit} from '../aiCall/index.js';
// import {wutouApi} from './data/wutou.js';
import {getMall} from '../sendDingTalk/getMall.js';
import {xinping, kucunChange} from './comp.js';
import {SendDingTalkMarkdown, SendDingTalkTest} from '../sendDingTalk/index.js';

export async function initXunFeng() {
  let calledFlag = false;
  let currentStr = '';
  let first = true;
  
  let testLog = []; // 测试用。不东
  
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
    
    // if (Math.ceil(Math.random()) * 10 > 5) {
    //   list.push({"id":1985,"code":"M100198","name":"53%vol 100ml 贵州茅台酒二十四节气之立春","minPrice":569.000000000000000000,"maxPrice":569.000000000000000000,"inventory":0,"listUrl":"https://mall-res.haowu.store/prod/20230317/goods/4faae43e60074086a6ea8f0ccf5eeed1.jpeg","slogan":"","multiSkuStatus":false,"sloganMap":{"1":"请点击背包内“立春·美自天成”数字1:1藏品“行权”按钮进行购买"},"originPrice":569.000000000000000000,"shopDisplayInfo":null})
    //   list[2].inventory = Math.ceil(Math.random() * 10);
    //   list[2].sloganMap = {"1":"请点击背包内“立春·美自天成”数字1:1藏品“行权”按钮进行购买"}
    //   console.log(list[0], Math.ceil(Math.random() * 10))
    //
    // }
    // console.log(list, 333)
    testLog = list;
    
    
    xinping(list);
    kucunChange(list);
    
    // list.forEach((itemCommodity) => {
    //
    //   const orName = itemCommodity.name;
    //   let afterName = itemCommodity.name;
    //
    //   oldCommodityWhiteList.forEach((wkk) => {
    //     afterName = afterName.replace(wkk, '');
    //   });
    //
    //   if (orName === afterName && (itemCommodity.inventory > 5)) {
    //     newCommodity.push(itemCommodity);
    //   }
    //
    //   if (itemCommodity.inventory > 5) {
    //     kucunGengxin.push(itemCommodity);
    //   }
    //
    //
    // });
    //
    // console.log(list.length, newCommodity, kucunGengxin, 66666);
    //
    //
    // if (kucunGengxin.length > 0) {
    //
    //   let str = '### 集市上新品了！！！！！！！！\n ';
    //   kucunGengxin.forEach((item) => {
    //     const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
    //     str += `> 名称：${item.name} \n > 价格：${price} \n > 库存：${item.inventory} \n > 比例：${item.sloganMap[1]} \n-------\n`
    //   })
    //   // SendDingTalkTest(str);
    //
    //   LOG.info(str);
    //
    //   if (
    //       currentStr !== str
    //   ) {
    //     try {
    //       currentStr = str;
    //       //  第一次不通知
    //       if (first) {
    //         first = false;
    //
    //         console.log('第一次不通知');
    //         return;
    //       }
    //       console.log('已发送钉钉消息');
    //       SendDingTalkMarkdown(str);
    //
    //
    //       //  电话通知
    //       // if (
    //       //     (newCommodity.length > 0)
    //       // ) {
    //       //   try {
    //       //
    //       //     if (!calledFlag) {
    //       //
    //       //       calledFlag = true;
    //       //       aiCallInit();
    //       //     }
    //       //
    //       //   } catch (e) {
    //       //     //   e
    //       //   }
    //       // }
    //       //
    //
    //     } catch (e) {
    //       console.log(e);
    //     }
    //
    //   }
    //
    // }
    
  })
  
}

initXunFeng()
