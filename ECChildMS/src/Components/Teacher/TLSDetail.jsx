import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'


const TLSDetail = () => {
    const { id } = useParams()
    console.log(id)
    const [learningStory, setLearningStory] = useState({
        created_month: '',
    });
    const [lsDetail, setlsDetail] = useState([])


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/learning_story/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    console.log(result.data.Result[0])
                    setLearningStory({
                        ...learningStory,
                        created_month: result.data.Result[0].created_month,
                    })
                } else {
                    throw new Error(result.data.Error || 'Information data not found');
                }
            })
            .catch(err => {
                console.log(err);
                alert('Failed to fetch data');
            }).finally(() => {
                setLoading(false)
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/learning_story_detail/${id}`)
            .then(result => {
                if (result.data.Status) {
                    console.log(result.data.Result)
                    setlsDetail(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [id])


    const handleDelete = (id) => {
        if (window.confirm("ALERT! Are you sure you want to delete this record?")) {
            axios.delete(`http://localhost:3000/teacher/delete_learning_story/${id}`)
                .then(result => {
                    if (result.data.Status) {
                        setlsDetail(lsDetail.filter(e => e.id !== id));
                        window.location.reload()
                    } else {
                        alert(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    // Render loading state while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mt-auto p-3 m-3">
                    <div className='p-3'>
                        <h2>Learning Stories - {learningStory.created_month}</h2>
                    </div>
                    <div>
                        <Link to={`/teacher_dashboard/learning_story/${id}/write_a_learning_story`} className='btn btn-lg p-2' title="Write a learning story"><i className="bi bi-plus-circle-fill text-dark"></i></Link>
                        <Link to={'/teacher_dashboard/learning_story'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <div className="p-3">
                <div className="row mb-2">
                    {
                        lsDetail.map(e => (
                            <div className="col-md-6" key={e.id}>
                                {/* <div className="col-md-6"> */}

                                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                    <div className="col p-4 d-flex flex-column position-static">
                                        <h3 className="mb-0">e.title</h3>
                                        <div className="mb-1 text-body-secondary">e.update_date</div>
                                        <p className="card-text mb-auto">e.content.</p>
                                        <Link to={"/teacher_dashboard/child_ls/" + e.id} className="icon-link-dark gap-1 icon-link-hover stretched-link text-dark">
                                            View more »
                                        </Link>
                                        <button type='button' className="btn btn-black p-0" title='Delete' onClick={() => handleDelete(e.id)}>
                                            <i className="bi bi-trash" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {/* <div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Child Name</th>
                            <th scope="col">Time One</th>
                            <th scope="col">Time Two</th>
                            <th scope="col">Time Three</th>
                            <th scope="col">Note</th>
                            <th scope="col">Supervisor</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lsDetail.map(e => (

                                <tr className="" key={e.id}>
                                    <td>{e.child_name}</td>
                                    <td>{e.time_one}</td>
                                    <td>{e.time_two}</td>
                                    <td>{e.time_three}</td>
                                    <td>{e.note}</td>
                                    <td>{e.supervisor_name}</td>
                                    <td>
                                        <Link to={`/teacher_dashboard/edit_ls_detail/${e.id}`} className='btn btn-black p-0 me-3' title='Edit'>
                                            <i className="bi bi-pen-fill"></i>
                                        </Link>
                                        <button type='button' className="btn btn-black p-0" title='Delete' onClick={() => handleDelete(e.id)}>
                                            <i className="bi bi-trash" />
                                        </button>
                                    </td>
                                </tr>

                            ))}
                    </tbody>
                </table>
            </div> */}
        </div>
    );
}

export default TLSDetail