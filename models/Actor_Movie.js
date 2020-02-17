module.exports = (sequelize, DataTypes) => {

    let cols = {

    };

    let config = {
        tableName: "actor_movie",
        timestamps: false
    };

    const Actor_Movie = sequelize.define("Actor_Movie", cols, config);

    return Actor_Movie;

}
