import { getAddress, buyFun } from './getList.js'
import { submit } from './mall-h5.js'

class User {
  constructor({ token, sign, gbid, userId }) {
    this.token = token
    this.sign = sign
    this.gbid = gbid
    this.userId = userId
    this.addressId = void 0

    this.getAddress = getAddress
    this.submit = submit
    this.buyFun = buyFun
  }
}

let user1 = new User({
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODU3MTI4ODcsInVzZXJJZCI6MjY2OTAyNDI1ODEwODYyNTMsImlhdCI6MTY4NDUwMzI4N30.Utc5YPkzrkjfpdikHrilhCucApk758bwzR6s0ncsRNp_y6hWsOXOGFXBg-ipSjZYk7brojfsOjrQ6xxGmQ7e8g',
  sign: '3f9db18070e438d7f648deb68a648916fcafd2d411ce83793fb52231f0af5d2e',
  gbid: '2816193124903996609',
  userId: '26690242581086253'
})

user1.buyFun(468)