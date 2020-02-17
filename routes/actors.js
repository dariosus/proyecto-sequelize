var express = require('express');
var router = express.Router();
let actorsController = require("../controllers/actorsController");
const { check, validationResult, body } = require('express-validator');

let actorsValidations = [
  check("first_name").isLength( {min:3} ).withMessage("The actor's first name must be at least 3 characters long"),
  check("last_name").isLength( {min:3} ).withMessage("The actor's last name must be at least 3 characters long"),
  check("rating").isFloat({min: 0, max: 10}).withMessage("The actors's length must be between 0 and 10"),
  check("favorite_movie").isInt().withMessage("You must select a favorite movie for the actor")
];

router.get('/', actorsController.list);

router.get('/add', actorsController.add);

router.post('/add', actorsValidations, actorsController.create);

router.delete('/delete', actorsController.delete);

router.get('/:id', actorsController.detail);

router.get('/edit/:id', actorsController.edit);

router.put('/edit/:id', actorsValidations, actorsController.update);


module.exports = router;
