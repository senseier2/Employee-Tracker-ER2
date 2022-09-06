const inquirer = require('inquirer');
const mysql2 = require('mysql2');
require('console.table');

const Department =  require('./lib/Department');
const {getDEPT, newDept, deptArrMain, getEmployees, updateRole, roleArrMain, employeeArrMain} = require('./assets/function');
// const Connection = require('mysql2/typings/mysql/lib/Connection');
let employeeArr = employeeArrMain();
let roleArr = roleArrMain();

//connect to mysql2
const db = mysql2.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Password1",
        database: "company_db",
    });

//database initiator function
db.connect(function(err) {
    if (err) throw err
    //Starting the choices inquirer prompt
    choices();
});


//Setup initial choices with inquirer for the user
function choices() {
    
    inquirer.prompt([
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
};

//view all roles function
function viewAllDepartments() {
    console.log("Here are all the Departments\n");

    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err
        console.table(res)
        choices();
    })

    // var query =
    // `SELECT * from department`

    // Connection.query(query, function (err, res) {
    //     if (err) throw err;

    //     console.table(res);
    //     console.log("Departments viewed!\n");

    //     choices();
    // }); 
}

function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, res) {
        console.table(res);
        choices();
    })

}

function viewAllEmployee() {
    db.query('SELECT * FROM employee', function(err, res) {
        if (err) throw err
        console.table(res)
        choices();
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
        newDepartment(department);
        console.log ('Department Added');

        return choices();
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
                type: 'input',
                name: 'departmentid',
                message: 'What is the department code?'
            }])
            .then((answer => {
                var sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                db.query(sql, [answer.addRole, answer.salary, answer.departmentid], (err, res) => {
                    if (err) throw err;
                    console.log('Added new role');
                })
                choices();
            }))

}

function addEmployee() {
    return inquirer
    .prompt([{
        type: 'input',
        name: 'first_name',
        message: "What is the employee's first name?",
        validate: function(firstname) {
            if (!firstName) {
                console.log('You must enter a name!')
                return false;
            }
            return true;
        }
    }, {
        type: 'input',
        name: 'lastname',
        message: "What is the employee's last name?",
        validate: function(lastName) {
            if (!lastname) {
                console.log('You must enter a name')
                return false;
            }
            return true;
        }
    }, {
        type: 'list',
        name: 'role',
        message: "What is the employee's role?",
        choice: roleArr
    }, {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choice: [{name:'No Manager', value:null}]

    }])
    .then((ans) => {
        var employee = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        db.query(employee, [ans.firstName, ans.lastName, ans.role, ans.manager], (err, response) => {
            if (err) throw err;
            console.log("Added New Employee")
        })
        return choice();
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
        choices:roleArr
    }])
    .then((ans) => {
        updateRole(ans);
        console.log('Role Updated!');
        employees = getEmployees();
        employeeArr = employeeArrFill();
        return choice();
    })
};

function quit() {
    console.log('Good bye! Thank you for using our application');
    return
}