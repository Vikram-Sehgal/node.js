const mongodb = require('mongodb');
const async = require('async');
const customerData = require('./customer-data/m3-customer-data.json');
const customerAddress = require('./customer-data/m3-customer-address-data.json');

let limit = parseInt(process.argv[2]) || 1000;
let tasks = [];

mongodb.MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, client) => {
	if (err) console.error(err);
	console.log('connected to database succcessfully');
	const db = client.db('customers');
	db.collection('customers-data').drop();

	customerData.forEach((value, index) => {
		customerData[index] = Object.assign(value, customerAddress[index]);
		if (index % limit == 0) {
			const start = index;
			const end = start + limit > customerData.length ? customerData.length : start + limit;
			tasks.push((callback) => {
				console.log(start + ' to ' + end + ' done out of ' + customerData.length);
				db.collection('customers-data').insertMany(customerData.slice(start, end), (error, result) => {
					callback(error, result);
				});
			});
		}
	});
	async.parallel(tasks, (err, res) => {
		if (err) console.error(err);
		client.close();
	});
});
