var express = require('express');
var router = express.Router();
let moviesController = require("../controllers/moviesController");

let movieValidations = require("../middlewares/validators/movieValidator");

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
