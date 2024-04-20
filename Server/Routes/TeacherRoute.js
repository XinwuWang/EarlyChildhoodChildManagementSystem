import express from 'express';
import con from '../Database/db.js';
import jwt from 'jsonwebtoken'; // for token creation
import bcrypt from 'bcryptjs'; // for password hashing
import multer from 'multer'; // for image upload
import path from 'path'; // for image upload

const router = express.Router()

router.post('/teacher_login', (req, res) => {
    // console.log(req.body)
    const sql = 'SELECT * FROM teacher WHERE email = ?';
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: 'Query error' });
        if (result.length > 0) {
            // check the password
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: 'Password error' });
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign(
                        { role: 'teacher', email: email, id: result[0].id },
                        'jwt_secret_key',
                        { expiresIn: '1d' }
                    );
                    res.cookie('token', token)
                    return res.json({ loginStatus: true, id: result[0].id });
                }
            })
        } else {
            return res.json({ loginStatus: false, Error: 'Invalid email or password' });
        }
    });
});


export { router as teacherRouter }