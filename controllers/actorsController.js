let db = require("../models");
const { check, validationResult, body } = require('express-validator');

let actorsController = {
    list: function(req, res) {
        db.Actor.findAll()
          .then(function(actors) {
              res.render("actors/actors", {actors: actors});
          });
    },
    detail: function(req, res) {
        db.Actor.findByPk(req.params.id, {
          include: [
            { association: "movies" },
            { association: "favorite_movie" }
          ]
        })
          .then(function(actor) {
              res.render("actors/actor", {actor: actor});
          });
    },
    add: function(req, res) {
        db.Movie.findAll()
          .then(function(movies) {
            res.render("actors/addActor", {movies:movies, errors: req.customErrors});
          })
    },
    create: function(req, res) {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.customErrors = errors.errors;
        actorsController.add(req, res);
      } else {
        actorsController.commitCreate(req, res);
      }
    },
    commitCreate: function(req, res) {
        db.Actor.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          rating: req.body.rating,
          favorite_movie_id: req.body.favorite_movie
        })
          .then(function() {
            res.redirect("/actors");
          })
          .catch(function(e) {
            res.render("error", {error: "There was an error creating the actor"});
          })
    },
    edit: function(req, res) {
      let promiseActor= db.Actor.findByPk(req.params.id, {
        include: [
          { association: "favorite_movie" }
        ]
      })

      let promiseMovies = db.Movie.findAll();

      Promise.all([promiseActor, promiseMovies])
        .then(function([actor, movies]) {
          res.render("actors/editActor", {movies:movies, actor: actor, errors: req.customErrors})
        })
    },
    update: function(req, res) {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.customErrors = errors.errors;
        actorsController.edit(req, res);
      } else {
        actorsController.commitUpdate(req, res);
      }
    },
    commitUpdate: function(req, res) {
      db.Actor.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        rating: req.body.rating,
        favorite_movie_id: req.body.favorite_movie
      }, {
        where: [
          { id: req.params.id }
        ]
      })
        .then(function() {
          res.redirect("/actors/" + req.params.id);
        })
        .catch(function(e) {
          res.render("error", {error:"There was an error updating the movie " + req.params.id});
        })
    },
    delete: function(req, res) {
      let idActor = req.body.id;

      db.Actor_Movie.destroy({
        where: [
          {actor_id: idActor}
        ]
      })
        .then(function() {
          db.Actor.destroy({
            where: [
              {id: idActor}
            ]
          })
            .then(function() {
              res.redirect("/actors");
            })
            .catch(function(e) {
              res.render("error", {error: "There was an error deleting actor " + idActor})
            })
        })
        .catch(function(e) {
          res.render("error", {error: "There was an error deleting actor " + idActor})
        })
    }
};

module.exports = actorsController;
