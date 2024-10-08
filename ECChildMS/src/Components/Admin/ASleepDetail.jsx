import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const ASleepDetail = () => {
    const { id } = useParams()
    console.log(id)
    const [sleepChart, setSleepChart] = useState({
        sleep_date: '',
    });
    const [sleepDetail, setSleepDetail] = useState([])


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/sleep_record/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setSleepChart({
                        ...sleepChart,
                        sleep_date: result.data.Result[0].sleep_date,
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
        axios.get(`http://localhost:3000/auth/sleep_detail/${id}`)
            .then(result => {
                if (result.data.Status) {
                    setSleepDetail(result.data.Result)
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
                        <h2>Sleep Record - {sleepChart.sleep_date}</h2>
                    </div>
                    <div>
                        <Link to={'/dashboard/sleep_record'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Child Name</th>
                            <th scope="col">Time to Bed</th>
                            <th scope="col">Time of Sleep</th>
                            <th scope="col">Time of Wakeup</th>
                            <th scope="col">Time Out of Bed</th>
                            <th scope="col">Note</th>
                            <th scope="col">Supervisor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sleepDetail.map(e => (

                                <tr className="" key={e.id}>
                                    <td>{e.child_name}</td>
                                    <td>{e.time_to_bed}</td>
                                    <td>{e.time_of_sleep}</td>
                                    <td>{e.time_of_wakeup}</td>
                                    <td>{e.time_out_of_bed}</td>
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

export default ASleepDetail