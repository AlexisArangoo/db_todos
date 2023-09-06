import express from 'express'
import db_todos from './util/db_todos.js'
import Todo from './models/todos.model.js'
import cors from 'cors'

Todo

const PORT = process.env.PORT ?? 8000

db_todos.authenticate()
    .then(() => console.log('Conexion correcta'))
    .catch(err => console.log(err))

db_todos.sync()
    .then(() => console.log('base de datos sincronizada'))
    .catch(err => console.log(err))

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
   res.send('OK')
})


//GET todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.findAll()
        res.json(todos)
    } catch (error) {
        res.status(400).json(error)
    }
})

//GET todo by id
app.get('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params

        const todo = await Todo.findByPk(id)
        res.json(todo).end()
    } catch (error) {
        res.status(400).json(error)
    }
})

//POST todo
app.post('/todos', async (req, res) => {
    try {
        const {body} = req

        const todo = await Todo.create(body)
        res.status(201).json(todo)
    } catch (error) {
        res.status(400).json(error)
    }
})

//PUT todo
app.put('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {body} = req

        await Todo.update(body, {
            where: {id}
        })
        res.status(204).end()
    } catch (error) {
        res.status(400).json(error)
    }
})

//DELETE todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params
        
        await Todo.destroy({
            where: {id}
        })
        res.status(204).end()
    } catch (error) {
        res.status(400).json(error)
    }
})

app.listen(PORT, () => {
console.log(`Se esta ejecutando el servidor ${PORT}`)
})