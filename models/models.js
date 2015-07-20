var path = require('path');

// Recuperamos la BD según si estamos en DESARROLLO o PRODUCCION
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

// Cargar Sequelize
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(DB_name, user, pwd,
                      {dialect: protocol,
                       protocol: protocol,
                       port: port,
                       host: host,
                       storage: storage, // Para SQLite en el entorno de DESARROLLO
                       omitNull: true // para Posgres
                      }
                    );

// Importar la definición de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // Exportar definición de la tabla Quiz

// Creamos e inicializamos la tabla Quiz
sequelize.sync().success(function() {
  Quiz.count().success(function(count){
    if(count === 0) {
      Quiz.create({ pregunta: 'Capital de Italia',
                    respuesta: 'Roma'
                  }).success(function(){console.log('Base de Datos inicializada.');});
    };
  });
});
