const banco = require('../postgres');

// Login - Empresa
exports.get = (req, res) => {

    const { nome, senha } = req.params;


    banco.query(`SELECT * FROM tb_empresa WHERE nm_empresa = $1 AND cd_senha_empresa = $2;`, [nome, senha], (err, result) => {
        if (result.rows.length > 0) {
            console.log(result.rows);
            return res.send('Usuario encontrado!');

        } else {
            res.send('Usuario não existente');
        }
    });
}

// Exibir informações - Empresa
exports.getCompany = (req, res) => {

    const { nome, senha } = req.params;


    banco.query(`SELECT * FROM tb_empresa WHERE nm_empresa = $1 AND cd_senha_empresa = $2;`, [nome, senha], (err, result) => {
        if (result.rows.length > 0) {
            return res.status(200).send(result.rows[0])

        } else {
            res.send('Informações não encontradas!');
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

// Adicionar Ponto
exports.point = (req, res) => {

    const { nome, endereco, id, latitude, longitude } = req.body

    banco.query('INSERT INTO tb_ponto_coleta (cd_ponto_coleta, nm_ponto, nm_logradouro, fk_cd_empresa, cd_latitude_ponto, cd_longitude_ponto) VALUES ((select novoidponto()),$1, $2, $3, $4, $5) RETURNING *', [nome, endereco, id, latitude, longitude], (error, result) => {
        if (error) {
            res.send('Desculpe, seu ponto não foi cadastrado!')
        } else {
            res.send('Ponto cadastrado!');
        }
    })
}


// Exibir Ponto coleta
exports.getPoint = (req, res) => {

    const { nome, senha } = req.params;


    banco.query(`SELECT * FROM tb_ponto_coleta as A INNER JOIN tb_empresa as B on a.fk_cd_empresa = b.cd_empresa and b.nm_empresa = $1 and b.cd_senha_empresa = $2;`, [nome, senha], (err, result) => {
        if (result.rows.length > 0) {
            return res.status(200).send(result.rows)
        } else {
            return res.status(400).send('Nenhum ponto cadastrado');
        }
    });
}

// Cadastro - Empresa
exports.post = (req, res) => {

    const { nome, cnpj, telefone, email, senha } = req.body

    banco.query('INSERT INTO tb_empresa (cd_empresa, nm_empresa, cd_cnpj, cd_telefone, nm_email, cd_senha_empresa) VALUES ((select novoidempresa()), $1, $2, $3, $4, $5) RETURNING *', [nome, cnpj, telefone, email, senha], (error, results) => {
        if (error) {
            res.send('Desculpe, houve um erro!');
            console.log(error);
        } else {
            res.send('Cadastrado com sucesso!');
        }
    })
}

// Alterar cadastro - Empresa
exports.put = (req, res) => {
    const { id, nome, senha, telefone } = req.body

    banco.query(`UPDATE tb_empresa SET nm_empresa = '${nome}', cd_senha_empresa = '${senha}', cd_telefone = '${telefone}' WHERE cd_empresa = ${id}`, (error, result) => {
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

// Alterar ponto coleta
exports.putPoint = (req, res) => {
    const { id, nome, logradouro } = req.body;

    banco.query(`UPDATE tb_ponto_coleta SET nm_ponto = '${nome}', nm_logradouro = '${logradouro}' WHERE cd_ponto_coleta = ${id}`, (error, result) => {
        if (!id) {
            res.send('Ponto não encontrado')
        }
        if (error) {
            res.json(error)
        } else {
            res.send('Alterado com sucesso!')
        }
    })
}

// Deletar Cadastro - Empresa
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

// Deletear Ponto Coleta - Empresa
exports.deletePoint = (req, res) => {
    const { id, id_empresa } = req.body

    banco.query(`DELETE FROM tb_ponto_coleta WHERE cd_ponto_coleta = '${id}' AND fk_cd_empresa = '${id_empresa}'`, (error, result) => {
        if (!id) {
            return res.send('Ponto não deletado!')
        }

        if (error) {
            res.json(error)
            console.log(error);
        } else {
            res.send('Ponto deletado com sucesso!');
        }
    })
}