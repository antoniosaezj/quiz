// MW que comprueba si el usuario está autenticado. Si no, se redirige a la pantalla de Login
exports.loginRequired = function(req, res, next) {
  if (req.session.user) {
    var fecha = Date.now();

    console.log('Entro en loginRequired con fecha=' + fecha + ' y fecha de inicio de transacción=' + req.session.fechainicio);

    if ((((fecha - req.session.fechainicio)/1000)/60) > 2 && req.session.inicio_transaccion_guardada) {
      req.session.inicio_transaccion_guardada = false;
      res.redirect("/logout");

    } else {
      req.session.fechainicio = Date.now();
      req.session.inicio_transaccion_guardada = true;
      next();
    }
  } else {
    res.redirect("/login");
  }
};

// GET /login
exports.new = function(req, res) {
  var errors = req.session.errors || {};
  req.session.errors = {};

  res.render('sessions/new', {errors: errors});
};

// POST /login
exports.create = function(req, res) {

  var login = req.body.login;
  var password = req.body.password;

  var userController = require('./user_controller');
  userController.autenticar(login, password, function(error, user) {
    if (error) {
      req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
      res.redirect("/login");
      return;
    }

    req.session.user = {id: user.id, username: user.username};

    res.redirect(req.session.redir.toString());
  });
};

// DELETE /logout
exports.destroy = function(req, res) {
  delete req.session.user;
  res.redirect(req.session.redir.toString());
};

