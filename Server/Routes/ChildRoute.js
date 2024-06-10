import express from 'express';
import con from '../Database/db.js';
import jwt from 'jsonwebtoken'; // for token creation
import bcrypt from 'bcryptjs'; // for password hashing
import multer from 'multer'; // for image upload
import path from 'path'; // for image upload


const router = express.Router()

// Child login
router.post('/child_login', (req, res) => {
    const sql = 'SELECT * FROM child_info WHERE email = ?';
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: 'Query error' });
        if (result.length > 0) {
            // check the password
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: 'Password error' });
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign(
                        { role: 'child', email: email, id: result[0].id, name: result[0].name },
                        'jwt_secret_key',
                        { expiresIn: '1d' }
                    );
                    res.cookie('token', token)
                    console.log(result[0])
                    return res.json({ loginStatus: true, childId: result[0].id, childName: result[0].name });
                } else {
                    return res.json({ loginStatus: false, Error: 'Invalid email or password' });
                }
            })
        } else {
            return res.json({ loginStatus: false, Error: 'Invalid email or password' });
        }
    });
});


// Image upload using multer
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


// View teachers
router.get('/teachers', (req, res) => {
    const sql = 'SELECT * FROM teacher_info ORDER BY name ASC';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/teacher/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM teacher_info WHERE id = ?';
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(result);
    });
})


// Child personal profile
router.get('/profile/:id', (req, res) => {
    const childId = req.params.id;
    const sql = 'SELECT * FROM child_info WHERE id = ?';
    con.query(sql, [childId], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(result);
    });
})


router.put('/edit_profile/:id', (req, res) => {
    const childId = req.params.id;
    const sql = `UPDATE child_info 
                    SET 
                    name = ?, 
                    dad_name = ?,
                    dad_phone = ?,
                    mum_name = ?,
                    mum_phone = ?,
                    address = ?, 
                    allergy = ?,
                    interests_and_hobbies = ?,
                    other_notes = ?
                    WHERE id = ?`;

    const values = [
        req.body.name,
        req.body.dad_name,
        req.body.dad_phone,
        req.body.mum_name,
        req.body.mum_phone,
        req.body.address,
        req.body.allergy,
        req.body.interests_and_hobbies,
        req.body.other_notes
    ]
    con.query(sql, [...values, childId], (err, result) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ Status: false, Error: 'An error occurred while updating the child information.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: false, Error: 'Child not found.' });
        }

        return res.json({ Status: true, Message: 'Information updated successfully.' });
    });

});


