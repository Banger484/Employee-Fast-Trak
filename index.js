require('dotenv').config();
const inquirer = require('inquirer');
const qf = require('./helpers/queryFunctions')
const cT = require('console.table')

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
            message: 'Welcome, please select a task below.',
            choices: options
        })
        .then((answers) => {
            switch (answers.menu) {
                case options[0]:
                    qf.allEmployees()
                    loopPrompt()
                    break;
                case options[1]:
                    qf.allRoles()
                    loopPrompt()
                    break;
                case options[2]:
                    qf.allDepartments()
                    loopPrompt()
                    break;
                case options[3]:
                    break;
                case options[4]:
                    break;
                case options[5]:
                    break;
                case options[6]:
                    break;
                case options[7]:
                    return
                    break;
                default:
                    break;
            }
        })
}

init()

function loopPrompt () {
    inquirer
        .prompt([
            {
                name: 'loop back',
                type: 'confirm',
                message: 'Would you like to perform more tasks?'
            }
        ])
        .then(answer => {
            if(answer['loop back']) {
                return init()
            } else {
                return
            }
        })
}

function newEmployee () {
    inquirer
        .prompt()
}
