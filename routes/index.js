var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: "Antonio's Quiz 2015" });
});

// GET Página de Créditos
router.get('/author', function(req, res) {
  res.render('author', { title: "Antonio's Quiz 2015" });
});

// GET Páginas de preguntas y reespuestas
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;
