import axios from 'axios'
import httpsProxyAgent from 'https-proxy-agent';

//
// // let httpsProxyAgent = require("https-proxy-agent");
// var agent = new httpsProxyAgent("http://localhost:7890");
// axios({
//   method: 'GET',
//   url: 'https://www.google.com.hk',
//   httpsAgent: agent,
//   // proxy: false,
//
// }).then((res) => {
//   console.log(res.data);
// })

function login() {
  return axios({
    method: 'POST',
    url: 'https://aicall.easemob.com/api/login',
    data: {
      username: 'hx902202',
      password: 'Hx12345678',
      from: '2',
      url: '8cba682a'
    }
  })
}

//  模板
function getProJectSn(api_key, user_sn, user_name) {
  return axios({
    method: 'POST',
    url: 'https://aicall.easemob.com/api/templatelist',
    data: {
      pageIndex: 0,
      pageSize: 1,
      api_key,
      user_sn,
      // api_key,
      // from: '2',
      // url: '8cba682a'
    }
  })
}

//  子账号
function getAiUserDatasapi(api_key, user_sn, user_name) {
  return axios({
    method: 'POST',
    url: 'https://aicall.easemob.com/api/aiUserDatasapi',
    data: {
      // from: '2',
      // url: '8cba682a',
      api_key,
      user_sn,
      "pageIndex": "0",
      "pageSize": "1",
      // user_name,
    }
  })
}


function addJson({sn, api_key, project_sn, user_sn}) {
  console.log(sn, api_key, project_sn, 7777)
  return axios({
    method: 'post',
    url: 'https://aicall.easemob.com/api/addJson',
    data: {
      // ai_user_sn: "SYSUSER|fb3366793bed32e1f6791a6d13c53233",
      // client_info_json: {
      //   data: [
      //     { "姓名":"test1", "电话":"17600110526", "地址":"北京" }
      //   ]
      // },
      // source: 'test',
      // project_sn: 'project|b3946ad7bd1a75e5e92c1b11eb5a77b4',
      // api_key,
      is_auto_fail_recall:1,
      total_fail_recall_times:1,
      fail_recall_interval:1,
      // url: '6622db14',
      user_sn: user_sn,
      api_key: api_key,
      project_sn: project_sn,
      fail_recall_of_reason: "关机,来电提醒,稍后再拨,停机,无法接通,正在通话中,用户正忙,用户拒 接,欠费,无人应答,其他",
      "ai_user_sn":user_sn,
      "is_zidong":"on",
      "source":"YBXBY18908025356",
      client_info_json: {
        data: [
          { "姓名":"test1", "电话":"17600110526", "地址":"北京" }
        ]
      },
    }
  })
}
async function init() {
  const agentRes = await login();
  
  console.log(agentRes.data)
  if (agentRes.data.code === 0 ) {
    const {api_key, user_sn, user_name} = agentRes.data.data;
    
    const proJectSnRes = await getProJectSn(api_key, user_sn);
    const [sn_index1] = proJectSnRes.data.data;
    console.log(1111, sn_index1)
    const sn = sn_index1.sn;
    
    const subAgentRes = await getAiUserDatasapi(api_key, user_sn, user_name);
    const [project_sn_index1] = subAgentRes.data.data;
    const project_sn = project_sn_index1.project_sn.split(',')[0];
    
  //    打电话
    const addJsonRes = await addJson({
      sn,
      user_sn,
      api_key,
      project_sn,
    });
    
    
    console.log(addJsonRes.data)
  }
  
  
}

init();
