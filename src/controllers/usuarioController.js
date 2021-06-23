const banco = require('../postgres');

exports.get = (req, res) => {

    const { nome, senha } = req.params;


    banco.query(`SELECT * FROM tb_usuario WHERE nm_usuario = $1 AND cd_senha = $2;`, [nome, senha], (err, result) => {
        if (result.rows.length > 0) {
            console.log(result.rows);
            return res.send('Usuario encontrado!');

        } else {
            res.send('Usuario não existente');
        }
    });
}


exports.getUserById = (req, res) => {
    const id = parseInt(req.params.id)

    banco.query('SELECT nm_usuario FROM tb_usuario WHERE cd_usuario = $1', [id], (error, results) => {
        if (error) {
            throw error
        } else {
            console.log(results.rows);

            //  Mostra um array com o objeto JSON
            //  res.status(200).send(results.rows)

            //  Mostra o objeto JSON
            //  res.status(200).send(results.rows[0])

            //  Mostra o texto
            res.status(200).send(results.rows[0].nm_usuario)
        }
    })
}

exports.post = (req, res) => {

    const { id, nome, senha } = req.body

    banco.query('INSERT INTO tb_usuario (cd_usuario, nm_usuario, cd_senha) VALUES ($1, $2, $3) RETURNING *', [id, nome, senha], (error, results) => {
        if (error) {
            res.json(error);
            console.log(error);
        } else {
            res.send('Cadastrado com sucesso!');
        }
    })
}


exports.put = (req, res) => {
    const { id, nome, senha } = req.body

    banco.query(`UPDATE tb_usuario SET nm_usuario = '${nome}', cd_senha = '${senha}' WHERE cd_usuario = ${id}`, (error, result) => {
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