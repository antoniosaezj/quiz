// Importamos el modelo de datos
var models = require('../models/models.js');

// Estadísticas de la aplicación
exports.statistics = function(req, res) {

  //var num_preguntas, num_comentarios, preguntas_comentarios;
  var statistics = {num_preguntas: 0, num_comentarios: 0, preguntas_comentarios: 0, media_comentarios: 0, preguntas_sin_comentarios: 0};

  models.Quiz.count()
    .then(function(count) { 
             statistics.num_preguntas = count; 
             models.Comment.count()
               .then(function(count) { 
                       statistics.num_comentarios = count;
                       models.Comment
                         .aggregate('QuizId', 'count', { distinct: true
                                }).then(function(count) { 
                                          statistics.preguntas_comentarios = count;
                                          statistics.media_comentarios = (statistics.num_comentarios/statistics.num_preguntas);
                                          statistics.preguntas_sin_comentarios = (statistics.num_preguntas - statistics.preguntas_comentarios);
                                          res.render('quizes/statistics', {statistics: statistics, errors: []});
                                        });
                     });
          });
};
 
