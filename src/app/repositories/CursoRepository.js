import conexao from '../database/conexao.js';

class CursoRepository {
    // async findAll() {
    //     const sql = "SELECT * FROM curso;";
    //     return new Promise((resolve, reject) => {
    //         conexao.query(sql, (error, result) => {
    //             if (error) {
    //                 reject(error);
    //             } else {
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }

    async findAll() {
        const [rows] = await conexao.query('SELECT * FROM cursodb.curso')
        console.log(rows)
        return rows;
    }

    async findById(id) {
        const sql = "SELECT * FROM curso WHERE id = ?";
        try {
            const [result] = await conexao.query(sql, [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async create(id, disciplina) {
        const sql = "INSERT INTO curso (id, disciplina) VALUES (?, ?)";
        try {
            const [result] = await conexao.query(sql, [id, disciplina]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async update(id, disciplina) {
        const sql = "UPDATE curso SET disciplina = ? WHERE id = ?";
        try {
            const [result] = await conexao.query(sql, [disciplina, id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        const sql = "DELETE FROM curso WHERE id = ?";
        try {
            const [result] = await conexao.query(sql, [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

}

export default new CursoRepository();