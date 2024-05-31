import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ChildrenInfo = () => {
    const [child, setChild] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/auth/managechildren')
            .then(result => {
                if (result.data.Status) {
                    setChild(result.data.Result)
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
                    <h1 className="display-4 fw-normal">Child List</h1>
                    <div>
                        <Link to='/dashboard/add_child' className='btn btn-lg p-2' title='Add a child'><i className="bi bi-person-add"></i></Link>
                        <Link to={'/dashboard'} className='btn btn-lg p-2' title="Dashboard"><i className="bi bi-speedometer2 text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <hr />
            <div className='px-5 mt-1'>

                <div className="row pt-5 align-items-center">
                    {
                        child.map(e => (
                            <div className="col-lg-4 pt-5" key={e.id}>
                                <img
                                    src={'http://localhost:3000/Images/' + e.profile_img}
                                    className="bd-placeholder-img rounded-circle"
                                    width="140"
                                    height="140"
                                    role="img"
                                    aria-label="Placeholder"
                                    alt="Profile Image"
                                    preserveAspectRatio="xMidYMid slice"
                                />
                                <h2 className="fw-normal">{e.name}</h2>
                                <p><Link className="btn btn-secondary" to={"/dashboard/managechildren/" + e.id}>View details »</Link></p>
                            </div>
                        ))
                    }
                </div>
                <div className='p-3'></div>
            </div>
        </div >
    )
}

export default ChildrenInfo