import express from 'express';
import con from '../Database/db.js';
import jwt from 'jsonwebtoken'; // for token creation
import bcrypt from 'bcryptjs'; // for password hashing
import multer from 'multer'; // for image upload
import path from 'path'; // for image upload

const router = express.Router()

router.post('/admin_login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = 'SELECT * FROM admin WHERE email = ?';
    con.query(sql, [email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: 'Query error' });

        if (result.length > 0) {
            const admin = result[0];
            bcrypt.compare(password, admin.password, (bcryptErr, bcryptResult) => {
                if (bcryptErr) {
                    return res.json({ loginStatus: false, Error: 'Bcrypt error' });
                }
                if (bcryptResult) {
                    const token = jwt.sign(
                        { role: 'admin', email: email, id: admin.id },
                        'jwt_secret_key',
                        { expiresIn: '1d' }
                    );
                    res.cookie('token', token);
                    return res.json({ loginStatus: true, adminId: admin.id });
                } else {
                    return res.json({ loginStatus: false, Error: 'Invalid email or password' });
                }
            });
        } else {
            return res.json({ loginStatus: false, Error: 'Invalid email or password' });
        }
    });

});

router.get('/manageteachers', (req, res) => {
    const sql = 'SELECT * FROM teacher_info';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/manageteachers/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM teacher_info WHERE id = ?';
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // console.log(result)
        return res.json(result);
    });
})


router.put('/edit_teacher/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE teacher_info 
                    SET 
                    name = ?, 
                    teaching_No = ?,
                    email = ?, 
                    date_of_birth = ?,
                    phone = ?, 
                    address = ?, 
                    start_date = ?,
                    teaching_philosophy = ?
                    WHERE id = ?`;

    const values = [
        req.body.name,
        req.body.teaching_No,
        req.body.email,
        req.body.date_of_birth,
        req.body.phone,
        req.body.address,
        req.body.start_date,
        req.body.teaching_philosophy
    ]
    con.query(sql, [...values, id], (err, result) => {
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


router.delete('/delete_teacher/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM teacher_info WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})



router.get('/managechildren', (req, res) => {
    const sql = 'SELECT * FROM child_info';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/managechildren/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM child_info WHERE id = ?';
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // console.log(result)
        return res.json(result);
    });
})


router.put('/edit_child/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE child_info 
                    SET 
                    name = ?, 
                    email = ?, 
                    date_of_birth = ?,
                    dad_name = ?,
                    dad_phone = ?, 
                    mum_name = ?,
                    mum_phone = ?,
                    address = ?, 
                    allergy = ?,
                    interests_and_hobbies = ?,
                    start_date = ?,
                    other_notes = ?
                    WHERE id = ?`;

    const values = [
        req.body.name,
        req.body.email,
        req.body.date_of_birth,
        req.body.dad_name,
        req.body.dad_phone,
        req.body.mum_name,
        req.body.mum_phone,
        req.body.address,
        req.body.allergy,
        req.body.interests_and_hobbies,
        req.body.start_date,
        req.body.other_notes
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ Status: false, Error: 'An error occurred while updating the child information.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: false, Error: 'Child not found.' });
        }

        return res.json({ Status: true, Message: 'Child information updated successfully.' });
    });

});


router.delete('/delete_child/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM child_info WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})


// image upload using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        const originalname = file.originalname; // Get the original filename
        const extension = path.extname(originalname); // Get the file extension
        const timestamp = Date.now(); // Get the current timestamp
        const filename = originalname + '_' + timestamp + extension; // Concatenate original filename, timestamp, and extension
        cb(null, filename); // Call the callback function with the filename
    }
})
const upload = multer({
    storage: storage
})
//

router.post('/add_teacher', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO teacher_info (name, email, password, phone, teaching_No, date_of_birth, address, teaching_philosophy, image, start_date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
            req.file ? req.file.filename : null,
            req.body.start_date
        ]
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })

        });
    });

})


router.post('/add_child', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO child_info (name, email, password, date_of_birth, dad_name, dad_phone, mum_name, mum_phone, address, allergy, interests_and_hobbies, other_notes, profile_img, start_date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })

        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.date_of_birth,
            req.body.father_name,
            req.body.father_phone,
            req.body.mother_name,
            req.body.mother_phone,
            req.body.address,
            req.body.allergy,
            req.body.interests,
            req.body.notes,
            req.file ? req.file.filename : null,
            req.body.start_date
        ]
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })

        });
    });
})




