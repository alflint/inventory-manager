const express = require('express');
const routes = require('./routes');
const DatabaseHandler = require('./db/handler')

const db_handler = new DatabaseHandler()
db_handler.init()
if (process.argv[2] && process.argv[2] === '-seed') {
  db_handler.seed_db()
} 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', function(req, res, next){
  console.log(`Request Handled: ${req.method} ${req.url} ✅`);
  next();
});

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
