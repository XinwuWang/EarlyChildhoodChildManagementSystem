import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'


const CentreInfo = () => {
    const [centreInfo, setCentreInfo] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/teacher/centre_information')
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


    return (
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

            <div className="container pt-5 mb-3">
                <div className="row">
                    <div className="col text-center">
                        <Link to='/teacher_dashboard' className='btn btn-success'>Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CentreInfo