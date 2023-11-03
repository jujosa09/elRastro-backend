require('./db/mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {routerSubasta} = require('./routes/subastaRoute')
const {routerValoracion} = require('./routes/valoracionRoute')
const {routerImage} = require('./routes/imageRoute')
const {routerPuja} = require('./routes/routerPuja')
const {routerChat} = require('./routes/routerChat')
const {routerProducto} = require('./routes/routerProducto')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    res.send('App working!')
    next()
})

app.use('/subasta', routerSubasta)
app.use('/valoracion', routerValoracion)
app.use('/upload', routerImage)
app.use('/puja', routerPuja)
app.use('/chat', routerChat)
app.use('/producto', routerProducto)

const port = 5001
app.listen(port, () => {
    console.log('Listening on port ' + port)
})