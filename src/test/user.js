import {getAddress, buyFun} from './getList.js'
import {submit} from './mall-h5.js'
import {proxyW, proxyW5Min} from '../sendDingTalk/getProxy.js'

class User {
  constructor({token, sign, gbid, userId, addressId}) {
    this.token = token
    this.sign = sign
    this.gbid = gbid
    this.userId = userId
    this.addressId = addressId
    
    this.getAddress = getAddress
    this.submit = submit
    this.buyFun = buyFun
  }
}

// 套装 [282, 335]
// 立春 [283, 336]
// 雨水 [361, 337]
// 惊蛰 [362, 338]
// 春风 [365, 339]
// 清明 [364, 340]
// 谷雨 [363, 341]
// 拉杠箱 [562, 818]
// 拉杠箱 [562, 827]

async function Suodan() {
  // 周大福
  const currentList = [[310, 379], [364, 340], [363, 341]];
  // const currentList = [[468, 640]];
  const user1 = new User({
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODU4MDY2MDYsInVzZXJJZCI6Mzk2ODc2MjE4OTg5MzYzOTQsImlhdCI6MTY4NDU5NzAwNn0.HTY68ZQp6Ns_OZpJkBt3wL5nIWXJMrvUfRDkcaAv_IHGtMvvAwfbs8y_NP411Wem1cgJ3PQEmej_Ks52KoT3vA',
    sign: '275e2a7c71872206ad687795d61fcbd4952ee55203a9da1c85f19d3b3cd25374',
    gbid: '2820978893443259393',
    userId: '39687621898936394',
    addressId: 303131,
  })
  // 啊树树
  const currentList2 = [
    [310, 379],
    [361, 337],
    [362, 338],
    [365, 339],
    [364, 340],
    [363, 341]
  ];
  // const currentList2 = [[468, 640]];
  const user2 = new User({
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODYyMjQ3NjksInVzZXJJZCI6NDUyOTk4NDU1OTQxMzY1OTQsImlhdCI6MTY4NTAxNTE2OX0.ELFQwu2UHUVDJunsPIXZnG6EGU5wb_t5K2jTr6gNSNsHrrVeAbtNxCWbIS6FL5B5nLecCEZCsxRFjabTEqprDQ',
    sign: 'a3566616578d7f4f984205dce04e001bd074a0e0880a70ec7121b967c90ed190',
    gbid: '2820979191975027665',
    userId: '45299845594136594',
    addressId: 369325,
  })
  // 我的号
  // const testList = [[468, 640], [499, 711], [517, 740]];
  // const user3 = new User({
  //   token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODU4MjM4MTUsInVzZXJJZCI6Mzc2NTkzNTI0NTAxOTU1NDYsImlhdCI6MTY4NDYxNDIxNX0.b0ToD0OZG4Ty5w71DHlfqDYfKJcaVWCZKQtTujhFv-iRJM70PEgalqcCXAcANVcZjm5Ei-GzuhSj6ri-cc02Lw',
  //   sign: 'e575d7827256aed2023d8cbd132b6c955ac858be0dca01c5a028c6c77442f4e1',
  //   gbid: '2818726984711887873',
  //   userId: '37659352450195546',
  //   addressId: 347214
  // })
  // let proxyRes = await proxyW();
  //
  // testList.forEach((item) => {
  //   user3.buyFun(item, proxyRes)
  // })
  
  try {
    let proxyRes = await proxyW5Min();
    currentList.forEach((item) => {
      user1.buyFun(item, proxyRes)
    })
    
    let proxyRes1 = await proxyW5Min();

    currentList2.forEach((item) => {
      user2.buyFun(item, proxyRes1)
    })
  } catch (e) {
  }
}

Suodan();
export default Suodan;
