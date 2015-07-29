// Importamos manejador de MODELS
var models = require('../models/models.js');

// GET /quizes/:id/comments/new
exports.new = function(req, res) {
  res.render('comments/new', { quizid: req.params.quizId, errors: []});
};

// POST /comments/create
exports.create = function(req, res) {
  var comment = models.Comment.build(
                  { texto: req.body.comment.texto,
                    QuizId: req.params.quizId });

  comment 
    .validate()
    .then(
      function (err) {
        if (err) {
          res.render('comments/new.ejs', 
               { comment: comment, quizid: req.param.quizid, errors: err.errors});
        } else {
          // guarda en la BD y redirecciona a /quizes
          comment 
            .save()
            .then(function() {
                               res.redirect('/quizes/' + req.params.quizId);
                             }
                 );
        }
      }
    ).catch(function() {next(error);});
};
