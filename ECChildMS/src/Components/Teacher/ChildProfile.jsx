import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"


const ChildProfile = () => {
    const [child, setChild] = useState([])

    const { id } = useParams()
    useEffect(() => {
        axios.get('http://localhost:3000/teacher/children/' + id)
            .then(result => {
                console.log(result.data)
                setChild(result.data[0])

            })
            .catch(err => console.log(err))
    }, [id])

    // const handleDelete = (id) => {
    //     // Display confirmation dialog
    //     if (window.confirm("ALERT! Are you sure you want to delete this child?")) {
    //         axios.delete('http://localhost:3000/auth/delete_child/' + id)
    //             .then(result => {
    //                 if (result.data.Status) {
    //                     setChild({});
    //                     navigate('/dashboard/managechildren')
    //                 } else {
    //                     alert(result.data.Error)
    //                 }
    //             })
    //             .catch(err => console.log(err))
    //     }
    // }

    return (
        <div>
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
                                <div className='col-12 pt-3'>
                                    <div className="d-flex justify-content-center">
                                        {/* <Link className='btn btn-success me-2' to={'/dashboard/edit_child/' + id}>Edit</Link> */}
                                        <Link to={'/teacher_dashboard/children'} className="btn btn-secondary me-2">Return</Link>
                                        {/* <button type='button' className="btn btn-danger p-2" title='Remove this child' onClick={() => handleDelete(child.id)}>
                                            <i className="bi bi-trash" /> Delete
                                        </button> */}
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

export default ChildProfile