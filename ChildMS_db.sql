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

-- create table child_info (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- name VARCHAR(100),
-- email VARCHAR(50),
-- password VARCHAR(255),
-- date_of_birth VARCHAR(50),
-- dad_name varchar(100),
-- dad_phone varchar(30),
-- mum_name varchar(100),
-- mum_phone varchar(30),
-- address varchar(255),
-- allergy TEXT,
-- interests_and_hobbies TEXT,
-- other_notes TEXT,
-- profile_img VARCHAR(255)
-- );

-- ALTER TABLE admin
-- ADD (
-- date_of_birth VARCHAR(30),
-- address VARCHAR(255),
-- phone VARCHAR(30),
-- start_date VARCHAR(30)
-- );


-- UPDATE admin 
-- SET date_of_birth = '1987-3-12', 
--     address = '9B Hill Ave Auckland', 
--     phone = '0278391846', 
--     start_date = '2022-1-1'
-- WHERE id = 1;

-- ALTER TABLE child_info
-- MODIFY COLUMN date_of_birth DATE;

-- ALTER TABLE child_info
-- ADD COLUMN start_date DATE;

-- ALTER TABLE teacher_info
-- MODIFY COLUMN date_of_birth DATE;

-- ALTER TABLE teacher_info
-- ADD COLUMN start_date DATE;

-- ALTER TABLE admin
-- ADD COLUMN name VARCHAR(50);

-- UPDATE admin
-- SET name = 'Ray Smith'
-- WHERE id = 1;

-- ALTER TABLE admin
-- ADD COLUMN image VARCHAR(100);

-- UPDATE admin
-- SET image = 'ray_smith.png'
-- WHERE id = 1;

-- ALTER TABLE teacher_info
-- MODIFY COLUMN date_of_birth VARCHAR(50);

-- ALTER TABLE teacher_info
-- MODIFY COLUMN start_date VARCHAR(50);

-- ALTER TABLE admin
-- MODIFY COLUMN date_of_birth VARCHAR(50);

-- ALTER TABLE admin
-- MODIFY COLUMN start_date VARCHAR(50);

-- ALTER TABLE child_info
-- MODIFY COLUMN date_of_birth VARCHAR(50);

-- ALTER TABLE child_info
-- MODIFY COLUMN start_date VARCHAR(50);

-- CREATE TABLE centre_info (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- title VARCHAR(255),
-- content_one TEXT,
-- content_two TEXT,
-- content_three TEXT,
-- admin_id INT,
-- update_date VARCHAR(50),
-- update_time VARCHAR(50),
-- FOREIGN KEY (admin_id) REFERENCES admin(id)
-- );

-- CREATE TABLE note (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- title VARCHAR(50),
-- content TEXT,
-- update_date VARCHAR(50),
-- update_time VARCHAR(50),
-- admin_id INT,
-- teacher_id INT,
-- FOREIGN KEY (admin_id) REFERENCES admin(id),
-- FOREIGN KEY (teacher_id) REFERENCES teacher_info (id)
-- );

-- ALTER TABLE note 
-- RENAME COLUMN note_id 
-- TO id;

-- CREATE TABLE teaching_resource (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- title VARCHAR(255),
-- resource_description TEXT,
-- link VARCHAR(255),
-- person_who_adds INT,
-- update_date VARCHAR(50)
-- FOREIGN KEY (person_who_adds) REFERENCES teacher_info (id)
-- );

-- INSERT INTO teaching_resource (title, resource_description, link, person_who_adds, update_date)
-- VALUES ('learn play', 'play through learn', 'www.ab.com', '1', '2024-03-22'),
-- ('toy', 'play playplay', 'www.scdss.com', '2', '2024-04-12'),
-- ('car', 'drive car', 'www.xxxx.com', '3', '2024-01-15'),
-- ('doll', 'play and learn', 'www.lskl.com', '5', '2024-02-02');

-- CREATE TABLE announcement (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- title VARCHAR(255),
-- content TEXT,
-- post_date VARCHAR(50),
-- post_time VARCHAR(50),
-- person_who_posts INT,
-- teacher_who_posts INT;
-- FOREIGN KEY (person_who_posts) REFERENCES admin (id),
-- FOREIGN KEY (teacher_who_posts) REFERENCES teacher_info (id)
-- );

-- CREATE TABLE meal_chart (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- meal_date VARCHAR(50),
-- morning_tea VARCHAR(255),
-- lunch VARCHAR(255),
-- afternoon_tea VARCHAR(255),
-- supervisor INT,
-- FOREIGN KEY (supervisor) REFERENCES teacher_info (id)
-- );

-- CREATE TABLE meal_detail (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- child INT,
-- meal_day INT,
-- mt_portion VARCHAR(255),
-- lunch_portion VARCHAR(255),
-- at_portion VARCHAR(255),
-- note VARCHAR(255),
-- FOREIGN KEY (child) REFERENCES child_info (id),
-- FOREIGN KEY (meal_day) REFERENCES meal_chart (id)
-- );

-- CREATE TABLE bottle_chart (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- bottle_date VARCHAR(50),
-- child INT,
-- time_one VARCHAR(50),
-- time_two VARCHAR(50),
-- time_three VARCHAR(50),
-- note VARCHAR(255),
-- supervisor INT,
-- FOREIGN KEY (child) REFERENCES child_info(id),
-- FOREIGN KEY (supervisor) REFERENCES teacher_info (id)
-- );


-- CREATE TABLE sleep_chart (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- sleep_date VARCHAR(50),
-- child INT,
-- time_to_bed VARCHAR(50),
-- time_of_sleep VARCHAR(50),
-- time_of_wakeup VARCHAR(50),
-- time_out_of_bed VARCHAR(50),
-- note VARCHAR(255),
-- supervisor INT,
-- FOREIGN KEY (child) REFERENCES child_info(id),
-- FOREIGN KEY (supervisor) REFERENCES teacher_info (id)
-- );


-- CREATE TABLE accident_form (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- child INT,
-- accident_date VARCHAR(50),
-- accident_time VARCHAR(50),
-- location_of_incident VARCHAR(255),
-- description_of_incident TEXT,
-- injury_assessment VARCHAR(255),
-- medical_treatment VARCHAR(255),
-- staff_response VARCHAR(255),
-- additional_notes VARCHAR(255),
-- supervisor INT,
-- FOREIGN KEY (child) REFERENCES child_info(id),
-- FOREIGN KEY (supervisor) REFERENCES teacher_info (id)
-- );

-- CREATE TABLE sunblock_chart (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- apply_date VARCHAR(50),
-- child INT,
-- apply_time_one VARCHAR(50),
-- apply_time_two VARCHAR(50),
-- apply_time_three VARCHAR(50),
-- note VARCHAR(255),
-- supervisor INT,
-- FOREIGN KEY (child) REFERENCES child_info(id),
-- FOREIGN KEY (supervisor) REFERENCES teacher_info (id)
-- );

-- CREATE TABLE attendance_chart (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- child INT,
-- attendance_date VARCHAR(50),
-- time_in VARCHAR(50),
-- time_out VARCHAR(50),
-- FOREIGN KEY (child) REFERENCES child_info(id)
-- );
