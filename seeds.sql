  
USE employee_db;

INSERT INTO department (name) VALUES ("Human Resources");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Technology");
INSERT INTO department (name) VALUES ("Management");


INSERT INTO role (title, salary, department_id) VALUES ("Admin Director", 100, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Associate", 50, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Benefits Manager", 80, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Data Analyst", 90, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Tech Manager", 120, 4);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("John", "Smith", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Mike", "Wesley", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Allie", "Johnson", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Taylor", "Bryant", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Robert", "Davidson", 5);