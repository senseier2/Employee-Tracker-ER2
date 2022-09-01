-- Seed information for the created tables in the company database --

--Using the departments from the example Readme image --
INSERT INTO department (names)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO roles (id, title, salary, department_id)
VALUES ('Sales person'),
       ('Lead Engineer'),
       ('Engineer'),
       ('Accountant'),
       ('Sales Lead');

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Michael', 'Jackson', 1, 1);
    