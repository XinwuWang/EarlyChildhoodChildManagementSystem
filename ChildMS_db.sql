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

-- CREATE TABLE center_info (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- title VARCHAR(255),
-- information_one TEXT,
-- information_two TEXT,
-- information_three TEXT
-- );

-- CREATE TABLE teacher_info (
-- id INT auto_increment PRIMARY KEY,
-- name VARCHAR(50),
-- email VARCHAR(50),
-- password VARCHAR(255),
-- phone VARCHAR(50),
-- teaching_No INT,
-- date_of_birth VARCHAR(100), 
-- address VARCHAR(255),
-- teaching_philosophy TEXT,
-- image VARCHAR(255)
-- );

create table child_info (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(50),
password VARCHAR(255),
date_of_birth VARCHAR(50),
dad_name varchar(100),
dad_phone varchar(30),
mum_name varchar(100),
mum_phone varchar(30),
address varchar(255),
allergy TEXT,
interests_and_hobbies TEXT,
other_notes TEXT,
profile_img VARCHAR(255)
);
