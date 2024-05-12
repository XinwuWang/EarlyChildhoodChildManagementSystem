import { Link } from "react-router-dom"


const Documents = () => {
    const childId = localStorage.getItem('childId');
    return (
        <div className="album py-5 bg-light">
            <div className="container">

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div className="col">
                        <div className="card shadow-sm">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

                            <div className="card-body text-center">
                                <h4 className="card-text">Meal Chart</h4>
                                <div className="d-flex justify-content-end align-items-center">
                                    <div className="btn-group">
                                        <Link to={'/child_dashboard/meal_chart/' + childId} className="btn btn-sm btn-link btn-outline-light text-dark">View »</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card shadow-sm">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

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
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

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
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

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
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

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
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

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
                </div>
            </div>
        </div>
    )
}

export default Documents