const mysql = require('mysql');

// Set up MySQL connection
const connection = mysql.createConnection({
	// host: '34.174.81.205',
	// user: 'uh9zvveiy4ce9',
	// password: 'g7dzrqgbkmpj',
	// database: 'db1zggku2qb1qr',
	host: 'sql3.freemysqlhosting.net',
	user: 'sql3720685',
	password: 'avVsYZjp1h',
	database: 'sql3720685',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	keepAliveInitialDelay: 10000, // 0 by default.
	enableKeepAlive: true,
});

connection.connect((err) => {
	if (err) {
		console.error('Error connecting to the database:', err.stack);
		return;
	}
	console.log('Connected as id ' + connection.threadId);
});

connection.on('error', (err) => {
	console.error('Database error:', err.code);
	if (err.code === 'PROTOCOL_CONNECTION_LOST') {
		// Reconnect logic here
		connection.connect((err) => {
			if (err) {
				console.error('Error reconnecting to the database:', err.stack);
				return;
			}
			console.log('Reconnected as id ' + connection.threadId);
		});
	} else {
		throw err;
	}
});
module.exports = connection;
