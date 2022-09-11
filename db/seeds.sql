-- Seed information for the created tables in the company database --

-- Using the departments from the example Readme image
INSERT INTO department (name )
VALUES ('Legal'), -- department 1
       ('Engineering'), -- department 2
       ('Sales'), -- department  3
       ('Finance'); -- department 4

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Salesperson', 80000, 3),
       (2, 'Sales Lead', 120000, 1),
       (3, 'Engineer', 120000, 2),
       (4, 'Lead Engineer', 150000, 2),
       (5, 'Accountant', 125000, 4),
       (6, 'Account Manager', 160000, 4),
       (7, 'Lawyer', 190000, 1),
       (8, 'Legal Team Lead', 250000, 1);
    

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('John', 'Doe', NULL, 1),
       ('Mike', 'Chan', 1, 1),
       ('Ashley', 'Rodriguez', NULL, 4),
       ('Kevin', 'Tupik', 3, 3),
       ('Kumal', 'Singh', NULL, 6),
       ('Malia', 'Brown', 5, 5),
       ('Sarah', 'Lourde', NULL, 8),
       ('Tom', 'Allen', 7, 7);

    