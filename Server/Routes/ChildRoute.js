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


// View teachers
router.get('/teachers', (req, res) => {
    const sql = 'SELECT * FROM teacher_info';
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
        // console.log(result)
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



// Learning resources
router.get('/resource', (req, res) => {
    const sql = 'SELECT * FROM teaching_resource';
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
    const sql = 'SELECT announcement.*, COALESCE(admin.name, teacher_info.name) AS poster_name FROM announcement LEFT JOIN admin ON announcement.person_who_posts = admin.id LEFT JOIN teacher_info ON announcement.teacher_who_posts = teacher_info.id';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
});



// Documents
// Sleep record
router.get('/sleep_record/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT sleep_chart.*, teacher_info.name AS teacher_name
    FROM sleep_chart
    LEFT JOIN teacher_info ON sleep_chart.supervisor = teacher_info.id
    WHERE child= ?
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
    SELECT sunblock_chart.*, teacher_info.name AS teacher_name
    FROM sunblock_chart
    LEFT JOIN teacher_info ON sunblock_chart.supervisor = teacher_info.id
    WHERE child = ?
    `;
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})



// Bottle chart
router.get('/bottle_chart/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT bottle_chart.*, teacher_info.name AS teacher_name
    FROM bottle_chart
    LEFT JOIN teacher_info ON bottle_chart.supervisor = teacher_info.id
    WHERE child = ?
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
    INNER JOIN teacher_info ON meal_chart.supervisor = teacher_info.id`;
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