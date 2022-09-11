const inquirer = require('inquirer');
const mysql2 = require('mysql2');
require('console.table');

const Department =  require('./lib/Department');
const {getDEPT, newDept, deptArrFill, getEmployees, updateRole, roleArrFill, employeeArrFill} = require('./lib/functions');
let employeeArr = employeeArrFill();
let roleArr = roleArrFill();

//connect to mysql2
const db = mysql2.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Password1",
        database: "company_db",
    },
    console.log('You are connected to company_db')
 );

//database initiator function
db.connect(function(err) {
    if (err) throw err
    //Starting the choices inquirer prompt
    console.log('Database connection initiated');
    menuChoices();
});

//Setup initial choices with inquirer for the user
function menuChoices() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: "What would you like to do?",
            choices: ['View all Departments', 
            'View all Roles', 
            'View all Employees', 
            'Add department', 
            'Add Role', 
            'Add Employee', 
            'Update Employee Role', 
            'Quit'
            ]
        }
    ]  
    //Using a switch case to choose the function path.
    ).then(function(data) {
        switch (data.prompt) {
            case 'View all Departments':
                viewAllDept();
                break;

            case 'View all Roles':
                viewRoles();
                break;

            case 'View all Employees':
                viewEmployee();
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
};

//view all roles function
function viewAllDept() {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err
        console.table(res);
        console.log("working?");
        menuChoices();
    })
}

function viewRoles() {
    db.query('SELECT * FROM role', function (err, res) {
        console.table(res);
        menuChoices();
    })

}

function viewEmployee() {
    db.query('SELECT * FROM employee', function(err, res) {
        if (err) throw err
        console.table(res)
        menuChoices();
    })
    
}

//Adding a department via inquirer
function addDepartment() {
    return inquirer
    .prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?',
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
        newDept(department);
        console.log ('Department Added');
        departments = getDEPT();
        deptArr = deptArrFill;
        return menuChoices();
    })
}

function addRole() {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'addRole',
                message: 'What role would you like to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role?'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'What is the department code?',
                choices: ["1", "2", "3", "4"]
            }])
            .then((answer => {
                var sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                db.query(sql, 
                    [
                        answer.addRole, 
                        answer.salary, 
                        answer.department_id
                    ], 
                    (err, res) => {
                    if (err) throw err;
                    console.log('Added new role');
                })
                menuChoices();
            }))

}

function addEmployee() {
    return inquirer
    .prompt([{
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
        validate: function(firstName) {
            if (!firstName) {
                console.log('You must enter a name!')
                return false;
            }
            return true;
        }
    }, {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
        validate: function(lastName) {
            if (!lastName) {
                console.log('You must enter a name')
                return false;
            }
            return true;
        }
    }, {
        type: 'list',
        name: 'role',
        message: "What is the employee's role?",
        choices: roleArr
    }, {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: [{name:'No Manager', value:null}].concat(employeeArr)

    }])
    .then((ans) => {
        var employee = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        db.query(employee, 
            [
                ans.firstName, 
                ans.lastName, 
                ans.role, 
                ans.manager
            ], 
            (err, response) => {
            if (err) throw err;
            console.log("Added New Employee")
        })
        return menuChoices();
    })
   
};


function updateEmployee() {
    return inquirer
    .prompt([{
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update',
        choices: employeeArr
    },{
        type: 'list',
        name: 'newRole',
        message: 'What is the employees new role',
        choices: roleArr
    }])
    .then((ans) => {
        updateRole(ans);
        console.log('Role Updated!');
        employees = getEmployees();
        employeeArr = employeeArrFill();
        return menuChoices();
    })
};

function quit() {
    console.log('Good bye! Thank you for using our application');
    return
}
