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

connection.connect((err) => {
  if (err) throw err;
  figletStart();
  runStart();

});

const figletStart = () => {
  console.log(
    chalk.green(
      figlet.textSync('Employee Manager', {
        font: 'bulbhead',
        horizontalLayout: 'full',
        verticalLayout: 'full'
      }, function (err, data) {
        if (err) {
          console.log('There is a problem...');
          console.dir(err);
          return;
        }
        console.log(data);
      })
    )
  );
}


const runStart = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'View all employees by Department',
        'View all employees by Branch',
        'Add employee',
        'Remove employee',
        'Update employee role',
        'Update employee manager',
        'Add role',
        'Remove role'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all employees':
          employeeSearch();
          break;
        case 'View all employees by Department':
          departmentSearch();
          break;
        case 'View all employees by Branch':
          branchSearch();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'Remove employee':
          removeEmployee();
          break;
        case 'Update employee role':
          updateRole();
          break;
        case 'Update employee manager':
          updateManager();
          break;
        case 'Add role':
          addRole();
          break;
        case 'Remove role':
          removeRole();
          break;
      }
    })
};

// View all employees query
const employeeSearch = () => {
  inquirer
    .prompt({
      name: 'employee',
      type: 'input',
      message: ''
    })
    .then((answer) => {
      const query = '';
      connection.query(query, {}, 
        (err, res) => {

      })
    })
}

// View all employees query
const departmentSearch = () => {
  inquirer
  .prompt({
    name: 'department',
    type: 'input',
    message: ''
  })
  .then((answer) => {
    const query = '';
    connection.query(query, {}, 
      (err, res) => {

    })
  })
}

// View all employees query
const branchSearch = () => {
  inquirer
  .prompt({
    name: 'branch',
    type: 'input',
    message: ''
  })
  .then((answer) => {
    const query = '';
    connection.query(query, {}, 
      (err, res) => {

    })
  })
}

// View all employees query
const addEmployee = () => {
  inquirer
  .prompt({
    name: 'addEmployee',
    type: 'input',
    message: ''
  })
  .then((answer) => {
    const query = '';
    connection.query(query, {}, 
      (err, res) => {

    })
  })
}

// View all employees query
const removeEmployee = () => {
  inquirer
  .prompt({
    name: 'removeEmployee',
    type: 'input',
    message: ''
  })
  .then((answer) => {
    const query = '';
    connection.query(query, {}, 
      (err, res) => {

    })
  })
}

// View all employees query
const updateRole = () => {
  inquirer
  .prompt({
    name: 'updateRole',
    type: 'input',
    message: ''
  })
  .then((answer) => {
    const query = '';
    connection.query(query, {}, 
      (err, res) => {

    })
  })
}

// View all employees query
const updateManager = () => {
  inquirer
  .prompt({
    name: 'updateManager',
    type: 'input',
    message: ''
  })
  .then((answer) => {
    const query = '';
    connection.query(query, {}, 
      (err, res) => {

    })
  })
}

// View all employees query
const addRole = () => {
  inquirer
  .prompt({
    name: 'addRole',
    type: 'input',
    message: ''
  })
  .then((answer) => {
    const query = '';
    connection.query(query, {}, 
      (err, res) => {

    })
  })
}

// View all employees query
const removeRole = () => {
  inquirer
  .prompt({
    name: 'removeRole',
    type: 'input',
    message: ''
  })
  .then((answer) => {
    const query = '';
    connection.query(query, {}, 
      (err, res) => {

    })
  })
}



