const { check, validationResult, body } = require('express-validator');

module.exports = [
  check("title").isLength( {min:3} ).withMessage("The movie's title must be at least 3 characters long"),
  check("length").isInt({min:0, max:500}).withMessage("The movie's length must be an integer between 0 and 500"),
  check("awards").isInt({min:0, max:100}).withMessage("The movie's awards must be an integer between 0 and 100"),
  check("release_date").custom(isValidDate).withMessage("You must select a release date for the film"),
  check("rating").isFloat({min: 0, max: 10}).withMessage("The movie's length must be between 0 and 10"),
  check("genre").isInt().withMessage("You must select a genre for the movie")
];

function isValidDate(value) {
  if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

  const date = new Date(value);
  if (!date.getTime()) return false;
  return date.toISOString().slice(0, 10) === value;
}
