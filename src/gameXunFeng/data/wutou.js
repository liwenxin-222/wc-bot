import puppeteer from 'puppeteer';

export async function wutouApi(callback) {
  // 1. 打开浏览器
  const browser = await puppeteer.launch()
  
  // 2. 新建一个标签页
  const page = await browser.newPage()
  
  // 3. 输入地址敲回车
  await page.goto('http://liwenx.com:888/')
  
  page.on('requestfinished', request => {
    
    if (request.url().includes('queryGoodsList')) {
      request.response().json().then((res) => {
        // console.log(res.data.list)
        callback(res.data.list)
      })
    }
  });
  
}

