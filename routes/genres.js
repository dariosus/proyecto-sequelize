var express = require('express');
var router = express.Router();
let genresController = require("../controllers/genresController");

let genresValidations = require("../middlewares/validators/genreValidator");

router.get('/', genresController.list);

router.get('/add', genresController.add);

router.post('/add', genresValidations, genresController.create);

router.delete('/delete', genresController.delete);

router.get('/:id', genresController.detail);

router.get('/edit/:id', genresController.edit);

router.put('/edit/:id', genresValidations, genresController.update);


module.exports = router;
