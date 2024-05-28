const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require("./config");
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const cartDetailRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');

const app = express();

app.use(bodyParser.json());
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/cart', cartDetailRoute);
app.use('/order', orderRoute)
  
// Connect to MySQL database
db.query('SELECT 1 + 1', (error, results, fields) => {
  if (error) throw error;
    console.log('Connected to MySQL!');
});

app.get("/check-connection", (req, res) => {
  if (db.state === "authenticated") {
    res.json({ message: "MySQL connection is established" });
  } else {
    res.json({ message: "MySQL connection is not established" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
