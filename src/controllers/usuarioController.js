const banco = require('../postgres');

exports.get = (req, res, next) => {
    res.send('Chegou aqui no controller');
    
    banco.query(`SELECT * FROM tb_usuario;`, (err, result) => {
        if (err) {
            console.log("Error - Failed to select all from Users");
            console.log(err);
        }
        else{
              console.log(result.rows);
          }
    });    
}