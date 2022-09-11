const mysql = require('mysql2'); //Importing mysql2

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password1',
        database: 'company_db'
    },
    console.log('connected to company_db')
);



//Adding new departments that I can access data from
const deptArrFill = () => {
    const deptArr = [];
    db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            deptArr.push({name:rows[i].name, value:rows[i].id});
        }
    });
    return deptArr;
}

//Pulling all departments
const getDEPT = () => {
    const departments = [];
    db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            departments.push(rows[i]);
        }
    });
    return departments;
}

//new department added to departments
const newDept = (info) => {
    const sql = `INSERT INTO department (name) VALUES ('${info.name}')`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        return;
    })
};

//Getting employee data
const getEmployees = () => {
    const employees = [];
    db.query(`SELECT e.id, e.first_name, e.last_name, role.title AS job_title, role.salary AS salary, department.name AS department, CONCAT(m.first_name, ' ',m.last_name) AS manager FROM employee e LEFT JOIN role ON role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id =m.id`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            employees.push(rows[i]);
        }
    });
    return employees;
};

//Array for access to employee data
const employeeArrFill = () => {
    const employeeArr = [];
    db.query(`SELECT * FROM employee ORDER BY last_name`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            employeeArr.push({
                name:rows[i].first_name + ' ' + rows[i].last_name, value:rows[i].id
            });
        }
    });
    return employeeArr;
}

//Array for roles to be accessed
const roleArrFill = () => {
    const roleArr = [];
    db.query(`SELECT * FROM role`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            roleArr.push({
                name:rows[i].title, 
                value:rows[i].id
            });
        }
    });
    return roleArr;
}

//To update roles
const updateRole = (info) => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
    const params = [
        info.newRole, 
        info.employee
    ]
    db.query(sql, params, (err, res) => {
        if (err) throw err;
        return;
    })
}




module.exports = {getDEPT, newDept, deptArrFill, getEmployees, updateRole, roleArrFill, employeeArrFill,}