import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'


const CLearningStory = () => {
    const [learningStory, setLearningStory] = useState([])
    const { id } = useParams()
    const childName = localStorage.getItem('childName');


    useEffect(() => {
        axios.get('http://localhost:3000/child/learning_story/' + id)
            .then(result => {
                if (result.data.Status) {
                    setLearningStory(result.data.Result)
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
                    <h5 className="display-4 fw-normal">Learning Stories for {childName}</h5>
                    <div>
                        <Link to={'/child_dashboard/documents'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <hr />
            <div className="p-3">
                <div className="row mb-2">
                    {
                        learningStory.map(e => (
                            <div className="col-md-6" key={e.id}>

                                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative p-2">
                                    <div className="col p-4 d-flex flex-column position-static">
                                        <h3 className="mb-3">{e.title}</h3>
                                        <div className="mb-3 text-body-secondary">{e.update_date}</div>
                                        <p className="card-text mb-4">Created by {e.creator_name}</p>
                                        <Link to={"/child_dashboard/ls_detail/" + e.id} className="icon-link-dark gap-1 icon-link-hover stretched-link text-dark">
                                            <small>View more »</small>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div >

    )
}

export default CLearningStory