require('./db/mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {router} = require('./routes/subastaRoute')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    res.send('App working!')
    next()
})

app.use('/', router)

const port = 5000
app.listen(port, () => {
    console.log('Listening on port ' + port)
})