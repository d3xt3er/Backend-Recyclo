const banco = require('../postgres');

exports.get = (req, res) => {

    const { nome, senha } = req.params;


    banco.query(`SELECT * FROM tb_usuario WHERE nm_usuario = $1 AND cd_senha = $2;`, [nome, senha], (err, result) => {
        if (result.rows.length > 0) {
            // console.log(result.rows);
            res.send('Usuario encontrado!');
            // return res.status(200).send(result.rows[0].nm_usuario + result.rows[0].cd_senha + result.rows[0].cd_cpf + result.rows[0].ds_email);

        } else {
            res.send('Usuario não existente');
        }
    });
}

exports.getUser = (req, res) => {

    const { nome, senha } = req.params;


    banco.query(`SELECT * FROM tb_usuario WHERE nm_usuario = $1 AND cd_senha = $2;`, [nome, senha], (err, result) => {
        if (result.rows.length > 0) {
            // console.log(result.rows);
            return res.status(200).send(result.rows[0])
                // return res.status(200).send(result.rows[0].nm_usuario + " " + result.rows[0].cd_senha + " " + result.rows[0].cd_cpf + " " + result.rows[0].ds_email);

        } else {
            res.send('Informações não encontradas!');
        }
    });
}


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

exports.post = (req, res) => {

    // const id = req.body;
    const { nome, email, senha, cpf } = req.body

    banco.query(`INSERT INTO tb_usuario (cd_usuario, nm_usuario, ds_email, cd_senha, cd_cpf) VALUES ((select novoId()), $1, $2, $3, $4) RETURNING *`, [nome, email, senha, cpf], (error, results) => {
        if (error) {
            res.json(error);
            console.log(error);
        } else {
            res.send('Cadastrado com sucesso!');
        }
    })
}



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