import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"


const TAccidentDetail = () => {
    const [accidentForm, setAccidentForm] = useState([])

    const { id } = useParams()
    useEffect(() => {
        axios.get('http://localhost:3000/teacher/accident_form/' + id)
            .then(result => {
                setAccidentForm(result.data.Result[0])

            })
            .catch(err => console.log(err))
    }, [id])


    return (
        <div>
            <div className="container mt-4">
                {accidentForm && Object.keys(accidentForm).length > 0 ? (
                    <div className="card">
                        <div className="card-body text-center">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th scope="row">Name:</th>
                                        <td>{accidentForm.child_name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Child ID:</th>
                                        <td>{accidentForm.child}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Accident Date:</th>
                                        <td>{accidentForm.accident_date}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Accident Time:</th>
                                        <td>{accidentForm.accident_time}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Location of Accident:</th>
                                        <td>{accidentForm.location_of_accident}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Description of Accident:</th>
                                        <td>{accidentForm.description_of_accident}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Injury Assessment:</th>
                                        <td>{accidentForm.injury_assessment}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Medical Treatment:</th>
                                        <td>{accidentForm.medical_treatment}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Staff Response:</th>
                                        <td>{accidentForm.staff_response}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Addiontional Notes:</th>
                                        <td>{accidentForm.additional_notes}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Supervisor:</th>
                                        <td>{accidentForm.supervisor_name}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="container pt-2 ">
                                <div className='col-12 pt-3'>
                                    <div className="d-flex justify-content-center">
                                        <Link className='btn btn-success me-2' to={'/teacher_dashboard/edit_accident_form/' + id}>Edit</Link>
                                        <Link to={'/teacher_dashboard/accident_form '} className="btn btn-secondary me-2">Return</Link>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>

    )
}

export default TAccidentDetail