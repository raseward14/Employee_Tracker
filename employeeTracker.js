const mysql = require('mysql');
const inquirer = require('inquirer');
// for coloring output
const chalk = require('chalk');
// for display banner
const figlet = require('figlet');
const util = require('util');
const { Table } = require('console-table-printer');

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

const mySQLQuery = util.promisify(connection.query).bind(connection);

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
        'View all Employees',
        'View all Employees by Role',
        'View all Employees by Department',
        'View all Employees by Manager',
        'Add Employee',
        'Remove Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'Add Department',
        'Remove Department',
        'View all Roles',
        'Add Role',
        'Remove Role',
        'View Total Utilized Budget of a Department',
        'Quit'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all Employees':
          viewAllEmployees();
          break;
        case 'View all Employees by Role':
          roleSearch();
          break;
        case 'View all Employees by Department':
          departmentSearch();
          break;
        case 'View all Employees by Manager':
          managerSearch();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Remove Employee':
          removeEmployee();
          break;
        case 'Update Employee Role':
          updateRole();
          break;
        case 'Update Employee Manager':
          updateManager();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Remove Department':
          removeDepartment();
          break;
        case 'View all Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Remove Role':
          removeRole();
          break;
        case 'View Total Utilized Budget of a Department':
          departmentBudget();
          break;
        case 'Quit':
          quit();
          break
      }
    })
};

// View all employees query
const viewAllEmployees = async () => {
  const query = 'SELECT * FROM employee';
  const employees = await mySQLQuery(query);
  console.log(employees);
  // pretty print the table
  // https://www.npmjs.com/package/console-table-printer
  // const p = new Table();
  // p.addRow({ index: 1, text: 'red wine please', value: 10 },
  // { color: 'green' });
  runStart();
}

// View all employees by role query
const roleSearch = async () => {
  // object with id and title property
  const roles = await viewAllRoles();
  // loop over, pull title properties, store in array 
  // const map1 = array1.map(x => x * 2);
  const roleTitles = roles.map(element => element.title)
  const { selectedRole } = await inquirer  
    .prompt({
      name: 'selectedRole',
      type: 'list',
      choices: roleTitles
    })
  console.log(selectedRole);
}

// map to pull id off of objects 

// View all employees by department query
const departmentSearch = () => {
  inquirer
    .prompt({
      name: 'department',
      type: 'list',
      message: 'Which department would you like to see employees for?',
      choices: [
        'Engineering',
        'Finance',
        'Legal',
        'Sales'
      ]
    })
    .then((answer) => {
      const query = '';
      connection.query(query, {},
        (err, res) => {

        })
      runStart();
    })

}

// View all employees by manager query
const managerSearch = () => {
  inquirer
    .prompt({
      name: 'manager',
      type: 'list',
      message: 'Which manager would you like to see employees for?',
      choices: [

      ]
    })
    .then((answer) => {
      const query = '';
      connection.query(query, {},
        (err, res) => {

        })
      runStart();
    })

}

// add employees query
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "What is the employee's first name?"
      },
      {
        name: 'lastName',
        type: 'input',
        message: "What is the employee's last name?"
      },
      {
        name: 'role',
        type: 'list',
        message: "What is the employee's role?",
        choices: [
          'Sales Lead',
          'Salesperson',
          'Lead Engineer',
          'Software Engineer',
          'Account Manager',
          'Accountant',
          'Legal Team Lead',
        ]
      },
      {
        name: 'role',
        type: 'list',
        message: "Who is the employee's manager?",
        choices: [
          'Drew Hunter',
          'Sydney Gidabuday',
          'Sam Parsons',
          'Matt Centrowitz',
          'Grant Fisher',
          'Lopez Lomong',
          'Bernard Lagat',
        ]
      },
    ]
    )
    .then((answer) => {
      const query = '';
      connection.query(query, {},
        (err, res) => {

        })
      runStart();
    })
}

// remove employee query
const removeEmployee = () => {
  inquirer
    .prompt({
      name: 'removeEmployee',
      type: 'list',
      message: 'Which employee do you want to remove?',
      choices: []
    })
    .then((answer) => {
      const query = '';
      connection.query(query, {},
        (err, res) => {

        })
      runStart();
    })
}

// update role query
const updateRole = () => {
  inquirer
    .prompt([
      {
        name: 'employee',
        type: 'list',
        message: "Which employee's role do you want to update?",
        choices: []
      },
      {
        name: 'role',
        type: 'list',
        message: 'Which role do you want to assign the selected employee?',
        choices: [
          'Sales Lead',
          'Salesperson',
          'Lead Engineer',
          'Software Engineer',
          'Account Manager',
          'Accountant',
          'Legal Team Lead',
        ]
      },
    ])
    .then((answer) => {
      const query = '';
      connection.query(query, {},
        (err, res) => {

        })
      runStart();
    })
}

// update manager query
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
      runStart();
    })
}

// add department query
const addDepartment = () => {
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
      runStart();
    })
}

// remove department query
const removeDepartment = () => {
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
      runStart();
    })
}

// View all employees roles query
const viewAllRoles = async () => {
  const query = 'SELECT id, title FROM role;';
  const roles = await mySQLQuery(query);
  return roles;
  // console.log(roles);
  // runStart();
}

// add employee role query
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
      runStart();
    })
}

// remove employee role query
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
      runStart();
    })
}

// View all employee salary totals query
const departmentBudget = () => {
  inquirer
    .prompt({
      name: 'budget',
      type: 'input',
      message: ''
    })
    .then((answer) => {
      const query = '';
      connection.query(query, {},
        (err, res) => {

        })
      runStart();
    })
}

// quit
const quit = () => {
  console.log('See you next time!')
}



