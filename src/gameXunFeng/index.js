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
  
  // setSchedule('0 */1 * * * ?', async () => {
  setSchedule('0/30 * * * * ?', async () => {
    // if ()
    let newCommodity = [];
    let kucunGengxin = [];
    let list = [];
    try {
      list = await getMall();
    } catch (e) {
      console.log('失败')
    }
    
    if (list && list.length) {
      testLog = list;
  
      xinping(list);
      kucunChange(list);
    }
  })
  
}

initXunFeng()
