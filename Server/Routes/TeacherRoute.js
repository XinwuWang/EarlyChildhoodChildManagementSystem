import express from 'express';
import con from '../Database/db.js';
import jwt from 'jsonwebtoken'; // for token creation
import bcrypt from 'bcryptjs'; // for password hashing
import multer from 'multer'; // for image upload
import path from 'path'; // for image upload

const router = express.Router()


// Login
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
                        { role: 'teacher', email: email, id: result[0].id, name: result[0].name },
                        'jwt_secret_key',
                        { expiresIn: '1d' }
                    );
                    res.cookie('token', token)
                    console.log(result[0])
                    return res.json({ loginStatus: true, teacherId: result[0].id, teacherName: result[0].name });
                } else {
                    return res.json({ loginStatus: false, Error: 'Invalid email or password' });
                }
            })
        } else {
            return res.json({ loginStatus: false, Error: 'Invalid email or password' });
        }
    });
});

//Personal profile
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

// Child list
router.get('/children', (req, res) => {
    const sql = 'SELECT * FROM child_info ORDER BY name ASC';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/children/:id', (req, res) => {
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


// Announcement
router.get('/announcement', (req, res) => {
    const sql = `SELECT announcement.*, 
    COALESCE(admin.name, teacher_info.name) AS poster_name 
    FROM announcement 
    LEFT JOIN admin ON announcement.person_who_posts = admin.id 
    LEFT JOIN teacher_info ON announcement.teacher_who_posts = teacher_info.id
    ORDER BY post_date DESC, post_time DESC;`;
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

// Centre information
router.get('/centre_information', (req, res) => {
    const sql = 'SELECT * FROM centre_info';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
});


// Change the password
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

// Teaching resource
router.get('/teaching_resource', (req, res) => {
    const sql = `SELECT teaching_resource.*, 
    teacher_info.name AS teacher_name 
    FROM teaching_resource 
    INNER JOIN teacher_info ON teaching_resource.person_who_adds = teacher_info.id
    ORDER BY update_date DESC;`;
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

// Notebook
router.get('/note/:teacherId', (req, res) => {
    const teacherId = req.params.teacherId;
    const sql = 'SELECT * FROM note WHERE teacher_id = ? ORDER BY update_date DESC, update_time DESC';
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

// Document
// Meal chart
router.get('/meal_chart', (req, res) => {
    const sql = `SELECT meal_chart.*, teacher_info.name AS supervisor_name 
    FROM meal_chart
    INNER JOIN teacher_info ON meal_chart.supervisor = teacher_info.id
    ORDER BY meal_date DESC;`;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/meal_chart/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT meal_chart.*, teacher_info.name AS supervisor_name
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


router.get('/meal_detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
        SELECT meal_detail.*, child_info.name AS child_name
        FROM meal_detail
        INNER JOIN child_info ON meal_detail.child = child_info.id
        WHERE meal_detail.meal_day = ?;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result });
    });
})


router.get('/meal/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT 
    meal_detail.*, 
    child_info.name AS child_name,
    meal_chart.meal_date AS meal_date
    FROM meal_detail
    INNER JOIN child_info ON meal_detail.child = child_info.id
    INNER JOIN meal_chart ON meal_detail.meal_day = meal_chart.id
    WHERE meal_detail.id = ?;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result });
    });
})

