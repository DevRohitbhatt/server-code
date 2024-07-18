const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(cors());

// Import the MySQL connection
const db = require('./db');

app.use(express.json());

// Handle incoming POST request to insert data into form2data table
app.post('/webhook', (req, res) => {
	const { full_name, email, phone, address1, date_created } = req.body; // Assuming field1, field2, field3 are the fields in the form

	console.log('Received data:', req.body);

	const query = `INSERT INTO form2data (name, email, phone, address, date_time ) VALUES (?, ?, ?)`;
	const values = [full_name, email, phone, address1, date_created];

	db.query(query, values, (err, results) => {
		if (err) {
			console.error('Error inserting data:', err);
			res.status(500).json({ error: 'Error inserting data' });
			return;
		}

		res.json({ message: 'Data inserted successfully' });
	});
});

// Handle incoming webhook data
app.get('/data', (req, res) => {
	const query = 'SELECT * FROM form2data';

	db.query(query, (err, results) => {
		if (err) {
			console.error('Error fetching data:', err);
			res.status(500).json({ error: 'Error fetching data' });
			return;
		}

		res.json(results);
	});
});

// Test route to check server is running
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
