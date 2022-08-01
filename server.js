const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000
const routes = require('./src/queries')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get ('/', (request, response) => {
    response.json({info: 'SERVIDOR - dailygrind'})
})

app.get('/usuario', routes.getUsuario)
app.get('/usuario/:id', routes.getUsuarioById)
app.post('/usuario', routes.createUsuario)
app.put('/usuario/:id', routes.updateUsuario)
app.delete('/usuario/:id', routes.deleteUsuario)

app.get('/conquista', routes.getConquista)
app.get('/conquista/:id', routes.getConquistaById)
app.post('/conquista', routes.createConquista)
app.put('/conquista/:id', routes.updateConquista)
app.delete('/conquista/:id', routes.deleteConquista)

app.get('/tarefa/:id', routes.getTarefa)
app.get('/tarefa/byid/:idtarefa', routes.getTarefaById)
app.post('/tarefa', routes.createTarefa)
app.put('/tarefa/:id', routes.updateTarefa)
app.delete('/tarefa/:id', routes.deleteTarefa)

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
})