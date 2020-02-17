const { check, validationResult, body } = require('express-validator');

module.exports = [
  check("first_name").isLength( {min:3} ).withMessage("The actor's first name must be at least 3 characters long"),
  check("last_name").isLength( {min:3} ).withMessage("The actor's last name must be at least 3 characters long"),
  check("rating").isFloat({min: 0, max: 10}).withMessage("The actors's length must be between 0 and 10"),
  check("favorite_movie").isInt().withMessage("You must select a favorite movie for the actor")
];
