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

// Importar la definición de la tabla COMMENT de comment.js
var Comment = sequelize.import(path.join(__dirname, 'comment'));

// Añadimos relación entre las tablas QUIZ y COMMENT (1-N)
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // Exportar definición de la tabla Quiz
exports.Comment = Comment; // Exportar definición de la tabla Comment 

// Creamos e inicializamos la tabla Quiz
sequelize.sync({force: true}).then(function() {
  Quiz.count().then(function(count){
    if(count === 0) {
      Quiz.create({ pregunta: 'Capital de Italia',
                    respuesta: 'Roma',
                    tematica: 'Otro'
                  });
      Quiz.create({ pregunta: 'Capital de Portugal',
                    respuesta: 'Lisboa',
                    tematica: 'Otro'
                  });
      Quiz.create({ pregunta: 'Capital de España', 
                    respuesta: 'Madrid',
                    tematica: 'Otro'
                  })
      .then(function(){console.log('Base de Datos inicializada.');});
    }; // fin del if(count...
  }); // fin del Quiz.count...
}); // fin del sequelize.sync...
