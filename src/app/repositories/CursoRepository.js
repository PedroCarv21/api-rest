import conexao from '../database/conexao.js';

class CursoRepository {
    async findAll() {
        const sql = "SELECT * FROM curso;";
        return new Promise((resolve, reject) => {
            conexao.query(sql, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async findById(id) {
        const sql = "SELECT * FROM curso WHERE id = ?";
        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async create(id, disciplina) {
        const sql = "INSERT INTO curso (id, disciplina) VALUES (?, ?)";
        return new Promise((resolve, reject) => {
            conexao.query(sql, [id, disciplina], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async update(id, disciplina) {
        const sql = "UPDATE curso SET disciplina = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            conexao.query(sql, [disciplina, id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async delete(id) {
        const sql = "DELETE FROM curso WHERE id = ?";
        return new Promise((resolve, reject) => {
            conexao.query(sql, [id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

export default new CursoRepository();