router.post('/add_centreinfo', (req, res) => {
    const sql = `INSERT INTO centre_info (title, content_one, content_two, content_three, admin_id, update_date, update_time) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.title,
        req.body.content_one,
        req.body.content_two,
        req.body.content_three,
        req.body.admin_id,
        req.body.update_date,
        req.body.update_time
    ]
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });

})


router.get('/centreintro', (req, res) => {
    const sql = 'SELECT * FROM centre_info';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/centreintro/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM centre_info WHERE id = ?';
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result })
    });
})


router.put('/edit_centreinfo/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE centre_info 
                    SET 
                    title = ?, 
                    content_one = ?, 
                    content_two = ?,
                    content_three = ?,
                    admin_id = ?, 
                    update_date = ?, 
                    update_time = ?
                    WHERE id = ?`;

    const values = [
        req.body.title,
        req.body.content_one,
        req.body.content_two,
        req.body.content_three,
        req.body.admin_id,
        req.body.update_date,
        req.body.update_time,

    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});


router.delete('/delete_centreinfo/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM centre_info WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/profile/:id', (req, res) => {
    const adminId = req.params.id;
    const sql = 'SELECT * FROM admin WHERE id = ?';
    con.query(sql, [adminId], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // console.log(result)
        return res.json(result);
    });
})


router.put('/edit_profile/:id', (req, res) => {
    const adminId = req.params.id;
    const sql = `UPDATE admin 
                    SET 
                    name = ?, 
                    email = ?, 
                    date_of_birth = ?,
                    phone = ?, 
                    address = ?, 
                    start_date = ?
                    WHERE id = ?`;

    const values = [
        req.body.name,
        req.body.email,
        req.body.date_of_birth,
        req.body.phone,
        req.body.address,
        req.body.start_date,

    ]
    con.query(sql, [...values, adminId], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })

});


router.put('/change_password/:id', (req, res) => {
    const adminId = req.params.id;
    const sql = `UPDATE admin 
                    SET 
                    password = ?
                    WHERE id = ?`

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })

        const value = [
            hash,
        ]
        con.query(sql, [...value, adminId], (err, result) => {
            if (err) return res.json({ Status: false, Error: 'Query error' + err })
            return res.json({ Status: true, Result: result })
        })
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
    const sql = `INSERT INTO announcement (title, content, post_date, post_time, person_who_posts) 
    VALUES (?, ?, ?, ?, ?)`;
    const values = [
        req.body.title,
        req.body.content,
        req.body.post_date,
        req.body.post_time,
        req.body.person_who_posts,
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


router.get('/note/:adminId', (req, res) => {
    const adminId = req.params.adminId;
    const sql = 'SELECT * FROM note WHERE admin_id = ?';
    con.query(sql, [adminId], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
});


router.get('/note/:adminId/:noteId', (req, res) => {
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
    const sql = `INSERT INTO note (title, content, update_date, update_time, admin_id) 
    VALUES (?, ?, ?, ?, ?)`;
    const values = [
        req.body.title,
        req.body.content,
        req.body.update_date,
        req.body.update_time,
        req.body.admin_id,
    ]
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});


router.put('/edit_note/:adminid/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    const sql = `UPDATE note 
                    SET 
                    title = ?, 
                    content = ?, 
                    admin_id = ?, 
                    update_date = ?, 
                    update_time = ?
                    WHERE id = ?`;

    const values = [
        req.body.title,
        req.body.content,
        req.body.admin_id,
        req.body.update_date,
        req.body.update_time,

    ]
    con.query(sql, [...values, noteId], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});


router.delete('/delete_note/:adminId/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    const sql = 'DELETE FROM note WHERE id = ?';

    con.query(sql, [noteId], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/teaching_resource', (req, res) => {
    const sql = 'SELECT teaching_resource.*, teacher_info.name AS teacher_name FROM teaching_resource INNER JOIN teacher_info ON teaching_resource.person_who_adds = teacher_info.id';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
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


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
})

export { router as adminRouter }