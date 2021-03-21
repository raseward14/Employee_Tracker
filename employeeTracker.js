const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'Biscuit10SQL!',
    database: 'employeetracker_db',
  });



  connection.connect((err) => {
    if (err) throw err;
    runStart();
  });

  const runStart = () => {
    console.log('up and running');
  };