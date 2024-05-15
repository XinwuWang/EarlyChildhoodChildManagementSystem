import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'


const ASleepRecord = () => {
    const [sleepRecord, setSleepRecord] = useState([])



    useEffect(() => {
        axios.get('http://localhost:3000/auth/sleep_record')
            .then(result => {
                if (result.data.Status) {
                    setSleepRecord(result.data.Result)
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
                    <h1 className="display-4 fw-normal">Sleep Record</h1>
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
                            <th scope="col">Date</th>
                            <th scope="col">Child Name</th>
                            <th scope="col">Time to Bed</th>
                            <th scope="col">Time of Sleep</th>
                            <th scope="col">Time of Wake</th>
                            <th scope="col">Time Out of Bed</th>
                            <th scope="col">Note</th>
                            <th scope="col">Supervisor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sleepRecord.map(e => (
                                <tr key={e.id} className="">
                                    <td></td>

                                    <td>{e.sleep_date}</td>
                                    <td>{e.child_name}</td>
                                    <td>{e.time_to_bed}</td>
                                    <td>{e.time_of_sleep}</td>
                                    <td>{e.time_of_wakeup}</td>
                                    <td>{e.time_out_of_bed}</td>
                                    <td>{e.note}</td>
                                    <td>{e.supervisor_name}</td>
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

export default ASleepRecord