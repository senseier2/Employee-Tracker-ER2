const inquirer = require('inquirer');
const mysql2 = require('mysql2');
require('console.table');



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