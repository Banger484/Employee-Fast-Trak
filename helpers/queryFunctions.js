require('dotenv').config()
const db = require('../db/connection')

function allEmployees () {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results) 
    });
}

function allRoles () {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results) 
    })
}

function allDepartments () {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results) 
    });
}

module.exports = {
    allEmployees,
    allRoles,
    allDepartments
}