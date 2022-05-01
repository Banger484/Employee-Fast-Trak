require('dotenv').config();
const inquirer = require('inquirer');
const cT = require('console.table')
const db = require('./db/connection')


const options = [
    "View All - Employees",
    "View All - Roles",
    "View All - Departments",
    "Add New - Employee",
    "Add New - Role",
    "Add New - Department",
    "Update Role - Employee",
    "Quit"
];

function init () {
    inquirer
        .prompt({
            type: 'list',
            name: 'menu',
            message: 'Please select a task below.',
            choices: options
        })
        .then((answers) => {
            switch (answers.menu) {
                case options[0]:
                    db.query('SELECT * FROM employee', function (err, results) {
                        console.table(results)
                        return nextTask()
                    })
                    break;
                case options[1]:
                    db.query('SELECT * FROM role', function (err, results) {
                        console.table(results)
                        return nextTask()
                    })
                    break;
                case options[2]:
                    db.query('SELECT * FROM department', function (err, results) {
                        console.table(results) 
                        return nextTask()
                    })
                    break;
                case options[3]:
                    inquirer
                        .prompt([
                            {
                            type: 'input',
                            name: 'FirstName',
                            message: 'What is the first name of the new employee?' 
                            },
                            {
                                type: 'input',
                                name: 'LastName',
                                message: 'What is the last name of the new employee?'
                            },
                            {
                                type: 'number',
                                name: 'RoleID',
                                message: 'What is the role of your new employee?'
                            },
                            {
                                type: 'number',
                                name: 'ManagerID',
                                message: 'Please provide the manager ID for the new employee, if applicable.',
                            }
                        ])
                        .then(a => {
                            if(!a.ManagerID) {
                                console.log('this works');
                               db.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)',[a.FirstName, a.LastName, a.RoleID], function (err, results) {
                                console.log(`Employee roster is updated, ${a.FirstName} ${a.LastName} added!`);
                                nextTask()
                            }) 
                            } else {
                                console.log('does this work?');
                                db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',[a.FirstName, a.LastName, a.RoleID, a.ManagerID], function (err, results) {
                                    console.log(`Employee roster is updated, ${a.FirstName} ${a.LastName} added!`);
                                    nextTask()
                                })  
                            }
                        })
                    break;
                case options[4]:
                    inquirer
                        .prompt([
                            {
                            type: 'input',
                            name: 'RoleTitle',
                            message: 'What is the title of your new Role?' 
                            },
                            {
                                type: 'number',
                                name: 'RoleSalary',
                                message: 'What is the salary for this role?'
                            },
                            {
                                type: 'number',
                                name: 'DeptID',
                                message: 'What is the ID of the department this role belongs to?'
                            }])
                        .then(a => {
                            db.query('INSERT INTO role (title, salary, dept_id) VALUES (?, ?, ?)',[a.RoleTitle, a.RoleSalary, a.DeptID], function (err, results) {
                                console.log(`Role list is updated, ${a.RoleTitle} added!`);
                                nextTask()
                            })
                        })
                    break;
                case options[5]:
                    inquirer
                        .prompt(
                            {
                            type: 'input',
                            name: 'DeptName',
                            message: 'What is the name of your new Department?' 
                            })
                        .then(answer => {
                            db.query('INSERT INTO department (dept_name) VALUES (?)', answer.DeptName, function (err, results) {
                                console.log(answer.DeptName);
                                console.log(results);
                                console.log(`Department list is updated, ${answer.DeptName} added!`);
                                nextTask()
                            })
                        })
                    break;
                case options[6]:
                    // update employee
                    break;
                case options[7]:
                    console.log('Thank you for using Employee Fast Trak.');
                    break;
                default:
                    break;
            }
        })
}

init()

function nextTask () {
    inquirer
    .prompt({
        type: 'list',
        name: 'continue',
        message: 'Would you like to perform another task?',
        choices: ['Yes, continue.', 'No, I am finished.']
    })
    .then(answer => {
        if (answer.continue === 'Yes, continue.') {
            init()
        } else {
            return console.log('Thank you for using Employee Fast Trak.');

        }
    })
}
