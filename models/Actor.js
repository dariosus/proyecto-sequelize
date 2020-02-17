module.exports = (sequelize, DataTypes) => {

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.DOUBLE
        },
        favorite_movie_id: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: "actors",
        timestamps: false
    };

    const Actor = sequelize.define("Actor", cols, config);

    Actor.associate = function(models) {
        Actor.belongsTo(models.Movie, {
          as: "favorite_movie",
          foreignKey: "favorite_movie_id"
        });

        Actor.belongsToMany(models.Movie, {
          as: "movies",
          through: "actor_movie",
          foreignKey: "actor_id",
          otherKey: "movie_id",
          timestamps: false
        });
    }

    return Actor;

}
