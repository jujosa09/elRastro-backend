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
const {routerCarbono} = require("./routes/routerCarbono");

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.get('/', (req, res, next) => {
    res.send('App working!')
    next()
})
const cors = require('cors')

app.use(cors())

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