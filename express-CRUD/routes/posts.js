const store = require('./data');

module.exports = {
	get(req, res) {
		res.send(store);
	},

	post(req, res) {
		store.posts[store.posts.length] = req.body;
		res.status(201).send('created');
	},

	put(req, res) {
		Object.assign(store.posts[req.params.postId], req.body);
		res.status(200).send('updated');
	},

	del(req, res) {
		store.posts.splice(req.params.postId, 1);
		res.status(204).send();
	}
};
