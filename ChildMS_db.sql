-- DROP DATABASE IF EXISTS earlychildhoodchildms;
CREATE DATABASE earlychildhoodchildms;

USE earlychildhoodchildms;

-- DROP TABLE IF EXISTS admin;
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
-- DROP TABLE IF EXISTS teacher_info;
DROP TABLE IF EXISTS teaching_resource;
-- BEGIN;

-- 1. Create tables
-- CREATE TABLE admin (
-- id INT PRIMARY KEY AUTO_INCREMENT,
-- email VARCHAR(50),
-- password VARCHAR(255),
-- date_of_birth VARCHAR(50),
-- address VARCHAR(255),
-- phone VARCHAR(30),
-- start_date VARCHAR(50),
-- name VARCHAR(50),
-- image VARCHAR(100),
-- UNIQUE (email)
-- );

-- CREATE TABLE teacher_info (
-- id INT auto_increment PRIMARY KEY,
-- name VARCHAR(50),
-- email VARCHAR(50),
-- password VARCHAR(255),
-- phone VARCHAR(50),
-- teaching_No INT,
-- date_of_birth VARCHAR(50), 
-- address VARCHAR(255),
-- teaching_philosophy TEXT,
-- image VARCHAR(255),
-- start_date VARCHAR(50),
-- UNIQUE (email)
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
description_of_acciden TEXT,
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
-- INSERT INTO admin (email, password, date_of_birth, address, phone, start_date, name, image)
-- VALUES ('admin@gmail.com', '$2a$10$21EkskmLCjiul1VCpd1Ow.F/IEQVGdb0dqGiFJ5Fuog4HddQSBbKu', '1985-06-01', '9B Hill Ave Auckland', '0278391234', '2023-06-01', 'Ray Smith', 'ray_smith.png');

-- INSERT INTO teacher_info (name, email, password, phone, teaching_No, date_of_birth, address, teaching_philosophy, image, start_date)
-- VALUES 
-- ('Amy Lee', 'teacher.a@gmail.com', '$2a$10$21EkskmLCjiul1VCpd1Ow.F/IEQVGdb0dqGiFJ5Fuog4HddQSBbKu', '02193892837', 2938093, '1993-02-04', 'H Road Auckland NZ', 'Learn through play', 'teacher.png_1714343176071.png', '2023-03-18'),
-- ('Jackson Smith', 'jackson.s@gmail.com', '$2a$10$eS3wkG.cdfutPlhmwn7wLuOpg2TX3yNK/09hn6E/9rM2E4uLFL4GW', '0219384782', 283791, '1995-01-03', '88 Remuera Rd Auckland', 'Peer modeling', 'image_1713695523507.jpg', '2021-05-05'),
-- ('Emma Johnson', 'emma.johnson@gmail.com', '$2a$10$21EkskmLCjiul1VCpd1Ow.F/IEQVGdb0dqGiFJ5Fuog4HddQSBbKu', '02198765432', 123456, '1987-07-15', '123 Main St, Wellington', 'Hands-on learning', null, '2022-09-10'),
-- ('Rupa Naicker', 'rupa.naicker@gmail.com', '$2a$10$21EkskmLCjiul1VCpd1Ow.F/IEQVGdb0dqGiFJ5Fuog4HddQSBbKu', '02187654321', 987654, '1980-11-25', '456 High St, Christchurch', 'Individualized instruction', null, '2023-01-15'),
-- ('Sophie Williams', 'sophie.williams@gmail.com', '$2a$10$21EkskmLCjiul1VCpd1Ow.F/IEQVGdb0dqGiFJ5Fuog4HddQSBbKu', '02176543210', 456789, '1990-04-30', '789 Queen St, Auckland', 'Cooperative learning', null, '2021-12-01')
-- ;


INSERT INTO child_info (name, email, password, date_of_birth, dad_name, dad_phone, mum_name, mum_phone, address, allergy, interests_and_hobbies, other_notes, profile_img, start_date)
VALUES
('Leo Money', 'child@gmail.com', '$2a$10$Hs0TJsxwTn/RijkIsSiUruIaqMFaNMsbiuVbn1l/jRaaiH6N2oeBa', '2022-01-01', 'Chris Money', '02938455', 'Kate Cook', '029384782', 'Hall Ave East Coast', 'Milk', 'Bikes', 'Good eater', 'dummy_child.png_1715328753972.png', '2023-12-22');



INSERT INTO centre_info (title, content_one, content_two, content_three, admin_id, update_date, update_time)
VALUES 
('', '', '', '', 1, '', ''),
('', '', '', '', 1, '', ''),
('', '', '', '', 1, '', '')
;

-- CREATE TABLE centre_info (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- title VARCHAR(255),
-- content_one TEXT,
-- content_two TEXT,
-- content_three TEXT,
-- admin_id INT,
-- update_date VARCHAR(50),
-- update_time VARCHAR(50),
-- FOREIGN KEY (admin_id) REFERENCES admin(id) ON DELETE SET NULL ON UPDATE CASCADE
-- );


INSERT INTO note (title, content, update_date, update_time, admin_id, teacher_id)
VALUES 
('', '', '', '', 1, NULL),
('', '', '', '', NULL, 1),
('', '', '', '', NULL, 2)
;
-- CREATE TABLE note (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- title VARCHAR(50),
-- content TEXT,
-- update_date VARCHAR(50),
-- update_time VARCHAR(50),
-- admin_id INT,
-- teacher_id INT,
-- FOREIGN KEY (admin_id) REFERENCES admin(id) ON DELETE CASCADE ON UPDATE CASCADE,
-- FOREIGN KEY (teacher_id) REFERENCES teacher_info (id) ON DELETE CASCADE ON UPDATE CASCADE
-- );


INSERT INTO teaching_resource (title, resource_description, link, person_who_adds, update_date)
VALUES
('', '', '', 1, ''),
('', '', '', 2, '')
;

-- CREATE TABLE teaching_resource (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- title VARCHAR(255),
-- resource_description TEXT,
-- link VARCHAR(255),
-- person_who_adds INT,
-- update_date VARCHAR(50),
-- FOREIGN KEY (person_who_adds) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE
-- );


INSERT INTO announcement (title, content, post_date, post_time, person_who_posts, teacher_who_posts)
VALUES
('', '', '', '', 1, NULL),
('', '', '', '', NULL, 1),
('', '', '', '', NULL, 2)
;
-- CREATE TABLE announcement (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- title VARCHAR(255),
-- content TEXT,
-- post_date VARCHAR(50),
-- post_time VARCHAR(50),
-- person_who_posts INT,
-- teacher_who_posts INT,
-- FOREIGN KEY (person_who_posts) REFERENCES admin (id) ON DELETE SET NULL ON UPDATE CASCADE,
-- FOREIGN KEY (teacher_who_posts) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE
-- );


INSERT INTO meal_chart (meal_date, morning_tea, lunch, afternoon_tea, supervisor)
VALUES 
('', '', '', '', 1),
('', '', '', '', 2)
;
-- CREATE TABLE meal_chart (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- meal_date VARCHAR(50),
-- morning_tea VARCHAR(255),
-- lunch VARCHAR(255),
-- afternoon_tea VARCHAR(255),
-- supervisor INT,
-- FOREIGN KEY (supervisor) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE
-- );

INSERT INTO meal_detail (child, meal_day, mt_portion, lunch_portion, at_portion, note)
VALUES 
(1, 1, '', '', '', ''),
(2, 3, '', '', '', '')
;
-- CREATE TABLE meal_detail (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- child INT,
-- meal_day INT,
-- mt_portion VARCHAR(255),
-- lunch_portion VARCHAR(255),
-- at_portion VARCHAR(255),
-- note VARCHAR(255),
-- FOREIGN KEY (child) REFERENCES child_info (id) ON DELETE CASCADE ON UPDATE CASCADE,
-- FOREIGN KEY (meal_day) REFERENCES meal_chart (id) ON UPDATE CASCADE
-- );


INSERT INTO accident_form (child, accident_date, accident_time, location_of_accident, description_of_acciden, injury_assessment, medical_treatment, staff_response, additional_notes, supervisor)
VALUES
(1, '', '', '', '', '', '', '', '', 1);

-- CREATE TABLE accident_form (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- child INT,
-- accident_date VARCHAR(50),
-- accident_time VARCHAR(50),
-- location_of_accident VARCHAR(255),
-- description_of_acciden TEXT,
-- injury_assessment VARCHAR(255),
-- medical_treatment VARCHAR(255),
-- staff_response VARCHAR(255),
-- additional_notes VARCHAR(255),
-- supervisor INT,
-- FOREIGN KEY (child) REFERENCES child_info(id) ON DELETE CASCADE ON UPDATE CASCADE,
-- FOREIGN KEY (supervisor) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE
-- );


INSERT INTO attendance (form_date, person_who_created)
VALUES 
('', 1),
('', 1),
('', 1)
;
-- CREATE TABLE attendance (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- form_date VARCHAR(50),
-- person_who_created INT,
-- FOREIGN KEY (person_who_created) REFERENCES admin(id) ON DELETE SET NULL ON UPDATE CASCADE
-- );


INSERT INTO attendance_record (child, attendance_date, time_in, time_out, parent_signature, teacher_signature, admin_signature)
VALUES 
(1, 1, '', '', 1, NULL, NULL),
(1, 2, '', '', NULL, 1, NULL),
(3, 3, '', '', NULL, NULL, 1)
;
-- CREATE TABLE attendance_record (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- child INT,
-- attendance_date INT,
-- time_in VARCHAR(50),
-- time_out VARCHAR(50),
-- parent_signature INT,
-- teacher_signature INT,
-- admin_signature INT,
-- FOREIGN KEY (child) REFERENCES child_info(id) ON DELETE CASCADE ON UPDATE CASCADE,
-- FOREIGN KEY (attendance_date) REFERENCES attendance(id) ON UPDATE CASCADE,
-- FOREIGN KEY (parent_signature) REFERENCES child_info(id) ON DELETE CASCADE ON UPDATE CASCADE,
-- FOREIGN KEY (teacher_signature) REFERENCES teacher_info(id) ON DELETE SET NULL ON UPDATE CASCADE,
-- FOREIGN KEY (admin_signature) REFERENCES admin(id) ON DELETE SET NULL ON UPDATE CASCADE	
-- );


INSERT INTO sunblock (apply_date, person_who_created)
VALUES
('', 1),
('', 3),
('', 2)
;
-- CREATE TABLE sunblock (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- apply_date VARCHAR(50),
-- person_who_created INT,
-- FOREIGN KEY (person_who_created) REFERENCES teacher_info(id) ON DELETE SET NULL ON UPDATE CASCADE
-- );

INSERT INTO sunblock_chart (apply_date, child, apply_time_one, apply_time_two, apply_time_three, note, supervisor)
VALUES
(1, 1, '', '', '', '', 1),
(2, 3, '', '', '', '', 2)
;
-- CREATE TABLE sunblock_chart (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- apply_date INT,
-- child INT,
-- apply_time_one VARCHAR(50),
-- apply_time_two VARCHAR(50),
-- apply_time_three VARCHAR(50),
-- note VARCHAR(255),
-- supervisor INT,
-- FOREIGN KEY (child) REFERENCES child_info(id) ON DELETE CASCADE ON UPDATE CASCADE,
-- FOREIGN KEY (supervisor) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE,
-- FOREIGN KEY (apply_date) REFERENCES sunblock(id) ON UPDATE CASCADE
-- );


INSERT INTO sleep_chart (sleep_date, person_who_created)
VALUES
('', 1),
('', 3)
;
-- CREATE TABLE sleep_chart (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- sleep_date VARCHAR(50),
-- person_who_created INT,
-- FOREIGN KEY (person_who_created) REFERENCES teacher_info(id) ON DELETE SET NULL ON UPDATE CASCADE
-- );


INSERT INTO sleep_detail (sleep_date, child, time_to_bed, time_of_sleep, time_of_wakeup, time_out_of_bed, note, supervisor)
VALUES
(1, 1, '', '', '', '', '', 1)
;
-- CREATE TABLE sleep_detail (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- sleep_date INT,
-- child INT,
-- time_to_bed VARCHAR(50),
-- time_of_sleep VARCHAR(50),
-- time_of_wakeup VARCHAR(50),
-- time_out_of_bed VARCHAR(50),
-- note VARCHAR(255),
-- supervisor INT,
-- FOREIGN KEY (sleep_date) REFERENCES sleep_chart(id) ON UPDATE CASCADE, 
-- FOREIGN KEY (child) REFERENCES child_info(id) ON DELETE CASCADE ON UPDATE CASCADE,
-- FOREIGN KEY (supervisor) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE
-- );


INSERT INTO formula_chart (feeding_date, person_who_created)
VALUES
('', 1)
;

-- CREATE TABLE formula_chart (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- feeding_date VARCHAR(50),
-- person_who_created INT,
-- FOREIGN KEY (person_who_created) REFERENCES teacher_info(id) ON DELETE SET NULL ON UPDATE CASCADE
-- );

INSERT INTO formula_detail (feeding_date, child, time_one, time_two, time_three, note, supervisor)
VALUES
(1, 1, '', '', '', '', 1)
;
-- CREATE TABLE formula_detail (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- feeding_date INT,
-- child INT,
-- time_one VARCHAR(50),
-- time_two VARCHAR(50),
-- time_three VARCHAR(50),
-- note VARCHAR(255),
-- supervisor INT,
-- FOREIGN KEY (child) REFERENCES child_info(id) ON DELETE CASCADE ON UPDATE CASCADE,
-- FOREIGN KEY (feeding_date) REFERENCES formula_chart(id) ON UPDATE CASCADE,
-- FOREIGN KEY (supervisor) REFERENCES teacher_info (id) ON DELETE SET NULL ON UPDATE CASCADE
-- );

INSERT INTO learning_story (created_month, reated_by)
VALUES
('', 1)
;
-- CREATE TABLE learning_story (
-- id INT AUTO_INCREMENT PRIMARY KEY,
-- created_month VARCHAR(50),
-- created_by INT,
-- FOREIGN KEY (created_by) REFERENCES teacher_info(id) ON DELETE SET NULL ON UPDATE CASCADE
-- );

INSERT INTO learning_story_detail (child, title, content, person_who_wrote, update_date, created_month)
VALUES
(1, '', '', 1, '', 1)
;
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


INSERT INTO message (teacher_sender, child_sender, admin_sender, title, content, sent_date, sent_time, teacher_receiver, child_receiver, admin_receiver)
VALUES 
(1, NULL, NULL, '', '', '', '', NULL, 1, NULL)
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
