CREATE DATABASE IF NOT EXISTS employee_registration;
USE employee_registration;

CREATE TABLE IF NOT EXISTS Employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  age INT NOT NULL
);

INSERT INTO Employees (first_name, last_name, email, age) VALUES
  ('John', 'Doe', 'john.doe@example.com', 28),
  ('Jane', 'Doe', 'jane.doe@example.com', 32),
  ('Michael', 'Smith', 'michael.smith@example.com', 35),
  ('Emily', 'Johnson', 'emily.johnson@example.com', 29);

CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);