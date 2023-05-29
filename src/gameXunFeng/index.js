import {setSchedule} from './schedule/index.js';
import {getMall} from '../sendDingTalk/getMall.js';
import {xinping, kucunChange} from './comp.js';
import {SendDingTalkTest} from '../sendDingTalk/index.js';

const TokenMapList = [
  //
  {
    Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODYzODM0MzAsInVzZXJJZCI6NTM1NzA2MDkwMDI5NDI1MTYsImlhdCI6MTY4NTE3MzgzMH0.XaVCPqYIr2S66VG4u2gIOsVJx7StK1N6g8oom8vOwpMSHiTtOBov3ogvUobzZGLY6GhoBXy45ssHFxe_5Oi6YA',
    name: '老田给我手机的'
  },
  {
    Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODYzODMxMDMsInVzZXJJZCI6NTM1NzU2MjIwNTYwNDY1OTgsImlhdCI6MTY4NTE3MzUwM30.WqueMZvE3s2ePeuqMV4t1qG-kMVMrYq53tn1_Og4jNy2wnu_YXq0YPyYaRbI0XKTbSetoIuVSgtWO2yrJfCGpg',
    name: '老田自己ipad'
  },
  {
    Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODU0MjUxNDQsInVzZXJJZCI6Mzc2NTkzNTI0NTAxOTU1NDYsImlhdCI6MTY4NDIxNTU0NH0.7o-kKjXb9s334V3YRn3bVv7hzhUJviomMeKTZ7MvgCveS5saOUzBY6Mc-TSBjKKMeks8qhT0r0FMBPDMEIXwHQ',
    name: '我电脑'
  },
  //
  {
    Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODU4Mzk5OTgsInVzZXJJZCI6MjE3NzU5NTEyODEyMzgwODgsImlhdCI6MTY4NDYzMDM5OH0.UTNIJwpLehcibpKWDWhk9t3ykllq1D2d_bPVai8h7pCHYqRqOpvIOrufI_fTJN2i_c1Y6r-aPCPPKaSA3F0rkQ',
    name: '我手机'
  },
  //   郭达
  {
    Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODU4MjM4MTUsInVzZXJJZCI6Mzc2NTkzNTI0NTAxOTU1NDYsImlhdCI6MTY4NDYxNDIxNX0.b0ToD0OZG4Ty5w71DHlfqDYfKJcaVWCZKQtTujhFv-iRJM70PEgalqcCXAcANVcZjm5Ei-GzuhSj6ri-cc02Lw',
    name: '海洋'
  },
]

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
  
  let testLog = []; // 测试用。不东
  let index = 0;
  
  setSchedule('0 0 * * * ?', async () => {
    meDing(testLog);
  });
  
  // setSchedule('0 */1 * * * ?', async () => {
  setSchedule('0 */4 * * * ?',() => {
    
    if (index >= (TokenMapList.length - 1)) {
      index = 0;
    } else {
      index = index + 1;
    }
    console.log(index)
  });
  
  function getT() {
    return TokenMapList[index];
  }
  
  // setSchedule('0 */1 * * * ?', async () => {
  setSchedule('0/20 * * * * ?', async () => {
    const ttt = getT()
    console.log(ttt);
    let list = [];
    try {
      list = await getMall(ttt.Authorization);
    } catch (e) {
      console.log('失败')
    }
    
    if (list && list.length) {
      testLog = list;
      
      xinping(list);
      kucunChange(list, ttt.name);
    }
  })
  
}

initXunFeng()
