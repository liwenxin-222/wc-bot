import axios from 'axios'
export async function proxyW () {
  const res = await axios.get('http://ecs.hailiangip.com:8422/api/getIpEncrypt?dataType=1&encryptParam=SlDyzgfgDW12vuaMHmQkMz9pKEmWH7kDAoD1ZC4KkxpHXuvLm%2B3L9xWaasGPtq4TJ0sMhJsJFD38JyE6G8wc5UGPHiNOIsta5zIZk622z%2FrdbreGHi80PeQNNSI9E76Yy1SMAcagTAcA5CTvM4y2gCWhMuiNeuyBW5WWIeR8yKJYDcvC%2FeTFVDIQgCd6Bl9zWhSglUCiFW5HEXHAbvQib9zbJ280PfgKxcbaM9RRtYCtxFCQehkdZXg2FiRfhV0V')
  console.log(res.data);
  
  return res.data.trim().split(':');
}

// proxyW();
export async function proxyW5Min() {
  
  const res = await axios.get('https://api.hailiangip.com:8522/api/getIpEncrypt?dataType=1&encryptParam=SlDyzgfgDW12vuaMHmQkM1l3svlLMXCHw0IlSHvOue3lVhShpdEjb9vG2YRiwpyE7Z6UWoBKBXqwNhwVkZjf1HTvyKxnV%2Biysf2uz8mYLO9DyZMCYf0J0EoUFp7ZzdGh4LSj5BzZSLVLJXTvfEW4KKRjdPrYAlRjK8dJ5iGdK3ZXwMMY2Pp7wRNtgRIJmPbHKHmQBjYm32MK13MpScW7XN0Jv%2FQlqwlcd4gkrYI6AFg%3D')
  console.log(res.data);
  
  return res.data.trim().split(':');
}

