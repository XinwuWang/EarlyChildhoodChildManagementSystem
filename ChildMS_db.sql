DROP DATABASE IF EXISTS earlychildhoodchildms;
CREATE DATABASE earlychildhoodchildms;

USE earlychildhoodchildms;

DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS accident_form;
DROP TABLE IF EXISTS announcement;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS attendance_record;
DROP TABLE IF EXISTS centre_info;
DROP TABLE IF EXISTS child_info;
DROP TABLE IF EXISTS formula_chart;
DROP TABLE IF EXISTS formula_detail;
DROP TABLE IF EXISTS learning_story;
DROP TABLE IF EXISTS learning_story_detail;
DROP TABLE IF EXISTS meal_chart;
DROP TABLE IF EXISTS meal_detail;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS note;
DROP TABLE IF EXISTS sleep_chart;
DROP TABLE IF EXISTS sleep_detail;
DROP TABLE IF EXISTS sunblock;
DROP TABLE IF EXISTS sunblock_chart;
DROP TABLE IF EXISTS teacher_info;
DROP TABLE IF EXISTS teaching_resource;
-- BEGIN;

-- 1. Create tables
CREATE TABLE admin (
id INT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(50),
password VARCHAR(255),
date_of_birth VARCHAR(50),
address VARCHAR(255),
phone VARCHAR(30),
start_date VARCHAR(50),
name VARCHAR(50),
image VARCHAR(100),
UNIQUE (email)
);

CREATE TABLE teacher_info (
id INT auto_increment PRIMARY KEY,
name VARCHAR(50),
email VARCHAR(50),
password VARCHAR(255),
phone VARCHAR(50),
teaching_No INT,
date_of_birth VARCHAR(50), 
address VARCHAR(255),
teaching_philosophy TEXT,
image VARCHAR(255),
start_date VARCHAR(50),
UNIQUE (email)
);

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
profile_img VARCHAR(255),
start_date VARCHAR(50),
UNIQUE (email)
);


