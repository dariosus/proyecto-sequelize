const { check, validationResult, body } = require('express-validator');

module.exports = [
  check("name").isLength( {min:3} ).withMessage("The genre's name must be at least 3 characters long"),
  check("ranking").isInt({min: 0, max: 100}).withMessage("The genres's ranking must be an integer between 0 and 100"),
];