router.delete('/delete_childMeal/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM meal_detail WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})


router.put('/edit_meal_detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE meal_detail 
                    SET 
                    mt_portion = ?,
                    lunch_portion = ?,
                    at_portion = ?,
                    note = ?
                    WHERE id = ?`;


    const values = [
        req.body.mt_portion,
        req.body.lunch_portion,
        req.body.at_portion,
        req.body.note
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});


router.post('/add_meal', (req, res) => {
    const sql = `INSERT INTO meal_chart (meal_date, morning_tea, lunch, afternoon_tea, supervisor) 
    VALUES (?, ?, ?, ?, ?)`;
    const values = [
        req.body.date,
        req.body.morning_tea,
        req.body.lunch,
        req.body.afternoon_tea,
        req.body.supervisor,
    ]
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});


router.put('/edit_meal/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE meal_chart 
                    SET 
                    meal_date = ?, 
                    morning_tea = ?, 
                    lunch = ?, 
                    afternoon_tea = ?, 
                    supervisor = ?
                    WHERE id = ?`;

    const values = [
        req.body.date,
        req.body.morning_tea,
        req.body.lunch,
        req.body.afternoon_tea,
        req.body.supervisor,

    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});

router.post('/add_childMeal', (req, res) => {
    const sql = `INSERT INTO meal_detail (child, meal_day, mt_portion, lunch_portion, at_portion, note) 
    VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.child_id,
        req.body.date_id,
        req.body.morning_tea,
        req.body.lunch,
        req.body.afternoon_tea,
        req.body.note,
    ]

    console.log(values)
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});


// Sleep chart 
router.get('/sleep_record', (req, res) => {
    const sql = `
    SELECT sleep_chart.*, teacher_info.name AS supervisor_name
    FROM sleep_chart
    INNER JOIN teacher_info ON sleep_chart.person_who_created = teacher_info.id
    ORDER BY sleep_date DESC
    `;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/sleep_record/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM sleep_chart WHERE id = ?`;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result })
    });
})

router.post('/create_sleep_chart', (req, res) => {
    const sql = `INSERT INTO sleep_chart (sleep_date, person_who_created) 
    VALUES (?, ?)`;
    const values = [
        req.body.sleep_date,
        req.body.person_who_created
    ]
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});


router.put('/edit_sleep_chart/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE sleep_chart 
                    SET 
                    sleep_date = ?
                    WHERE id = ?`;

    const values = [
        req.body.sleep_date
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});


router.get('/sleep_detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT 
    sleep_detail.*, 
    child_info.name AS child_name,
    sleep_chart.sleep_date AS sleep_date,
    teacher_info.name AS supervisor_name
    FROM sleep_detail
    INNER JOIN child_info ON sleep_detail.child = child_info.id
    INNER JOIN teacher_info ON sleep_detail.supervisor = teacher_info.id 
    INNER JOIN sleep_chart ON sleep_detail.sleep_date = sleep_chart.id
    WHERE sleep_detail.sleep_date = ?;
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


router.get('/sleep/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    const sql = `
    SELECT 
    sleep_detail.*, 
    child_info.name AS child_name,
    sleep_chart.sleep_date AS date_of_sleep,
    teacher_info.name AS supervisor_name
    FROM sleep_detail
    INNER JOIN child_info ON sleep_detail.child = child_info.id
    INNER JOIN teacher_info ON sleep_detail.supervisor = teacher_info.id 
    INNER JOIN sleep_chart ON sleep_detail.sleep_date = sleep_chart.id
    WHERE sleep_detail.id = ?;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result });
    });
})

