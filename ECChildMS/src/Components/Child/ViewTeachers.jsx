import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'


const ViewTeachers = () => {
    const [teacher, setTeacher] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/child/teachers')
            .then(result => {
                if (result.data.Status) {
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
                            <p><Link className="btn btn-secondary" to={"/child_dashboard/teacher/" + e.id}>View details »</Link></p>
                        </div>
                    ))
                }
            </div>


            {/* <div className="container pt-5">
                <div className="row">
                    <div className="col text-center">
                        <Link to='/teacher_dashboard/add_child' className='btn btn-success'>Add Child</Link>
                    </div>
                </div>
            </div> */}
            <div className='mt-3'></div>
        </div>
    )
}

export default ViewTeachers