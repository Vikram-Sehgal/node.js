// My own code to convert a csv file to json file


const fs = require('fs');
const readline = require('readline');
const file = fs.createReadStream('customer-data.xls');
const rl = readline.createInterface(file);

let buff = [];
let i = 0;
rl.on('line', (line) => {
	buff[i] = line.split(',');
	i++;
	0;
});

rl.on('close', () => {
	let l = 1;
	let my = {};
	let arr = []; //

	for (let j = 0; j < buff.length - 1; j++) {
		for (let k = 0; k < buff[0].length; k++) {
			my[buff[0][k]] = buff[l][k];
		}
		arr[l - 1] = JSON.stringify(my);
		l++;
	}

	fs.writeFile('customer-data.json', '[' + arr + ']', (e) => {
		if (e) console.error('got error : ' + e);
		console.log('Your csv file converted to json.');
	});
});

// convert a csv file to json file with csvtojson module

// const fs = require('fs');
// const csv = require('csvtojson');
// const cws = fs.createWriteStream('customer-data.json');

// csv().fromFile('customer-data.xls').then((jsonObj) => {
// 	cws.write(JSON.stringify(jsonObj), (error) => {
// 		if (error) console.error('Got Errror : ' + error);
// 		console.log('Your csv file converted to json.');
// 	});
// });

// if you want to convert csv file with csvtojson module ..first install the module through npm .e.g = npm i csvtojson
// and save the commented code in javascript file and run the file in terminal.
