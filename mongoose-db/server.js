const express = require('express');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(logger('dev'));
app.use(errorhandler());
app.use(bodyParser.json());

// connect to mongodb database
mongoose.connect('mongodb://localhost:27017/accounts', { useNewUrlParser: true, useUnifiedTopology: true });
let Account = mongoose.model('Account', { _id: String, name: String, balance: Number });

app.get('/accounts', (req, res) => {
	Account.find({}).exec((err, result) => {
		if (err) console.log(err);
		res.send(result);
	});
});

app.get('/accounts/:id', (req, res) => {
	Account.findById({ _id: req.params.id }).exec((err, result) => {
		if (err) console.log(err);
		res.send(result);
	});
});

app.post('/accounts', (req, res) => {
	let account = new Account(req.body);
	account.save((err, result) => {
		if (err) console.log(err);
		res.send(result);
	});
});

app.put('/accounts/:id', (req, res) => {
	Account.updateOne({ _id: req.params.id }, { $set: req.body }, (err, result) => {
		if (err) console.log(err);
		res.send(result);
	});
});

app.delete('/accounts/:id', (req, res) => {
	Account.deleteOne({ _id: req.params.id }, (err, result) => {
		if (err) console.log(err);
		res.send(result);
	});
});

app.listen(3000, () => {
	console.log('Your server is running at http://localhost:3000/accounts');
});

// run the shell script file in (Git bash terminal) to test this file
// sh test.sh
