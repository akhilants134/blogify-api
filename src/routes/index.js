express.Router()

const postRouter = require('./posts.routes.js');
router.use('/posts', postRouter);