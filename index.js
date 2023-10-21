require('./db/mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {routerSubasta} = require('./routes/subastaRoute')
const {routerValoracion} = require('./routes/valoracionRoute')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    res.send('App working!')
    next()
})

app.use('/', routerSubasta)
app.use('/', routerValoracion)

const port = 5000
app.listen(port, () => {
    console.log('Listening on port ' + port)
})