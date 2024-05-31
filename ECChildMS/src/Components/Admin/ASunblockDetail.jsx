import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const ASunblockDetail = () => {
    const { id } = useParams()
    const [sunblock, setSunblock] = useState({
        apply_date: '',
    });
    const [sunblockDetail, setSunblockDetail] = useState([])


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/sunblock_chart/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setSunblock({
                        ...sunblock,
                        apply_date: result.data.Result[0].apply_date,
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
        axios.get(`http://localhost:3000/auth/sunblock_chart_detail/${id}`)
            .then(result => {
                if (result.data.Status) {
                    setSunblockDetail(result.data.Result)
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
                        <h2>Sunblock Application Chart - {sunblock.apply_date}</h2>
                    </div>
                    <div>
                        <Link to={'/dashboard/sunblock_chart'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sunblockDetail.map(e => (

                                <tr className="" key={e.id}>
                                    <td>{e.child_name}</td>
                                    <td>{e.apply_time_one}</td>
                                    <td>{e.apply_time_two}</td>
                                    <td>{e.apply_time_three}</td>
                                    <td>{e.note}</td>
                                    <td>{e.supervisor_name}</td>
                                </tr>

                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ASunblockDetail