module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        ranking: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: "genres",
        timestamps: false
    };

    const Genre = sequelize.define("Genre", cols, config);

    Genre.associate = function(models) {
        Genre.hasMany(models.Movie, {
          as: "movies",
          foreignKey: "genre_id"
        });
    }

    return Genre;

}
