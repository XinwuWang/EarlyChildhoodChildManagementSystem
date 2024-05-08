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


router.get('/children', (req, res) => {
    const sql = 'SELECT * FROM child_info';
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


// Meal chart
router.get('/meal_chart', (req, res) => {
    const sql = 'SELECT * FROM meal_chart';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/meal_chart/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM meal_chart WHERE id = ?';
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


router.delete('/delete_childMeal/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM meal_detail WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})


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

// router.delete('/delete_meal/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = 'DELETE FROM meal_chart WHERE id = ?';

//     con.query(sql, [id], (err, result) => {
//         if (err) return res.json({ Status: false, Error: 'Query error' + err })
//         return res.json({ Status: true, Result: result })
//     })
// })


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
    SELECT sleep_chart.*, child_info.name AS child_name
    FROM sleep_chart
    INNER JOIN child_info ON sleep_chart.child = child_info.id
    `;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/sleep_record/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT sleep_chart.*, child_info.name AS child_name
    FROM sleep_chart
    INNER JOIN child_info ON sleep_chart.child = child_info.id
    WHERE sleep_chart.id = ?;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result })
    });
})


router.post('/add_sleep_record', (req, res) => {
    const sql = `INSERT INTO sleep_chart (sleep_date, child, time_to_bed, time_of_sleep, time_of_wakeup, time_out_of_bed, note, supervisor) 
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


router.put('/edit_sleep_record/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE sleep_chart 
                    SET 
                    sleep_date = ?, 
                    time_to_bed = ?, 
                    time_of_sleep = ?, 
                    time_of_wakeup = ?, 
                    time_out_of_bed = ?,
                    note = ?
                    WHERE id = ?`;

    const values = [
        req.body.sleep_date,
        req.body.time_to_bed,
        req.body.time_of_sleep,
        req.body.time_of_wakeup,
        req.body.time_out_of_bed,
        req.body.note
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});



router.delete('/delete_sleep_record/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM sleep_chart WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})


// Bottle chart
router.get('/bottle_chart', (req, res) => {
    const sql = `
    SELECT bottle_chart.*, child_info.name AS child_name
    FROM bottle_chart
    INNER JOIN child_info ON bottle_chart.child = child_info.id
    `;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})



router.get('/bottle_chart/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT bottle_chart.*, child_info.name AS child_name
    FROM bottle_chart
    INNER JOIN child_info ON bottle_chart.child = child_info.id
    WHERE bottle_chart.id = ?;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result })
    });
})


router.post('/add_bottle_record', (req, res) => {
    const sql = `INSERT INTO bottle_chart (bottle_date, child, time_one, time_two, time_three, note, supervisor) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.bottle_date,
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


router.put('/edit_bottle_record/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE bottle_chart 
                    SET 
                    bottle_date = ?, 
                    time_one = ?, 
                    time_two = ?, 
                    time_three = ?, 
                    note = ?
                    WHERE id = ?`;

    const values = [
        req.body.bottle_date,
        req.body.time_one,
        req.body.time_two,
        req.body.time_three,
        req.body.note
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
});



router.delete('/delete_bottle_record/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM bottle_chart WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})



// Sunblock chart
router.get('/sunblock_chart', (req, res) => {
    const sql = `
    SELECT sunblock_chart.*, child_info.name AS child_name
    FROM sunblock_chart
    INNER JOIN child_info ON sunblock_chart.child = child_info.id
    `;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/sunblock_chart/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT sunblock_chart.*, child_info.name AS child_name
    FROM sunblock_chart
    INNER JOIN child_info ON sunblock_chart.child = child_info.id
    WHERE sunblock_chart.id = ?;
    `;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ Status: true, Result: result })
    });
})


router.post('/add_sunblock_record', (req, res) => {
    const sql = `INSERT INTO sunblock_chart (apply_date, child, apply_time_one, apply_time_two, apply_time_three, note, supervisor) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.apply_date,
        req.body.child_id,
        req.body.apply_time_one,
        req.body.apply_time_two,
        req.body.apply_time_three,
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



router.delete('/delete_accident_form/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM accident_form WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: 'Query error' + err })
        return res.json({ Status: true, Result: result })
    })
})


// Logout route
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
})


export { router as teacherRouter }