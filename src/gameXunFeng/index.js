import {setSchedule} from './schedule/index.js';
import {getMtList} from './data/index.js';
import {aliasWhiteList, botName, roomWhiteList, oldCommodityWhiteList} from '../../config.js'
import {aiCallInit} from '../aiCall/index.js';
// import {wutouApi} from './data/wutou.js';
import {getMall} from '../sendDingTalk/getMall.js';
import {xinping, kucunChange} from './comp.js';
import {SendDingTalkMarkdown, SendDingTalkTest} from '../sendDingTalk/index.js';
function meDing(testLog) {
  let str = '### 集市当前货品追踪！！！！！！！！\n ';
  testLog.forEach((item) => {
    const sloganIndex = item.sloganMap[1].match(/[0-9]:[0-9]+/);
    // const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
    str += ` - 名称：${item.name} \n - 价格：${item.minPrice} \n - 库存：<font color="red">${item.inventory || (item.hasInv ? '可购买' : '无')}</font>   \n - 比例：<font color="blue">${sloganIndex && sloganIndex[0]}</font> \n-------\n`
  })
  SendDingTalkTest(str);
}
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
    meDing(testLog);
  });
  
  setSchedule('0 */1 * * * ?', async () => {
    let newCommodity = [];
    let kucunGengxin = [];
    const list = await getMall();
    // const n = Math.ceil(Math.random() * 10);
    // console.log(n, '随机数')
    // if (n > 5) {
    //   list.push({"id":390,"name":"月亮时光马克杯系列（内含6种规格）","minPrice":238.000000000000000000,"listUrl":"https://mall-res.haowu.store/prod/20230410/goods/bdbf9a66c84f4dc59c077ca9338f3a24.jpeg","multiSkuStatus":true,"sloganMap":{"1":"确认收货后按照实付金额2:1返元贝"},"originPrice":298.000000000000000000,"shopDisplayInfo":null,"hasInv":false,"inventory": 10})
    //   // list[2].inventory = Math.ceil(Math.random() * 10);
    //   // list[2].sloganMap = {"1":"请点击背包内“立春·美自天成”数字1:1藏品“行权”按钮进行购买"}
    //   // console.log(list[0], Math.ceil(Math.random() * 10))
    //
    // } else {
    //   list.push({"id":390,"name":"月亮时光马克杯系列（内含6种规格）","minPrice":238.000000000000000000,"listUrl":"https://mall-res.haowu.store/prod/20230410/goods/bdbf9a66c84f4dc59c077ca9338f3a24.jpeg","multiSkuStatus":true,"sloganMap":{"1":"确认收货后按照实付金额2:1返元贝"},"originPrice":298.000000000000000000,"shopDisplayInfo":null,"hasInv":false,"inventory": 0})
    //
    // }
    // console.log(list, 333)
    testLog = list;
  
    meDing(testLog);
    
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
