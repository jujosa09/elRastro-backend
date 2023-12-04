require('./db/mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const {routerImage} = require('./routes/routerImage')
const {routerPuja} = require('./routes/routerPuja')
const {routerChat} = require('./routes/routerChat')
const {routerProducto} = require('./routes/routerProducto')
const {routerUsuario} = require('./routes/usuarioRoute')
const {routerEmail} = require('./routes/emailRoute')
const {routerCarbono} = require("./routes/routerCarbono");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

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
app.use('/carbono', routerCarbono)

const port = 5001
app.listen(port, () => {
    console.log('Listening on port ' + port)
})