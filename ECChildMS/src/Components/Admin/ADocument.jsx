import { Link } from "react-router-dom"

const ADocument = () => {
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
                                        <Link to='/dashboard/meal_chart' className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
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
                                        <Link to={'/dashboard/sleep_record'} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
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
                                        <Link to={'/dashboard/formula_chart'} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
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
                                        <Link to={'/dashboard/accident_form'} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
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
                                        <Link to={'/dashboard/sunblock_chart'} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
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
                                        <Link to={'/dashboard/attendance'} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
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
                                        <Link to={'/dashboard/learning_story'} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
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

export default ADocument