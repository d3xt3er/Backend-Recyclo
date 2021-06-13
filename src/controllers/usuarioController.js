const banco = require('../postgres');

exports.get = (req, res, next) => {
    
    banco.query(`SELECT * FROM tb_usuario;`, (err, result) => {
        if (err) {
            console.log("Error - Failed to select all from Users");
            console.log(err);
        }
        else{
              console.log(result.rows);
            res.status(200).json(result.rows);
          }
    });    
}


exports.getUserById = (req, res, next) => {
    const id = parseInt(req.params.id)
  
    banco.query('SELECT nm_usuario FROM tb_usuario WHERE cd_usuario = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      else {
        console.log(results.rows);

          res.status(200).send(results.rows)
      }
    })
  }