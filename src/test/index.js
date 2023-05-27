import axios from 'axios'
 axios({
  url: 'https:/mall-api.xwindlab.com/user/address/list',
  method: 'GET',
  headers: {
    Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE2ODU3MjQ4MzMsInVzZXJJZCI6MjY2OTAyNDI1ODEwODYyNTMsImlhdCI6MTY4NDUxNTIzM30.KYuCnFfiSwL_54IwCRkxVd-WFOnmwq-zJWl43oDnalrvEQ7acZfp0SK_AGxGL6Xxa1JfVnXAziC5a1xwvCOciA'
  },
}).then((data)=> {
   console.log(data.data.data.list)})
