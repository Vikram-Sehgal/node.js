const store = require('./data');

module.exports = {
	get(req, res) {
		res.send(store.posts[req.params.postId].comments);
	},

	post(req, res) {
		if (!Array.isArray(store.posts[req.params.postId].comments)) store.posts[req.params.postId].comments = [];
		store.posts[req.params.postId].comments[store.posts[req.params.postId].comments.length] = req.body;
		res.status(201).send('comments created');
	},

	put(req, res) {
		store.posts[req.params.postId].comments[req.params.commentId] = req.body;
		res.status(200).send('comments updated');
	},

	del(req, res) {
		store.posts[req.params.postId].comments.splice(req.params.commentId, 1);
		res.status(204).send();
	}
};
