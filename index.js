const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
// const userRoutes = require('./routes/userRoutes');

const app = express();

// app.use(bodyParser.json());
// app.use('/user', userRoutes);

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'quangdb',
    password: 'Quang23022002',
    database: 'quangdb'
  });
  
  // Connect to MySQL database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
