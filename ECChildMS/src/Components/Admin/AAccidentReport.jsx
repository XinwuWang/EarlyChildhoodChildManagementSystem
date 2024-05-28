import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'

const AAccidentReport = () => {
    const [accidentForm, setAccidentForm] = useState([])


    useEffect(() => {
        axios.get('http://localhost:3000/auth/accident_form')
            .then(result => {
                if (result.data.Status) {
                    setAccidentForm(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])



    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mt-auto p-3 m-3">
                    <h1 className="display-4 fw-normal">Accident Form</h1>
                    <div>
                        <Link to={'/dashboard/document'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <hr />
            <div className="table-responsive small">
                <table className="table table-striped table-sm m-2">
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Date</th>
                            <th scope="col">Child Name</th>
                            <th scope="col">Supervisor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accidentForm.map(e => (
                                <tr key={e.id} className="">
                                    <td></td>
                                    <td><Link
                                        to={`/dashboard/accident_form/${e.id}`
                                        }
                                    >{e.accident_date}</Link></td>
                                    <td>{e.child_name}</td>
                                    <td>{e.supervisor_name}</td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >

    )
}

export default AAccidentReport