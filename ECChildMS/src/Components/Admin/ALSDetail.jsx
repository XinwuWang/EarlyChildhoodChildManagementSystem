import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'


const ALSDetail = () => {
    const { id } = useParams()
    console.log(id)
    const [learningStory, setLearningStory] = useState({
        created_month: '',
    });
    const [lsDetail, setlsDetail] = useState([])


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/learning_story/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
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
        axios.get(`http://localhost:3000/auth/learning_story_detail/${id}`)
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
                        <Link to={'/dashboard/learning_story'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <div className="p-3">
                <div className="row mb-2">
                    {
                        lsDetail.map(e => (
                            <div className="col-md-6" key={e.id}>
                                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative p-2">
                                    <div className="col p-4 d-flex flex-column position-static">
                                        <strong className="d-inline-block mb-2 text-primary-emphasis">For {e.child_name}</strong>
                                        <h3 className="mb-3">{e.title}</h3>
                                        <div className="mb-3 text-body-secondary">{e.update_date}</div>
                                        <p className="card-text mb-4">Created by {e.creator_name}</p>
                                        <Link to={"/dashboard/child_ls/" + e.id} className="icon-link-dark gap-1 icon-link-hover stretched-link text-dark">
                                            <small>View more »</small>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

        </div>
    );
}

export default ALSDetail