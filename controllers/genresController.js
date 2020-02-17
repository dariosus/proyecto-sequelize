let db = require("../models");
const { check, validationResult, body } = require('express-validator');

let genresController = {
    list: function(req, res) {
        db.Genre.findAll()
          .then(function(genres) {
              res.render("genres/genres", {genres: genres});
          });
    },
    detail: function(req, res) {
        db.Genre.findByPk(req.params.id, {
          include: [
            { association: "movies" }
          ]
        })
          .then(function(genre) {
              res.render("genres/genre", {genre: genre});
          });
    },
    add: function(req, res) {
      res.render("genres/addGenre", {errors: req.customErrors});

    },
    create: function(req, res) {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.customErrors = errors.errors;
        genresController.add(req, res);
      } else {
        genresController.commitCreate(req, res);
      }
    },
    commitCreate: function(req, res) {
        db.Genre.create({
          name: req.body.name,
          ranking: req.body.ranking,
        })
          .then(function() {
            res.redirect("/genres");
          })
          .catch(function(e) {
            res.render("error", {error: "There was an error creating the genre"});
          })
    },
    edit: function(req, res) {
      db.Genre.findByPk(req.params.id)
        .then(function(genre) {
          res.render("genres/editGenre", {genre:genre, errors: req.customErrors})
        })
    },
    update: function(req, res) {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.customErrors = errors.errors;
        genresController.edit(req, res);
      } else {
        genresController.commitUpdate(req, res);
      }
    },
    commitUpdate: function(req, res) {
      db.Genre.update({
        name: req.body.name,
        ranking: req.body.ranking,
      }, {
        where: [
          { id: req.params.id }
        ]
      })
        .then(function() {
          res.redirect("/genres/" + req.params.id);
        })
        .catch(function(e) {
          res.render("error", {error: "There was an error updating the genre " + req.params.id});
        })
    },
    delete: function(req, res) {
      let idGenre = req.body.id;

      db.Movie.findAll({
        where: [
          { genre_id: idGenre }
        ]
      }).then(function(movies) {
        if (movies.length > 0) {
          res.render("error", {error: "You have to delete the genre's movies before deleting the genre itself"});
        } else {
          db.Genre.destroy({
            where: [
              {id: idGenre}
            ]
          })
            .then(function() {
              res.redirect("/genres");
            })
            .catch(function(e) {
              res.render("error", {error: "Unexpected error deleting genre "  + idGenre});
            })
        }
      })
    }
};

module.exports = genresController;
