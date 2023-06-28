const router = require('express').Router();
const dashController = require('./controllers/dash');

router.get('/data/pets', dashController.getDashboard);

router.get('/data/pets/:petId', dashController.getById);

router.post('/data/pets', dashController.createPost);


module.exports = router