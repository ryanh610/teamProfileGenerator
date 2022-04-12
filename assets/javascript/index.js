const inquirer = require('inquirer');
const fs = require('fs');

function

const questions = [
    {
        type: 'input',
        message: 'Please enter employee name:',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Please enter employee ID:',
        name: 'id'
    },
    {
        type: 'input',
        message: 'Please enter employee email:',
        name: 'email'
    },
    {
        type: 'checkbox',
        message: 'Please enter employee role:',
        name: 'role',
        choices: ['Manager', 'Engineer', 'Intern']
    }]
