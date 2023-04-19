import axios from 'axios'
export async function proxyW () {
  const res = await axios.get('http://ecs.hailiangip.com:8422/api/getIpEncrypt?dataType=1&encryptParam=SlDyzgfgDW12vuaMHmQkMz9pKEmWH7kDAoD1ZC4KkxpHXuvLm%2B3L9xWaasGPtq4TJ0sMhJsJFD38JyE6G8wc5UGPHiNOIsta5zIZk622z%2FrdbreGHi80PeQNNSI9E76Yy1SMAcagTAcA5CTvM4y2gCWhMuiNeuyBW5WWIeR8yKJYDcvC%2FeTFVDIQgCd6Bl9zWhSglUCiFW5HEXHAbvQib9zbJ280PfgKxcbaM9RRtYCtxFCQehkdZXg2FiRfhV0V')
  console.log(res.data);
  
  return res.data.trim().split(':');
}

// proxyW();
