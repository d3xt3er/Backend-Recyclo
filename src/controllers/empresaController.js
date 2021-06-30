const banco = require('../postgres');

exports.get = (req, res) => {

    const { nome, senha } = req.params;


    banco.query(`SELECT * FROM tb_empresa WHERE nm_empresa = $1 AND cd_senha = $2;`, [nome, senha], (err, result) => {
        if (result.rows.length > 0) {
            console.log(result.rows);
            return res.send('Usuario encontrado!');

        } else {
            res.send('Usuario não existente');
        }
    });
}


exports.getCompanyById = (req, res) => {
    const id = parseInt(req.params.id)

    banco.query('SELECT nm_empresa FROM tb_empresa WHERE cd_empresa = $1', [id], (error, results) => {
        if (error) {
            throw error
        } else {
            console.log(results.rows);

            //  Mostra um array com o objeto JSON
            //  res.status(200).send(results.rows)

            //  Mostra o objeto JSON
            //  res.status(200).send(results.rows[0])

            //  Mostra o texto
            res.status(200).send(results.rows[0].nm_empresa)
        }
    })
}

exports.post = (req, res) => {

    const { id, nome, cnpj, telefone, email, senha } = req.body

    banco.query('INSERT INTO tb_empresa (cd_empresa, nm_empresa, cd_cnpj, cd_telefone, ds_email, cd_senha_empresa) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [id, nome, cnpj, telefone, email, senha], (error, results) => {
        if (error) {
            res.send('Desculpe, houve um erro!');
            console.log(error);
        } else {
            res.send('Cadastrado com sucesso!');
        }
    })
}


exports.put = (req, res) => {
    const { id, nome, senha } = req.body

    banco.query(`UPDATE tb_empresa SET nm_empresa = '${nome}', cd_senha_empresa = '${senha}' WHERE cd_empresa = ${id}`, (error, result) => {
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

    banco.query(`DELETE FROM tb_empresa WHERE cd_empresa = '${id}'`, (error, result) => {
        if (!id) {
            return res.send('Usuario não encontrado!')
        }

        if (error) {
            res.json(error)
            console.log(error);
        } else {
            res.send('Usuario deletado com sucesso!');
        }
    })
}