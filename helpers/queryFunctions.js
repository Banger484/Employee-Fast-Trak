require('dotenv').config()
const db = require('../db/connection')

function allDepartments () {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
    });
}

function allDepartments () {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
    });
}

module.exports = {
    allDepartments
}