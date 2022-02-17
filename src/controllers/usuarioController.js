const banco = require('../postgres');
const nodemailer = require("nodemailer");

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
exports.postUser = (req, res) => {

    banco.query(`SELECT * FROM tb_usuario WHERE ds_email = $1 OR cd_cpf = $2`, [req.body.email, req.body.cpf], (error, result) => {

        if (result.rows.length > 0) {
            return res.status(409).send('Usuário já cadastrado')
        } else {
            const { nome, email, senha, cpf, telefone } = req.body

            banco.query(`INSERT INTO tb_usuario (cd_usuario, nm_usuario, ds_email, cd_senha, cd_cpf, cd_telefone) VALUES ((select id('usuario')), $1, $2, $3, $4, $5) RETURNING *`, [nome, email, senha, cpf, telefone], (error, results) => {
                if (error) {
                    res.json(error);
                    console.log(error);
                } else {
                    res.send('Cadastrado com sucesso!');
                }
            })
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

    banco.query(`DELETE FROM tb_denuncia WHERE fk_cd_usuario = '${id}'`, (error, result) => {
        if (error) {
            res.json(error)
            console.log(error);
        } else {
            banco.query(`DELETE FROM tb_usuario WHERE cd_usuario = '${id}'`, (error,result) => {
                if (error) {
                    res.send('Desculpe, houve um erro!');
                    console.log(error);
                } else {
                    res.send('Usuario deletado com sucesso!');
                }
                
            })   
        }
    })
}


// Denuncias

exports.getReport = (req, res) => {
    const { email, senha } = req.params;

    banco.query(`SELECT * FROM tb_denuncia as A INNER JOIN tb_usuario as B on a.fk_cd_usuario = b.cd_usuario and b.ds_email = $1 and b.cd_senha = $2;`, [email, senha], (error, result, fields) => {

        console.log(result);
        if (result.rows.length > 0) {
            return res.status(200).send(result.rows)
        } else {
            return res.status(400).send('Nenhuma denuncia cadastrado');
        }

    })
}

exports.postReport = (req, res) => {

    const { id, nm_logradouro, ds_comentario, cd_localizacao } = req.body

    banco.query(`select novodiscarteilegal('${nm_logradouro}','${ds_comentario}',${id},'${cd_localizacao}');`, (error, result) => {
        if (error) {
            res.json(error);
            console.log(error);
        } else {
            res.send('Denuncia efetuada');
        }
    })

}

exports.putReport = (req, res) => {
    const { id_denuncia, nome, logradouro } = req.body;

    banco.query(`UPDATE tb_denuncia SET nm_logradouro = '${nome}', ds_comentario = '${logradouro}' WHERE cd_denuncia = '${id_denuncia}'`, (error, result) => {
        if (!id_denuncia) {
            res.send('Denúncia não alterada')
        }
        if (error) {
            res.json(error)
        } else {
            res.send('Denúncia alterada com sucesso!')
        }
    })
}

exports.deleteReport = (req, res) => {
    const { id_denuncia, id_usuario } = req.body

    banco.query(`DELETE FROM tb_denuncia WHERE cd_denuncia = '${id_denuncia}' AND fk_cd_usuario = '${id_usuario}'`, (error, result) => {
        if (!id_denuncia) {
            return res.send('Denúncia não deletada!')
        }

        if (error) {
            res.json(error)
            console.log(error);
        } else {
            res.send('Denúncia deletada com sucesso!');
        }
    })
}


exports.verifyUser = (req, res) => {

    const { email } = req.params;

    banco.query(`SELECT * FROM tb_usuario WHERE ds_email = $1 `, [email], (err, result) => {
        if (result.rows.length > 0) {
            res.send('Usuario encontrado!');

        } else {
            res.send('Usuario não existente');
        }
    });
}


exports.putPassword = (req, res) => {
    var someDate = new Date();
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    var someFormattedDate = dd + '/' + mm + '/' + y;
    var time = someDate.getHours() + ":" + someDate.getMinutes() + ":" + someDate.getSeconds();

    const { email, senha } = req.body

    banco.query(`UPDATE tb_usuario SET cd_senha = '${senha}' WHERE ds_email = '${email}'`, (error, result) => {
        if (!email) {
            res.send('Não alterado!')
        }
        if (error) {
            res.json(error)
        } else {
            res.send('Alterado com sucesso!')
        }

        // Envio de email ao usuário ao resetar senha
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'recyclo.cp@gmail.com',
                pass: '#Y^pVvyE3'
            }
        });

        const mailOptions = {
            from: 'Recyclo <recyclo.cp@gmail.com>',
            to: email,
            subject: 'Alteração de senha',
            text: `Houve recentemente um alteração na sua senha de acesso a conta em nosso sistema Recyclo!, A operação foi realizada em ${someFormattedDate} às ${time}`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });

    })
}