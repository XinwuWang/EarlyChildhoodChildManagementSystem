import { Link, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'


const TChildLS = () => {
    const { id } = useParams();
    const [learningStory, setLearningStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/child_ls/${id}`)
            .then(result => {
                if (result.data.Status) {
                    setLearningStory(result.data.Result[0]);
                } else {
                    setError(result.data.Error);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError('Failed to fetch data');
                setLoading(false);
            });
    }, [id]);

    const handleDelete = (id) => {
        if (window.confirm("ALERT! Are you sure you want to delete this record?")) {
            axios.delete(`http://localhost:3000/teacher/delete_learning_story/${id}`)
                .then(result => {
                    if (result.data.Status) {
                        navigate('/teacher_dashboard/learning_story_detail/' + learningStory.created_month);
                    } else {
                        alert(result.data.Error);
                    }
                })
                .catch(err => console.log(err));
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!learningStory) return <div>No learning story found</div>;

    return (
        <div className='m-3 p-3'>
            <div className="col-md-12">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                            <h2>For {learningStory.child_name} </h2>
                        </div>
                        <div>
                            <Link to={`/teacher_dashboard/edit_ls_detail/${id}`} className='btn btn-lg p-2' title="Edit">
                                <i className="bi bi-pen-fill text-dark"></i>
                            </Link>
                            <button type='button' className="btn-lg btn p-2" title='Delete' onClick={() => handleDelete(id)}>
                                <i className="bi bi-trash3-fill" />
                            </button>
                            <Link to={`/teacher_dashboard/learning_story_detail/${learningStory.created_month}`} className='btn btn-lg p-2' title="Return">
                                <i className="bi bi-arrow-left-circle text-dark"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <hr />
                <article className="blog-post">
                    <h3 className="display-5 link-body-emphasis mb-1">{learningStory.title}</h3>
                    <p className="blog-post-meta mt-3 fw-light"><small>{learningStory.update_date} by {learningStory.creator_name}</small></p>
                    <div className='mt-4'>
                        <p className="fs-4">{learningStory.content}</p>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default TChildLS