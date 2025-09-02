import express from 'express'
import cursosRoutes from './app/controllers/CursosRoutes.js'
import CursoController from './app/controllers/CursoController.js'

const app = express()

app.use(express.json())
app.use(cursosRoutes)

export default app

