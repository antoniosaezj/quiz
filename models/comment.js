// definición del modelo de datos de la tabla COMMENT 
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Comment',
                                   { texto: {
                                             type:     DataTypes.STRING,
                                             validate: { notEmpty: { msg: "-> Falta comentario" }}
                                               },
                                     publicado: {
                                                 type: DataTypes.BOOLEAN,
                                                 defaultValue: false
                                                }
                                   }
                           );
};
