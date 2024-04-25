import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'


const CentreIntro = () => {
    const [centreInfo, setCentreInfo] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/auth/centreintro')
            .then(result => {
                // console.log(result.data)
                if (result.data.Status) {
                    console.log(result.data.Result)
                    setCentreInfo(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/auth/delete_centreinfo/' + id)
            .then(result => {
                if (result.data.Status) {
                    setCentreInfo(centreInfo.filter(e => e.id !== id))
                    window.location.reload()
                    // navigate('/dashboard/manageteachers')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='px-5 mt-5'>
            {centreInfo.map(e => (
                <div className="col-lg-7 p-3 p-lg-5 pt-lg-3" key={e.id}>
                    <h4 className="fw-bold lh-1 text-body-emphasis">{e.title}</h4>
                    <p className="lead">{e.content_one}</p>
                    <p className="lead">{e.content_two}</p>
                    <p className="lead">{e.content_three}</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                        <Link to={`/dashboard/edit_centreinfo/` + e.id} className='btn btn-outline-secondary btn-sm'>Edit</Link>
                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => handleDelete(e.id)}>Delete</button>
                    </div>
                </div>
            )
            )}

            <div className="container pt-5 mb-3">
                <div className="row">
                    <div className="col text-center">
                        <Link to='/dashboard/add_centreinfo' className='btn btn-success'>Add Centre Information</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CentreIntro