router.post('/put_child_to_sleep', (req, res) => {
    const sql = `INSERT INTO sleep_detail 
    (sleep_date, child, time_to_bed, time_of_sleep, time_of_wakeup, time_out_of_bed, note, supervisor) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.sleep_date,
        req.body.child_id,
        req.body.time_to_bed,
        req.body.time_of_sleep,
        req.body.time_of_wakeup,
        req.body.time_out_of_bed,
        req.body.note,
        req.body.supervisor
    ]
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});


router.put('/edit_sleep_detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE sleep_detail 
                    SET 
                    time_to_bed = ?,
                    time_of_sleep = ?,
                    time_of_wakeup = ?,
                    time_out_of_bed = ?,
                    note = ?,
                    supervisor = ?
                    WHERE id = ?`;


    const values = [
        req.body.time_to_bed,
        req.body.time_of_sleep,
        req.body.time_of_wakeup,
        req.body.time_out_of_bed,
        req.body.note,
        req.body.supervisor
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});



router.delete('/delete_sleep_record/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM sleep_detail WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})


// Formula chart
router.get('/formula_chart', (req, res) => {
    const sql = `
    SELECT formula_chart.*, teacher_info.name AS supervisor_name
    FROM formula_chart
    INNER JOIN teacher_info ON formula_chart.person_who_created = teacher_info.id
    ORDER BY feeding_date DESC`;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.post('/create_formula_chart', (req, res) => {
    const sql = `INSERT INTO formula_chart (feeding_date, person_who_created) 
    VALUES (?, ?)`;
    const values = [
        req.body.feeding_date,
        req.body.person_who_created
    ]
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});


router.get('/formula_chart/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM formula_chart WHERE id = ?`;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result })
    });
})


router.put('/edit_formula_chart/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE formula_chart 
                    SET 
                    feeding_date = ?
                    WHERE id = ?`;

    const values = [
        req.body.feeding_date
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});


router.get('/formula_detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT 
    formula_detail.*, 
    child_info.name AS child_name,
    formula_chart.feeding_date AS formula_date,
    teacher_info.name AS supervisor_name
    FROM formula_detail
    INNER JOIN child_info ON formula_detail.child = child_info.id
    INNER JOIN teacher_info ON formula_detail.supervisor = teacher_info.id 
    INNER JOIN formula_chart ON formula_detail.feeding_date = formula_chart.id
    WHERE formula_detail.feeding_date = ?;
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


router.post('/feed_a_child', (req, res) => {
    const sql = `INSERT INTO formula_detail 
    (feeding_date, child, time_one, time_two, time_three, note, supervisor) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.feeding_date,
        req.body.child_id,
        req.body.time_one,
        req.body.time_two,
        req.body.time_three,
        req.body.note,
        req.body.supervisor
    ]
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});


router.get('/formula/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT 
    formula_detail.*, 
    child_info.name AS child_name,
    formula_chart.feeding_date AS formula_date,
    teacher_info.name AS supervisor_name
    FROM formula_detail
    INNER JOIN child_info ON formula_detail.child = child_info.id
    INNER JOIN teacher_info ON formula_detail.supervisor = teacher_info.id 
    INNER JOIN formula_chart ON formula_detail.feeding_date = formula_chart.id
    WHERE formula_detail.id = ?;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result });
    });
})


router.put('/edit_formula_detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE formula_detail 
                    SET 
                    time_one = ?,
                    time_two = ?,
                    time_three = ?,
                    note = ?,
                    supervisor = ?
                    WHERE id = ?`;


    const values = [
        req.body.time_one,
        req.body.time_two,
        req.body.time_three,
        req.body.note,
        req.body.supervisor
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});



router.delete('/delete_formula_record/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM formula_detail WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})


// Sunblock chart
router.get('/sunblock_chart', (req, res) => {
    const sql = `
    SELECT sunblock.*, teacher_info.name AS creator_name
    FROM sunblock
    INNER JOIN teacher_info ON sunblock.person_who_created = teacher_info.id
    ORDER BY apply_date DESC
    `;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/sunblock_chart/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM sunblock WHERE id = ?`;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result })
    });
})

router.post('/add_sunblock_chart', (req, res) => {
    const sql = `INSERT INTO sunblock (apply_date, person_who_created) 
    VALUES (?, ?)`;
    const values = [
        req.body.apply_date,
        req.body.person_who_created
    ]
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});


router.put('/edit_sunblock_chart/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE sunblock 
                    SET 
                    apply_date = ?
                    WHERE id = ?`;

    const values = [
        req.body.apply_date
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});


router.get('/sunblock_chart_detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT 
    sunblock_chart.*, 
    child_info.name AS child_name,
    sunblock.apply_date AS sunblock_date,
    teacher_info.name AS supervisor_name
    FROM sunblock_chart
    INNER JOIN child_info ON sunblock_chart.child = child_info.id
    INNER JOIN teacher_info ON sunblock_chart.supervisor = teacher_info.id 
    INNER JOIN sunblock ON sunblock_chart.apply_date = sunblock.id
    WHERE sunblock_chart.apply_date = ?;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result });
    });
})


router.get('/sunblock/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT 
    sunblock_chart.*, 
    child_info.name AS child_name,
    sunblock.apply_date AS sunblock_date,
    teacher_info.name AS supervisor_name
    FROM sunblock_chart
    INNER JOIN child_info ON sunblock_chart.child = child_info.id
    INNER JOIN teacher_info ON sunblock_chart.supervisor = teacher_info.id 
    INNER JOIN sunblock ON sunblock_chart.apply_date = sunblock.id
    WHERE sunblock_chart.id = ?;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result });
    });
})


router.post('/apply_sunblock_to_child', (req, res) => {
    const sql = `INSERT INTO sunblock_chart 
    (apply_date, child, apply_time_one, apply_time_two, apply_time_three, note, supervisor) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.apply_date,
        req.body.child_id,
        req.body.time_one,
        req.body.time_two,
        req.body.time_three,
        req.body.note,
        req.body.supervisor
    ]

    console.log(values)
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});


