import axios from 'axios'
import * as fs from 'fs'
import * as querystring from 'querystring'


let secretId = 'oz7b10rur41lyirkogfs';
let secretKey = '6zt74869iltki6m66r9zlul4lwf00n7o';
let secretPath = './.secret';

function _getSecretToken () {
  return axios({
    url: 'https://auth.kdlapi.com/api/get_secret_token',
    method: 'post',
    data: querystring.stringify({
      secret_id: secretId,
      secret_key: secretKey,
    })
  }).then(response => {
    if (response.data.code !== 0) throw new Error(response.data.msg + ', code: ' + response.data.code);
    let secretToken = response.data.data.secret_token;
    let expireTime = response.data.data.expire;
    let lastTime = (new Date()).getTime();
    return [secretToken, parseInt(expireTime) * 1000, lastTime, secretId];
  }).catch(error => {
    throw error;
  });
}

async function _readSecretToken() {
  let readBuff = fs.readFileSync(secretPath, {encoding:'utf-8'});
  let tokenList = readBuff.split('|');
  let expireTime = parseInt(tokenList[1]);
  let lastTime = parseInt(tokenList[2]);
  let lastSecretId = parseInt(tokenList[3]);
  if (lastTime + expireTime - 180 * 1000 < (new Date()).getTime() || lastSecretId !== secretId) {  // 还有3分钟过期或SecretId变化时更新
    tokenList = await _getSecretToken();
    fs.writeFileSync(secretPath, tokenList.join('|'));
  }
  return tokenList;
}

async function getSecretToken() {
  try {
    let tokenList = await _readSecretToken();
    return tokenList[0];
  } catch {
    let tokenList = await _getSecretToken();
    fs.writeFileSync(secretPath, tokenList.join('|'));
    return tokenList[0];
  }
}

getSecretToken().then(secretToken => console.log(secretToken));
