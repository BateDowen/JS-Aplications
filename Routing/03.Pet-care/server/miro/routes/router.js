const router = require('express').Router();
const dashController = require('./controllers/dash');

router.get('/data/pets', dashController.getDashboard)
module.exports = router