const Post = require('../models/PostModels');

class PostController {
	async findAllPosts(req, res) {
		try {
			const catalogue = await Post.find({});
			res.send(catalogue);
		} catch (error) {
			res.send({ message: error });
			console.log('====  error  ====>', error);
		}
	}

	async singlePost(req, res) {
		try {
			console.log('is there anything happening around here????');
			const post = await Post.find({});
			res.send(post);
		} catch (error) {
			res.send({ message: error });
			console.log('====  error  ====>', error);
		}
	}

	async createPost(req, res) {
		try {
			console.log('Body: ', req.body);
			const data = req.body;
			const newBlogPost = new Post(data);
			//save
			newBlogPost.save((error) => {
				if (error) {
					console.log(error);
					res
						.status(500)
						.json({ msg: 'Sorry, internal server errors ======>', error });
				} else {
					res.json({
						msg: 'Your data has been saved !!!',
					});
				}
			});
		} catch (error) {
			console.log('error ======>', error);
		}
	}

	async deletePost(req, res) {
		let { _id } = req.body;
		try {
			console.log('====  ENTER deletePost, body = ', req.body);
			const deleted = await Post.deleteOne({ id: _id });
			return res.send({ deleted });
		} catch (error) {
			res.send({ message: error });
			console.log('====  error  ====>', error);
		}
	}
}

module.exports = new PostController();
