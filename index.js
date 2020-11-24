const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table')

var connection = mysql.createConnection({
    multipleStatements: true, 
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "root",
    database: "employee_db"
  });

  
  connection.connect(function(err) {
    if (err) throw err;
    start();
  });

  function start() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Select an Option: ",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add A Department",
          "Add A Role",
          "Add An Employee",
          "Update Employee Role",
          "Exit"
        ]
      })
    .then(function(answer) {
        if (answer.action === "View All Departments") {
            viewDepartments();
        } else if (answer.action === "View All Roles") {
            viewRoles();
        } else if (answer.action === "View All Employees") {
            viewEmployees();
        } else if (answer.action === "Add A Department") {
            addDepartment();
        } else if (answer.action === "Add A Role") {
            addRole();
        } else if (answer.action === "Add An Employee") {
            addEmployee();
        } else if (answer.action === "Update Employee Role") {
            updateRole();
        }
        else if (answer.action === "Exit") {
            connection.end();
        }
    })
    }

function viewDepartments() {
    var query = "SELECT * FROM department";
      connection.query(query, function(err, res) {
          console.log(`DEPARTMENTS:`)
        res.forEach(department => {
            console.log(`ID: ${department.id} | Name: ${department.name}`)
        })
        start();
        });
    };

function viewRoles() {
    var query = "SELECT * FROM role";
        connection.query(query, function(err, res) {
            console.log(`ROLES:`)
        res.forEach(role => {
            console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
        })
        start();
        });
    };

function viewEmployees() {
    var query = "SELECT * FROM employee";
        connection.query(query, function(err, res) {
            console.log(`EMPLOYEES:`)
        res.forEach(employee => {
            console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`);
        })
        start();
        });
    };

function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "Department Name: ",
          })
        .then(function(answer) {
        var query = "INSERT INTO department (name) VALUES ( ? )";
        connection.query(query, answer.department, function(err, res) {
            console.log(`Department Added: ${(answer.department).toUpperCase()}.`)
        })
        viewDepartments();
        })
}

function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw (err);
    inquirer
        .prompt([{
            name: "title",
            type: "input",
            message: "Role Title: ",
          }, 
          {
            name: "salary",
            type: "input",
            message: "Salary: ",
          },
          {
            name: "departmentName",
            type: "list",
            message: "Department for this Role: ",
            choices: function() {
                var choicesArray = [];
                res.forEach(res => {
                    choicesArray.push(
                        res.name
                    );
                })
                return choicesArray;
              }
          }
          ]) 
       
          .then(function(answer) {
        const department = answer.departmentName;
        connection.query('SELECT * FROM DEPARTMENT', function(err, res) {
        
            if (err) throw (err);
         let filteredDept = res.filter(function(res) {
            return res.name == department;
        }
        )
        let id = filteredDept[0].id;
       let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
       let values = [answer.title, parseInt(answer.salary), id]
       console.log(values);
        connection.query(query, values,
            function(err, res, fields) {
            console.log(`Role Added: ${(values[0]).toUpperCase()}.`)
        })
            viewRoles()
            })
        })
    })
}

