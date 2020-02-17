let db = require("../models");
let op = db.Sequelize.Op;
const { check, validationResult, body } = require('express-validator');

let moviesController = {
    list: function(req, res) {
        db.Movie.findAll()
          .then(function(movies) {
              res.render("movies/movies", {movies: movies, title: "My Movies!"});
          });
    },
    recommended: function(req, res) {
        db.Movie.findAll({
          where: [
            { rating:  { [op.gte] : 8 } }
          ]
        })
          .then(function(movies) {
              res.render("movies/movies", {movies: movies, title: "Recommended Movies!"});
          });
    },
    search: function(req, res) {
        db.Movie.findAll({
          where: [
            { title:  { [op.like] : "%" + req.query.search + "%" } }
          ]
        })
          .then(function(movies) {
              res.render("movies/movies", {movies: movies, title: "Results for '" + req.query.search + "'"});
          });
    },
    new: function(req, res) {
        db.Movie.findAll({
          order: [
            ["release_date", "DESC"]
          ],
          limit: 5
        })
          .then(function(movies) {
              res.render("movies/movies", {movies: movies, title: "New Movies!"});
          });
    },
    detail: function(req, res) {
        db.Movie.findByPk(req.params.id, {
          include: [
            { association: "genre" },
            { association: "actors" }
          ]
        })
          .then(function(movie) {
              res.render("movies/movie", {movie: movie});
          });
    },
    add: function(req, res) {
        db.Genre.findAll()
          .then(function(genres) {
            res.render("movies/addMovie", {genres:genres, errors: req.customErrors});
          })
    },
    create: function(req, res) {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.customErrors = errors.errors;
        moviesController.add(req, res);
      } else {
        moviesController.commitCreate(req, res);
      }
    },
    commitCreate(req, res) {
      db.Movie.create({
        title: req.body.title,
        awards: req.body.awards,
        length: req.body.length,
        rating: req.body.rating,
        release_date: req.body.release_date,
        genre_id: req.body.genre
      })
        .then(function() {
          res.redirect("/movies");
        })
        .catch(function(e) {
          res.render("error", {error: "There was an error creating the movie"});
        })
    },
    edit: function(req, res) {
      let promiseMovie= db.Movie.findByPk(req.params.id, {
        include: [
          { association: "genre" },
          { association: "actors" }
        ]
      })

      let promiseGenres = db.Genre.findAll();

      Promise.all([promiseMovie, promiseGenres])
        .then(function([movie, genres]) {
          var date = new Date(movie.release_date);
          var onlyDate = date.toISOString().slice(0,10);
          res.render("movies/editMovie", {movie:movie, genres:genres, onlyDate: onlyDate, errors: req.customErrors})
        })
    },
    update: function(req, res) {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.customErrors = errors.errors;
        moviesController.edit(req, res);
      } else {
        moviesController.commitUpdate(req, res);
      }
    },
    commitUpdate: function(req, res) {
      db.Movie.update({
        title: req.body.title,
        awards: req.body.awards,
        length: req.body.length,
        rating: req.body.rating,
        release_date: req.body.release_date,
        genre_id: req.body.genre
      }, {
        where: [
          { id: req.params.id }
        ]
      })
        .then(function() {
          res.redirect("/movies/" + req.params.id);
        })
        .catch(function(e) {
          res.render("error", {error: "There was an error updating the movie " + req.params.id});
        })
    },
    delete: function(req, res) {
      let idMovie = req.body.id;

      let destroyPerfomances = db.Actor_Movie.destroy({
        where: [
          {movie_id: idMovie}
        ]
      })

      let updateFavoriteMovie = db.Actor.update({
        favorite_movie_id: null
      }, {
        where: [
          {favorite_movie_id: idMovie}
        ]
      });

      Promise.all([destroyPerfomances, updateFavoriteMovie])
        .then(function() {
          db.Movie.destroy({
            where: [
              {id: idMovie}
            ]
          })
            .then(function() {
              res.redirect("/movies");
            })
            .catch(function(e) {
              res.render("error", {error: "There was an error deleting movie " + idMovie});
            })
        })
        .catch(function(e) {
          res.render("error", {error: "There was an error deleting movie " + idMovie});
        })
    }
};

module.exports = moviesController;
