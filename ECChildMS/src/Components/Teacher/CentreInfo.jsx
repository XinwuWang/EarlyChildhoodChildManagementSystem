import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'



const CentreInfo = () => {
    const [centreInfo, setCentreInfo] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/teacher/centre_information')
            .then(result => {
                if (result.data.Status) {
                    setCentreInfo(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div className='container'>
            <div className="container p-2">
                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <h1 className="display-4 fw-normal"></h1>
                    <div>
                        <Link to={'/teacher_dashboard'} className='btn btn-lg p-2' title="Dashboard"><i className="bi bi-speedometer2 text-dark"></i></Link>
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
                    </div>
                )
                )}

                <div className="container pt-2">

                </div>
            </div>
        </div>
    )
}

export default CentreInfo