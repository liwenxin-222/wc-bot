import {getAddress, buyFun} from './getList.js'
import {submit} from './mall-h5.js'
import {proxyW, proxyW5Min} from '../sendDingTalk/getProxy.js'

class User {
  constructor({token, sign, gbid, userId, addressId, name}) {
    this.token = token
    this.sign = sign
    this.gbid = gbid
    this.userId = userId
    this.addressId = addressId
    this.name = name;
    
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
  const currentList0 = [
    // [468, 640],
    
    // [310, 379],
    [282, 335],
    [283, 336],
    [361, 337],
    // [362, 338],
    // [365, 339],
    // [364, 340],
    // [363, 341],
  ];
  // const currentList = [[468, 640]];
  const user0 = new User({
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODY4NzYzMzEsInVzZXJJZCI6NDgwNzY2Njg2NDQxNjM2MjUsImlhdCI6MTY4NTY2NjczMX0._zwIDC07Gi9EZnU7PYnArd0p5M80eRwywFuHubJrM5iTInsCyQjOQI97TFCpxlDJws5Wg_jnR-54kvYlY5ieFw',
    sign: 'edade609d9faff707f43899189d7d8565db4a859caefc2fcb805c9bd6b2d0823',
    gbid: '2820979340079592897',
    userId: '48076668644163625',
    addressId: 420221,
    name: '表妹'
  });
  
  let proxyRes0 = await proxyW5Min();

  currentList0.forEach((item) => {
    user0.buyFun(item, proxyRes0)
  })
  
  // 啊树树大号
  // const ashushudahaoList = [
  //   [468, 640],
  //   // [282, 335],
  //   // [283, 336]
  // ];
  // const ashushudahao = new User({
  //   token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODY4Nzk2MzgsInVzZXJJZCI6NTgwMTE0MDIyNzM5OTY4LCJpYXQiOjE2ODU2NzAwMzh9.8YifRtyIxqpBSbTJ5jIs1B7AtUx0UQT265DWrGSt5G-MPwUaco42c3LFVd_Aen7s13aSDhIf0qaNrZ2T8MDHqQ',
  //   sign: '42cdbaa08d1e64c66e1bea9a3cbbede04a48cd9a51f7d2c61436e0c76a5b7e69',
  //   gbid: '2820695332475423904',
  //   userId: '580114022739968',
  //   addressId: 56048
  // })
  // let ashushudahaoProxy = await proxyW();
  //
  // ashushudahaoList.forEach((item) => {
  //   ashushudahao.buyFun(item, ashushudahaoProxy)
  // })
  
   // 我的号
  const testList = [
    // [282, 335],
    [283, 336],
    [361, 337],
    // [362, 338],
    [365, 339],
    // [364, 340],
    [363, 341],
  ];
  const user3 = new User({
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODU4MzkzMDUsInVzZXJJZCI6MjE4MTA2MTQ4NTQ5OTE4OTQsImlhdCI6MTY4NDYyOTcwNX0.LriRFdXewpqvVPAKel5GxkITB4J6Abp-E8MMJO_XVkGmRtJGm_BxaCHGgBntscgwPKAhmT_FQS0uI1XQ0PhPGQ',
    sign: '99208def958f3ae6e6f0b6948d830d75d9972604b938f870ec3acdf2c36567ef',
    gbid: '2818726139477759057',
    userId: '21810614854991894',
    addressId: 153689,
    name: '我'
  })
  let proxyRes = await proxyW();

  testList.forEach((item) => {
    user3.buyFun(item, proxyRes)
  })


}


async function ceshi() {
  const testList = [
    [468, 640],
  ];
  // const currentList = [[468, 640]];
  const testUser = new User({
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODU4MDU2MDksInVzZXJJZCI6MjY2OTAyNDI1ODEwODYyNTMsImlhdCI6MTY4NDU5NjAwOX0.SFbafaqTKJaXan8p8LVJFZ4BvyU4nD_5SOqS4hDsXuLTw8dPhG-hffeMVTV1g2Qhnv0r3PqIzV2vYg0sEP-Lvw',
    sign: '3f9db18070e438d7f648deb68a648916fcafd2d411ce83793fb52231f0af5d2e',
    gbid: '2816193124903996609',
    userId: '26690242581086253',
    addressId: 168505,
    name: '测试账号'
  });
  
  let proxyRes0 = await proxyW5Min();
  
  testList.forEach((item) => {
    testUser.buyFun(item, proxyRes0)
  })
  
}
ceshi();
// Suodan();
export default Suodan;
