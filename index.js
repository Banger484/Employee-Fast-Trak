require('dotenv').config();
const inquirer = require('inquirer');
const { allDepartments } = require('./helpers/queryFunctions')

const options = [
    "View All - Employees",
    "View All - Roles",
    "View All - Departments",
    "Add New - Employee",
    "Add New - Role",
    "Add New - Department",
    "Update Role - Employee",
    "Update Manager - Employee",
    "Remove - Employee",
    "Remove - Role",
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
            if(answers.menu === 'View All - Employees'){
                console.log('view all employees wired');
            }
            if(answers.menu === 'View All - Roles'){
                console.log('view all roles wired');
            }
            if(answers.menu === 'View All - Departments'){
                console.log('view all departments wired');
                allDepartments()
            }
            if(answers.menu === 'Add New - Employee'){
                console.log('add employee wired');
            }
            if(answers.menu === 'Add New - Role'){
                console.log('add role wired');
            }
            if(answers.menu === 'Add New - Department'){
                console.log('add department wired');
            }
            if(answers.menu === 'Update Role - Employee'){
                console.log('update role wired');
            }
            if(answers.menu === 'Update Manager - Employee'){
                console.log('update manager wired');
            }
            if(answers.menu === 'Remove - Employee'){
                console.log('remove employee wired');
            }
            if(answers.menu === 'Remove - Role'){
                console.log('remove role wired');
            }
            if(answers.menu === 'Quit'){
                return;
            }
        })
}

init()

