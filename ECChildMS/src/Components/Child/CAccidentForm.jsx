import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'


const CAccidentForm = () => {
    const [accidentForm, setAccidentForm] = useState([])
    const { childId } = useParams()
    const childName = localStorage.getItem('childName');


    useEffect(() => {
        axios.get('http://localhost:3000/child/accident_form/' + childId)
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
                    <h5 className="display-4 fw-normal">Accident Form for {childName}</h5>
                    <div>
                        <Link to={'/child_dashboard/documents'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
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
                            <th scope="col">Supervisor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accidentForm.map(e => (
                                <tr key={e.id} className="">
                                    <td></td>
                                    <td><Link
                                        to={`/child_dashboard/accident_detail/${e.id}`
                                        }
                                    >{e.accident_date}</Link></td>
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

export default CAccidentForm