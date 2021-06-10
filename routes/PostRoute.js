const express = require('express'),
	router = express.Router();
controller = require('../controllers/PostController');

router.get('/', controller.findAllPosts);
router.get('/:id', controller.singlePost);
router.post('/create', controller.createPost);
router.delete('/:id', controller.deletePost);

module.exports = router;
