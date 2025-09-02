import express from 'express'
import CursoController from './CursoController.js'


const router = express.Router()

// Rotas ligadas ao controller
router.get('/cursos', CursoController.index)
router.get('/cursos/:id', CursoController.show)
router.post('/cursos', CursoController.store)
router.put('/cursos/:id', CursoController.update)
router.delete('/cursos/:id', CursoController.delete)

export default router