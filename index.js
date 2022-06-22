const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const promptpay = require('promptpay-js')
const uniqid  = require('uniqid'); 
const QRCode = require('qrcode')

app.get('/qrcode/:id/:amount', (req, res) => {
  const id = req.params.id
  const amount = req.params.amount
  const payload = promptpay.generate({
        method: 'QR_DYNAMIC',
        application: 'PROMPTPAY_CREDIT_TRANSFER',
        currencyCode: '764',
        mobileNumber:id,
        amount:amount,
        countryCode: 'TH',
        })
        const option = {
          color: {
              dark: '#000',
              light: '#fff'
          }
      }
      QRCode.toDataURL(payload, option, (err, url) => {
          if(err) {
              console.log('generate fail')
              return res.status(400).json({
                  RespCode: 400,
                  RespMessage: 'bad : ' + err
              })  
          } 
          else {
              return res.status(200).json({
                  RespCode: 200,
                  ResId: uniqid(),
                  ResImg: url
              })  
          }
  
      })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})