router.put('/profile/:id/change_photo', upload.single('image'), (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE child_info 
                    SET 
                    profile_img = ?
                    WHERE id = ?`;

    const value = [
        req.file ? req.file.filename : null
    ]
    con.query(sql, [value, id], (err, result) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ Status: false, Error: 'An error occurred while updating the child information.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: false, Error: 'Child not found.' });
        }

        return res.json({ Status: true, Message: 'Child image updated successfully.' });
    });
});


// Learning resources
router.get('/resource', (req, res) => {
    const sql = 'SELECT * FROM teaching_resource ORDER BY update_date DESC';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
});



// Centre information
router.get('/centreinfo', (req, res) => {
    const sql = 'SELECT * FROM centre_info';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
});


// Announcement
router.get('/announcement', (req, res) => {
    const sql = `SELECT announcement.*, 
    COALESCE(admin.name, teacher_info.name) AS poster_name 
    FROM announcement 
    LEFT JOIN admin ON announcement.person_who_posts = admin.id 
    LEFT JOIN teacher_info ON announcement.teacher_who_posts = teacher_info.id
    ORDER BY post_date DESC, post_time DESC`;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
});



// All the Documents
// Sleep record
router.get('/sleep_record/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT sleep_detail.*, teacher_info.name AS teacher_name, sleep_chart.sleep_date AS date_of_sleep
    FROM sleep_detail
    LEFT JOIN teacher_info ON sleep_detail.supervisor = teacher_info.id
    LEFT JOIN sleep_chart ON sleep_detail.sleep_date = sleep_chart.id
    WHERE child= ?
    ORDER BY date_of_sleep DESC;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
});


// Sunblock chart
router.get('/sunblock_chart/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT sunblock_chart.*, teacher_info.name AS teacher_name, sunblock.apply_date AS date_of_application
    FROM sunblock_chart
    LEFT JOIN teacher_info ON sunblock_chart.supervisor = teacher_info.id
    LEFT JOIN sunblock ON sunblock_chart.apply_date = sunblock.id
    WHERE child = ?
    ORDER BY date_of_application DESC;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})



// Formula feeding chart
router.get('/bottle_chart/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT formula_detail.*, teacher_info.name AS teacher_name, formula_chart.feeding_date AS date_of_formula
    FROM formula_detail
    LEFT JOIN teacher_info ON formula_detail.supervisor = teacher_info.id
    LEFT JOIN formula_chart ON formula_detail.feeding_date = formula_chart.id
    WHERE child = ?
    ORDER BY date_of_formula DESC;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


// Accident form
router.get('/accident_form/:childId', (req, res) => {
    const childId = req.params.childId;
    const sql = `
    SELECT accident_form.*, teacher_info.name AS supervisor_name
    FROM accident_form
    INNER JOIN teacher_info ON accident_form.supervisor = teacher_info.id
    WHERE child = ?
    ORDER BY accident_date DESC;
    `;
    con.query(sql, [childId], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/accident_detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT accident_form.*, child_info.name AS child_name, teacher_info.name AS supervisor_name
    FROM accident_form
    INNER JOIN child_info ON accident_form.child = child_info.id
    INNER JOIN teacher_info ON accident_form.supervisor = teacher_info.id
    WHERE accident_form.id = ?;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result })
    });
})



// Meal chart
router.get('/meal_chart', (req, res) => {
    const sql = `SELECT meal_chart.*, teacher_info.name As supervisor_name
    FROM meal_chart 
    INNER JOIN teacher_info ON meal_chart.supervisor = teacher_info.id
    ORDER BY meal_chart.meal_date DESC`;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/meal_chart/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT meal_chart.*, teacher_info.name As supervisor_name
     FROM meal_chart 
     INNER JOIN teacher_info ON meal_chart.supervisor = teacher_info.id
     WHERE meal_chart.id = ?`;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result })
    });
})


router.get('/meal_detail/:id/:childId', (req, res) => {
    const id = req.params.id;
    const childId = req.params.childId;
    const sql = `
        SELECT meal_detail.*, child_info.name AS child_name
        FROM meal_detail
        INNER JOIN child_info ON meal_detail.child = child_info.id
        WHERE meal_detail.meal_day = ? AND meal_detail.child = ?;
    `;
    con.query(sql, [id, childId], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result });
    });
})


// Attendance
router.get('/attendance/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT 
    ar.*, 
    child.name AS child_name, 
    parent.name AS parent_name,
    attendance.form_date as date_of_attendance,
    COALESCE(teacher.name, admin.name, parent.name) AS person_who_signed
    FROM attendance_record ar
    LEFT JOIN child_info child ON ar.child = child.id
    LEFT JOIN child_info parent ON ar.parent_signature = parent.id
    LEFT JOIN teacher_info teacher ON ar.teacher_signature = teacher.id
    LEFT JOIN admin admin ON ar.admin_signature = admin.id
    LEFT JOIN attendance ON ar.attendance_date = attendance.id
    WHERE ar.child = ?
    ORDER BY date_of_attendance DESC;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result });
    });
})


router.get('/attendance_date', (req, res) => {
    const sql = `
    SELECT *
    FROM attendance
    ORDER BY form_date DESC;
    `;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.post('/check_sign_in', (req, res) => {
    const { child_id, attendance_date } = req.body;

    if (!child_id || !attendance_date) {
        return res.status(400).json({ Status: false, Error: 'Child and attendance date are required' });
    }

    const sql = `
        SELECT id
        FROM attendance_record
        WHERE child = ? AND attendance_date = ? AND time_in IS NOT NULL
    `;
    const values = [child_id, attendance_date];

    con.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ Status: false, Error: 'Database query error' });
        }

        if (results.length > 0) {
            return res.status(200).json({ Status: true, Message: 'Child has already signed in' });
        } else {
            return res.status(200).json({ Status: false, Message: 'Child has not signed in yet' });
        }
    });
});


router.post('/sign_in', (req, res) => {
    const { child_id, attendance_date, time_in, parent_signature } = req.body;

    const sql = `
        INSERT INTO attendance_record (child, attendance_date, time_in, parent_signature) 
        VALUES (?, ?, ?, ?)
    `;
    const values = [child_id, attendance_date, time_in, parent_signature];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ Status: false, Error: 'Database query error' });
        }
        return res.status(200).json({ Status: true, Message: 'Sign-in time recorded successfully' });
    });
});



