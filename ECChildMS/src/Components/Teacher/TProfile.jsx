
const TProfile = () => {
    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="row">
                    <div className="col-lg-4">
                        <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
                        <h5 className="fw-normal">Teacher1</h5>
                        <p><a className="btn btn-secondary" href="#">Edit</a></p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="tab-content profile-tab" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Teacher Id</label>
                                </div>
                                <div className="col-md-6">
                                    <p>2345</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Name</label>
                                </div>
                                <div className="col-md-6">
                                    <p>Teacher 1</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-6">
                                    <p>teacher1@gmail.com</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Phone</label>
                                </div>
                                <div className="col-md-6">
                                    <p>1283847</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Registration NO.</label>
                                </div>
                                <div className="col-md-6">
                                    <p>298746</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Home Address</label>
                                </div>
                                <div className="col-md-6">
                                    <p>1 K Road, Auckland</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TProfile