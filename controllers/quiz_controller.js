// Importamos manejador de MODELS
var models = require('../models/models.js');

// Autoload
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId));}
    }
  ).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {
  var busqueda = "%";  
  
  if (req.query.search !== undefined) {
    busqueda = req.query.search.replace(/\s+/g, "%"); //"%" + req.query.search + "%";
  
    if (busqueda !== '%') {
      busqueda = "%" + busqueda + "%";
    }
  }

  models.Quiz.findAll({where: ["pregunta like ?", busqueda], order: [["pregunta", "ASC"]]}).then(function (quizes) {
    res.render('quizes/index', { quizes: quizes});
  })
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';

  if (req.query.respuesta === req.quiz.respuesta){
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    { pregunta: "Pregunta", respuesta: "Respuesta"}
    );

  res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

  // guarda en la BD y redirecciona a /quizes
  quiz.save({fields: ["pregunta","respuesta"]})
    .then(function() {
      res.redirect('/quizes');
    });
};
