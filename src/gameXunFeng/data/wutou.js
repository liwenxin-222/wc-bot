import puppeteer from 'puppeteer';

export async function wutouApi(callback) {
  // 1. 打开浏览器
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  
  // 2. 新建一个标签页
  const page = await browser.newPage()
  
  // 3. 输入地址敲回车
  await page.goto('https://mall-h5.haowu.store')
  
  page.on('requestfinished', request => {
    
    if (request.url().includes('queryGoodsList')) {
      request.response().json().then((res) => {
        // console.log(res.data.list)
        callback(res.data.list)
      })
    }
  });
  
}