router.put('/edit_sunblock_detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE sunblock_chart 
                    SET 
                    apply_time_one = ?,
                    apply_time_two = ?,
                    apply_time_three = ?,
                    note = ?,
                    supervisor = ?
                    WHERE id = ?`;


    const values = [
        req.body.apply_time_one,
        req.body.apply_time_two,
        req.body.apply_time_three,
        req.body.note,
        req.body.supervisor
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});




router.delete('/delete_sunblock_record/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM sunblock_chart WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})


// Accident form
router.get('/accident_form', (req, res) => {
    const sql = `
    SELECT accident_form.*, child_info.name AS child_name, teacher_info.name AS supervisor_name
    FROM accident_form
    INNER JOIN child_info ON accident_form.child = child_info.id
    INNER JOIN teacher_info ON accident_form.supervisor = teacher_info.id
    ORDER BY accident_date DESC;
    `;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/accident_form/:id', (req, res) => {
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



router.post('/add_accident_form', (req, res) => {
    const sql = `INSERT INTO accident_form 
    (child, accident_date, accident_time, location_of_accident, description_of_accident, injury_assessment, medical_treatment, staff_response, additional_notes, supervisor) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.child_id,
        req.body.accident_date,
        req.body.accident_time,
        req.body.location_of_accident,
        req.body.description_of_accident,
        req.body.injury_assessment,
        req.body.medical_treatment,
        req.body.staff_response,
        req.body.additional_notes,
        req.body.supervisor
    ]
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});



router.put('/edit_accident_form/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE accident_form 
                    SET 
                    accident_date = ?, 
                    accident_time = ?, 
                    location_of_accident = ?,
                    description_of_accident = ?,
                    injury_assessment = ?,
                    medical_treatment = ?,
                    staff_response = ?,
                    additional_notes = ?,
                    supervisor = ?
                    WHERE id = ?`;


    const values = [
        req.body.accident_date,
        req.body.accident_time,
        req.body.location_of_accident,
        req.body.description_of_accident,
        req.body.injury_assessment,
        req.body.medical_treatment,
        req.body.staff_response,
        req.body.additional_notes,
        req.body.supervisor
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});



router.delete('/delete_accident_form/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM accident_form WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})



// Attendance
router.get('/attendance', (req, res) => {
    const sql = `SELECT attendance.*, admin.name AS creator_name
    FROM attendance
    INNER JOIN admin ON attendance.person_who_created = admin.id
    ORDER BY form_date DESC`;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/attendance/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM attendance WHERE id = ?`;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result })
    });
})


router.get('/attendance_detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT 
    ar.*, 
    child.name AS child_name, 
    parent.name AS parent_name,
    COALESCE(teacher.name, admin.name, parent.name) AS person_who_signed
    FROM attendance_record ar
    LEFT JOIN child_info child ON ar.child = child.id
    LEFT JOIN child_info parent ON ar.parent_signature = parent.id
    LEFT JOIN teacher_info teacher ON ar.teacher_signature = teacher.id
    LEFT JOIN admin admin ON ar.admin_signature = admin.id
    WHERE ar.attendance_date = ?;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result });
    });
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

router.post('/sign_in', (req, res) => {
    const { child_id, attendance_date, time_in, teacher_signature } = req.body;

    const sql = `
        INSERT INTO attendance_record (child, attendance_date, time_in, teacher_signature) 
        VALUES (?, ?, ?, ?)
    `;
    const values = [child_id, attendance_date, time_in, teacher_signature];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ Status: false, Error: 'Database query error' });
        }
        return res.status(200).json({ Status: true, Message: 'Sign-in time recorded successfully' });
    });
});


