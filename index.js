require('./db/mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const {routerImage} = require('./routes/routerImage')
const {routerPuja} = require('./routes/routerPuja')
const {routerChat} = require('./routes/routerChat')
const {routerProducto} = require('./routes/routerProducto')
const {routerUsuario} = require('./routes/usuarioRoute')
const {routerEmail} = require('./routes/emailRoute')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    res.send('App working!')
    next()
})

app.use('/upload', routerImage)
app.use('/puja', routerPuja)
app.use('/chat', routerChat)
app.use('/producto', routerProducto)
app.use('/usuario', routerUsuario)
app.use('/email', routerEmail)

const port = 5001
app.listen(port, () => {
    console.log('Listening on port ' + port)
})