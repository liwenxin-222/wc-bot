import axios from 'axios';
import cheerio from 'cheerio';
import HttpsProxyAgent from 'https-proxy-agent';
import {proxyW} from '../sendDingTalk/getProxy.js';

// import { token, sign, gbid, userId } from './env.js'

async function get_data_bdms_faccdee21b68() {
  const headers = {
//    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
//    'Cache-Control': 'no-cache',
//    'Connection': 'keep-alive',
//    'Pragma': 'no-cache',
//    'Sec-Fetch-Dest': 'document',
//    'Sec-Fetch-Mode': 'navigate',
//    'Sec-Fetch-Site': 'same-origin',
//    'Sec-Fetch-User': '?1',
//    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
//    'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
//    'sec-ch-ua-mobile': '?0',
//    'sec-ch-ua-platform': '"Windows"',
  }
  
  const response = await axios.get('https://mall-h5.xwindlab.com/', headers);
  // console.log(response.data)
  const $ = cheerio.load(response.data);
  const data_bdms_faccdee21b68 = $('script[data-bdms-faccdee21b68]').attr('data-bdms-faccdee21b68');
  console.log(data_bdms_faccdee21b68, 111);
  return data_bdms_faccdee21b68
}

function get_coded_v20(x) {
  let d = 0;
  let c = '';
  var n;
  while (d < x.length) {
    const _ = (x[d]).charCodeAt();
    const e = d % 32;
    
    if (_ <= 122 && _ >= 44) {
      
      if (_ + e > 122) {
        n = String.fromCharCode(40 + _ - 122 + e);
      } else {
        n = String.fromCharCode(_ + e);
      }
    } else {
      n = String.fromCharCode((x[d]).charCodeAt());
      
    }
    c += n;
    d += 1;
  }
  // console.log('get_coded_v20', c);
  return "CODED--v20" + c;
}

async function get_x_xf_accept(coded_v20, [proxyIp, proxyPort]) {
  const cookies = {
// # 'BAIDUID_BFESS': 'A2FF4A80869FFABDD818270868A78818:FG=1',
// # 'ZFY': 'GLNdf6FCQoG84p0SASf:A1FNy1VvkTpiXrp2dDzPeI:Bo:C',
// # 'ab_sr': '1.0.1_ODJiZDlhMDIwYmVmMGNiNjk3ZGE1NGFjODNlYTA5Y2M5MzQxM2EyMWU0ZmRjN2Q0MzlhYzVlMTcyYTM3YzI4NGU1OTc3YWYxMGNmNzBhMDUwZDIyYzZkZTI5MjFlMmI3MGZiNDg2NzdlZWVhZTFmMzJlNGNjODc2MjAyMGUwY2E4OWNmNWNlMTI0NDBmMGNhYmQxOWIxOTZiNTM5NDE3Zg==',
  }
  
  const headers = {
//    'authority': 'sofire.baidu.com',
//    'accept': '*/*',
//    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
//    'cache-control': 'no-cache',
//    'content-type': 'text/plain',
// # Requests sorts cookies= alphabetically
// # 'cookie': 'BAIDUID_BFESS=A2FF4A80869FFABDD818270868A78818:FG=1; ZFY=GLNdf6FCQoG84p0SASf:A1FNy1VvkTpiXrp2dDzPeI:Bo:C; ab_sr=1.0.1_ODJiZDlhMDIwYmVmMGNiNjk3ZGE1NGFjODNlYTA5Y2M5MzQxM2EyMWU0ZmRjN2Q0MzlhYzVlMTcyYTM3YzI4NGU1OTc3YWYxMGNmNzBhMDUwZDIyYzZkZTI5MjFlMmI3MGZiNDg2NzdlZWVhZTFmMzJlNGNjODc2MjAyMGUwY2E4OWNmNWNlMTI0NDBmMGNhYmQxOWIxOTZiNTM5NDE3Zg==',
//    'origin': 'https://mall-h5.xwindlab.com',
//    'pragma': 'no-cache',
//    'referer': 'https://mall-h5.xwindlab.com/',
//    'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
//    'sec-ch-ua-mobile': '?0',
//    'sec-ch-ua-platform': '"Windows"',
//    'sec-fetch-dest': 'empty',
//    'sec-fetch-mode': 'cors',
//    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
  }
  
  const data = coded_v20;
  
  const response = await axios({
    url: 'https://sofire.baidu.com/abot/api/v1/tpl/commit',
    method: 'POST',
    // httpAgent: new HttpsProxyAgent(`http://${username}:${password}@${proxyIp}:${proxyPort}`),
    httpAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
    // httpsAgent: new HttpsProxyAgent(`http://${username}:${password}@${proxyIp}:${proxyPort}`),
    httpsAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
    headers: {
      ...headers,
      ...cookies,
    },
    data: data,
  });
  
  return response.data.data.t + ';;;;' + 'ios';
}


