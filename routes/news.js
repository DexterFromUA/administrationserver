const router = require("express").Router();
const controller = require('../controllers/news');

router.get('/', controller.getAll);

module.exports = router;