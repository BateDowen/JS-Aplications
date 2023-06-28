const router = require('express').Router();
const dashController = require('./controllers/dash');

router.get('/data/pets', dashController.getDashboard);

router.post('/data/pets', dashController.createPost);


module.exports = router