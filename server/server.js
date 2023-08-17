const express = require('express')
const requestIp = require('request-ip')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  var clientIp = requestIp.getClientIp(req)
  res.send(`Your IP Address is ${clientIp}.`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})