CREATE TABLE centre_info (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
content_one TEXT,
content_two TEXT,
content_three TEXT,
admin_id INT,
update_date VARCHAR(50),
update_time VARCHAR(50),
FOREIGN KEY (admin_id) REFERENCES admin(id) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE note (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(50),
content TEXT,
update_date VARCHAR(50),
update_time VARCHAR(50),
admin_id INT,
teacher_id INT,
FOREIGN KEY (admin_id) REFERENCES admin(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (teacher_id) REFERENCES teacher_info (id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE teaching_resource (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
resource_description TEXT,
link VARCHAR(255),
person_who_adds INT,
update_date VARCHAR(50),
FOREIGN KEY (person_who_adds) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE
);



CREATE TABLE announcement (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
content TEXT,
post_date VARCHAR(50),
post_time VARCHAR(50),
person_who_posts INT,
teacher_who_posts INT,
FOREIGN KEY (person_who_posts) REFERENCES admin (id) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (teacher_who_posts) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE meal_chart (
id INT AUTO_INCREMENT PRIMARY KEY,
meal_date VARCHAR(50),
morning_tea VARCHAR(255),
lunch VARCHAR(255),
afternoon_tea VARCHAR(255),
supervisor INT,
FOREIGN KEY (supervisor) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE meal_detail (
id INT AUTO_INCREMENT PRIMARY KEY,
child INT,
meal_day INT,
mt_portion VARCHAR(255),
lunch_portion VARCHAR(255),
at_portion VARCHAR(255),
note VARCHAR(255),
FOREIGN KEY (child) REFERENCES child_info (id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (meal_day) REFERENCES meal_chart (id) ON UPDATE CASCADE
);


CREATE TABLE accident_form (
id INT AUTO_INCREMENT PRIMARY KEY,
child INT,
accident_date VARCHAR(50),
accident_time VARCHAR(50),
location_of_accident VARCHAR(255),
description_of_accident TEXT,
injury_assessment VARCHAR(255),
medical_treatment VARCHAR(255),
staff_response VARCHAR(255),
additional_notes VARCHAR(255),
supervisor INT,
FOREIGN KEY (child) REFERENCES child_info(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (supervisor) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE attendance (
id INT AUTO_INCREMENT PRIMARY KEY,
form_date VARCHAR(50),
person_who_created INT,
FOREIGN KEY (person_who_created) REFERENCES admin(id) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE attendance_record (
id INT AUTO_INCREMENT PRIMARY KEY,
child INT,
attendance_date INT,
time_in VARCHAR(50),
time_out VARCHAR(50),
parent_signature INT,
teacher_signature INT,
admin_signature INT,
FOREIGN KEY (child) REFERENCES child_info(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (attendance_date) REFERENCES attendance(id) ON UPDATE CASCADE,
FOREIGN KEY (parent_signature) REFERENCES child_info(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (teacher_signature) REFERENCES teacher_info(id) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (admin_signature) REFERENCES admin(id) ON DELETE SET NULL ON UPDATE CASCADE	
);


CREATE TABLE sunblock (
id INT AUTO_INCREMENT PRIMARY KEY,
apply_date VARCHAR(50),
person_who_created INT,
FOREIGN KEY (person_who_created) REFERENCES teacher_info(id) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE sunblock_chart (
id INT AUTO_INCREMENT PRIMARY KEY,
apply_date INT,
child INT,
apply_time_one VARCHAR(50),
apply_time_two VARCHAR(50),
apply_time_three VARCHAR(50),
note VARCHAR(255),
supervisor INT,
FOREIGN KEY (child) REFERENCES child_info(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (supervisor) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (apply_date) REFERENCES sunblock(id) ON UPDATE CASCADE
);


CREATE TABLE sleep_chart (
id INT AUTO_INCREMENT PRIMARY KEY,
sleep_date VARCHAR(50),
person_who_created INT,
FOREIGN KEY (person_who_created) REFERENCES teacher_info(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE sleep_detail (
id INT AUTO_INCREMENT PRIMARY KEY,
sleep_date INT,
child INT,
time_to_bed VARCHAR(50),
time_of_sleep VARCHAR(50),
time_of_wakeup VARCHAR(50),
time_out_of_bed VARCHAR(50),
note VARCHAR(255),
supervisor INT,
FOREIGN KEY (sleep_date) REFERENCES sleep_chart(id) ON UPDATE CASCADE, 
FOREIGN KEY (child) REFERENCES child_info(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (supervisor) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE formula_chart (
id INT AUTO_INCREMENT PRIMARY KEY,
feeding_date VARCHAR(50),
person_who_created INT,
FOREIGN KEY (person_who_created) REFERENCES teacher_info(id) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE formula_detail (
id INT AUTO_INCREMENT PRIMARY KEY,
feeding_date INT,
child INT,
time_one VARCHAR(50),
time_two VARCHAR(50),
time_three VARCHAR(50),
note VARCHAR(255),
supervisor INT,
FOREIGN KEY (child) REFERENCES child_info(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (feeding_date) REFERENCES formula_chart(id) ON UPDATE CASCADE,
FOREIGN KEY (supervisor) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE learning_story (
id INT AUTO_INCREMENT PRIMARY KEY,
created_month VARCHAR(50),
created_by INT,
FOREIGN KEY (created_by) REFERENCES teacher_info(id) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE learning_story_detail (
id INT AUTO_INCREMENT PRIMARY KEY,
child INT,
title VARCHAR(255),
content TEXT,
person_who_wrote INT,
update_date VARCHAR(50),
created_month INT,
FOREIGN KEY (child) REFERENCES child_info(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (person_who_wrote) REFERENCES teacher_info(id) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (created_month) REFERENCES learning_story(id) ON UPDATE CASCADE
);


CREATE TABLE message (
id INT AUTO_INCREMENT PRIMARY KEY,
teacher_sender INT,
child_sender INT,
admin_sender INT,
title VARCHAR(255),
content TEXT,
sent_date VARCHAR(50),
sent_time VARCHAR(50),
teacher_receiver INT,
child_receiver INT,
admin_receiver INT,
FOREIGN KEY (teacher_sender) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (child_sender) REFERENCES child_info (id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (admin_sender) REFERENCES admin (id) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (teacher_receiver) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (child_receiver) REFERENCES child_info (id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (admin_receiver) REFERENCES admin (id) ON DELETE SET NULL ON UPDATE CASCADE
);





-- 2. Populate database
INSERT INTO admin (email, password, date_of_birth, address, phone, start_date, name, image)
VALUES ('admin@gmail.com', '$2a$10$21EkskmLCjiul1VCpd1Ow.F/IEQVGdb0dqGiFJ5Fuog4HddQSBbKu', '1985-06-01', '9B Hill Ave Auckland', '0278391234', '2023-06-01', 'Ray Smith', 'ray_smith.png');

INSERT INTO teacher_info (name, email, password, phone, teaching_No, date_of_birth, address, teaching_philosophy, image, start_date)
VALUES 
('Amy Lee', 'teacher@gmail.com', '$2a$10$21EkskmLCjiul1VCpd1Ow.F/IEQVGdb0dqGiFJ5Fuog4HddQSBbKu', '02193892837', 2938093, '1993-02-04', 'H Road Auckland NZ', 'Learn through play', 'teacher.png_1714343176071.png', '2023-03-18'),
('Jackson Smith', 'jackson.s@gmail.com', '$2a$10$eS3wkG.cdfutPlhmwn7wLuOpg2TX3yNK/09hn6E/9rM2E4uLFL4GW', '0219384782', 283791, '1995-01-03', '88 Remuera Rd Auckland', 'Peer modeling', 'image_1713695523507.jpg', '2021-05-05'),
('Emma Johnson', 'emma.johnson@gmail.com', '$2a$10$21EkskmLCjiul1VCpd1Ow.F/IEQVGdb0dqGiFJ5Fuog4HddQSBbKu', '02198765432', 123456, '1987-07-15', '123 Main St, Wellington', 'Hands-on learning', null, '2022-09-10'),
('Rupa Naicker', 'rupa.naicker@gmail.com', '$2a$10$21EkskmLCjiul1VCpd1Ow.F/IEQVGdb0dqGiFJ5Fuog4HddQSBbKu', '02187654321', 987654, '1980-11-25', '456 High St, Christchurch', 'Individualized instruction', null, '2023-01-15'),
('Sophie Williams', 'sophie.williams@gmail.com', '$2a$10$21EkskmLCjiul1VCpd1Ow.F/IEQVGdb0dqGiFJ5Fuog4HddQSBbKu', '02176543210', 456789, '1990-04-30', '789 Queen St, Auckland', 'Cooperative learning', null, '2021-12-01')
;


INSERT INTO child_info (name, email, password, date_of_birth, dad_name, dad_phone, mum_name, mum_phone, address, allergy, interests_and_hobbies, other_notes, profile_img, start_date)
VALUES
('Leo Money', 'child@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2022-01-01', 'Chris Money', '02938455', 'Kate Cook', '029384782', 'Hall Ave East Coast', 'Milk', 'Bikes', 'Good eater', 'dummy_child.png_1715328753972.png', '2023-12-22'),
('Emma Johnson', 'emma.johnson@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-02-15', 'John Johnson', '02938456', 'Emily Brown', '029384783', 'Park St West Coast', 'Peanuts', 'Reading', 'Loves animals', NULL, '2022-12-23'),
('Oliver Smith', 'oliver.smith@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-03-10', 'Michael Smith', '02938457', 'Sophia Davis', '029384784', 'Maple Rd East Coast', NULL, 'Football', 'Very active', NULL, '2022-10-24'),
('Ava Williams', 'ava.williams@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-04-05', 'David Williams', '02938458', 'Isabella Martinez', '029384785', 'Oak St South Coast', NULL, 'Painting', 'Shy but friendly', NULL, '2022-01-25'),
('Noah Brown', 'noah.brown@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2022-05-25', 'Daniel Brown', '02938459', 'Mia Garcia', '029384786', 'Pine St North Coast', 'Eggs', 'Football', 'Loves water', NULL, '2023-12-26'),
('Sophia Jones', 'sophia.jones@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-06-30', 'Matthew Jones', '02938460', 'Charlotte Wilson', '029384787', 'Cedar Rd Central Coast', 'Nuts', 'Dancing', 'Very social', NULL, '2021-12-27'),
('James Rodriguez', 'james.rodriguez@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-07-15', 'Joseph Rodriguez', '02938461', 'Amelia Lee', '029384788', 'Birch St West Coast', 'Shellfish', 'Music', 'Loves to sing', NULL, '2022-04-28'),
('Mia Martinez', 'mia.martinez@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-08-20', 'Joshua Martinez', '02938462', 'Harper White', '029384789', 'Elm St East Coast', 'Wheat', 'Drawing', 'Very creative', NULL, '2022-06-29'),
('Lucas Hernandez', 'lucas.hernandez@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-09-05', 'James Hernandez', '02938463', 'Evelyn Harris', '029384790', 'Ash St South Coast', 'Dairy', 'Reading', 'Book lover', NULL, '2021-06-30'),
('Amelia Clark', 'amelia.clark@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2022-10-10', 'Andrew Clark', '02938464', 'Ella Lewis', '029384791', 'Fir St North Coast', 'Peanuts', 'Arts', 'Loves making things', NULL, '2023-03-31'),
('Ethan Lee', 'ethan.lee@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-11-20', 'Ryan Lee', '02938465', 'Avery Walker', '029384792', 'Spruce St Central Coast', 'Seafood', 'Running', 'Very energetic', NULL, '2021-12-22'),
('Chloe Kim', 'chloe.kim@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-12-25', 'Brandon Kim', '02938466', 'Sofia King', '029384793', 'Willow St West Coast', 'Soy', 'Singing', 'Loves music', NULL, '2022-09-03'),
('Benjamin Perez', 'benjamin.perez@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-01-05', 'Ethan Perez', '02938467', 'Aria Green', '029384794', 'Aspen St East Coast', 'Nuts', 'Biking', 'Adventurous', NULL, '2022-11-24'),
('Aarav Patel', 'aarav.patel@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2022-02-10', 'Liam Patel', '02938468', 'Lily Scott', '029384795', 'Cherry St South Coast', 'Eggs', 'Singing', 'Very smart', NULL, '2023-11-25'),
('Isabella Nguyen', 'isabella.nguyen@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-03-15', 'Lucas Nguyen', '02938469', 'Grace Young', '029384796', 'Beech St North Coast', 'Milk', 'Dancing', 'Full of energy', NULL, '2021-10-26'),
('Alexander Chen', 'alexander.chen@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-04-20', 'Mason Chen', '02938470', 'Zoey Adams', '029384797', 'Cypress St Central Coast', 'Gluten', 'Sand', 'Loves snow', NULL, '2023-07-07'),
('Sofia Rivera', 'sofia.rivera@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-05-25', 'Carter Rivera', '02938471', 'Scarlett Baker', '029384798', 'Dogwood St West Coast', NULL, 'Biking', 'Nature lover', NULL, '2022-08-18'),
('Liam Khalid', 'liam.khalid@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-06-30', 'Jacob Khalid', '02938472', 'Layla Gonzales', '029384799', 'Elm St East Coast', 'Shellfish', 'Biking', 'Likes bikes', NULL, '2023-09-29'),
('Maya Rossi', 'maya.rossi@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-07-15', 'Sebastian Rossi', '02938473', 'Chloe Ramirez', '029384800', 'Hazel St South Coast', NULL, 'Climbing', 'Big fan of cars', NULL, '2023-04-30'),
('Daniel Wang', 'daniel.wang@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-08-20', 'Alexander Wang', '02938474', 'Nora Parker', '029384801', 'Ivy St North Coast', NULL, 'Sand', 'Energitic', NULL, '2022-05-31'),
('Emily Smith', 'emily.smith@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2022-01-15', 'Ethan Smith', '02938475', 'Emma Thompson', '029384802', 'Main St East Coast', 'Milk', 'Reading', 'Very curious', NULL, '2023-12-22'),
('Liam Johnson', 'liam.johnson@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-02-20', 'Noah Johnson', '02938476', 'Ava Martinez', '029384803', 'Broadway West Coast', NULL, 'Football', '', NULL, '2023-12-23'),
('Olivia Williams', 'olivia.williams@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-03-10', 'James Williams', '02938477', 'Sophia Anderson', '029384804', 'High St North Coast', NULL, 'Painting', 'Very artistic', NULL, '2023-12-24'),
('Lucas Brown', 'lucas.brown@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-04-15', 'Benjamin Brown', '02938478', 'Mia Clark', '029384805', 'Park Ave South Coast', 'Gluten', 'Cycling', 'Energetic', NULL, '2023-12-25'),
('Ava Davis', 'ava.davis@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2022-05-25', 'Alexander Davis', '02938479', 'Isabella Lee', '029384806', 'Church St East Coast', 'Eggs', 'Swimming', 'Water lover', NULL, '2023-12-26'),
('Isabella Martinez', 'isabella.martinez@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-06-05', 'William Martinez', '02938480', 'Emily Perez', '029384807', 'Maple Ave West Coast', 'Nuts', 'Dancing', 'Very lively', NULL, '2023-12-27'),
('Ethan Rodriguez', 'ethan.rodriguez@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-07-20', 'Michael Rodriguez', '02938481', 'Harper Young', '029384808', 'Oak St Central Coast', NULL, 'Music', '', NULL, '2023-12-28'),
('Mia Hernandez', 'mia.hernandez@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-08-15', 'Daniel Hernandez', '02938482', 'Charlotte King', '029384809', 'Pine St North Coast', NULL, 'Drawing', 'Creative mind', NULL, '2023-12-29'),
('Oliver Lopez', 'oliver.lopez@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-09-25', 'David Lopez', '02938483', 'Amelia Wright', '029384810', 'Birch St South Coast', 'Dairy', 'Reading', '', NULL, '2023-12-30'),
('Sophia Wilson', 'sophia.wilson@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2022-10-10', 'Matthew Wilson', '02938484', 'Evelyn Harris', '029384811', 'Cedar Rd East Coast', NULL, 'Arts', 'Loves making things', NULL, '2022-12-31'),
('Jackson Gonzalez', 'jackson.gonzalez@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-11-20', 'James Gonzalez', '02938485', 'Ella Lewis', '029384812', 'Spruce St West Coast', 'Seafood', 'Running', 'High energy', NULL, '2022-12-22'),
('Amelia White', 'amelia.white@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-12-25', 'Ryan White', '02938486', 'Scarlett Walker', '029384813', 'Willow St Central Coast', 'Soy', 'Singing', 'Musical talent', NULL, '2022-12-23'),
('Liam Harris', 'liam.harris@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-01-05', 'Joshua Harris', '02938487', 'Sofia Hall', '029384814', 'Aspen St North Coast', 'Nuts', 'Biking', 'Adventurous', NULL, '2023-12-24'),
('Evelyn Sanchez', 'evelyn.sanchez@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2022-02-10', 'Benjamin Sanchez', '02938488', 'Avery Green', '029384815', 'Cherry St South Coast', NULL, 'Reading', '', NULL, '2023-12-25'),
('Mason Clark', 'mason.clark@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-03-15', 'Jacob Clark', '02938489', 'Aria Adams', '029384816', 'Beech St East Coast', NULL, 'Dancing', 'Energetic', NULL, '2022-12-26'),
('Sofia Lewis', 'sofia.lewis@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-04-20', 'Ethan Lewis', '02938490', 'Lily Scott', '029384817', 'Cypress St West Coast', NULL, 'Sand', 'Loves winter', NULL, '2022-12-27'),
('Aiden Young', 'aiden.young@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-05-25', 'William Young', '02938491', 'Grace Turner', '029384818', 'Dogwood St Central Coast', 'Wheat', 'Sand', 'Nature lover', NULL, '2022-12-28'),
('Harper Hill', 'harper.hill@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-06-30', 'Alexander Hill', '02938492', 'Zoey Ramirez', '029384819', 'Elm St East Coast', 'Shellfish', 'Biking', 'Green thumb', NULL, '2022-12-29'),
('Aarav Sharma', 'aarav.sharma@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2022-07-15', 'Rohan Sharma', '02938493', 'Priya Sharma', '029384820', 'Sycamore St North Coast', 'Peanuts', 'Biking', 'Future athlete', NULL, '2022-12-30'),
('Aria Patel', 'aria.patel@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-08-20', 'Vikram Patel', '02938494', 'Neha Patel', '029384821', 'Magnolia St West Coast', 'Gluten', 'Drawing', 'Creative mind', NULL, '2023-12-31'),
('Ishaan Gupta', 'ishaan.gupta@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-09-10', 'Arjun Gupta', '02938495', 'Anika Gupta', '029384822', 'Poplar St Central Coast', NULL, 'Math', '', NULL, '2023-12-22'),
('Chloe Martin', 'chloe.martin@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-10-15', 'Lucas Martin', '02938496', 'Olivia Martin', '029384823', 'Ash St South Coast', NULL, 'Climbing', 'Team player', NULL, '2023-12-23'),
('Sebastian Clark', 'sebastian.clark@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-11-20', 'Henry Clark', '02938497', 'Luna Clark', '029384824', 'Fir St East Coast', NULL, 'Climbing', 'Loves sports', NULL, '2023-12-24'),
('Ella Mitchell', 'ella.mitchell@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-12-25', 'Samuel Mitchell', '02938498', 'Grace Mitchell', '029384825', 'Palm St North Coast', 'Shellfish', 'Puzzles', 'Problem solver', NULL, '2022-12-25'),
('Henry Walker', 'henry.walker@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-01-05', 'John Walker', '02938499', 'Mila Walker', '029384826', 'Willow St West Coast', 'Peanuts', 'Reading', 'Loves the outdoors', NULL, '2022-12-26'),
('Luna Torres', 'luna.torres@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-02-10', 'David Torres', '02938500', 'Isabella Torres', '029384827', 'Cherry St Central Coast', 'Nuts', 'Sand', 'Very flexible', NULL, '2023-12-27'),
('Mason Nguyen', 'mason.nguyen@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-03-15', 'William Nguyen', '02938501', 'Emily Nguyen', '029384828', 'Beech St South Coast', NULL, 'Soccer', '', NULL, '2022-12-28'),
('Avery Rivera', 'avery.rivera@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2021-04-20', 'Michael Rivera', '02938502', 'Sophia Rivera', '029384829', 'Cypress St East Coast', 'Gluten', 'Reading', '', NULL, '2022-12-29'),
('Lucas Adams', 'lucas.adams@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2020-05-25', 'James Adams', '02938503', 'Charlotte Adams', '029384830', 'Dogwood St North Coast', NULL, 'Arts', 'Water lover', NULL, '2023-12-30')
;



INSERT INTO centre_info (title, content_one, content_two, content_three, admin_id, update_date, update_time)
VALUES 
('Our Centre', 'At BestStart Meadowbank, we provide a nurturing and supportive environment that embraces core family principles. We build strong relationships with families and children, ensuring open communication and mutual trust. Learning journey and milestones are captured and shared through communication.', 'We also assist with your child transition to primary school by promoting self-help skills and offering opportunities that encourage independence. Our centre is located close to Meadowbank Primary School and we have a strong relationship that facilitates a smooth transition when your child is ready to take the next step in their learning journey.', '', 1, '2024-05-10', '12:10:17'),
('Our Team', 'Our qualified team of teachers encourage children to engage in physical activity as part of their everyday learning experiences and our centre cook provides healthy food and snacks throughout the day so that children receive the nourishment they need. We believe in open communication and work alongside families to ensure the very best care and learning for your child.', '', '', 1, '2024-05-10', '13:12:31'),
('Contact us', 'Email: bs-meadowbank@mail.com', 'Phone: 0219384493', 'Address: 12 Meadowbank Road Auckland', 1, '2024-05-10', '14:32:23')
;

INSERT INTO note (title, content, update_date, update_time, admin_id, teacher_id)
VALUES 
('Meeting Notes', 'Discussed the upcoming curriculum changes.', '2024-05-15', '10:30:12', 1, NULL),
('Parent-Teacher Conference', 'Scheduled for next Monday at 9 AM.', '2024-05-16', '09:00:00', NULL, 1),
('Safety Drill', 'Safety drill to be conducted on Friday.', '2024-05-17', '11:00:13', NULL, 2),
('Field Trip', 'Field trip to the museum scheduled.', '2024-05-18', '14:00:35', 1, NULL),
('New Policy', 'Introduced a new policy to parents.', '2024-05-19', '08:30:12', 1, NULL),
('Classroom Resources', 'Additional resources available in the library.', '2024-05-20', '13:45:33', NULL, 3),
('Teacher Training', 'Mandatory training session for all teachers.', '2024-05-21', '15:30:10', NULL, 4),
('Holiday Schedule', 'Updated holiday schedule for the next semester.', '2024-05-22', '10:00:01', 1, NULL),
('Exam Schedule', 'Final exams to start from next month.', '2024-05-23', '12:00:13', NULL, 5),
('Maintenance Notice', 'Scheduled maintenance for the computer lab.', '2024-05-24', '09:30:45', 1, NULL)
;



INSERT INTO teaching_resource (title, resource_description, link, person_who_adds, update_date)
VALUES
('Tāhūrangi - Te Whāriki Online', 'Te Whāriki puts complete focus on the child and family, and looks at children learning through their eyes', 'https://tewhariki.tahurangi.education.govt.nz/early-childhood-curriculum-home', 1, '2024-04-13'),
('Importance of Play', 'Play is multi-faceted, complex and dynamic, eluding easy definition. It is usually felt to be a universal activity and children are often portrayed as having an inherent desire and capacity to play.', 'https://theeducationhub.org.nz/what-is-play-and-why-is-it-important-for-learning/', 2, '2024-05-01'),
('Benefits of messy play for preschoolers', 'Messy play provides preschoolers with a great opportunity to learn through unstructured play.', 'https://www.under5s.co.nz/shop/Hot+Topics+Articles/Toys+Books+Play/Messy+play/Benefits+of+messy+play+for+preschoolers.html', 3, '2024-04-23'),
('Looking after a child or young person\'s mental health', 'See tips and advice for parents and carers on how to support children and young people\'s mental wellbeing, and give them the best chance to stay healthy.', 'https://www.nhs.uk/every-mind-matters/supporting-others/childrens-mental-health/', 4, '2024-03-21'),
('MUSIC AND THE BRAIN: THE BENEFITS OF MUSIC', 'Dancing to music helps children build motor skills while allowing them to practice self-expression.', 'https://www.brighthorizons.com/resources/Article/music-and-children-rhythm-meets-child-development', 5, '2024-04-27')
;


INSERT INTO announcement (title, content, post_date, post_time, person_who_posts, teacher_who_posts)
VALUES
('Outdoor Picnic', 'Let\'s enjoy the beautiful weather with an outdoor picnic on June 15th. Pack your child\'s favorite snacks and join us for a fun day!', '2024-06-03', '11:30:12', 1, NULL),
('Parent-Teacher Meeting', 'There will be a parent-teacher meeting next Friday at 4 PM. Please ensure to attend to discuss your child\'s progress.', '2024-05-29', '16:00:32', NULL, 1),
('Winter Camp Registration', 'Registrations for the winter camp are now open. Please sign up at the front desk by June 10th.', '2024-05-30', '09:00:08', 1, NULL),
('Nutrition Workshop', 'Join us for a nutrition workshop on healthy eating habits for young children. The workshop will be held on June 5th at 2 PM.', '2024-05-31', '14:00:00', NULL, 2),
('Gardening Day', 'Help us beautify our garden! We\'re hosting a gardening day on June 12th. Bring your gardening gloves and join us at 10 AM.', '2024-06-05', '10:00:07', NULL, 4),
('Storytelling Session', 'We will have a special storytelling session with a guest storyteller next Wednesday at 11 AM. All children are welcome to attend.', '2024-06-01', '11:00:09', NULL, 3);
;



INSERT INTO meal_chart (meal_date, morning_tea, lunch, afternoon_tea, supervisor)
VALUES 
('2024-05-01', 'Fruit Salad', 'Chicken Sandwiches', 'Carrot Sticks with Hummus', 1),
('2024-05-02', 'Yogurt with Berries', 'Vegetable Pasta', 'Apple Slices', 3),
('2024-05-03', 'Banana Muffins', 'Fish Sticks with Rice', 'Cucumber Slices', 1),
('2024-05-04', 'Oatmeal with Raisins', 'Beef Stir-fry with Rice', 'Orange Wedges', 2),
('2024-05-05', 'Cheese Cubes', 'Vegetable Soup with Bread', 'Grapes', 5)
;


INSERT INTO meal_detail (child, meal_day, mt_portion, lunch_portion, at_portion, note)
VALUES 
(1, 1, 'S', 'M', 'R', 'Not hungry'),
(2, 1, 'M', 'L', 'S', ''),
(3, 1, 'S', 'M', 'S', ''),
(4, 1, 'M', 'L', 'R', ''),
(5, 1, 'S', 'M', 'R', ''),
(6, 1, 'M', 'L', 'S', ''),
(7, 1, 'S', 'M', 'R', ''),
(8, 1, 'M', 'L', 'R', ''),
(9, 1, 'S', 'M', 'S', ''),
(10, 1, 'M', 'L', 'R', ''),
(11, 1, 'S', 'M', 'S', ''),
(12, 1, 'M', 'L', 'R', ''),
(13, 1, 'S', 'M', 'R', ''),
(14, 1, 'M', 'L', 'R', ''),
(15, 1, 'S', 'M', 'R', ''),
(16, 1, 'M', 'L', 'R', ''),
(17, 1, 'S', 'M', 'R', ''),
(18, 1, 'M', 'L', 'S', ''),
(19, 1, 'S', 'M', 'R', ''),
(20, 1, 'M', 'L', 'R', ''),
(21, 2, 'S', 'M', 'R', ''),
(22, 2, 'M', 'L', 'S', ''),
(23, 2, 'S', 'M', 'R', ''),
(24, 2, 'M', 'L', 'R', ''),
(25, 2, 'S', 'M', 'R', ''),
(26, 2, 'M', 'L', 'S', ''),
(27, 2, 'S', 'M', 'R', ''),
(28, 2, 'M', 'L', 'R', ''),
(29, 2, 'S', 'M', 'S', ''),
(30, 2, 'M', 'L', 'R', ''),
(1, 2, 'S', 'M', 'R', 'Refused to eat afternoon tea'),
(2, 2, 'M', 'L', 'S', ''),
(3, 2, 'S', 'M', 'S', ''),
(4, 2, 'M', 'L', 'R', ''),
(5, 2, 'S', 'M', 'R', ''),
(6, 2, 'M', 'L', 'S', ''),
(7, 2, 'S', 'M', 'R', ''),
(8, 2, 'M', 'L', 'R', ''),
(9, 2, 'S', 'M', 'S', ''),
(10, 2, 'M', 'L', 'R', ''),
(11, 2, 'S', 'M', 'S', ''),
(12, 2, 'M', 'L', 'R', ''),
(13, 2, 'S', 'M', 'R', ''),
(14, 2, 'M', 'L', 'R', ''),
(15, 2, 'S', 'M', 'R', ''),
(16, 2, 'M', 'L', 'R', ''),
(17, 2, 'S', 'M', 'R', ''),
(18, 2, 'M', 'L', 'S', ''),
(19, 2, 'S', 'M', 'R', ''),
(20, 2, 'M', 'L', 'R', ''),
(21, 3, 'S', 'M', 'R', ''),
(22, 3, 'M', 'L', 'S', ''),
(23, 3, 'S', 'M', 'R', ''),
(24, 3, 'M', 'L', 'R', ''),
(25, 3, 'S', 'M', 'R', ''),
(26, 3, 'M', 'L', 'S', ''),
(27, 3, 'S', 'M', 'R', ''),
(28, 3, 'M', 'L', 'R', ''),
(29, 3, 'S', 'M', 'S', ''),
(30, 3, 'M', 'L', 'R', ''),
(1, 4, 'S', 'M', 'R', 'Not feeling well.'),
(2, 4, 'M', 'L', 'S', ''),
(3, 4, 'S', 'M', 'S', ''),
(4, 4, 'M', 'L', 'R', ''),
(5, 4, 'S', 'M', 'R', ''),
(6, 4, 'M', 'L', 'S', ''),
(7, 4, 'S', 'M', 'R', ''),
(8, 4, 'M', 'L', 'R', ''),
(9, 4, 'S', 'M', 'S', ''),
(10, 4, 'M', 'L', 'R', ''),
(11, 4, 'S', 'M', 'S', ''),
(12, 4, 'M', 'L', 'R', ''),
(13, 4, 'S', 'M', 'R', ''),
(14, 4, 'M', 'L', 'R', ''),
(15, 4, 'S', 'M', 'R', ''),
(16, 4, 'M', 'L', 'R', ''),
(17, 4, 'S', 'M', 'R', ''),
(18, 4, 'M', 'L', 'S', ''),
(19, 4, 'S', 'M', 'R', ''),
(20, 4, 'M', 'L', 'R', ''),
(21, 5, 'S', 'M', 'R', ''),
(22, 5, 'M', 'L', 'S', ''),
(23, 5, 'S', 'M', 'R', ''),
(24, 5, 'M', 'L', 'R', ''),
(25, 5, 'S', 'M', 'R', ''),
(26, 5, 'M', 'L', 'S', ''),
(27, 5, 'S', 'M', 'R', ''),
(28, 5, 'M', 'L', 'R', ''),
(29, 5, 'S', 'M', 'S', ''),
(30, 5, 'M', 'L', 'R', '')
;


INSERT INTO accident_form (child, accident_date, accident_time, location_of_accident, description_of_accident, injury_assessment, medical_treatment, staff_response, additional_notes, supervisor)
VALUES
(5, '2024-06-01', '10:00', 'Playground', 'Child fell off the swing while playing.', 'Minor bruising on knee', 'Applied ice pack', 'Staff comforted the child and informed parents', 'Parent notified; child resumed play after first aid', 1),
(12, '2024-06-02', '14:30', 'Classroom', 'Child bumped head on table edge.', 'No visible injury; observed for signs of concussion', 'None', 'Staff provided comfort and reassurance', 'Child monitored for any signs of discomfort', 2),
(3, '2024-06-03', '11:45', 'Art Area', 'Child accidentally poked finger with paintbrush.', 'Minor cut on finger', 'Cleaned with antiseptic and applied band-aid', 'Staff ensured child\'s comfort and safety', 'Child returned to activity after receiving first aid', 3),
(21, '2024-06-13', '14:15', 'Art Area', 'Child accidentally bumped into a table corner.', 'Minor bruise on the arm', 'Applied ice pack to reduce swelling', 'Staff provided comfort and reassurance', 'Child returned to activity after first aid', 3),
(7, '2024-06-05', '09:20', 'Outdoor Play Area', 'Child tripped over a toy truck while running.', 'Minor scrape on knee', 'Cleaned with antiseptic and applied band-aid', 'Staff provided comfort and checked for any other injuries', 'Child resumed play after receiving first aid', 5),
(18, '2024-06-06', '15:00', 'Gymnasium', 'Child collided with another child during a game.', 'No visible injury; assessed for any discomfort', 'None', 'Staff intervened immediately and separated the children', 'Both children calmed down and resumed play after explanation', 1),
(9, '2024-06-07', '10:30', 'Sandpit', 'Child got sand in eyes while playing.', 'Minor irritation in eyes', 'Flushed eyes with clean water', 'Staff comforted the child and assisted in washing eyes', 'Child felt better after rinsing eyes; monitored for any further irritation', 2),
(25, '2024-06-08', '13:45', 'Nature Walk', 'Child tripped over a tree root on the path.', 'Minor scrape on hands and knees', 'Cleaned with antiseptic and applied band-aids', 'Staff assessed child\'s condition and provided comfort', 'Child continued the walk after receiving first aid', 3),
(14, '2024-06-09', '11:00', 'Art Area', 'Child accidentally knocked over a paint can.', 'Minor splatter on clothes and floor', 'Cleaned the spill and changed child\'s clothes', 'Staff ensured safety and cleanliness of the area', 'Child continued with a different activity', 4),
(30, '2024-06-10', '14:00', 'Playground', 'Child slipped on wet slide.', 'Minor bump on the head', 'Applied ice pack and observed for any signs of discomfort', 'Staff provided comfort and checked for any other injuries', 'Parent notified; child rested for a while before resuming play', 5)
;


INSERT INTO attendance (form_date, person_who_created)
VALUES 
('2024-06-01', 1),
('2024-06-02', 1),
('2024-06-03', 1),
('2024-06-04', 1),
('2024-06-05', 1)
;



INSERT INTO attendance_record (child, attendance_date, time_in, time_out, parent_signature, teacher_signature, admin_signature)
VALUES 
(1, 1, '08:00', '16:00', 1, NULL, NULL),
(1, 2, '08:05', '16:10', NULL, 1, NULL),
(3, 3, '08:10', '16:20', NULL, NULL, 1),
(2, 4, '08:15', '16:30', 2, NULL, NULL),
(4, 5, '08:20', '16:40', NULL, 2, NULL),
(5, 1, '08:25', '16:50', NULL, NULL, 1),
(6, 2, '08:30', '17:00', 6, NULL, NULL),
(7, 3, '08:35', '17:10', NULL, 3, NULL),
(8, 4, '08:40', '17:20', NULL, NULL, 1),
(9, 5, '08:45', '17:30', 9, NULL, NULL),
(10, 1, '08:50', '17:40', NULL, 4, NULL),
(11, 2, '08:55', '17:50', NULL, NULL, 1),
(12, 3, '09:00', '14:00', 12, NULL, NULL),
(13, 4, '09:05', '16:10', NULL, 5, NULL),
(14, 5, '09:10', '15:20', NULL, NULL, 1),
(15, 1, '09:15', '15:30', 6, NULL, NULL),
(16, 2, '09:20', '16:40', NULL, 1, NULL),
(17, 3, '09:25', '15:50', NULL, NULL, 1),
(18, 4, '09:30', '16:00', 18, NULL, NULL),
(19, 5, '09:35', '17:10', NULL, 2, NULL),
(20, 1, '09:40', '17:20', NULL, NULL, 1),
(21, 2, '09:45', '14:30', 21, NULL, NULL),
(22, 3, '09:50', '13:40', NULL, 4, NULL),
(23, 4, '09:55', '16:50', NULL, NULL, 1),
(24, 5, '10:00', '12:00', 24, NULL, NULL),
(25, 1, '10:05', '15:10', NULL, 1, NULL),
(26, 2, '10:10', '17:20', NULL, NULL, 1),
(27, 3, '10:15', '14:30', 27, NULL, NULL),
(28, 4, '10:20', '16:40', NULL, 1, NULL),
(29, 5, '10:25', '16:50', NULL, NULL, 1),
(30, 1, '10:30', '17:00', 30, NULL, NULL),
(31, 2, '10:35', '15:10', NULL, 2, NULL),
(32, 3, '10:40', '16:20', NULL, NULL, 1),
(33, 4, '10:45', '17:30', 33, NULL, NULL),
(34, 5, '10:50', '16:40', NULL, 5, NULL),
(35, 1, '10:55', '15:50', NULL, NULL, 1),
(36, 2, '11:00', '16:00', 36, NULL, NULL),
(37, 3, '11:05', '16:10', NULL, 3, NULL),
(38, 4, '11:10', '16:20', NULL, NULL, 1),
(39, 5, '11:15', '16:30', 39, NULL, NULL),
(40, 1, '11:20', '16:40', NULL, 4, NULL)
;



INSERT INTO sunblock (apply_date, person_who_created)
VALUES
('2024-06-01', 1),
('2024-06-02', 3),
('2024-06-03', 2),
('2024-06-04', 4),
('2024-06-05', 5)
;

INSERT INTO sunblock_chart (apply_date, child, apply_time_one, apply_time_two, apply_time_three, note, supervisor)
VALUES
(1, 1, '08:00', '12:00', '15:00', 'Child has sensitive skin', 1),
(2, 3, '09:00', '13:00', '16:00', 'Applied extra on shoulders', 2),
(3, 5, '08:30', '12:30', '15:30', 'Reminder to reapply after water play', 3),
(4, 7, '09:30', '13:30', '16:30', '', 4),
(5, 9, '08:15', '12:15', '15:15', '', 5),
(1, 11, '09:15', '13:15', '16:15', 'Child allergic to fragrance, used unscented', 1),
(2, 13, '08:45', '12:45', '15:45', 'Reminder to apply to ears', 2),
(3, 15, '09:45', '13:45', '16:45', '', 3),
(4, 17, '08:25', '12:25', '15:25', '', 4),
(5, 19, '09:25', '13:25', '16:25', '', 5),
(1, 21, '08:10', '12:10', '15:10', '', 1),
(2, 23, '09:10', '13:10', '16:10', '', 2),
(3, 25, '08:50', '12:50', '15:50', 'Applied to exposed areas', 3),
(4, 27, '09:50', '13:50', '16:50', '', 4),
(5, 29, '08:40', '12:40', '15:40', '', 5),
(1, 31, '08:30', '12:30', '15:30', '', 1),
(2, 33, '09:30', '13:30', '16:30', '', 2),
(3, 35, '08:20', '12:20', '15:20', 'Child prefers spray-on sunscreen', 3),
(4, 37, '09:20', '13:20', '16:20', '', 4),
(5, 39, '08:15', '12:15', '15:15', '', 5),
(1, 2, '08:05', '12:05', '15:05', '', 1),
(2, 4, '09:05', '13:05', '16:05', '', 2),
(3, 6, '08:55', '12:55', '15:55', '', 3),
(4, 8, '09:55', '13:55', '16:55', '', 4),
(5, 10, '08:45', '12:45', '15:45', '', 5),
(1, 12, '08:35', '12:35', '15:35', 'Applied to face and arms only', 1),
(2, 14, '09:35', '13:35', '16:35', '', 2),
(3, 16, '08:25', '12:25', '15:25', '', 3),
(4, 18, '09:25', '13:25', '16:25', '', 4),
(5, 20, '08:20', '12:20', '15:20', '', 5),
(1, 22, '08:15', '12:15', '15:15', '', 1),
(2, 24, '09:15', '13:15', '16:15', '', 2),
(3, 26, '08:10', '12:10', '15:10', '', 3),
(4, 28, '09:10', '13:10', '16:10', '', 4),
(5, 30, '08:05', '12:05', '15:05', '', 5),
(1, 32, '08:55', '12:55', '15:55', '', 1),
(2, 34, '09:55', '13:55', '16:55', 'Child has a history of sunburn, applied generously', 2),
(3, 36, '08:45', '12:45', '15:45', '', 3),
(4, 38, '09:45', '13:45', '16:45', '', 4),
(5, 40, '08:35', '12:35', '15:35', '', 5)
;



INSERT INTO sleep_chart (sleep_date, person_who_created)
VALUES
('2024-06-01', 1),
('2024-06-02', 3),
('2024-06-03', 2),
('2024-06-04', 5),
('2024-06-05', 4)
;



INSERT INTO sleep_detail (sleep_date, child, time_to_bed, time_of_sleep, time_of_wakeup, time_out_of_bed, note, supervisor)
VALUES
(1, 1, '12:00', '12:15', '13:15', '13:30', 'Child woke up early and needed reassurance', 1),
(2, 12, '12:15', '12:30', '13:30', '13:45', '', 2),
(3, 13, '12:30', '12:45', '13:45', '14:00', '', 3),
(4, 14, '12:45', '13:00', '14:00', '14:15', '', 4),
(5, 15, '13:00', '13:15', '14:15', '14:30', '', 5),
(1, 16, '13:15', '13:30', '14:30', '14:45', '', 1),
(2, 17, '13:30', '13:45', '14:45', '15:00', '', 2),
(3, 18, '13:45', '14:00', '15:00', '15:15', '', 3),
(4, 19, '14:00', '14:15', '15:15', '15:30', 'Slept in a bit longer than usual', 4),
(5, 20, '14:15', '14:30', '15:30', '15:45', '', 5),
(1, 21, '12:00', '12:15', '13:15', '13:30', '', 1),
(2, 22, '12:15', '12:30', '13:30', '13:45', '', 2),
(3, 23, '12:30', '12:45', '13:45', '14:00', '', 3),
(4, 24, '12:45', '13:00', '14:00', '14:15', '', 4),
(5, 25, '13:00', '13:15', '14:15', '14:30', '', 5),
(1, 26, '13:15', '13:30', '14:30', '14:45', '', 1),
(2, 27, '13:30', '13:45', '14:45', '15:00', '', 2),
(3, 28, '13:45', '14:00', '15:00', '15:15', 'Slept in a bit longer than usual', 3),
(4, 29, '14:00', '14:15', '15:15', '15:30', '', 4),
(5, 30, '14:15', '14:30', '15:30', '15:45', 'Slept in a bit longer than usual', 5),
(1, 31, '12:00', '12:15', '13:15', '13:30', '', 1),
(2, 32, '12:15', '12:30', '13:30', '13:45', '', 2),
(3, 33, '12:30', '12:45', '13:45', '14:00', '', 3),
(4, 34, '12:45', '13:00', '14:00', '14:15', '', 4),
(5, 35, '13:00', '13:15', '14:15', '14:30', '', 5),
(1, 36, '13:15', '13:30', '14:30', '14:45', '', 1),
(2, 37, '13:30', '13:45', '14:45', '15:00', '', 2),
(3, 38, '13:45', '14:00', '15:00', '15:15', '', 3),
(4, 39, '14:00', '14:15', '15:15', '15:30', '', 4),
(5, 40, '14:15', '14:30', '15:30', '15:45', '', 5)
;


INSERT INTO formula_chart (feeding_date, person_who_created)
VALUES
('2024-05-31', 1),
('2024-06-01', 1),
('2024-06-02', 1),
('2024-06-03', 1),
('2024-06-04', 1)
;



INSERT INTO formula_detail (feeding_date, child, time_one, time_two, time_three, note, supervisor)
VALUES
(1, 1, '09:30', '11:30', '14:30', '', 1),
(2, 2, '09:45', '11:45', '14:45', 'Enjoyed the formula today', 2),
(3, 3, '10:00', '12:00', '15:00', '', 3),
(4, 4, '10:15', '12:15', '15:15', '', 4),
(5, 5, '10:30', '12:30', '15:30', '', 5),
(1, 6, '10:45', '12:45', '15:45', '', 1),
(2, 7, '11:00', '13:00', '16:00', '', 2),
(3, 8, '11:15', '13:15', '16:15', '', 3),
(4, 9, '11:30', '13:30', '16:30', '', 4),
(5, 10, '11:45', '13:45', '16:45', '', 5),
(1, 11, '09:30', '11:30', '14:30', '', 1),
(2, 12, '09:45', '11:45', '14:45', 'Had a good appetite today', 2),
(3, 13, '10:00', '12:00', '15:00', '', 3),
(4, 14, '10:15', '12:15', '15:15', '', 4),
(5, 15, '10:30', '12:30', '15:30', '', 5),
(1, 16, '10:45', '12:45', '15:45', '', 1),
(2, 17, '11:00', '13:00', '16:00', '', 2),
(3, 18, '11:15', '13:15', '16:15', '', 3),
(4, 19, '11:30', '13:30', '16:30', '', 4),
(5, 20, '11:45', '13:45', '16:45', '', 5),
(1, 21, '09:30', '11:30', '14:30', '', 1),
(2, 22, '09:45', '11:45', '14:45', '', 2),
(3, 23, '10:00', '12:00', '15:00', '', 3),
(4, 24, '10:15', '12:15', '15:15', '', 4),
(5, 25, '10:30', '12:30', '15:30', '', 5),
(1, 26, '10:45', '12:45', '15:45', '', 1),
(2, 27, '11:00', '13:00', '16:00', '', 2),
(3, 28, '11:15', '13:15', '16:15', 'Refused the formula', 3),
(4, 29, '11:30', '13:30', '16:30', '', 4),
(5, 30, '11:45', '13:45', '16:45', '', 5),
(1, 31, '09:30', '11:30', '14:30', '', 1),
(2, 32, '09:45', '11:45', '14:45', '', 2),
(3, 33, '10:00', '12:00', '15:00', '', 3),
(4, 34, '10:15', '12:15', '15:15', '', 4),
(5, 35, '10:30', '12:30', '15:30', '', 5),
(1, 36, '10:45', '12:45', '15:45', '', 1),
(2, 37, '11:00', '13:00', '16:00', '', 2),
(3, 38, '11:15', '13:15', '16:15', '', 3),
(4, 39, '11:30', '13:30', '16:30', 'Spilled some formula', 4),
(5, 40, '11:45', '13:45', '16:45', '', 5)
;


-- INSERT INTO learning_story (created_month, reated_by)
-- VALUES
-- ('', 1)
-- ;
-- CREATE TABLE learning_story (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- created_month VARCHAR(50),
-- created_by INT,
-- FOREIGN KEY (created_by) REFERENCES teacher_info(id) ON DELETE SET NULL ON UPDATE CASCADE
-- );

-- INSERT INTO learning_story_detail (child, title, content, person_who_wrote, update_date, created_month)
-- VALUES
-- (1, '', '', 1, '', 1)
-- ;
-- CREATE TABLE learning_story_detail (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- child INT,
-- title VARCHAR(255),
-- content TEXT,
-- person_who_wrote INT,
-- update_date VARCHAR(50),
-- created_month INT,
-- FOREIGN KEY (child) REFERENCES child_info(id) ON DELETE CASCADE ON UPDATE CASCADE,
-- FOREIGN KEY (person_who_wrote) REFERENCES teacher_info(id) ON DELETE SET NULL ON UPDATE CASCADE,
-- FOREIGN KEY (created_month) REFERENCES learning_story(id) ON UPDATE CASCADE
-- );


-- INSERT INTO message (teacher_sender, child_sender, admin_sender, title, content, sent_date, sent_time, teacher_receiver, child_receiver, admin_receiver)
-- VALUES 
-- (1, NULL, NULL, '', '', '', '', NULL, 1, NULL);
-- CREATE TABLE message (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- teacher_sender INT,
-- child_sender INT,
-- admin_sender INT,
-- title VARCHAR(255),
-- content TEXT,
-- sent_date VARCHAR(50),
-- sent_time VARCHAR(50),
-- teacher_receiver INT,
-- child_receiver INT,
-- admin_receiver INT,
-- FOREIGN KEY (teacher_sender) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE,
-- FOREIGN KEY (child_sender) REFERENCES child_info (id) ON DELETE CASCADE ON UPDATE CASCADE,
-- FOREIGN KEY (admin_sender) REFERENCES admin (id) ON DELETE SET NULL ON UPDATE CASCADE,
-- FOREIGN KEY (teacher_receiver) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE,
-- FOREIGN KEY (child_receiver) REFERENCES child_info (id) ON DELETE CASCADE ON UPDATE CASCADE,
-- FOREIGN KEY (admin_receiver) REFERENCES admin (id) ON DELETE SET NULL ON UPDATE CASCADE
-- );






-- INSERT INTO teaching_resource (title, resource_description, link, person_who_adds, update_date)
-- VALUES ('learn play', 'play through learn', 'www.ab.com', '1', '2024-03-22'),
-- ('toy', 'play playplay', 'www.scdss.com', '2', '2024-04-12'),
-- ('car', 'drive car', 'www.xxxx.com', '3', '2024-01-15'),
-- ('doll', 'play and learn', 'www.lskl.com', '5', '2024-02-02');


-- COMMIT;
