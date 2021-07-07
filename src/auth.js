const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const banco = require('postgres');


module.exports = function(passport){

    function findUser(nome){
        const { nome } = req.params;

    banco.query(`SELECT * FROM tb_usuario WHERE nm_usuario = $1 AND cd_senha = $2;`, [nome], (err, result) => {
        if (result.rows.length > 0) {
            console.log(result.rows);
            return res.send('Usuario encontrado!');

        } else {
            res.send('Usuario não existente');
        }
    });
    }
    
    function findUserById(id){
        return users.find(user => user._id === id);
    }

 }