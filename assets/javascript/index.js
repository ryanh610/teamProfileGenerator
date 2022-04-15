const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./roles/manager');
const Engineer = require('./roles/engineer');
const Intern = require('./roles/intern');
const { rejects } = require('assert');
const { resolve } = require('path');

const teamMembers = [];

function initApp() {
    createHTML();
    newMember();
};

function createHTML() {
    const html = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Team Profile Generator</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
            <link rel="stylesheet" href="./assets/css/styles.css">
        </head>

        <body>
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                    <span class="fs-4">Team Profile Generator</span>
                </a>
            </header>
    `;
    fs.writeFile("./../index.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
};

function newMember() {
    inquirer.prompt([
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
            type: 'list',
            message: 'Please enter employee role:',
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'role'
        }
    ])
    .then(function({name,id,email,role}) {
        let roleInfo = "";
        if (role === 'Manager') {
            roleInfo = "Office Room-Number"
        }
        if (role === 'Engineer') {
            roleInfo = "GitHub Username"
        }
        if (role === 'Intern') {
            roleInfo = 'School Name'
        }
        inquirer.prompt([
            {
                message: `Enter team member's ${roleInfo}`,
                name: 'roleInfo'
            },
            {
                type: "list",
                message: "Would you like to add another team member?",
                choices: ['Yes', 'No'],
                name: 'anotherMember'
            }
        ]).then(function({roleInfo, anotherMember}) {
            let thisMember;
            
            if (role === 'Manager') {
                thisMember = new Manager(name, id, email, roleInfo);
            }
            if (role === 'Engineer') {
                thisMember = new Engineer(name, id, email, roleInfo);
            }
            if (role === 'Engineer') {
                thisMember = new Intern(name, id, email, roleInfo);
            }
            teamMembers.push(thisMember);
            memberHTML(thisMember)
            
            if (anotherMember == 'Yes') {
                newMember();
            } else {
                finishHTML();
            }

        })
    }).catch(e => console.error('ERROR XX', e))
};

function memberHTML(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const id = member.getId();
        const email = member.getEmail();
        const role = member.getRole();
        let data = "";
        if (role === "Manager") {
            const officePhone = member.getOfficeNumber();
            data = `<div class="card" style="width: 18rem;">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${name}</li>
              <li class="list-group-item">${role}</li>
              <li class="list-group-item">${id}</li>
              <li class="list-group-item">${email}</li>
              <li class="list-group-item">${officePhone}</li>
            </ul>
          </div>`;
        }
        else if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="card" style="width: 18rem;">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${name}</li>
              <li class="list-group-item">${role}</li>
              <li class="list-group-item">${id}</li>
              <li class="list-group-item">${email}</li>
              <li class="list-group-item">${gitHub}</li>
            </ul>
          </div>`;
        }
        else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="card" style="width: 18rem;">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${name}</li>
              <li class="list-group-item">${role}</li>
              <li class="list-group-item">${id}</li>
              <li class="list-group-item">${email}</li>
              <li class="list-group-item">${school}</li>
            </ul>
          </div>`;
        }
        fs.appendFile("./../index.html", data, function (err) {
            if (err) {
                return rejects(err);
            };
            return resolve();
        });
    })


}

function finishHTML() {
    htmlEnd = `
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        </body>
    </html>`;
    fs.appendFile("./../index.html", htmlEnd, function (err) {
        if (err) {
            return rejects(err);
        };
        return resolve();
    });
};

initApp();