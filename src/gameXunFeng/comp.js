import {SendDingTalkMarkdown, SendDingTalkTest} from '../sendDingTalk/index.js'
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
  
  if (currentItemIds.join() === newItemIds.join()) {
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
        const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
        str += `> 名称：${item.name} \n > 价格：${price} \n > 库存：${item.inventory} \n > 比例：${item.sloganMap[1]} \n-------\n`
      })
      console.log(str);
      LOG.info(str);
      SendDingTalkMarkdown(str);
    }
  
  } else {
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
    // validList.forEach((item) => {
    //   const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
    //   str += `> 名称：${item.name} \n > 价格：${price} \n > 比例：${item.sloganMap[1]} \n-------\n`
    // })
    // console.log(str);
  
    SendDingTalkMarkdown(str);
  }
  
  currentItemIds = newItemIds;
  
}


let currentSourceMap = null;
export function kucunChange (list) {
  const validList = [];
  
  const newSourceMap = {};
  list.forEach((item) => {
    newSourceMap[item.id] = item.inventory;
  });
  
  if (!currentSourceMap) {
    console.log('库存通知，第一次，不提醒')
    currentSourceMap = Object.assign({}, newSourceMap);
    return;
  }
  console.log(currentSourceMap, newSourceMap)
  if (JSON.stringify(currentSourceMap) === JSON.stringify(newSourceMap)) {
    console.log('库存通知，前后两次一样，不提醒')
    return;
  }
  Object.keys(newSourceMap).forEach((key) => {
    if (currentSourceMap[key] !== newSourceMap[key]) {
      const h = list.find((its) => {
        return (its.id == key && its.inventory > 3);
      })
      h && validList.push(h);
    }
  })
  if (validList.length > 0) {
    let str = '### 集市库存更新 \n ';
    validList.forEach((item) => {
      const price = item.minPrice === item.maxPrice ? item.maxPrice : `${item.minPrice}~${item.maxPrice}`;
      str += `> 名称：${item.name} \n > 价格：${price} \n > 库存：${item.inventory} \n > 比例：${item.sloganMap[1]} \n-------\n`
    })
    console.log(str);
    LOG.info(str);
    SendDingTalkMarkdown(str);
  }
  currentSourceMap = Object.assign({}, newSourceMap);
  
}
