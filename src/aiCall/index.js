import axios from 'axios'


function login() {
  return axios({
    method: 'POST',
    url: 'https://aicall.easemob.com/api/login',
    data: {
      username: 'hx902300',
      password: 'Hx902300902300',
      from: '2',
      url: 'b47d1fe5'
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
      pageSize: 5,
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
      "pageSize": "5",
      // user_name,
    }
  })
}


function addJson({ai_user_sn, api_key, project_sn, user_sn}) {
  console.log(user_sn, project_sn, ai_user_sn, api_key, '77777')
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
      is_auto_fail_recall:0,
      total_fail_recall_times:0,
      fail_recall_interval:0,
      // url: '6622db14',
      user_sn: user_sn,
      api_key: api_key,
      project_sn: project_sn,
      fail_recall_of_reason: "关机,来电提醒,稍后再拨,停机,无法接通,正在通话中,用户正忙,用户拒 接,欠费,无人应答,其他",
      ai_user_sn:ai_user_sn,
      "is_zidong":"on",
      "source":"YBXBY18908025356",
      client_info_json: {
        data: [
          // { "姓名":"小8", "电话":"13283304063", "地址":"河北" },
          { "姓名":"test0", "电话":"17600110526", "地址":"河北" },
          { "姓名":"小智", "电话":"13267578289", "地址":"河北" },
          { "姓名":"test2", "电话":"15608630786", "地址":"武汉" },
          { "姓名":"test3", "电话":"13873390348", "地址":"湖南" },
          { "姓名":"test4", "电话":"15618229178", "地址":"上海" },
          { "姓名":"test5", "电话":"15097693672", "地址":"福建" },
          { "姓名":"test6", "电话":"15620609088", "地址":"天津" },
          { "姓名":"test7", "电话":"15880968903", "地址":"福州" },
          { "姓名":"test8", "电话":"13704053182", "地址":"沈阳" },
          { "姓名":"test9", "电话":"13602353198", "地址":"东莞" },
          { "姓名":"test10", "电话":"13801977361", "地址":"上海" },
          { "姓名":"test11", "电话":"15910406111", "地址":"北京" },
          { "姓名":"test12", "电话":"18278768001", "地址":"广州" },
          { "姓名":"test13", "电话":"18105700132", "地址":"浙江" },
          { "姓名":"test14", "电话":"15902373713", "地址":"重庆" },
          { "姓名":"test15", "电话":"19821643382", "地址":"上海" },
          { "姓名":"test16", "电话":"15244758557", "地址":"黑龙江" },
          { "姓名":"test17", "电话":"18757927788", "地址":"浙江" },
        ]
      },
    }
  })
}
export async function aiCallInit() {
  
  const agentRes = await login();
  
  console.log(agentRes.data)
  if (agentRes.data.code === 0 ) {
    const {api_key, user_sn, user_name} = agentRes.data.data;
    
    console.log(agentRes.data.data, 111)
    //  模板
    const proJectSnRes = await getProJectSn(api_key, user_sn);
    const [,sn_index1] = proJectSnRes.data.data;
    console.log(proJectSnRes.data.data, 2222)
    const project_sn = sn_index1.sn;
    
    //  子账号
    const subAgentRes = await getAiUserDatasapi(api_key, user_sn, user_name);
    const [ai_sn_index1] = subAgentRes.data.data;
    console.log(subAgentRes.data.data, 33333)
    
    const ai_user_sn = ai_sn_index1.user_sn;
    
    console.log('执行电话任务！！')
  //    打电话
    const addJsonRes = await addJson({
      user_sn,
      project_sn,
      ai_user_sn,
      api_key,
    });

    
    console.log(addJsonRes.data, '电话任务成功')
  }
  
}

// init();
