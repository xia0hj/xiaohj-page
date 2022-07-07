const express = require('express')

const port = 9876

const app = express()

app.use(express.static('./docs/.vuepress/dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
