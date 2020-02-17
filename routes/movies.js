var express = require('express');
var router = express.Router();
let moviesController = require("../controllers/moviesController");
const { check, validationResult, body } = require('express-validator');

function isValidDate(value) {
  if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

  const date = new Date(value);
  if (!date.getTime()) return false;
  return date.toISOString().slice(0, 10) === value;
}

let movieValidations = [
  check("title").isLength( {min:3} ).withMessage("The movie's title must be at least 3 characters long"),
  check("length").isInt({min:0, max:500}).withMessage("The movie's length must be an integer between 0 and 500"),
  check("awards").isInt({min:0, max:100}).withMessage("The movie's awards must be an integer between 0 and 100"),
  check("release_date").custom(isValidDate).withMessage("You must select a release date for the film"),
  check("rating").isFloat({min: 0, max: 10}).withMessage("The movie's length must be between 0 and 10"),
  check("genre").isInt().withMessage("You must select a genre for the movie")
];

router.get('/', moviesController.list);

router.get('/add', moviesController.add);

router.get('/new', moviesController.new);

router.get('/recommended', moviesController.recommended);

router.get('/search', moviesController.search);

router.post('/add', movieValidations, moviesController.create);

router.delete('/delete', moviesController.delete);

router.get('/:id', moviesController.detail);

router.get('/edit/:id', moviesController.edit);

router.put('/edit/:id', movieValidations, moviesController.update);


module.exports = router;
