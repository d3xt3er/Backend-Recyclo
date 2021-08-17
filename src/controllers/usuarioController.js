const banco = require('../postgres');

// Login - Usuario
exports.get = (req, res) => {

    const { email, senha } = req.params;


    banco.query(`SELECT * FROM tb_usuario WHERE ds_email = $1 AND cd_senha = $2;`, [email, senha], (err, result) => {
        if (result.rows.length > 0) {
            res.send('Usuario encontrado!');

        } else {
            res.send('Usuario não existente');
        }
    });
}

// Exibir informações - Usuario
exports.getUser = (req, res) => {

        const { email, senha } = req.params;


        banco.query(`SELECT * FROM tb_usuario WHERE ds_email = $1 AND cd_senha = $2`, [email, senha], (err, result) => {
            if (result.rows.length > 0) {
                return res.status(200).send(result.rows[0])

            } else {
                res.send('Informações não encontradas!');
            }
        });
    }
    // exports.getUser = (req, res) => {

//     const { nome, senha } = req.params;


//     banco.query(`SELECT * FROM tb_usuario WHERE nm_usuario = $1 AND cd_senha = $2;`, [nome, senha], (err, result) => {
//         if (result.rows.length > 0) {
//             return res.status(200).send(result.rows[0])

//         } else {
//             res.send('Informações não encontradas!');
//         }
//     });
// }


exports.getUserById = (req, res) => {
    const id = parseInt(req.params.id)

    banco.query('SELECT * FROM tb_usuario WHERE cd_usuario = $1', [id], (error, results) => {
        if (error) {
            res.json(error);
        } else {
            console.log(results.rows);

            //  Mostra um array com o objeto JSON
            // res.status(200).send(results.rows)

            //  Mostra o objeto JSON
            res.status(200).send(results.rows[0])

            //  Mostra o texto
            // res.send(results.rows[0].nm_usuario + results.rows[0].cd_senha + results.rows[0].cd_cpf + results.rows[0].ds_email)
        }
    })
}

// Cadastrar - Usuario
exports.post = (req, res) => {

    // const id = req.body;
    const { nome, email, senha, cpf, telefone } = req.body

    banco.query(`INSERT INTO tb_usuario (cd_usuario, nm_usuario, ds_email, cd_senha, cd_cpf, cd_telefone) VALUES ((select novoId()), $1, $2, $3, $4, $5) RETURNING *`, [nome, email, senha, cpf, telefone], (error, results) => {
        if (error) {
            res.json(error);
            console.log(error);
        } else {
            res.send('Cadastrado com sucesso!');
        }
    })
}


// Alterar cadastro - Usuario
exports.put = (req, res) => {
    const { id, nome, senha, cpf, telefone } = req.body

    banco.query(`UPDATE tb_usuario SET nm_usuario = '${nome}', cd_senha = '${senha}', cd_cpf = '${cpf}', cd_telefone = '${telefone}' WHERE cd_usuario = ${id}`, (error, result) => {
        if (!id) {
            return res.send('Usuario não encontrado!');
        }
        if (error) {
            res.json(error);
            console.log(error);
        } else {
            console.log(result);
            res.send('Alterado!')
        }
    })
}

// Deletar cadastro - Usuario
exports.delete = (req, res) => {
    const { id } = req.body

    banco.query(`DELETE FROM tb_usuario WHERE cd_usuario = '${id}'`, (error, result) => {
        if (!id) {
            return res.send('Usuario não encontrado')
        }

        if (error) {
            res.json(error)
            console.log(error);
        } else {
            res.send('Usuario deletado com sucesso!');
        }
    })
}


// Denuncias

exports.getReport = (req, res) => {
    const { nome, senha } = req.params;
    banco.query(`SELECT * FROM tb_denuncia as A INNER JOIN tb_usuario as B on a.fk_cd_usuario = b.cd_usuario and b.nm_usuario = $1 and b.cd_senha = $2`, [nome, senha], (error, result) => {
        if (result.rows.length > 0) {
            return res.status(200).send(result.rows)
        } else {
            return res.status(400).send('Nenhuma denuncia encontrada');
        }
    })
}