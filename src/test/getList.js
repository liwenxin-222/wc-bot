import axios from 'axios'
import {proxyW} from '../sendDingTalk/getProxy.js'
import HttpsProxyAgent from 'https-proxy-agent';
import { submit } from './mall-h5.js'
import { token } from './env.js'

// submit({ spuId: item.id, skuId, token, qty: count, addressId })
export const getAddress = async function() {
  if (this.addressId) return this.addressId
  const response = await axios({
    url: 'https:/mall-api.xwindlab.com/user/address/list',
    method: 'GET',
    headers: {
      Authorization: this.token
    },
  })
  let [{ id }] = response.data.data.list
  this.addressId = id
}

export const buyFun = async function([spuId, skuId], proxyRes) {

  try {
    // const detailRes = await axios({
    //   url: 'https://mall-api.xwindlab.com/goods/queryGoodsDetail',
    //   method: 'POST',
    //   httpAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
    //   httpsAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
    //   data: { spuId },
    // })
    
    // await this.getAddress()
    //
    // console.log(this.addressId, 22)
  
    // let { skuList: [{ skuId }] = [{}] } = detailRes.data.data || {} //商品类别_id
  
    // let count = detailRes?.data?.data?.skuActivityInfoVO?.limitPerUser || 1 //购买数量
    // console.log(777777, { spuId, skuId, token: this.token, qty: 1, addressId: this.addressId, proxyRes});
    this.submit({ spuId, skuId, token: this.token, qty: 1, addressId: this.addressId, proxyRes, name: this.name})
  } catch (e) {
    console.log(e);
    // await buyFun(spuId);
  }
 
}

// buyFun()

// export async function queryGoodsListByDisplayResource() {
//   let addressId = await geyAddress()
//
//   let [ proxyIp, proxyPort ] = await proxyW();
//
//   console.log('代理---> ', proxyIp, proxyPort);
//   const detailOtherList = [];
//
//   const response1 = await axios({
//     url: 'https://mall-api.xwindlab.com/goods/queryGoodsListByDisplayResource',
//     method: 'POST',
//     // headers: ctx.request.headers,
//     httpAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
//     httpsAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
//     data: {
//       orderBy: 'SORT_DESC',
//       page: 1,
//       resourceId: 6,
//       size: 30,
//     },
//   }).catch(() => ({ data: { data: { list } } }))
//   // console.log(response1, 444);
//
//   const response2 = await axios({
//     url: 'https://mall-api.xwindlab.com/goods/queryGoodsListByDisplayResource',
//     method: 'POST',
//     // headers: ctx.request.headers,
//     httpAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
//     // httpsAgent: new HttpsProxyAgent(`http://${username}:${password}@${proxyIp}:${proxyPort}`),
//     httpsAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
//     data: {
//       orderBy: 'SORT_DESC',
//       page: 1,
//       resourceId: 7,
//       size: 30,
//     },
//   }).catch(() => ({ data: { data: { list } } }))
//
//
//   // console.log(detailOtherList);
//
//   // console.log(response2, 666666);
//   const response3 = await axios({
//     url: 'https://mall-api.xwindlab.com/goods/queryGoodsListByDisplayResource',
//     method: 'POST',
//     // headers: ctx.request.headers,
//     httpAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
//     httpsAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
//     data: {
//       orderBy: 'SORT_DESC',
//       page: 1,
//       resourceId: 5,
//       size: 30,
//     }
//   }).catch(() => ({ data: { data: { list } } }))
//
//   const list = [
//     ...response1.data.data.list,
//     ...response2.data.data.list,
//     ...response3.data.data.list,
//   ].filter(item => {
//     return /1.[0-9]/.test(item.sloganMap[1]);
//   });
//
//   for (let i = 0; i < list.length; i++) {
//     const item = list[i];
//
//     // let proxyIp,
//     //   proxyPort;
//     if (i % 8 === 0) {
//       [ proxyIp, proxyPort ] = await proxyW();
//       console.log(proxyIp, proxyPort, 89898989);
//       // proxyIp = re[0];
//       // proxyPort = re[1];
//     }
//
//     const detailRes = await axios({
//       url: 'https://mall-api.xwindlab.com/goods/queryGoodsDetail',
//       method: 'POST',
//       httpAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
//       httpsAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
//       data: {
//         spuId: item.id,
//       },
//     });
//
//     let { skuList: [{ skuId }] = [{}], inventory } = detailRes.data.data || {} //商品类别_id
//     if (!inventory) continue
//     let count = Math.min(inventory, detailRes?.data?.data?.skuActivityInfoVO?.limitPerUser || 1) //购买数量
//
//     submit({ spuId: item.id, skuId, token, qty: count, addressId })
//
//     if (item.multiSkuStatus) {
//
//       for (let k = 0; k < detailRes.data.data.skuList.length; k++) {
//
//         const subItem = detailRes.data.data.skuList[k];
//         // console.log(subItem);
//
//         const subDetail = await axios({
//           url: 'https://mall-api.xwindlab.com/goods/queryGoodsDetail',
//           httpAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
//           httpsAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
//           method: 'POST',
//           data: {
//             spuId: item.id,
//             skuId: subItem.skuId,
//           },
//         });
//
//
//         detailOtherList.push(subDetail.data.data);
//       }
//
//     } else {
//       console.log(detailRes.data.data, 222)
//       detailOtherList.push(detailRes.data.data);
//     }
//   }
// }

// queryGoodsListByDisplayResource()
