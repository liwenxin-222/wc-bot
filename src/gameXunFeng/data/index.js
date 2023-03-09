import axios from 'axios'


export function getMtList() {
  
  return axios({
    method: 'GET',
    url: 'https://mall-api.haowu.store/goods/queryGoodsList?page=1&size=40',
    headers: {
      'Data-Type': 'application/json',
    }
  });
}
