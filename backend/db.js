const mongoose = require('mongoose');

const connect =  () => {
   mongoose.connect('mongodb+srv://Sanjeev:Sanjeev123@cluster0.ybrdh6e.mongodb.net/health');

  const connection = mongoose.connection;

  connection.on('error', () => {
    console.log('Error connecting to the database');
  });

  connection.once('open', () => {
    console.log('Connected to the database');
  });
}
module.exports = connect;