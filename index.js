const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/sample.db')
const app = express()
const port = 8080

app.use(express.json());
app.use(cors());

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS lorem')
  db.run('DROP TABLE IF EXISTS users')
  db.run('CREATE TABLE lorem (info TEXT)')
  db.run('CREATE TABLE users (username TEXT) ')
  const stmt = db.prepare('INSERT INTO lorem VALUES (?)')

  for (let i = 0; i < 10; i++) {
    stmt.run(`Ipsum ${i}`)
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
    console.log(`${row.id}: ${row.info}`)
  })
})



app.get('/lorem', (req, res) => {
	const sql = 'SELECT * FROM lorem';

	db.all(sql, [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			res.json(rows);
		}
	});
});

app.post("/post", (req, res) => {
	console.log(req.body)
	const username = req.body.username;
	db.run('INSERT INTO users (username) VALUES (?)', username, (err) => {
		if(err)
			reject(err);
	});
	res.send({"message": "Success"});
});




app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Close the database connection when the server stops
process.on('SIGINT', () => {
	db.close((err) => {
		if (err) {
			console.error('Error closing the database:', err.message);
		}
		console.log('Database connection closed.');
		process.exit(0);
	});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
