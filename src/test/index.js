import axios from 'axios'
import httpsProxyAgent from 'https-proxy-agent';


// let httpsProxyAgent = require("https-proxy-agent");
var agent = new httpsProxyAgent("http://localhost:7890");
axios({
  method: 'GET',
  url: 'https://www.google.com.hk',
  httpsAgent: agent,
  // proxy: false,
  
}).then((res) => {
  console.log(res.data);
})
