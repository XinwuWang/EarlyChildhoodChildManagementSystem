import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'


const Teachers = () => {
    const [teacher, setTeacher] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/auth/manageteachers')
            .then(result => {
                // console.log(result.data)
                if (result.data.Status) {
                    console.log(result.data.Result)
                    setTeacher(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='px-5 mt-5'>
            <div className='d-flex justify-content-center'>
                <h3>Teacher List</h3>
            </div>
            <div className="row pt-5 align-items-center">
                {
                    teacher.map(e => (
                        <div className="col-lg-4 pt-5" key={e.id}>
                            <img
                                src={'http://localhost:3000/Images/' + e.image}
                                className="bd-placeholder-img rounded-circle"
                                width="140"
                                height="140"
                                role="img"
                                aria-label="Placeholder"
                                alt="Profile Image"
                                preserveAspectRatio="xMidYMid slice"
                            />
                            <h2 className="fw-normal">{e.name}</h2>
                            <p><a className="btn btn-secondary" href="#">View details »</a></p>
                        </div>
                    ))
                }
            </div>


            <div className="container pt-5">
                <div className="row">
                    <div className="col text-center">
                        <Link to='/dashboard/add_teacher' className='btn btn-success'>Add Teacher</Link>
                    </div>
                </div>
            </div>
            <div className='mt-3'></div>
        </div>
    )
}

export default Teachers