async function getDetail(x_xf_accept, [proxyIp, proxyPort], params, token) {
  const headers = {
    'authority': 'mall-api.xwindlab.com',
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'authorization': token,
    'cache-control': 'no-cache',
    'content-type': 'application/json;',
    'origin': 'https://mall-h5.xwindlab.com',
    'pragma': 'no-cache',
    'referer': 'https://mall-h5.xwindlab.com/',
    'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
    // # 'x-xf-accept': 'zvlUT7E64m9Wg/SuIA4L+Qca41SK9O0pZuA3TndmIPP/9Siq4OQN5QFmPXt63s5vpBLLvoX7hOJWZDwDMpJB1anPBdlPuyXKXptmNzRfZwz4dP8u4J6NkM7MiXP41k3BKCgn7Y1qwC8rUwZWheL7P38WrjJDPE//3+rl1EJCJ4iOKAy90a5PRUqqc3BX6INet0wLRsB8jtzrBCTeykpQLdtSJNi5PxpEQf5oObDetsczw5raNDC03TToMC38db+0HixPO8RyerWB9Q9n3P7kX7pbiV/97zUoCyiUFqyZVzY9b2/iUMRQqnqb/Fb3dV0KXSSuFT/FBlyX3Sf1Tx0+fSbIkc8jTeII/Ftw+B+vfkC1U1OxLzFjvGYv8Z0/Nvsl3mtj09vQg8s8XngWCLtJroaY1XD4aPHmt1/RpJYkoqJtVM75wSGmS3UMCky9mMWOG9GMETpDe5op+MyeE2lObw==|uevtUHVbAlr9y513qUY06ddlY3QUMtMDmwLNfM5MBgQ=|10|eb582c0b654a91b72c85f19234c24fa5',
    'x-xf-accept': x_xf_accept
  }
  const response = await axios({
    url: 'https://mall-api.xwindlab.com/goods/queryGoodsDetail',
    method: 'POST',
    headers,
    data: params,
    timeout: 10000,
    // httpAgent: new HttpsProxyAgent(`http://${username}:${password}@${proxyIp}:${proxyPort}`),
    httpAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
    // httpsAgent: new HttpsProxyAgent(`http://${username}:${password}@${proxyIp}:${proxyPort}`),
    httpsAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
    // data: params
  })
  
  // console.log(response.data.data.list, 4444);
  
  return response.data.data;
}

