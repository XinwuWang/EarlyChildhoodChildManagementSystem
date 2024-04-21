import express from 'express';
import con from '../Database/db.js';
import jwt from 'jsonwebtoken'; // for token creation
import bcrypt from 'bcryptjs'; // for password hashing
import multer from 'multer'; // for image upload
import path from 'path'; // for image upload

const router = express.Router()

router.post('/admin_login', (req, res) => {
    // console.log(req.body)
    const sql = 'SELECT * FROM admin WHERE email = ? AND password = ?';
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: 'Query error' });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: 'admin', email: email, id: result[0].id },
                'jwt_secret_key',
                { expiresIn: '1d' }
            );
            res.cookie('token', token)
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: 'Invalid email or password' });
        }
    });
});


// image upload using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
//

router.post('/add_teacher', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO teacher_info (name, email, password, phone, teaching_No, date_of_birth, address, teaching_philosophy, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })

        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.phone,
            req.body.teaching_number,
            req.body.date_of_birth,
            req.body.address,
            req.body.teaching_philosophy,
            req.file ? req.file.filename : null
        ]
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })

        });
    });

})


router.post('/add_child', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO child_info (name, email, password, dad_name, dad_phone, mum_name, mum_phone, address, allergy, interests_and_hobbies, other_notes, profile_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })

        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.father_name,
            req.body.father_phone,
            req.body.mother_name,
            req.body.mother_phone,
            req.body.address,
            req.body.allergy,
            req.body.interests,
            req.body.notes,
            req.file ? req.file.filename : null
        ]
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })

        });
    });
})


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });

})

export { router as adminRouter }