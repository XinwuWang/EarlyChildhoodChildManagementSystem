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
        if (window.confirm("ALERT! Are you sure you want to delete this information?")) {
            axios.delete('http://localhost:3000/auth/delete_centreinfo/' + id)
                .then(result => {
                    if (result.data.Status) {
                        setCentreInfo(centreInfo.filter(e => e.id !== id))
                        window.location.reload()
                    } else {
                        alert(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }


    return (
        <div className='container'>
            <div className="container p-2">
                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <h1 className="display-4 fw-normal"></h1>
                    <div>
                        <Link to={'/dashboard/add_centreinfo'} className='btn btn-lg p-2' title='Add information'><i className="bi bi-plus-square"></i></Link>
                        <Link to={'/dashboard'} className='btn btn-lg p-2' title="Dashboard"><i className="bi bi-speedometer2 text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <div className='px-5 mt-5'>
                {centreInfo.map(e => (
                    <div className="col-lg-7 p-3 p-lg-5 pt-lg-3" key={e.id}>
                        <h4 className="fw-bold lh-1 text-body-emphasis">{e.title}</h4>
                        <p className="lead">{e.content_one}</p>
                        <p className="lead">{e.content_two}</p>
                        <p className="lead">{e.content_three}</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                            <Link to={`/dashboard/edit_centreinfo/` + e.id} className='btn btn-black p-0 me-3'><i className="bi bi-pencil-square" title='Edit'></i></Link>
                            <button type="button" className='btn btn-black p-0 me-3' title='Delete' onClick={() => handleDelete(e.id)}> <i className="bi bi-trash" /></button>
                        </div>
                    </div>
                )
                )}

                <div className="container pt-2">

                </div>
            </div>
        </div>
    )
}

export default CentreIntro