import {SendDingTalkMarkdown, SendDingTalkUserCantUse} from '../sendDingTalk/index.js'
import pino from 'pino';

let currentItemIds = [];

const LOG = pino({
      // prettyPrint: {
      //   colorize: true,
      //   levelFirst: true,
      //   translateTime: "yyyy-dd-mm, h:MM:ss TT",
      // },
    },
    pino.destination("./pino-logger.log")
);

export function xinping(list) {
  
  const validList = [];
  
  const newItemIds = list.map((item) => {
    return item.id;
  });
  console.log(1123)
  if (currentItemIds.length === 0) {
    currentItemIds = newItemIds;
    console.log('新品通知，第一次，不提醒')
    return;
  }
  
  console.log(currentItemIds, newItemIds, 112)
  
  if (currentItemIds.length === newItemIds.length) {
    console.log('新品通知，前后两次一样，不提醒')
    return;
  }
  
  if (newItemIds.length > currentItemIds.length) {
  
    newItemIds.forEach((item) => {
      if (!currentItemIds.includes(item)) {
        validList.push(
            list.find((listItem) => {
              return listItem.id === item;
            })
        );
      }
    });
  
    if (validList.length > 0) {
      let str = '### 集市上新品\n ';
      validList.forEach((item) => {
        const sloganIndex = item.sloganMap[1] && item.sloganMap[1].match(/[0-9]:[0-9]+/);
        // const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
        str += ` - 名称：${item.name} \n - 价格：${item.minPrice} \n - 库存：<font color="red">${item.inventory || (item.hasInv ? '可购买' : '无')}</font>   \n - 比例：<font color="blue">${sloganIndex[0]}</font> \n-------\n`
      })
      console.log(str);
      LOG.info(str);
      SendDingTalkMarkdown(str);
      // SendDingTalkTest(str)
    }
  
  } else if (newItemIds.length < currentItemIds.length) {
    currentItemIds.forEach((item) => {
      if (!newItemIds.includes(item)) {
        validList.push(
            list.find((listItem) => {
              return listItem.id === item;
            })
        );
      }
    });
    let str = '### 集市下架了新上的商品 ';
    validList.forEach((item) => {
      const sloganIndex = item.sloganMap[1] && item.sloganMap[1].match(/[0-9]:[0-9]+/);
      // const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
      str += ` - 名称：${item.name} \n - 价格：${item.minPrice} \n - 库存：<font color="red">${item.inventory || (item.hasInv ? '可购买' : '无')}</font>   \n - 比例：<font color="blue">${sloganIndex[0]}</font> \n-------\n`
    })
    console.log(str);
    LOG.info(str);
  
    SendDingTalkMarkdown(str);
    // SendDingTalkTest(str)
  }
  
  currentItemIds = newItemIds;
  
}


let currentSourceMap = null;
export function kucunChange (list, name) {
  const validList = [];
  let userHasInv = false;
  const userHasMap = {};
  
  for (let i=0;i<list.length;i++) {
    if (list[i].hasInv) {
      userHasInv = true;
      userHasMap[list[i].id] = list[i].hasInv
      break;
    }
  }
  console.log(userHasMap, name)
  if (!userHasInv) {
    console.log(list.map((item) => ([item.name, item.hasInv])))
    SendDingTalkUserCantUse(`${name} 失效了。请检查！`)
    return;
  }
  
  const newSourceMap = {};
  list.filter((item) => {
    const text = (item && item.sloganMap && item.sloganMap[1]) || '';
    return (/1[:：][0-9]/.test(text)) || [310].includes(item.id);
  }).forEach((item) => {
    newSourceMap[item.id] = item.inventory || item.hasInv;
  });

  // console.log(newSourceMap)
  
  if (!currentSourceMap) {
    console.log('库存通知，第一次，不提醒')
    currentSourceMap = Object.assign({}, newSourceMap);
    return;
  }
  if (JSON.stringify(currentSourceMap) === JSON.stringify(newSourceMap)) {
    console.log('库存通知，前后两次一样，不提醒')
    return;
  }
  Object.keys(newSourceMap).forEach((key) => {
    if (newSourceMap[key] && !currentSourceMap[key]) {
      const h = list.find((its) => {
        return (its.id == key);
      })
      h && validList.push(h);
    }
  })
  if (validList.length > 0) {
    let str = '### 集市库存更新 \n ';
    
    const isAtAll = validList.find((oneAdnOneItem) => {
      return (oneAdnOneItem.sloganMap[1] && oneAdnOneItem.sloganMap[1].includes('1:')) || (oneAdnOneItem.sloganMap[1] && oneAdnOneItem.sloganMap[1].includes('1：'));
    })
    validList.forEach((item) => {
      const sloganIndex = item.sloganMap[1] && item.sloganMap[1].match(/[0-9][:：][0-9]+/);
      // const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
      str += `${isAtAll ? '# 重点关注且圈全员\n' : '\n'} - 名称：${item.name} \n - 价格：${item.minPrice} \n - 库存：<font color="red">${item.inventory || (item.hasInv ? '可购买' : '无')}</font>   \n - 比例：<font color="blue">${sloganIndex[0]}</font> \n-------\n`
    })
    console.log(str);
    LOG.info(str);
    SendDingTalkMarkdown(str, {isAtAll: !!isAtAll});
    //
    // validList.forEach(async (item) => {
    //   const user1 = new User({
    //     token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODU3MjQ4MzMsInVzZXJJZCI6MjY2OTAyNDI1ODEwODYyNTMsImlhdCI6MTY4NDUxNTIzM30.KYuCnFfiSwL_54IwCRkxVd-WFOnmwq-zJWl43oDnalrvEQ7acZfp0SK_AGxGL6Xxa1JfVnXAziC5a1xwvCOciA',
    //     sign: '5fe07f3b7cb4e81898ebfcccbd279e7e2e1f8f2651e0177d83a40007f79abf13',
    //     gbid: '2816193124903996609',
    //     userId: '26690242581086253'
    //   })
    //   await user1.buyFun(item.id);
    // })
    // SendDingTalkTest(str, {isAtAll: !!isAtAll});
  }
  currentSourceMap = Object.assign({}, newSourceMap);
  
}
