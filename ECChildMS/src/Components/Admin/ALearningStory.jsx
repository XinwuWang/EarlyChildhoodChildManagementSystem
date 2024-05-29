import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'



const ALearningStory = () => {
    const [learningStory, setLearningStory] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/auth/learning_story')
            .then(result => {
                if (result.data.Status) {
                    setLearningStory(result.data.Result)
                    console.log(result.data.Result)
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
                    <h1 className="display-4 fw-normal">Learning Story</h1>
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
                            <th scope="col">Month</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            learningStory.map(e => (
                                <tr key={e.id} className="">
                                    <td></td>
                                    <td>{e.created_month}</td>
                                    <td><Link
                                        to={`/dashboard/learning_story_detail/${e.id}`
                                        } className="btn p-0 me-3"
                                    ><small>View more »</small></Link></td>
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

export default ALearningStory