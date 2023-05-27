
const tabs = document.querySelectorAll('.tab-second__item')

const tab_1 = tabs[0]
const tab_2 = tabs[1]
const tab_3 = tabs[2]

const setUser = () => {
  uni.setStorageSync('token','eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODYxNDY3NzQsInVzZXJJZCI6NDM1Mjg2ODMzMzIzNjI3OSwiaWF0IjoxNjg0OTM3MTc0fQ.jRqSZvSJs9a-ylwTZbZB2Gd_JdF9wueuqQNJpDrGdbdQFcMpitjWtBPHMgOFOYxWPLcFNb8JwK3EUBOwTjqBHA')
  uni.setStorageSync('platform', 'ios');
  uni.setStorageSync('gbid', '2816191933569323441')
  uni.setStorageSync('userid', '4352868333236279')
}

// 创建轮询 callback返回值为true时结束轮询 返回结果为callback执行结果
const createPolling = async (callback) => {
  return new Promise((resolve) => {
    let intervalId = setInterval(() => {
      let res = callback()
      if (res) {
        resolve(res)
        clearInterval(intervalId)
      }
    }, 300)
  })
}

// 根据name获取商品购买按钮  (列表页)
const getGoodBtnByName = (txtName) => {
  return Array.from(document.querySelectorAll('.item')).find((item) => {
    let txt = item.querySelector('.item-tit').innerText
    return txt.includes(txtName)
  })?.querySelector('.btn')
}

// 设置商品最大购买数量
const setGoodMax = () => {
  let input = document.querySelector('.m-selNumRow .uni-input-input')
  let max = document.querySelector('.goodsInventory.goods-buy')?.innerText?.match?.(/\d+/) || 1 // 每人限购1份
  input.value = max
}

const sleep = (time) => {
  return new Promise(resolve => void setTimeout(resolve, time))
}

const exec = async () => {
  setUser() //设置基本信息
  tab_1.click()

  await sleep(1000)

  tab_2.click()
  

  let el = await createPolling(() => getGoodBtnByName('哈尔斯智能直杯套装')) //需要购买的元素的按钮
  el.click()
  
  await sleep(100)

  let buyBtnEl = await createPolling(() => document.querySelector('.btn-new .btn_wrapper')) //获取到购买按钮
  setGoodMax()  // 获取最大限购数量 // 修改最大数量
  buyBtnEl.click() // 跳转到即将提交订单页面

  await sleep(100)

  /*
    ToDo
    设置微信或者支付宝支付方式
  */

  let sumitBtnEl = await createPolling(() => document.querySelector('')) // ToDo 获取提交订单按钮
  sumitBtnEl.click() // 提交订单
}

exec()
