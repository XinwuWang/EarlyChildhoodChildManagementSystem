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
        <div className='container'>
            <div className="container p-3">
                <div className="d-flex justify-content-between align-items-center mt-auto m-2">
                    <h1 className="display-4 fw-normal">Teacher List</h1>
                    <div>
                        <Link to='/dashboard/add_teacher' className='btn btn-lg p-2' title='Add a teacher'><i className="bi bi-person-add"></i></Link>
                        <Link to={'/dashboard'} className='btn btn-lg p-2' title="Dashboard"><i className="bi bi-speedometer2 text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <hr />

            <div className='px-5 mt-1'>
                <div className="row pt-3 align-items-center">
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
                                <p><Link className="btn btn-secondary" to={"/dashboard/manageteachers/" + e.id}>View details »</Link></p>
                            </div>
                        ))
                    }
                </div>


                <div className="container pt-2">

                </div>
            </div>
        </div>
    )
}

export default Teachers