// Importamos manejador de MODELS
var models = require('../models/models.js');

// Autoload de comentarios
exports.load = function(req, res, next, commentId) {
  models.Comment.find({
                       where: {
                               id: Number(commentId)
                              }
                     }).then(function(comment) {
                               if (comment) {
                                 req.comment = comment;
                                 next();
                               } else { next(new Error('No existe commentId=' + commentId))}
                             }
                     ).catch(function(error){next(error)});
};

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

// puT /quizes/:quizId/comments/:commenId/publish
exports.publish = function(req, res) {
  req.comment.publicado = true;

  req.comment.save( {fields: ["publicado"]})
    .then(function(){res.redirect('/quizes/' + req.params.quizId);})
    .catch(function(error){next(error)});
};
