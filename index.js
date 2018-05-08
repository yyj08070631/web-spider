const express = require('express')
const app = express()
const superagent = require('superagent')
const cheerio = require('cheerio')

let host = 'https://cnodejs.org/'

app.get('/', (req, res) => {
  superagent
    .get(host)
    .end((err, sres) => {
      // 抛错拦截
      if (err) {
        res.json(err)
      }
      /**
       * res.text 包含未解析前的响应内容
       * 我们通过cheerio的load方法解析整个文档，就是html页面所有内容，可以通过console.log($.html());在控制台查看
       */
      let $ = cheerio.load(sres.text)

      let arr = []
      $('#topic_list .topic_title').each((idx, element) => {
        // 拿到当前li标签下所有的内容，开始干活了
        arr.push({
          title: $(element).attr('title'),
          href: $(element).attr('href')
        })
      })

      res.json(arr)
    })
})

let replaceText = (text) => {
  return text.replace(/\n/g, '').replace(/\s/g, '');
}

let server = app.listen(3000, () => {
  let host = server.address().address
  let port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})