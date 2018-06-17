var express = require('express'),
    _       = require('lodash'),
    config  = require('../config'),
    jwt     = require('jsonwebtoken')
    db      = require('../db');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');


var app = module.exports = express.Router();

var secretKey = "don't share this key";
function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secretKey, { expiresIn: 60*60*5 });
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Headers: X-Requested-With');
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

function getUserById(Usuario, done){
  db.get().query('SELECT * FROM usuario WHERE idUsuario = ? LIMIT 1', [Usuario], function(err, rows, fields) {
    if (err) console.log('error');
    done(rows);
  });
}
function delUserDB(user,done){
  db.get().query('delete from usuario where idUsuario=?', [user], function(err, rows, fields) {
    if (err) console.log('error');
    //console.log(rows);
    done(rows);
  });
}
function getUsersDB(done) {
  db.get().query('SELECT * FROM usuario ', [], function(err, rows, fields) {
    if (err) console.log('error');
    done(rows);
  });
}
function updateContra(Contra,Recovery,token){
  db.get().query('update usuario set Contra=?,Recovery=? where Recovery=?', [Contra,Recovery,token], function(err, rows, fields) {
    if (err) console.log('error');
    //console.log(rows);

  });
}
function updateRecovery(Correo,Token){
  db.get().query('update usuario set Recovery=? where Correo=?', [Token,Correo], function(err, rows, fields) {
    if (err) console.log('error');
    //console.log(rows);

  });
}
function updateStatus(idUsuario,Status, done){
  db.get().query('update usuario set Status=? where idUsuario=?', [Status,idUsuario], function(err, rows, fields) {
    if (err) console.log('error');
    //console.log(rows);
    else
    done(rows);
  });
}
function getUserDB(Usuario, done) {
  console.log(Usuario);
  db.get().query('SELECT * FROM usuario WHERE Correo = ? or Recovery=? LIMIT 1', [Usuario,Usuario], function(err, rows, fields) {
    if (err) console.log('error');
    else
    done(rows[0]);
  });
}
function getPermisosDB(done) {
  db.get().query('SELECT * FROM permisos', function(err, rows, fields) {
    if (err) console.log('error');
    done(rows);
  });
}
function updateUsuario(idUsuario,Usuario, done){
  db.get().query('update usuario set Nombre=?,Apellido=?,Telefono=?,Correo=?,Contra=?,idPermiso=? where idUsuario=?', [Usuario.Nombre,Usuario.Apellido,Usuario.Telefono,Usuario.Correo,Usuario.Contra,Usuario.idPermiso,idUsuario], function(err, rows, fields) {
    if (err) console.log('error');
    //console.log(rows);
    done(rows);
  });
}

