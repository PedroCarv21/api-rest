// index(): listar tudo
// show(): listar por id
// store(): criar dados
// update(): atualizar dados
// delete(): remover dados

import conexao from '../database/conexao.js'

import CursoRepository from '../repositories/CursoRepository.js';

class CursoController {
    async index(req, res) {
        try {
            const cursos = await CursoRepository.findAll();
            res.status(200).json(cursos);
        } catch (error) {
            console.log(error);
            res.status(500).json({ 'error': 'Erro ao buscar cursos' });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        try {
            const curso = await CursoRepository.findById(id);
            if (curso.length > 0) {
                res.status(200).json(curso[0]);
            } else {
                res.status(404).json({ "mensagem": "Curso não encontrado" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ 'error': 'Erro ao buscar o curso' });
        }
    }

    async store(req, res) {
        const { id, disciplina } = req.body;
        try {
            await CursoRepository.create(id, disciplina);
            res.status(200).json({ id, disciplina });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ "mensagem": "Já existe um curso com esse ID" });
            }
            console.log(error);
            res.status(500).json({ 'error': 'Erro ao criar curso' });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { disciplina } = req.body;
        try {
            const result = await CursoRepository.update(id, disciplina);
            if (result.affectedRows > 0) {
                res.status(200).json({ "mensagem": "Curso atualizado com sucesso", id, disciplina });
            } else {
                res.status(404).json({ "mensagem": "Curso não encontrado" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ 'error': 'Erro ao atualizar curso' });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const result = await CursoRepository.delete(id);
            if (result.affectedRows > 0) {
                res.status(200).json({ "mensagem": `Curso com id ${id} deletado com sucesso` });
            } else {
                res.status(404).json({ "mensagem": "Curso não encontrado" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ 'error': 'Erro ao deletar curso' });
        }
    }
}

export default new CursoController();