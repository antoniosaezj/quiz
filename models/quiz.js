// definición del modelo de datos de la tabla QUIZ
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Quiz',
                        {pregunta: DataTypes.STRING,
                         respuesta: DataTypes.STRING});
};
