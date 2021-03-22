const mysql = require('mysql');
const inquirer = require('inquirer');
// for coloring output
const chalk = require('chalk');
// for display banner
const figlet = require('figlet');

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

  console.log(
    chalk.yellow(
      figlet.textSync('Employee Manager', { 
        font: 'bulbhead',
        horizontalLayout: 'full',
        verticalLayout: 'full' 
      }, function(err, data) {
        if (err) {
          console.log('There is a problem...');
          console.dir(err);
          return;
        }
        console.log(data);
      })
    )
  );

  const runStart = () => {
    console.log('up and running');
  };

  connection.connect((err) => {
    if (err) throw err;
    runStart();
  });

  