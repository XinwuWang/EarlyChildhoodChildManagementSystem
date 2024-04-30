import express from 'express';
import con from '../Database/db.js';
import jwt from 'jsonwebtoken'; // for token creation
import bcrypt from 'bcryptjs'; // for password hashing
import multer from 'multer'; // for image upload
import path from 'path'; // for image upload

const router = express.Router()

router.post('/teacher_login', (req, res) => {
    const sql = 'SELECT * FROM teacher_info WHERE email = ?';
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
                    return res.json({ loginStatus: true, teacherId: result[0].id });
                } else {
                    return res.json({ loginStatus: false, Error: 'Invalid email or password' });
                }
            })
        } else {
            return res.json({ loginStatus: false, Error: 'Invalid email or password' });
        }
    });
});




router.get('/teacher_profile/:id', (req, res) => {
    const teacherId = req.params.id;
    const sql = 'SELECT * FROM teacher_info WHERE id = ?';
    con.query(sql, [teacherId], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // console.log(result)
        return res.json(result);
    });
})



router.put('/edit_profile/:id', (req, res) => {
    const teacherId = req.params.id;
    const sql = `UPDATE teacher_info 
                    SET 
                    name = ?, 
                    teaching_No = ?,
                    date_of_birth = ?,
                    phone = ?, 
                    address = ?, 
                    teaching_philosophy = ?
                    WHERE id = ?`;

    const values = [
        req.body.name,
        req.body.teaching_No,
        req.body.date_of_birth,
        req.body.phone,
        req.body.address,
        req.body.teaching_philosophy
    ]
    con.query(sql, [...values, teacherId], (err, result) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ Status: false, Error: 'An error occurred while updating the teacher information.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: false, Error: 'Teacher not found.' });
        }

        return res.json({ Status: true, Message: 'Teacher information updated successfully.' });
    });

});


router.get('/announcement', (req, res) => {
    const sql = 'SELECT announcement.*, COALESCE(admin.name, teacher_info.name) AS poster_name FROM announcement LEFT JOIN admin ON announcement.person_who_posts = admin.id LEFT JOIN teacher_info ON announcement.teacher_who_posts = teacher_info.id';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
});


router.post('/create_announcement', (req, res) => {
    const sql = `INSERT INTO announcement (title, content, post_date, post_time, teacher_who_posts) 
    VALUES (?, ?, ?, ?, ?)`;
    const values = [
        req.body.title,
        req.body.content,
        req.body.post_date,
        req.body.post_time,
        req.body.teacher_who_posts,
    ]
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});


router.delete('/delete_announcement/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM announcement WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/centre_information', (req, res) => {
    const sql = 'SELECT * FROM centre_info';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
});

router.put('/change_password/:id', (req, res) => {
    const teacherId = req.params.id;
    const sql = `UPDATE teacher_info 
                    SET 
                    password = ?
                    WHERE id = ?`

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })

        const value = [
            hash,
        ]
        con.query(sql, [...value, teacherId], (err, result) => {
            if (err) return res.json({ Status: false, Error: 'Query error' + err })
            return res.json({ Status: true, Result: result })
        })
    });
});

router.get('/teaching_resource', (req, res) => {
    const sql = 'SELECT teaching_resource.*, teacher_info.name AS teacher_name FROM teaching_resource INNER JOIN teacher_info ON teaching_resource.person_who_adds = teacher_info.id';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
});


router.get('/teaching_resource/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM teaching_resource WHERE id = ?';
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result })
    });
})


router.post('/add_resource', (req, res) => {
    const sql = `INSERT INTO teaching_resource (title, resource_description, link, person_who_adds, update_date) 
    VALUES (?, ?, ?, ?, ?)`;
    const values = [
        req.body.title,
        req.body.resource_description,
        req.body.link,
        req.body.person_who_adds,
        req.body.update_date,
    ]
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});


router.put('/edit_resource/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE teaching_resource 
                    SET 
                    title = ?, 
                    resource_description = ?, 
                    link = ?,
                    update_date = ?, 
                    person_who_adds = ?
                    WHERE id = ?`;

    const values = [
        req.body.title,
        req.body.resource_description,
        req.body.link,
        req.body.update_date,
        req.body.person_who_adds

    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});


router.delete('/delete_resource/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM teaching_resource WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/note/:teacherId', (req, res) => {
    const teacherId = req.params.teacherId;
    const sql = 'SELECT * FROM note WHERE teacher_id = ?';
    con.query(sql, [teacherId], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
});


router.get('/note/:teacherId/:noteId', (req, res) => {
    const noteId = req.params.noteId;

    const sql = 'SELECT * FROM note WHERE id = ?';
    con.query(sql, [noteId], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result })
    });
})


router.post('/add_note', (req, res) => {
    const sql = `INSERT INTO note (title, content, update_date, update_time, teacher_id) 
    VALUES (?, ?, ?, ?, ?)`;
    const values = [
        req.body.title,
        req.body.content,
        req.body.update_date,
        req.body.update_time,
        req.body.teacher_id,
    ]
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});



router.put('/edit_note/:teacherId/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    const sql = `UPDATE note 
                    SET 
                    title = ?, 
                    content = ?, 
                    teacher_id = ?, 
                    update_date = ?, 
                    update_time = ?
                    WHERE id = ?`;

    const values = [
        req.body.title,
        req.body.content,
        req.body.teacher_id,
        req.body.update_date,
        req.body.update_time,

    ]
    con.query(sql, [...values, noteId], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});

router.delete('/delete_note/:teacherId/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    const sql = 'DELETE FROM note WHERE id = ?';

    con.query(sql, [noteId], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
})


export { router as teacherRouter }