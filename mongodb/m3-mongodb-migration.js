const mongodb = require('mongodb');
const async = require('async');

mongodb.MongoClient.connect(
	'mongodb://localhost:27017',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, client) => {
		if (err) console.error(err);
		console.log('connected to database successfully');

		const dbcustomer = client.db('customer'); // get the customer data from collection.('data') and get the address data from collection.('address')
		const dbsehgal = client.db('sehgal'); // Merged the two collections and insert customer-data into another database

		dbcustomer.collection('data').find({}).toArray((error, data) => {
			if (error) console.error(error);

			dbcustomer.collection('address').find({}, { projection: { _id: 0 } }).toArray((error, address) => {
				if (error) console.error(error);
				async.parallelLimit(
					[
						(callback) => {
							callback(null, data);
						},
						(callback) => {
							callback(null, address);
						}
					],
					process.argv[2],
					(err, res) => {
						if (err) console.error(err);
						let ab = res[0];
						ab.forEach((element, index) => {
							let obj = element;
							Object.assign(obj, res[1][index]);
							dbsehgal.collection('edx1').insertOne(obj, (err, res) => {
								if (err) console.error(err);

								if (ab.length == index + 1) {
									console.log('Two collections merged into one collection');
									client.close();
								}
							});
						});
					}
				);
			});
		});
	}
);


// merge the two db collections into one. with easy way
// only with mongodb npm module.

// const mongodb = require('mongodb');

// mongodb.MongoClient.connect(
// 	'mongodb://localhost:27017',
// 	{ useNewUrlParser: true, useUnifiedTopology: true },
// 	(err, client) => {
// 		if (err) console.log(err);
// 		console.log('connected to database successfully');
// 		const db = client.db('customer');

// 		db.collection('address').find({}, { projection: { _id: 0 } }).toArray((error, address) => {
// 			if (error) console.error(error);
// 			address.forEach((value, index) => {
// 				db.collection('data').find({}).toArray((error, data) => {
// 					if (error) console.error(error);
// 					db.collection('data').updateOne(data[index], { $set: value }, (error, result) => {
// 						if (error) console.error(error);
// 						console.log('Two database collections merged into one successfully');
// 						if (address.length == index + 1) {
// 							client.close();
// 						}
// 					});
// 				});
// 			});
// 		});
// 	}
// );
