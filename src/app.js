import express from 'express'
import conexao from './infra/conexao.js'
const app = express()

app.use(express.json())

// const cursos = [
//     {id: 1, disciplina: 'ADS'},
//     {id: 2, disciplina: 'ADS'},
//     {id: 3, disciplina: 'ADS'},
//     {id: 4, disciplina: 'ADS'}
// ]

function buscarCursosPorId(id){
    return cursos.filter(curso => curso.id == id)
}

function buscarIndexCurso(id){
    return cursos.findIndex(curso => curso.id == id)
}

// Criando uma rota default (endpoint)
// app.get('/', (req, res) => {
//     res.send('Hello Pedro')
// })


//ROTAS
app.get('/cursos', (req, res) => {
    // res.status(200).send(cursos)
    const sql = "SELECT * FROM curso;"
    conexao.query(sql, (error, result) => {
        if (error){
            console.log(error)
        }
        else {
            res.status(200).json(result)
        }
    })
})


app.get('/cursos/:id', (req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM curso WHERE id = ?"

    conexao.query(sql, [id], (error, result) => {
        if (result.length > 0) {
            res.status(200).json(result[0])
        } else {
            res.status(404).json({"mensagem": "Curso não encontrado"})
        }
    })
})

app.post('/cursos', (req, res) => {
    const { id, disciplina } = req.body
    const sql = "INSERT INTO curso (id, disciplina) VALUES (?, ?)"

    conexao.query(sql, [id, disciplina], (error, result) => {
        if (error) {
            console.error(error)
            res.status(400).json({ "mensagem": "Erro ao inserir curso" })
            return
        }

        res.status(201).json({
            id: id,
            disciplina: disciplina
        })
    })
})

app.put('/cursos/:id', (req, res) => {
    const { id } = req.params        
    const { disciplina } = req.body  

    const sql = "UPDATE curso SET disciplina = ? WHERE id = ?"

    conexao.query(sql, [disciplina, id], (error, result) => {
        
        if (result.affectedRows > 0) {
            res.status(200).json({ 
                "mensagem": "Curso atualizado com sucesso",
                id: id,
                disciplina: disciplina
            })
        } else {
            res.status(404).json({ "mensagem": "Curso não encontrado" })
        }
    })
})


app.delete('/cursos/:id', (req, res) => {
    const { id } = req.params

    const sql = "DELETE FROM curso WHERE id = ?"

    conexao.query(sql, [id], (error, result) => {

        if (result.affectedRows > 0) {
            res.status(200).json({ "mensagem": `Curso com id ${id} deletado com sucesso` })
        } else {
            res.status(404).json({ "mensagem": "Curso não encontrado" })
        }
    })
})


// app.post('/cursos', (req, res) => {
//     cursos.push(req.body)
//     res.status(200).send('Selecao cadastrada com sucesso')
// })

// app.get('/cursos/:id', (req, res) => {
//     // let index = req.params.id
//     // console.log(index)
//     res.json(buscarCursosPorId(req.params.id))
// })

// app.delete('/cursos/:id', (req, res) => {
//     let index = buscarIndexCurso(req.params.id)
//     cursos.splice(index, 1)
//     console.log(index)
//     res.send(`O curso com id ${req.params.id} excluido com sucesso!`)
// })

// app.put('/cursos/:id', (req, res) => {
//     let index = buscarIndexCurso(req.params.id)
//     cursos[index].disciplina = req.body.disciplina
//     res.json(cursos)
// })

export default app
