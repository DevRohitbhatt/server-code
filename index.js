const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 5000;

app.use(express.json());

const dbConfig = {
	host: '34.174.81.205',
	user: 'uh9zvveiy4ce9',
	password: 'g7dzrqgbkmpj',
	database: 'db1zggku2qb1qr',
};

app.post('/webhook', async (req, res) => {
	let connection;
	const { full_name, email, phone, address1, date_created } = req.body;

	try {
		// Get a connection from the pool
		connection = await mysql.createConnection(dbConfig);

		// Correct the INSERT query
		const query = `INSERT INTO \`form1data\` (\`date_time\`, \`name\`, \`email\`, \`phone\`, \`address\`) VALUES ('${date_created}', '${full_name}', '${email}', '${phone}', '${address1}')`;
		await connection.query(query);

		res.status(200).send('Data inserted successfully.');
	} catch (error) {
		console.error('Database query error:', error);
		res.status(500).send('Internal Server Error');
	} finally {
		// Release the connection back to the pool
		if (connection) {
			connection.end();
		}
	}
});

app.post('/updatewebhook', async (req, res) => {
	let connection;
	const {
		full_name,
		email,
		phone,
		address1,
		date_created,
		'How would you rate the current condition of your property? (We buy properties in ANY condition..)':
			propertyCondition,
		"What's your reason for wanting to sell?": reasonForSelling,
		'How soon would you like to sell?': sellTimeline,
		'What type of property are you wanting to sell?': propertyType,
		'Is the property currently listed with a realtor?': listedWithRealtor,
		'Is your home occupied?': homeOccupied,
	} = req.body;

	try {
		// Get a connection from the pool
		connection = await mysql.createConnection(dbConfig);

		// Correct the INSERT query
		const query = `INSERT INTO \`form2data\` (\`date_time\`, \`name\`, \`email\`, \`phone\`, \`address\`, \`What type of property are you wanting to sell?\`, \`What's your reason for wanting to sell?\`, \`How would you rate the current condition of your property? (We b\`, \`How soon would you like to sell?\`, \`Is your home occupied?\`, \`Is the house currently listed with realtor?\`) VALUES ('${date_created}', '${full_name}', '${email}', '${phone}', '${address1}', '${propertyType}', '${reasonForSelling}', '${propertyCondition}', '${sellTimeline}', '${homeOccupied}', '${listedWithRealtor}')`;
		await connection.query(query);

		res.status(200).send('Data inserted successfully.');
	} catch (error) {
		console.error('Database query error:', error);
		res.status(500).send('Internal Server Error');
	} finally {
		// Release the connection back to the pool
		if (connection) {
			connection.end();
		}
	}
});

app.get('/data', async (req, res) => {
	let connection;
	try {
		// Establish a new connection for each request
		connection = await mysql.createConnection(dbConfig);
		const [rows, fields] = await connection.query('SELECT * FROM form2data');
		res.json(rows);
	} catch (error) {
		console.error('Database query error:', error);
		res.status(500).send('Internal Server Error');
	} finally {
		// Ensure the connection is closed after the query
		if (connection) {
			await connection.end();
		}
	}
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
