const banco = require('../postgres');

// login - geral
exports.getAccount = (req, res)=>{

    const{ email, senha } = req.params;

    banco.query("SELECT login($1,$2);",[email,senha],(err, result) => {    
        if(result.rows.length>0){
            return res.status(200).send(result.rows[0]);
        }
        else{
            res.send('conta nao existente');
        }
    });
}