const inquirer = require('inquirer');
const mysql2 = require('mysql2');
require('console.table');


//connect to mysql2
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company_db'
    },
    console.log('connected to database')
);

//database initiator function
db.connect(function(err) {
    if (err) throw err
    console.log('welcome to the database')
    choices();
});


//Setup initial choices with inquirer for the user
function choices() {
    inquirer.createPromptModule([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit']
        }

    ]
    
    ).then(function(data) {
        switch (data.prompts) {
            case 'View all Departments':
                viewAllDepartments();
                break;

            case 'View all Roles':
                viewAllRoles();
                break;

            case 'View all Employees':
                viewAllEmployee();
                break;

            case 'Add department':
                addDepartment();
                break;

            case 'Add Role':
                addRole();
                break;

            case 'Add Employee':
                addEmployee();
                break;

            case 'Update Employee Role':
                updateEmployee();
                break;

            case 'Quit':
                quit();
                break;

        }
    })
}

//view all roles function
function viewAllDepartments() {
    
}

function viewAllRoles() {

}

function viewAllEmployee() {
    
}

//Adding a department via inquirer
function addDepartment() {
    return inquirer
    .prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?'
        validate: function(name) {
            if (!name) {
                console.log('Please try to enter a name again.')
                return false;
            }
            return true;
        }
    }])
    .then((ans) => {
        const department = new Department(ans.name);
        newDepartment(department);
        console.log ('Department Added');
    })
}

function addRole() {
    
}

function addEmployee() {
    
}

function updateEmployee() {
    
}

function quit() {
    return
}