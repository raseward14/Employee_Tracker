-- Drops the employeeTracker_db if it exists currently --
DROP DATABASE IF EXISTS employeeTracker_db;
-- Creates the "employeeTracker_db" database --
CREATE DATABASE employeeTracker_db;
-- Makes it so all of the following code will affect employeeTracker_db --
USE employeeTracker_db;

CREATE TABLE department (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INTEGER AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30) NOT NULL,
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (id)
);

CREATE TABLE role (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INTEGER AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "title" which cannot contain null --
  title VARCHAR(30) NOT NULL,
  -- Creates a numeric column "salary" which cannot contain null --
  salary INTEGER NOT NULL,
  -- Makes an numeric column called "department_id" --
  department_id INTEGER,
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INTEGER AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "first_name" which cannot contain null --
  first_name VARCHAR(30) NOT NULL,
  -- Makes a string column called "last_name" which cannot contain null --
  last_name VARCHAR(30) NOT NULL,
  -- Makes an numeric column called "role_id" --
  role_id INTEGER NOT NULL,
  -- Makes an numeric column called "manager_id" --
  manager_id INTEGER,
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (id)
);



