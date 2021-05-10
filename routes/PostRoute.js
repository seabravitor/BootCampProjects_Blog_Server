const express       = require('express'), 
    router          = express.Router();
    controller      = require('../controllers/PostController');

router.get('/', controller.findAllPosts);
router.post('/create', controller.createPost);

module.exports = router;