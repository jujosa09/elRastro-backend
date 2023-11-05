require('./db/mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {routerSubasta} = require('./routes/subastaRoute')
const {routerValoracion} = require('./routes/valoracionRoute')
const {routerImage} = require('./routes/imageRoute')
const {routerUsuario} = require('./routes/usuarioRoute')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    res.send('App working!')
    next()
})

app.use('/subasta', routerSubasta)
app.use('/valoracion', routerValoracion)
app.use('/upload', routerImage)
app.use('/usuario', routerUsuario)

const port = 5000
app.listen(port, () => {
    console.log('Listening on port ' + port)
})