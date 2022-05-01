require('dotenv').config();
const inquirer = require('inquirer');
const cT = require('console.table')
const task = require('./helpers/tasks')
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
                    break;
                case options[4]:
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