router.post('/sign_out', (req, res) => {
    const { child_id, attendance_date, time_out, teacher_signature } = req.body;

    const sql = `
        UPDATE attendance_record 
        SET time_out = ?, teacher_signature = ?
        WHERE child = ? AND attendance_date = ?
    `;
    const values = [time_out, teacher_signature, child_id, attendance_date];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ Status: false, Error: 'Database query error' });
        }
        return res.status(200).json({ Status: true, Message: 'Sign-out time recorded successfully' });
    });
});





// Learning story
router.get('/learning_story', (req, res) => {
    const sql = `
    SELECT learning_story.*, teacher_info.name AS creator_name
    FROM learning_story
    INNER JOIN teacher_info ON learning_story.created_by = teacher_info.id
    ORDER BY created_month DESC`;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.post('/start_new_month', (req, res) => {
    const { created_month, created_by } = req.body;

    const checkSql = `SELECT COUNT(*) AS count FROM learning_story WHERE created_month = ?`;
    con.query(checkSql, [created_month], (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err.message);
            return res.json({ Status: false, Error: 'Error checking existing month' });
        }

        if (results[0].count > 0) {
            return res.json({ Status: false, Error: 'Month already exists' });
        } else {
            const insertSql = `INSERT INTO learning_story (created_month, created_by) VALUES (?, ?)`;
            const values = [created_month, created_by];

            con.query(insertSql, values, (err, result) => {
                if (err) {
                    console.error('Error executing SQL query:', err.message);
                    return res.json({ Status: false, Error: err.message });
                }
                return res.json({ Status: true });
            });
        }
    });
});


router.get('/learning_story/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM learning_story WHERE id = ?`;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result })
    });
})


router.put('/edit_ls/:id', (req, res) => {
    const id = req.params.id;
    const { created_month } = req.body;

    const fetchCurrentMonthSql = `SELECT created_month FROM learning_story WHERE id = ?`;
    con.query(fetchCurrentMonthSql, [id], (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err.message);
            return res.json({ Status: false, Error: 'Query error: ' + err.message });
        }

        if (results.length === 0) {
            return res.json({ Status: false, Error: 'Learning story not found' });
        }
        const currentMonth = results[0].created_month;
        if (currentMonth === created_month) {
            return res.json({ Status: false, Error: 'Selected month is the same as the current one' });
        }

        const checkMonthSql = `SELECT COUNT(*) AS count FROM learning_story WHERE created_month = ?`;
        con.query(checkMonthSql, [created_month], (err, results) => {
            if (err) {
                console.error('Error executing SQL query:', err.message);
                return res.json({ Status: false, Error: 'Query error: ' + err.message });
            }
            if (results[0].count > 0) {
                return res.json({ Status: false, Error: 'Selected month already exists' });
            }

            const updateSql = `UPDATE learning_story SET created_month = ? WHERE id = ?`;
            con.query(updateSql, [created_month, id], (err, result) => {
                if (err) {
                    console.error('Error executing SQL query:', err.message);
                    return res.json({ Status: false, Error: 'Query error: ' + err.message });
                }
                return res.json({ Status: true, Result: result });
            });
        });
    });
});


