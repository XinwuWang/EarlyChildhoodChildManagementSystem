import { Link } from "react-router-dom"


const Documents = () => {
    const childId = localStorage.getItem('childId');
    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mt-auto m-2">
                    <h1 className="display-4 fw-normal">Documents</h1>
                    <div>
                        <Link to={'/child_dashboard'} className='btn btn-lg p-2' title="Dashboard"><i className="bi bi-speedometer2 text-dark"></i></Link>
                    </div>
                </div>
            </div >
            <hr />
            <div className="album py-5 bg-light">
                <div className="container">

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div className="col">
                            <div className="card shadow-sm">

                                <div className="card-body text-center">
                                    <h4 className="card-text">Meal Chart</h4>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <div className="btn-group">
                                            <Link to={'/child_dashboard/meal_chart'} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow-sm">

                                <div className="card-body text-center">
                                    <h4 className="card-text">Sleep Record</h4>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <div className="btn-group">
                                            <Link to={'/child_dashboard/sleep_record/' + childId} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow-sm">

                                <div className="card-body text-center">
                                    <h4 className="card-text">Formula Feeding Chart</h4>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <div className="btn-group">
                                            <Link to={'/child_dashboard/bottle_chart/' + childId} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card shadow-sm">

                                <div className="card-body text-center">
                                    <h4 className="card-text">Accident Report</h4>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <div className="btn-group">
                                            <Link to={'/child_dashboard/accident_form/' + childId} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow-sm">

                                <div className="card-body text-center">
                                    <h4 className="card-text">Sunblock Chart</h4>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <div className="btn-group">
                                            <Link to={'/child_dashboard/sunblock_chart/' + childId} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow-sm">

                                <div className="card-body text-center">
                                    <h4 className="card-text">Attendance Record</h4>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <div className="btn-group">
                                            <Link to={'/child_dashboard/attendance/' + childId} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow-sm">
                                <div className="card-body text-center">
                                    <h4 className="card-text">Learning Story</h4>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <div className="btn-group">
                                            <Link to={'/child_dashboard/learning_story/' + childId} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Documents