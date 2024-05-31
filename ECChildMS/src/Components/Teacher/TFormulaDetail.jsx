import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const TFormulaDetail = () => {
    const { id } = useParams()
    console.log(id)
    const [formulaChart, setFormulaChart] = useState({
        feeding_date: '',
    });
    const [formulaDetail, setFormulaDetail] = useState([])


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/formula_chart/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setFormulaChart({
                        ...formulaChart,
                        feeding_date: result.data.Result[0].feeding_date,
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
        axios.get(`http://localhost:3000/teacher/formula_detail/${id}`)
            .then(result => {
                if (result.data.Status) {
                    setFormulaDetail(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [id])


    const handleDelete = (id) => {
        if (window.confirm("ALERT! Are you sure you want to delete this record?")) {
            axios.delete(`http://localhost:3000/teacher/delete_formula_record/${id}`)
                .then(result => {
                    if (result.data.Status) {
                        setFormulaDetail(formulaDetail.filter(e => e.id !== id));
                        window.location.reload()
                    } else {
                        alert(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mt-auto p-3 m-3">
                    <div className='p-3'>
                        <h2>Formula Feeding Chart - {formulaChart.feeding_date}</h2>
                    </div>
                    <div>
                        <Link to={`/teacher_dashboard/formula_chart/${id}/feed_a_child`} className='btn btn-lg p-2' title="Add a child to the chart"><i className="bi bi-person-fill-add text-dark"></i></Link>
                        <Link to={'/teacher_dashboard/formula_chart'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <div>
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
                            formulaDetail.map(e => (

                                <tr className="" key={e.id}>
                                    <td>{e.child_name}</td>
                                    <td>{e.time_one}</td>
                                    <td>{e.time_two}</td>
                                    <td>{e.time_three}</td>
                                    <td>{e.note}</td>
                                    <td>{e.supervisor_name}</td>
                                    <td>
                                        <Link to={`/teacher_dashboard/edit_formula_detail/${e.id}`} className='btn btn-black p-0 me-3' title='Edit'>
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
            </div>
        </div>
    );
}

export default TFormulaDetail