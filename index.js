const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/Teams.db')
const app = express()
const port = 8080

app.use(express.json());
app.use(cors());

/* Resources used for Backend:
	https://chatgpt.com/c/680a7ec8-6088-800f-9aa2-55d7a4a93fda
*/
	


db.run("CREATE TABLE IF NOT EXISTS users (username TEXT)");

app.get('/nba', (req, res) => {
	const nba = 'SELECT * FROM teams WHERE "League" = \'NBA\'';

	db.all(nba, [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			const teams = rows.map(row => ({
				City: row.City.trim(),
				Name: row.Name.trim(),
				Division: row.Division.trim()
			}));
			res.json(teams);
		}
	});
});

app.get('/nfl', (req, res) => {
	const nfl = 'SELECT * FROM teams WHERE "League" = \'NFL\'';
	
	db.all(nfl, [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			const teams = rows.map(row => ({
				City: row.City.trim(),
				Name: row.Name.trim(),
				Division: row.Division.trim()
			}));
			res.json(teams);
		}
	});
});

app.get('/mlb', (req, res) => {
	const mlb = 'SELECT * FROM teams WHERE "League" = \'MLB\'';
	
	db.all(mlb, [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			const teams = rows.map(row => ({
				City: row.City.trim(),
				Name: row.Name.trim(),
				Division: row.Division.trim()
			}));
			res.json(teams);
		}
	});
});

app.get('/nhl', (req, res) => {
	const nhl = 'SELECT * FROM teams WHERE "League" = \'NHL\'';
	
	db.all(nhl, [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			const teams = rows.map(row => ({
				City: row.City.trim(),
				Name: row.Name.trim(),
				Division: row.Division.trim()
			}));
			res.json(teams);
		}
	});
});

app.post("/signup", (req, res) => {
    const username = req.body.username;
    console.log("Received username:", username);

    if (!username) {
        return res.status(400).json({ message: "Username is required." });
    }

    db.run('INSERT INTO users (username) VALUES (?)', [username], (err) => {
        if (err) {
            console.error("DB error:", err);
            return res.status(500).json({ message: "Database error." });
        }

        console.log("User added successfully");
        res.json({ message: "Success" }); // Send a success message
    });
});







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