export async function submit({spuId, skuId, token, qty = 1, addressId, proxyRes}) {
  const data_bdms_faccdee21b68 = await get_data_bdms_faccdee21b68();
  const coded_v20 = get_coded_v20(data_bdms_faccdee21b68);
  
  // const proxyRes = await proxyW();
  const [proxyIp, proxyPort] = proxyRes;
  
  // const x_xf_accept2 = await get_x_xf_accept(coded_v20, proxyRes);
  // const detail392 = await getDetail(x_xf_accept2, proxyRes, {
  //   skuId,
  //   spuId
  // }, token)
  
  // console.log(detail392)
  try {
    const batchUpload0 = await axios({
      url: 'https://mall-api.xwindlab.com/log/info/batchUpload',
      method: 'POST',
      headers: {
        authority: 'mall-api.xwindlab.com',
        // accept: '*/*',
        // 'accept-language': 'zh-CN,zh-Hans;q=0.9',
        // 'accept-encoding': 'gzip, deflate, br',
        // 'content-length': 72,
        // 'content-type': 'application/json;',
        origin: 'https://mall-h5.xwindlab.com',
        referer: 'https://mall-h5.xwindlab.com/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
        authorization: this.token,
        // 'x-xf-accept': x_xf_accept,
      },
      httpAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
      httpsAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
      data: {
        biz: "mall",
        bodyList: [
          JSON.stringify({
            spuId,
            skuId,
            qty,
            addressData: {
              address: "",
              cityCode: "",
              cityName: "",
              districtCode: "",
              districtName: "",
              id: "",
              isDefault: 1,
              phone: "",
              provinceCode: "",
              provinceName: "",
              username: "",
            },
          })
        ],
        event:"click",
        extra1:"buy_btn",
        page:"goods_details",
      },
    }).catch(error => ({}))
  } catch (e) {}
  
  const x_xf_accept = await get_x_xf_accept(coded_v20, proxyRes);
  console.log('下单参数-->', "goodsCode " + `${spuId}-${skuId}-${addressId}`)
  
  const checkoutRes = await axios({
    url: 'https://mall-api.xwindlab.com/order/checkout',
    method: 'POST',
    headers: {
      authority: 'mall-api.xwindlab.com',
      // accept: '*/*',
      // 'accept-language': 'zh-CN,zh-Hans;q=0.9',
      // 'accept-encoding': 'gzip, deflate, br',
      // 'content-length': 72,
      // 'content-type': 'application/json;',
      origin: 'https://mall-h5.xwindlab.com',
      referer: 'https://mall-h5.xwindlab.com/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
      authorization: token,
      'x-xf-accept': x_xf_accept,
    },
    httpAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
    httpsAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
    data: {
      qty,
      skuId,
      spuId,
      "cardId": "",
      "goodsCode": `${spuId}${skuId}`
    },
  }).catch(error => ({}))
  
  // console.log(checkoutRes.data, 'checkoutRes');
  
  if (!checkoutRes?.data?.data?.rid) {
    console.log('没有rid');
    console.log(checkoutRes.data, {spuId, skuId,token, qty, addressId, proxyRes})
    this.submit({spuId, skuId,token, qty, addressId, proxyRes})
    return
  }
  
  const x_xf_accept1 = await get_x_xf_accept(coded_v20, proxyRes);
  
  try {
    const batchUpload = await axios({
      url: 'https://mall-api.xwindlab.com/log/info/batchUpload',
      method: 'POST',
      headers: {
        authority: 'mall-api.xwindlab.com',
        // accept: '*/*',
        // 'accept-language': 'zh-CN,zh-Hans;q=0.9',
        // 'accept-encoding': 'gzip, deflate, br',
        // 'content-length': 72,
        // 'content-type': 'application/json;',
        origin: 'https://mall-h5.xwindlab.com',
        referer: 'https://mall-h5.xwindlab.com/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
        authorization: this.token,
        // 'x-xf-accept': x_xf_accept,
      },
      httpAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
      httpsAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
      data: {
        biz: "mall",
        bodyList: [
          JSON.stringify({
            spuId,
            skuId,
            qty,
            addressId,
            bankId: 5,
            rid: checkoutRes.data.data.rid,
            gbid: this.gbid,
            cardId: '',
          })
        ],
        event:"click",
        extra1:"confirm_btn",
        page:"checkout",
      },
    }).catch(error => ({}))
    // console.log('上报1', 'batchUploadRes')
  } catch (e) {}
  
  const commitRes = await axios({
    url: 'https://mall-api.xwindlab.com/order/commit',
    method: 'POST',
    headers: {
      authority: 'mall-api.xwindlab.com',
      accept: '*/*',
      'accept-language': 'zh-CN,zh-Hans;q=0.9',
      // authorization: token,
      'content-length': 280,
      'content-type': 'application/json;',
      origin: 'https://mall-h5.xwindlab.com',
      referer: 'https://mall-h5.xwindlab.com/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
      authorization: token,
      'x-xf-accept': x_xf_accept1,
    },
    httpAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
    httpsAgent: new HttpsProxyAgent(`http://${proxyIp}:${proxyPort}`),
    data: {
      qty,
      skuId,
      spuId,
      addressId,
      "rid": checkoutRes.data.data.rid,
      gbid: this.gbid,
      "cardId": "",
      userId: this.userId,
      "extra": "",
      sign: this.sign,
      "goodsCode": `${spuId}${skuId}`,
      "bankId": 5
    },
  });
  
  
  if (commitRes.data.code !== 0) {
    console.log('下单失败',{
      qty,
      skuId,
      spuId,
      addressId,
      "rid": checkoutRes.data.data.rid,
      gbid: this.gbid,
      "cardId": "",
      userId: this.userId,
      "extra": "",
      sign: this.sign,
      "goodsCode": `${spuId}${skuId}`,
      "bankId": 5
    }, commitRes.data, spuId, skuId, `http://${proxyIp}:${proxyPort}`)
    // await this.submit({spuId, skuId,token, qty, addressId, proxyRes})
  } else {
    console.log('下单成功', spuId, skuId)
  }
  
  
}



