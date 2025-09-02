// index(): listar tudo
// show(): listar por id
// store(): criar dados
// update(): atualizar dados
// delete(): remover dados

import conexao from '../database/conexao.js'

class CursoController {
    index(req, res) {
        const sql = "SELECT * FROM curso;"
        conexao.query(sql, (error, result) => {
            if (error) {
                console.log(error)
                res.status(404).json({ 'error': error })
            }
            else {
                res.status(200).json(result)
            }
        })
    }
    show(req, res) {
        const { id } = req.params
        const sql = "SELECT * FROM curso WHERE id = ?"
        conexao.query(sql, [id], (error, result) => {

            if (result.length > 0) {
                res.status(200).json(result[0])
            } else {
                res.status(404).json({ "mensagem": "Curso não encontrado" })
            }
        })
    }

    store(req, res) {
        const { id, disciplina } = req.body
        const sql = "INSERT INTO curso (id, disciplina) VALUES (?, ?)"
    
        conexao.query(sql, [id, disciplina], (error, result) => {
            if (error && error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ "mensagem": "Já existe um curso com esse ID" })
            }
    
            res.status(200).json({ id, disciplina })
        })
    }
    

    update(req, res) {
        const { id } = req.params
        const { disciplina } = req.body
        const sql = "UPDATE curso SET disciplina = ? WHERE id = ?"
        conexao.query(sql, [disciplina, id], (error, result) => {

            if (result.affectedRows > 0) {
                res.status(200).json({ "mensagem": "Curso atualizado com sucesso", id, disciplina })
            } else {
                res.status(404).json({ "mensagem": "Curso não encontrado" })
            }
        })
    }

    delete(req, res) {
        const { id } = req.params
        const sql = "DELETE FROM curso WHERE id = ?"
        conexao.query(sql, [id], (error, result) => {

            if (result.affectedRows > 0) {
                res.status(200).json({ "mensagem": `Curso com id ${id} deletado com sucesso` })
            } else {
                res.status(404).json({ "mensagem": "Curso não encontrado" })
            }
        })
    }
}

export default new CursoController()