router.post('/check_sign_out', (req, res) => {
    const { child_id, attendance_date } = req.body;

    if (!child_id || !attendance_date) {
        return res.status(400).json({ Status: false, Error: 'Child and attendance date are required' });
    }

    const sql = `
        SELECT id
        FROM attendance_record
        WHERE child = ? AND attendance_date = ? AND time_out IS NOT NULL
    `;
    const values = [child_id, attendance_date];

    con.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ Status: false, Error: 'Database query error' });
        }

        if (results.length > 0) {
            return res.status(200).json({ Status: true, Message: 'Child has already signed out' });
        } else {
            return res.status(200).json({ Status: false, Message: 'Child has not signed out yet' });
        }
    });
});


router.post('/sign_out', (req, res) => {
    const { child_id, attendance_date, time_out, parent_signature } = req.body;

    const sql = `
        UPDATE attendance_record 
        SET time_out = ?, parent_signature = ?
        WHERE child = ? AND attendance_date = ?
    `;
    const values = [time_out, parent_signature, child_id, attendance_date];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ Status: false, Error: 'Database query error' });
        }
        return res.status(200).json({ Status: true, Message: 'Sign-out time recorded successfully' });
    });
});



// Learning story
router.get('/learning_story/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT 
    learning_story_detail.*, 
    child_info.name AS child_name,
    teacher_info.name AS creator_name
    FROM learning_story_detail
    INNER JOIN child_info ON learning_story_detail.child = child_info.id
    INNER JOIN teacher_info ON learning_story_detail.person_who_wrote = teacher_info.id 
    WHERE learning_story_detail.child = ?
    ORDER BY update_date DESC;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log(result)
        return res.json({ Status: true, Result: result });
    });
})


router.get('/ls_detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT 
    learning_story_detail.*, 
    child_info.name AS child_name,
    teacher_info.name AS creator_name
    FROM learning_story_detail
    INNER JOIN child_info ON learning_story_detail.child = child_info.id
    INNER JOIN teacher_info ON learning_story_detail.person_who_wrote = teacher_info.id 
    WHERE learning_story_detail.id = ?
    `;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log(result)
        return res.json({ Status: true, Result: result });
    });
})



// Messaging function
router.get('/message/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT message.*, 
    COALESCE(teacher_info.name, admin.name, child_info.name) AS sender_name
    FROM message
    LEFT JOIN teacher_info ON message.teacher_sender = teacher_info.id
    LEFT JOIN admin ON message.admin_sender = admin.id
    LEFT JOIN child_info ON message.child_sender = child_info.id
    WHERE message.child_receiver = ?
    ORDER BY message.sent_date DESC, message.sent_time DESC;`;
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})



router.post('/message_a_teacher', (req, res) => {
    const sql = `INSERT INTO message (child_sender, title, content, sent_date, sent_time, teacher_receiver ) 
    VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.child_sender,
        req.body.title,
        req.body.content,
        req.body.sent_date,
        req.body.sent_time,
        req.body.teacher_receiver
    ]
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});


router.get('/admin', (req, res) => {
    const sql = 'SELECT * FROM admin ORDER BY name ASC';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})



router.post('/message_admin', (req, res) => {
    const sql = `INSERT INTO message (child_sender, title, content, sent_date, sent_time, admin_receiver) 
    VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.child_sender,
        req.body.title,
        req.body.content,
        req.body.sent_date,
        req.body.sent_time,
        req.body.admin_receiver
    ]
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});


router.get('/message_detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT message.*, 
    COALESCE(teacher_info.name, admin.name, child_info.name) AS sender_name
    FROM message
    LEFT JOIN teacher_info ON message.teacher_sender = teacher_info.id
    LEFT JOIN admin ON message.admin_sender = admin.id
    LEFT JOIN child_info ON message.child_sender = child_info.id
    WHERE message.id = ?`;
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.delete('/delete_message/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM message WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})

// Change the password
router.put('/change_password/:id', (req, res) => {
    const childId = req.params.id;
    const sql = `UPDATE child_info 
                    SET 
                    password = ?
                    WHERE id = ?`

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })

        const value = [
            hash,
        ]
        con.query(sql, [...value, childId], (err, result) => {
            if (err) return res.json({ Status: false, Error: 'Query error' + err })
            return res.json({ Status: true, Result: result })
        })
    });
});


// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
})

export { router as childRouter }