const mysql = require('mysql');
const inquirer = require('inquirer');
// for coloring output
const chalk = require('chalk');
// for display banner
const figlet = require('figlet');
const util = require('util');
const { Table } = require('console-table-printer');
const { join } = require('path');

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

// View all employees query-- done
const viewAllEmployees = async () => {
  const query = 'SELECT * FROM employee';
  const employees = await mySQLQuery(query);
  console.table(employees);
  runStart();
}

// View all employees by role query-- done
const roleSearch = async () => {
  // object with id and title property- get from viewAllRoles
  const roleQuery = 'SELECT * FROM role;';
  const roles = await mySQLQuery(roleQuery);
  // loop over, pull title properties, store in array 
  // const map1 = array1.map(x => x * 2);
  const roleTitles = roles.map(element => element.title)
  // destructure selectedRole remove 'selectedRole': 'value' <-keep value
  const { selectedRole } = await inquirer
    .prompt({
      name: 'selectedRole',
      type: 'list',
      choices: roleTitles
    })
  // filter all roles, only return the role with the selectedRole value
  const chosenRole = await roles.filter(element => element.title === selectedRole);
  // run query SELECT * employees where role_id is the id of the first element in the chosenRole array returned from filter
  const query = 'SELECT * FROM employee WHERE ?;';
  const employee = await mySQLQuery(query, { role_id: chosenRole[0].id });
  console.table(employee);
  runStart();
}

// View all employees by department query-- done
const departmentSearch = async () => {
  // query to view all departments
  const departmentQuery = 'SELECT * FROM department;';
  // store in const
  const department = await mySQLQuery(departmentQuery);
  // map over to pull title property
  const departmentTitles = department.map(element => element.name)
  // destructure const in inquirer to separate selectedDepartment: from departmentTitles dept titles
  const { selectedDepartment } = await inquirer
    .prompt({
      name: 'selectedDepartment',
      type: 'list',
      choices: departmentTitles
    })
  // filter all departments to return the chosen department
  const chosenDepartment = await department.filter(element => element.name === selectedDepartment)
  console.log(selectedDepartment);
  console.log(chosenDepartment);
  console.log(chosenDepartment[0].id);
  // we want role.id's (return roles) based on the selected department_id above
  const roleQuery = 'SELECT * FROM role WHERE ?;';
  // run query SELECT * roles where department_id is the id of the first element in the chosenDepartment array returned from filter
  const departmentRoles = await mySQLQuery(roleQuery, { department_id: chosenDepartment[0].id });
  console.log(departmentRoles);
  // get role.id's from the included department roles => map
  // returns a new array with only the id's
  const roleIDs = departmentRoles.map(element => element.id);
  console.log(roleIDs);
  // we want to return employees if role.id is included in the above array
  const employeeQuery = 'SELECT * FROM employee WHERE role_id = ? OR role_id = ? OR role_id = ?;';
  const departmentEmployees = await mySQLQuery(employeeQuery, [roleIDs[0], roleIDs[1], roleIDs[2]])
  console.table(departmentEmployees);
  runStart();
}

// View all employees by manager query-- done
const managerSearch = async () => {
  // run a query to get employee by managers
  const managerQuery = 'SELECT * FROM role WHERE role.id = 1 OR role.id = 2 OR role.id = 4 OR role.id = 6 OR role.id = 8;';
  // store in a constant
  const managers = await mySQLQuery(managerQuery);
  // map to retrieve the manager title
  const managerTitles = managers.map(manager => manager.title);
  // deconstruct inquirer prompt to select which manager to view by
  const { selectedManager } = await inquirer
    .prompt({
      name: 'selectedManager',
      type: 'list',
      choices: managerTitles
    })
  // filter through the managers to get the selected manager
  const chosenManager = await managers.filter(manager => manager.title === selectedManager);
  console.log(chosenManager);
  // run an employee query to return employees with manager_id matching selected manager
  const employeeQuery = 'SELECT * FROM employee WHERE ?;';
  const managerEmployees = await mySQLQuery(employeeQuery, { manager_id: chosenManager[0].id })
  console.table(managerEmployees);
  runStart();
}

