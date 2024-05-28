import { Link } from "react-router-dom"


const TDocument = () => {
    return (
        <div className="album py-5 bg-light">
            <div className="container">

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div className="col">
                        <div className="card shadow-sm">

                            <div className="card-body text-center">
                                <h4 className="card-text">Meal Chart</h4>
                                <div className="d-flex justify-content-end align-items-center">
                                    <div className="btn-group">
                                        <Link to='/teacher_dashboard/meal_chart' className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
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
                                        <Link to={'/teacher_dashboard/sleep_record'} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
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
                                        <Link to={'/teacher_dashboard/formula_chart'} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
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
                                        <Link to={'/teacher_dashboard/accident_form'} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
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
                                        <Link to={'/teacher_dashboard/sunblock_chart'} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
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
                                        <Link to={'/teacher_dashboard/attendance'} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card shadow-sm">

                            <div className="card-body text-center">
                                <h4 className="card-text">Learning Stories</h4>
                                <div className="d-flex justify-content-end align-items-center">
                                    <div className="btn-group">
                                        <Link to={'/teacher_dashboard/learning_story'} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container pt-5 mb-3">
                <div className="row">
                    <div className="col text-center">
                        <Link to='/teacher_dashboard' className='btn btn-success'>Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TDocument