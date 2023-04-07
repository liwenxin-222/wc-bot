import axios from 'axios';
axios.get('http://liwenx.com:888/').then((res) => {
  console.log(res.data)
})