// add employees query-- done
const addEmployee = async () => {
  // query to return all roles
  const roleQuery = 'SELECT * FROM role;';
  // run the query
  const roles = await mySQLQuery(roleQuery);
  // map through the role objects array to return an array of role titles for inquirer
  const roleTitles = await roles.map(role => role.title)
  // run a query to get employee by managers
  const managerQuery = 'SELECT * FROM role WHERE role.id = 1 OR role.id = 2 OR role.id = 4 OR role.id = 6 OR role.id = 8;';
  // store in a constant
  const managers = await mySQLQuery(managerQuery);
  // map to retrieve the manager title
  const managerTitles = managers.map(manager => manager.title);
  // await responses to employee first name, last name, role title, and manager
  const newEmployee = await inquirer
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
        choices: roleTitles
      },
      {
        name: 'manager',
        type: 'list',
        message: "Who is the employee's manager?",
        choices: managerTitles
      },
    ])
  // filter roles to get role object based on newEmployee.role
  // object has .id .title .salary .department_id
  const chosenRole = await roles.filter(role => role.title === newEmployee.role);
  // filter all managers above based on newEmployee.manager
  // will return a manager with a .id .title .salary .department_id property
  const chosenManager = await managers.filter(manager => manager.title === newEmployee.manager);
  console.log(newEmployee);
  console.log(chosenRole);
  // query to insert first name, last name, role, and manager into employee table
  const addEmployeeQuery = "INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES(?, ?, ?, ?);";
  // run the query
  const addRole = await mySQLQuery(addEmployeeQuery, [newEmployee.firstName, newEmployee.lastName, chosenRole[0].id, chosenManager[0].id]);
  // ask what to do next
  runStart();
}

// remove employee query
const removeEmployee = async () => {
  // query returning all employees from employee table
  const employeeQuery = 'SELECT * FROM employee;';
  // run query
  const employees = await mySQLQuery(employeeQuery);
  // map through employee objects, return only the employee first and last names for our inquirer
  const employeeNames = employees.map(employee => [employee.first_name, employee.last_name]);
  console.log(employeeNames);
  const names = employeeNames.forEach(name => name.join());
  // inquirer asking which employee to delete- use the employee names above
  const selectedEmployee = await inquirer
    .prompt({
      name: 'removedEmployee',
      type: 'list',
      choices: employeeNames
    })
  const removedEmployee = selectedEmployee.removedEmployee;
  // filter the employees to get the removed employee based on id
  const chosenEmployee = await employees.filter(employee => employee.first_name === removedEmployee)
  console.log(chosenEmployee);
  // run the query to remove this employee from the employee table
  const deleteQuery = 'DELETE FROM employee WHERE ?;';
  // run query
  const removeEmployee = await mySQLQuery(deleteQuery, { id: chosenEmployee[0].id })
  // ask what to do next
  runStart();

}

// update role query
const updateRole = async () => {
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
const updateManager = async () => {
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
const addDepartment = async () => {
  // INSERT INTO table SET ?
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
const removeDepartment = async () => {
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

// View all employees roles query-- done
const viewAllRoles = async () => {
  // query returning all roles from role table
  const query = 'SELECT * FROM role;';
  // run query
  const roles = await mySQLQuery(query);
  console.table(roles);
  runStart();
}

// add employee role query-- done
const addRole = async () => {
  // query to return all departments
  const departmentQuery = 'SELECT * FROM department;';
  // run the query
  const departments = await mySQLQuery(departmentQuery);
  // map through the department objects array to return an array of department titles for inquirer
  const departmentTitles = await departments.map(department => department.name)
  // await responses to role name, salary, and department_id
  const newRole = await inquirer
    .prompt([
      {
        name: 'roleName',
        type: 'input',
        message: 'What is the role title?'
      },
      {
        name: 'roleSalary',
        type: 'input',
        message: 'What is the role salary?'
      },
      {
        name: 'roleDepartment',
        type: 'list',
        message: 'Which department does this role fall under?',
        choices: departmentTitles
      },
    ])
  // filter departments to get department object based on newRole.roleDepartment
  const departmentID = await departments.filter(department => department.name === newRole.roleDepartment)
  // query to insert title, salary, and department_id into role talbe
  const addRoleQuery = "INSERT INTO role(title,salary,department_id) VALUES(?, ?, ?);";
  // run the query
  const addRole = await mySQLQuery(addRoleQuery, [newRole.roleName, newRole.roleSalary, departmentID[0].id]);
  // ask what to do next
  runStart();

}

// remove employee role query
const removeRole = async () => {
  // query returning all roles from role table
  const query = 'SELECT * FROM role;';
  // run query
  const roles = await mySQLQuery(query);
  // map through role objects, return only the object titles for our inquirer
  const roleTitles = roles.map(role => role.title)
  // inquirer asking which role to delete- use the role titles above
  // destructure to seperate the removedRole key from the selected value
  const selectedRole = await inquirer
    .prompt({
      name: 'removedRole',
      type: 'list',
      choices: roleTitles
    })
  const removedTitle = selectedRole.removedRole;
  // run the query to remove this role from the role table
  const deleteQuery = 'DELETE FROM role WHERE ?;';
  // run query
  const removeRole = await mySQLQuery(deleteQuery, { title: removedTitle })
  // ask what to do next
  runStart();
}

// View all employee salary totals query
const departmentBudget = async () => {
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



