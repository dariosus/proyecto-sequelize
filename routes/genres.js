var express = require('express');
var router = express.Router();
let genresController = require("../controllers/genresController");
const { check, validationResult, body } = require('express-validator');

let genresValidations = [
  check("name").isLength( {min:3} ).withMessage("The genre's name must be at least 3 characters long"),
  check("ranking").isInt({min: 0, max: 100}).withMessage("The genres's ranking must be an integer between 0 and 100"),
];

router.get('/', genresController.list);

router.get('/add', genresController.add);

router.post('/add', genresValidations, genresController.create);

router.delete('/delete', genresController.delete);

router.get('/:id', genresController.detail);

router.get('/edit/:id', genresController.edit);

router.put('/edit/:id', genresValidations, genresController.update);


module.exports = router;
