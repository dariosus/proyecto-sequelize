module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.DOUBLE
        },
        length: {
            type: DataTypes.INTEGER
        },
        awards: {
            type: DataTypes.INTEGER
        },
        release_date: {
            type: DataTypes.DATE
        },
        genre_id: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: "movies",
        timestamps: false
    };

    const Movie = sequelize.define("Movie", cols, config);

    Movie.associate = function(models) {
        Movie.hasMany(models.Actor, {
          as: "favorite_by",
          foreignKey: "favorite_movie_id"
        });

        Movie.belongsTo(models.Genre, {
          as: "genre",
          foreignKey: "genre_id"
        });

        Movie.belongsToMany(models.Actor, {
          as: "actors",
          through: "actor_movie",
          foreignKey: "movie_id",
          otherKey: "actor_id",
          timestamps: false
        });
    }

    return Movie;

}
