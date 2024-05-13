import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'


const TAttendance = () => {
    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mt-auto p-3 m-3">
                    <h1 className="display-4 fw-normal">Attendance</h1>
                    <div>
                        <Link to={'/teacher_dashboard/add_attendance'} className='btn btn-lg p-2' title="Add a sleep record"><i className="bi bi-clipboard2-plus-fill text-dark"></i></Link>
                        <Link to={'/teacher_dashboard/document'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <hr />
        </div>
    )
}

export default TAttendance