function recoveryToken(Correo,Token,done){
  recovery = {
    Token: Token,
    idUsuario: Correo,
  };
  db.get().query('INSERT INTO usuario SET ?', [recovery], function(err, result){
    if (err) console.log('error');else{
    console.log(rows);
    done(rows);}
  });
}
app.post('/user/create', function(req, res) {  
  if (!req.body.Correo || !req.body.Contra) {
    return res.status(400).send("Debes Proporcionar Correo Eletronico y Contraseña");
  }
  getUserDB(req.body.Correo, function(user){
    if(!user) {
      user = {
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Telefono: req.body.Telefono,
        Correo: req.body.Correo,
        Contra: req.body.Contra,
        idPermiso: req.body.idPermiso,
      };
      db.get().query('INSERT INTO usuario SET ?', [user], function(err, result){
        console.log(user);
        if (err) res.status(400).send("Error no Controlado");else{
        newUser = {
          Nombre: user.Nombre,
          Apellido: user.Nombre,
          Telefono: user.Telefono,
          Correo: user.Correo,
          Contra: user.Contra,
          idPermiso:user.idPermiso,
        };
        //console.log(newUser);
        result.status=201;
        res.json(result);}
      });
    }
    else res.status(400).send("Un usuario con este Correo Electronico ya Existe");
  });
});
app.post('/user/login', function(req, res) {
  //console.log(req.body);
  //console.log(res.body);
  if (!req.body.Correo || !req.body.Contra) {
    return res.status(400).send("Debes proporcionar el  Correo Electronico y la contraseña");
  }
  getUserDB(req.body.Correo, function(user){
    //console.log(user);
      //console.log(req.body);
    if (!user) {
      return res.status(401).send("Correo Electronico no existe");
    }
    if (String.fromCharCode.apply(null, new Uint16Array(user.Contra)) !== req.body.Contra) {
      return res.status(401).send("El Correo Electronico o la contraseña son invalidos");
    }
    res.status(201).send({
      id_token: createToken(user),
      dataUser:user
    });
  });
});
app.get('/user/check/:Correo', function(req, res) {
  if (!req.params.Correo) {
    return res.status(400).send("Debes Proporcionar el Correo Electronico");
  }
  getUserDB(req.params.Correo, function(user){
    if(!user) res.status(201).send({Usuario: "OK"});
    else res.status(400).send("Correo Electronico ya esta en uso");
  });
});
app.get('/user/all/', function(req, res) {
  getUsersDB(function(user){
    if(!user) res.status(400).send("No se encontraron coincidencias");
    else res.status(201).send(user);
  });
});
app.get('/user/permisos/', function(req, res) {
  getPermisosDB(function(permisos){
    res.status(201).send({
      Permisos:permisos
    });
  });
});
app.delete('/user/delete/:idUsuario',function(req,res){
  if (!req.params.idUsuario) {
    return res.status(400).send("No se pudo eliminar usuario, vuelve a intentarlo");
  }
  delUserDB(req.params.idUsuario, function(user){
    if(user.affectedRows==1){
      res.status(201).send("ok");
    }else{
      res.status(400).send("No se pudo eliminar,vuelva a intentarlo");
    }
  });
  });

  app.get('/user/:idUsuario',function(req, res) {
    //console.log(req.params.idUsuario);
    getUserById(req.params.idUsuario,function(user){
      user[0].Contra=String.fromCharCode.apply(null, new Uint16Array(user[0].Contra));
      res.status(201).send({
        User:user
      });
    });
  });
  app.put('/user/update/:idUsuario',function(req,res){
    Usuario = {
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Telefono: req.body.Telefono,
      Correo: req.body.Correo,
      Contra: req.body.Contra,
      idPermiso: req.body.idPermiso,
    };
    updateUsuario(req.params.idUsuario,Usuario, function(user){
      //console.log(req.params.idUsuario,Usuario);
      res.status(201).send("ok");
     });
    });
    app.put('/user/changeStatus/:idUsuario/:Status',function(req,res){
      //console.log(req.params.idUsuario,req.params.Status);
      updateStatus(req.params.idUsuario,req.params.Status, function(user){
        //console.log(req.params.idUsuario,Usuario);
        res.status(201).send("ok");
       });
      });
    

  app.post('/user/forgot', function(req, res) {
    console.log(req.body.Correo);
    if (!req.body.Correo) {
      return res.status(400).send("Debes Proporcionar el Correo Electronico");
    }
    getUserDB(req.body.Correo, function(user){
      if(user) {
        sendmail(user);
        res.status(201).send("Correo Enviado...")
      }
      else res.status(400).send("No se encontro Usuario Asociado a esta cuenta...");
    });
      
});
 function sendmail(user,token){

  var smtpTransport = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'expogeniosrecovery@gmail.com',
      pass: '1qaz4rfv2wsx3edc'
    }
  });
  var mailOptions = {
    to: user.Correo,
    from: 'expogeniosrecovery@gmail.com',
    subject: 'Expogenios, Recuperacion de Contraseña',
    text: 'Usted está recibiendo esto porque usted (u otra persona) ha solicitado que se restablezca la contraseña de su cuenta.\n\n' +
    'Haga clic en el siguiente enlace o pegue esto en su navegador para completar el proceso:\n\n' +
    'http://localhost:3000/users/reset/' + token + '\n\n' +
    'Si no lo solicitó, ignore este correo electrónico y su contraseña no se modificará.\n'
  };
  console.log(user.Correo);
  smtpTransport.sendMail(mailOptions, function(err) {
    console.log('mail sent');
   // done(err, 'done');
  });
}



app.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      getUserDB(req.body.Correo, function(user) {
        console.log(user,token);
        if (!user) {
          console.log("no se encontro cuenta");
        }else{
          updateRecovery(user.Correo,token);
          sendmail(user,token);
          res.status(201).send("ok");
        }
      });
    }
  ]);
});

app.get('/reset/:token', function(req, res) {
  
  getUserDB(req.params.token, function(user) {
    console.log(user);
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {
      user: req.user
    });
  });
});

app.post('/reset/:token', function(req, res) {
  getUserDB(req.params.token, function(user) {
    console.log(user);
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
        }
        user.Contra = req.body.password;
        user.Recovery = undefined;
        updateContra(user.Contra,user.Recovery,req.params.token);
        res.redirect('http://localhost:4200/login');

      });
    });


    