router.post('/write_a_learning_story', (req, res) => {
    const sql = `INSERT INTO learning_story_detail 
    (child, title, content, person_who_wrote, update_date, created_month) 
    VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.child_id,
        req.body.title,
        req.body.content,
        req.body.person_who_wrote,
        req.body.update_date,
        req.body.created_month
    ]

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ Status: false, Error: err })
        }
        return res.json({ Status: true })

    });
});



// router.get('/formula_chart', (req, res) => {
//     const sql = `
//     SELECT formula_chart.*, teacher_info.name AS supervisor_name
//     FROM formula_chart
//     INNER JOIN teacher_info ON formula_chart.person_who_created = teacher_info.id
//     ORDER BY feeding_date DESC`;
//     con.query(sql, (err, result) => {
//         if (err) return res.json({ Status: false, Error: 'Query error' })
//         return res.json({ Status: true, Result: result })
//     })
// })


// router.post('/create_formula_chart', (req, res) => {
//     const sql = `INSERT INTO formula_chart (feeding_date, person_who_created) 
//     VALUES (?, ?)`;
//     const values = [
//         req.body.feeding_date,
//         req.body.person_who_created
//     ]
//     con.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error executing SQL query:', err);
//             return res.json({ Status: false, Error: err })
//         }
//         return res.json({ Status: true })

//     });
// });


// router.get('/formula_chart/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = `SELECT * FROM formula_chart WHERE id = ?`;
//     con.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error('Error executing SQL query:', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         return res.json({ Status: true, Result: result })
//     });
// })


// router.put('/edit_formula_chart/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = `UPDATE formula_chart 
//                     SET 
//                     feeding_date = ?
//                     WHERE id = ?`;

//     const values = [
//         req.body.feeding_date
//     ]
//     con.query(sql, [...values, id], (err, result) => {
//         if (err) return res.json({ Status: false, Error: 'Query error' + err })
//         return res.json({ Status: true, Result: result })
//     })
// });


// router.get('/formula_detail/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = `
//     SELECT 
//     formula_detail.*, 
//     child_info.name AS child_name,
//     formula_chart.feeding_date AS formula_date,
//     teacher_info.name AS supervisor_name
//     FROM formula_detail
//     INNER JOIN child_info ON formula_detail.child = child_info.id
//     INNER JOIN teacher_info ON formula_detail.supervisor = teacher_info.id 
//     INNER JOIN formula_chart ON formula_detail.feeding_date = formula_chart.id
//     WHERE formula_detail.feeding_date = ?;
//     `;
//     con.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error('Error executing SQL query:', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         console.log(result)
//         return res.json({ Status: true, Result: result });
//     });
// })


// router.post('/feed_a_child', (req, res) => {
//     const sql = `INSERT INTO formula_detail 
//     (feeding_date, child, time_one, time_two, time_three, note, supervisor) 
//     VALUES (?, ?, ?, ?, ?, ?, ?)`;
//     const values = [
//         req.body.feeding_date,
//         req.body.child_id,
//         req.body.time_one,
//         req.body.time_two,
//         req.body.time_three,
//         req.body.note,
//         req.body.supervisor
//     ]
//     con.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error executing SQL query:', err);
//             return res.json({ Status: false, Error: err })
//         }
//         return res.json({ Status: true })

//     });
// });


// router.get('/formula/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = `
//     SELECT 
//     formula_detail.*, 
//     child_info.name AS child_name,
//     formula_chart.feeding_date AS formula_date,
//     teacher_info.name AS supervisor_name
//     FROM formula_detail
//     INNER JOIN child_info ON formula_detail.child = child_info.id
//     INNER JOIN teacher_info ON formula_detail.supervisor = teacher_info.id 
//     INNER JOIN formula_chart ON formula_detail.feeding_date = formula_chart.id
//     WHERE formula_detail.id = ?;
//     `;
//     con.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error('Error executing SQL query:', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         return res.json({ Status: true, Result: result });
//     });
// })


// router.put('/edit_formula_detail/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = `UPDATE formula_detail 
//                     SET 
//                     time_one = ?,
//                     time_two = ?,
//                     time_three = ?,
//                     note = ?,
//                     supervisor = ?
//                     WHERE id = ?`;


//     const values = [
//         req.body.time_one,
//         req.body.time_two,
//         req.body.time_three,
//         req.body.note,
//         req.body.supervisor
//     ]
//     con.query(sql, [...values, id], (err, result) => {
//         if (err) return res.json({ Status: false, Error: 'Query error' + err })
//         return res.json({ Status: true, Result: result })
//     })
// });



// router.delete('/delete_formula_record/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = 'DELETE FROM formula_detail WHERE id = ?';

//     con.query(sql, [id], (err, result) => {
//         if (err) return res.json({ Status: false, Error: 'Query error' + err })
//         return res.json({ Status: true, Result: result })
//     })
// })



// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
})


export { router as teacherRouter }