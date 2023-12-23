require('./db/mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const {routerImage} = require('./routes/routerImage')
const {routerPuja} = require('./routes/routerPuja')
const {routerProducto} = require('./routes/routerProducto')
const {routerUsuario} = require('./routes/usuarioRoute')
const {routerEmail} = require('./routes/emailRoute')
const {routerCarbono} = require("./routes/routerCarbono");
const productoController = require("./controllers/productoController");
const cron = require("node-cron");

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));


app.get('/', (req, res, next) => {
    res.send('App working!')
    next()
})

app.use(cors())

app.use('/upload', routerImage)
app.use('/puja', routerPuja)
app.use('/producto', routerProducto)
app.use('/usuario', routerUsuario)
app.use('/email', routerEmail)
app.use('/carbono', routerCarbono)

const port = 5001
app.listen(port, () => {
    console.log('Listening on port ' + port)
})

cron.schedule('1 0 * * *', () => {
    productoController.reabrirPujas();
});