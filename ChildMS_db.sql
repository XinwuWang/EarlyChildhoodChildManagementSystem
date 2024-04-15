USE earlychildhoodchildms;

-- CREATE TABLE admin (
-- id INT PRIMARY KEY AUTO_INCREMENT,
-- email VARCHAR(50),
-- password VARCHAR(140)
-- );

-- CREATE TABLE category (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- name VARCHAR(30)
-- );

-- CREATE TABLE teacher (
-- id INT auto_increment PRIMARY KEY,
-- name VARCHAR(50),
-- email VARCHAR(50),
-- password VARCHAR(50),
-- phone VARCHAR(50),
-- teaching_No INT,
-- address VARCHAR(255),
-- categoryID INT,
-- image VARCHAR(100),
-- FOREIGN KEY (categoryID) REFERENCES category(id)
-- );

-- create table child (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- first_name varchar(30),
-- last_name varchar(30),
-- dad_name varchar(30),
-- mum_name varchar(30),
-- phone varchar(30),
-- address varchar(255),
-- allergy varchar(255)
-- );

insert into child (first_name, last_name)
values ('Noah', 'Muffin');