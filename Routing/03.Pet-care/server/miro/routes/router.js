const router = require('express').Router();
const authController = require('./controllers/auth');
const dashController = require('./controllers/dash');

router.get('/data/pets', dashController.getDashboard);

router.get('/data/pets/:petId', dashController.getById);

router.post('/data/pets', dashController.createPost);

router.post('/users/register', authController.register);


module.exports = router