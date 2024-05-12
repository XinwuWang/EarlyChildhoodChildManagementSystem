import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'


const CBottleChart = () => {
    const { id } = useParams()
    const [bottleChart, setBottleChart] = useState([])
    const childName = localStorage.getItem('childName');


    useEffect(() => {
        axios.get('http://localhost:3000/child/bottle_chart/' + id)
            .then(result => {
                if (result.data.Status) {
                    setBottleChart(result.data.Result)
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
                    <h6 className="display-4 fw-normal">Formula Feeding Chart for {childName}</h6>
                    <div>
                        <Link to={'/child_dashboard/documents'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
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
                            <th scope="col">Time One</th>
                            <th scope="col">Time Two</th>
                            <th scope="col">Time Three</th>
                            <th scope="col">Note</th>
                            <th scope="col">Supervisor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bottleChart.map(e => (
                                <tr key={e.id} className="">
                                    <td></td>
                                    <td>{e.bottle_date}</td>
                                    <td>{e.time_one}</td>
                                    <td>{e.time_two}</td>
                                    <td>{e.time_three}</td>
                                    <td>{e.note}</td>
                                    <td>{e.teacher_name}</td>

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

export default CBottleChart