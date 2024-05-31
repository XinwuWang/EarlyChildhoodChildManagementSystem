import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"


const ChildProfile = () => {
    const [child, setChild] = useState([])

    const { id } = useParams()
    useEffect(() => {
        axios.get('http://localhost:3000/teacher/children/' + id)
            .then(result => {
                setChild(result.data[0])

            })
            .catch(err => console.log(err))
    }, [id])


    return (
        <div>
            <div className="container p-3">
                <div className="d-flex justify-content-between align-items-center mt-auto m-2">
                    <h1 className="display-4 fw-normal">Child Detail</h1>
                    <div>
                        <Link to={'/teacher_dashboard/children'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <hr />
            <div className="container mt-4">
                {child && Object.keys(child).length > 0 ? (
                    <div className="card">
                        <div>
                            <div className="card-header text-center">
                                <img src={'http://localhost:3000/Images/' + child.profile_img} alt={child.name} className="child_image" />
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th scope="row">Name:</th>
                                        <td>{child.name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Child ID:</th>
                                        <td>{child.id}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Email:</th>
                                        <td>{child.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Date of Birth:</th>
                                        <td>{child.date_of_birth}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Father&#39;s Name:</th>
                                        <td>{child.dad_name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Phone:</th>
                                        <td>{child.dad_phone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Mother&#39;s Name:</th>
                                        <td>{child.mum_name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Phone:</th>
                                        <td>{child.mum_phone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Address:</th>
                                        <td>{child.address}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Allergy:</th>
                                        <td>{child.allergy}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Interests & Hobbies:</th>
                                        <td>{child.interests_and_hobbies}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Start Date:</th>
                                        <td>{child.start_date}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Other Notes:</th>
                                        <td>{child.other_notes}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="container pt-2 ">

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

export default ChildProfile