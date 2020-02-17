var express = require('express');
var router = express.Router();
let actorsController = require("../controllers/actorsController");

let actorsValidations = require("../middlewares/validators/actorValidator");

router.get('/', actorsController.list);

router.get('/add', actorsController.add);

router.post('/add', actorsValidations, actorsController.create);

router.delete('/delete', actorsController.delete);

router.get('/:id', actorsController.detail);

router.get('/edit/:id', actorsController.edit);

router.put('/edit/:id', actorsValidations, actorsController.update);


module.exports = router;
