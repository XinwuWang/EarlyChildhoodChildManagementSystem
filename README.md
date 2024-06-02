# Early Childhood Centre Management System

This project is an independent project for COMP693, Semester 1 2024. This web application is developed for an early childhood centre to digitally manage their essential documents and information related to their children and teachers, and to improve communication with parents.

## Technology and skills used:
 - Programming language: JavaScript
 - Front-end: React, Bootstrap
 - Back-end: Express
 - Runtime environment: Node
 - Database: MySQL
 - Development environment setup tool: Vite
 - JavaScript libraries and packages: NPM


## User manual
This projects consists of a frontend folder 'ECChildMS', a backend folder 'Server', and a database query script 'ChildMS_db.sql'.

The database needs to be built before running this application, which can be completed by executing the script in [MySQL workbench](https://www.mysql.com/products/workbench/). Then replace your own MySQL workbench password in 'Server/Database/db.js' to connect to the database.

Other packages and dependencies are required before running this project. 
CD into 'Server' in the console and install necessary packages by executing 'npm install express mysql cors cookie-parser bcrypt jsonwebtoken multer path nodemon'.
CD into 'ECChildMS' in the console and install required packages for the frontend by runing 'npm install axios bootstrap react-router-dom bootstrap-icons'.

After installing necessary packages and dependencies, CD into 'ECChildMS' and run 'npm run dev'. Meanwhile, CD into 'Server' and run 'npm start'. By doing these, the frontend and the backend function together. The login page of this project should be 'http://localhost:5173/' when running in your local environment.

Accounts for testing:
- Admin: account - admin@gmail.com, password - 12345
- Teacher: account - teacher@gmail.com, password - 12345
- Child: account - child@gmail.com, password - 12345


## Source code on GitHub
- https://github.com/XinwuWang/EarlyChildhoodChildManagementSystem.git

## Image sources:
- login_bg.png - https://www.gofundme.com/f/support-for-ganon-teachers
- heading_icon.png - https://www.freepik.com/icon/baby_1096752#fromView=resource_detail&position=3
- dummy_child.png - https://clipart-library.com/clipart/pacifier-cartoon-cliparts-16.htm
- image_1713695523507.jpg - https://www.linkedin.com/pulse/3-inspiring-success-stories-great-entrepreneurs-ailina-spratling/
- ray_smith.png - https://medium.com/@jayesha930/how-to-select-a-profile-picture-3a75fed88745 
- teacher.png_1714343176071.png - https://www.shareicon.net/avatar-user-profile-social-woman-802029

