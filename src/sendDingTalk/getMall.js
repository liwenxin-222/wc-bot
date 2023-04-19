import axios from 'axios';
import cheerio from 'cheerio';
import HttpsProxyAgent from 'https-proxy-agent';
import {setSchedule} from '../gameXunFeng/schedule/index.js'

let proxyIp = '123.181.235.56';
let proxyPort = 30001;

let username = '202304191869039034';
let password = 'FVcl18rl';

async function get_data_bdms_faccdee21b68() {
  const headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
    'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
  }
  
  const response = await axios.get('https://mall-h5.haowu.store/', headers);
  console.log(response.data)
  const $ = cheerio.load(response.data);
  const data_bdms_faccdee21b68 = $('script[data-bdms-faccdee21b68]').attr('data-bdms-faccdee21b68');
  console.log(data_bdms_faccdee21b68, 111);
  return data_bdms_faccdee21b68
}


async function get_token() {
  
  function get_random_num(num) {
    
    let c = '';
    while (c.length < num) {
      c += String(Math.round(Math.random() * 9));
    }
    
    return c.slice(0, 11);
    
  }
  
  const cc = '20$';
  const xx = '100064';
  // const token_ = cc + xx + f'{round(time.time() * 1000)}' + '' + get_random_num(
  //     11) + f'{round(time.time() * 1000)}' + get_random_num(4)
// # print(token_)
  const token = `${cc}${xx}f${Math.round(Date.now())}${get_random_num(11)}f${Math.round(Date.now())}${get_random_num(4)}`;
  console.log(token, 2222)
  return token
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
  console.log('get_coded_v20', c);
  return "CODED--v20" + c;
}

async function get_x_xf_accept(coded_v20) {
  const cookies = {
// # 'BAIDUID_BFESS': 'A2FF4A80869FFABDD818270868A78818:FG=1',
// # 'ZFY': 'GLNdf6FCQoG84p0SASf:A1FNy1VvkTpiXrp2dDzPeI:Bo:C',
// # 'ab_sr': '1.0.1_ODJiZDlhMDIwYmVmMGNiNjk3ZGE1NGFjODNlYTA5Y2M5MzQxM2EyMWU0ZmRjN2Q0MzlhYzVlMTcyYTM3YzI4NGU1OTc3YWYxMGNmNzBhMDUwZDIyYzZkZTI5MjFlMmI3MGZiNDg2NzdlZWVhZTFmMzJlNGNjODc2MjAyMGUwY2E4OWNmNWNlMTI0NDBmMGNhYmQxOWIxOTZiNTM5NDE3Zg==',
  }
  
  const headers = {
    'authority': 'sofire.baidu.com',
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'no-cache',
    'content-type': 'text/plain',
// # Requests sorts cookies= alphabetically
// # 'cookie': 'BAIDUID_BFESS=A2FF4A80869FFABDD818270868A78818:FG=1; ZFY=GLNdf6FCQoG84p0SASf:A1FNy1VvkTpiXrp2dDzPeI:Bo:C; ab_sr=1.0.1_ODJiZDlhMDIwYmVmMGNiNjk3ZGE1NGFjODNlYTA5Y2M5MzQxM2EyMWU0ZmRjN2Q0MzlhYzVlMTcyYTM3YzI4NGU1OTc3YWYxMGNmNzBhMDUwZDIyYzZkZTI5MjFlMmI3MGZiNDg2NzdlZWVhZTFmMzJlNGNjODc2MjAyMGUwY2E4OWNmNWNlMTI0NDBmMGNhYmQxOWIxOTZiNTM5NDE3Zg==',
    'origin': 'https://mall-h5.haowu.store',
    'pragma': 'no-cache',
    'referer': 'https://mall-h5.haowu.store/',
    'sec-ch-ua': '"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
  }
  
  const data = coded_v20;
  
  const response = await axios({
    url: 'https://sofire.baidu.com/abot/api/v1/tpl/commit',
    method: 'POST',
    // httpAgent: new HttpsProxyAgent(`http://${username}:${password}@${proxyIp}:${proxyPort}`),
    // httpsAgent: new HttpsProxyAgent(`http://${username}:${password}@${proxyIp}:${proxyPort}`),
    headers: {
      ...headers,
      ...cookies,
    },
    data: data,
  });
  
  console.log(response.data, 3333);
  return response.data;
}

async function queryGoodsList(x_xf_accept) {
  const headers = {
    'authority': 'mall-api.haowu.store',
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'authorization': '',
    'cache-control': 'no-cache',
    'content-type': 'application/json;',
    'origin': 'https://mall-h5.haowu.store',
    'pragma': 'no-cache',
    'referer': 'https://mall-h5.haowu.store/',
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
  
  // const params = {
  //   'page': '1',
  //   'size': '40',
  // }
  
  const response = await axios({
    url: 'https://mall-api.haowu.store/goods/queryGoodsList?page=1&size=40',
    method: 'GET',
    headers,
    httpAgent: new HttpsProxyAgent(`http://${username}:${password}@${proxyIp}:${proxyPort}`),
    httpsAgent: new HttpsProxyAgent(`http://${username}:${password}@${proxyIp}:${proxyPort}`),
    // data: params
  })
  
  // console.log(response.data.data.list, 4444);

  return response.data.data.list;
  // print(response.json())
  // return response.json()
}


// get_data_bdms_faccdee21b68()
const token_ = get_token();

export async function getMall(fn) {
  // setSchedule('0/20 * * * * ?', async () => {
    const data_bdms_faccdee21b68 = await get_data_bdms_faccdee21b68();
    console.log(data_bdms_faccdee21b68, '结果这里')

    const coded_v20 = get_coded_v20(data_bdms_faccdee21b68);
    const x_xf_accept = await get_x_xf_accept(coded_v20);

// console.log(x_xf_accept, 555)

    const list = await queryGoodsList(x_xf_accept.data.t);
    
    console.log(list);
    return list;
    // fn(list);
  // })

}
getMall()


