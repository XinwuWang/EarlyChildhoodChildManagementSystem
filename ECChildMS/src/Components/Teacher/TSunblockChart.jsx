import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'


const TSunblockChart = () => {
    const [sunblock, setSunblock] = useState([])


    useEffect(() => {
        axios.get('http://localhost:3000/teacher/sunblock_chart')
            .then(result => {
                if (result.data.Status) {
                    setSunblock(result.data.Result)
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
                    <h1 className="display-4 fw-normal">Sunblock Application Chart</h1>
                    <div>
                        <Link to={'/teacher_dashboard/add_sunblock_chart'} className='btn btn-lg p-2' title="Add a sunblock chart"><i className="bi bi-clipboard2-plus-fill text-dark"></i></Link>
                        <Link to={'/teacher_dashboard/document'} className='btn btn-lg p-2' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
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
                            <th scope="col">Created by</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sunblock.map(e => (
                                <tr key={e.id} className="">
                                    <td></td>
                                    <td><Link
                                        to={`/teacher_dashboard/sunblock_chart_detail/${e.id}`
                                        }
                                    >{e.apply_date}</Link></td>
                                    <td>{e.creator_name}</td>
                                    <td>
                                        <Link to={`/teacher_dashboard/edit_sunblock_chart/${e.id}`} className='btn btn-black p-0 me-3' title='Edit'>
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>

                                    </td>
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

export default TSunblockChart