const inquirer = require('inquirer');
const fs = require('fs');

function createHTML() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Team Profile Generator</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <link rel="stylesheet" href="./assets/css/styles.css">
    
    </head>
    <body>
    `
};

function finishHTML() {
    htmlEnd = `
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    </body>`
};

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
