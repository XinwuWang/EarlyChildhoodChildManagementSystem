import { Link } from "react-router-dom"

const TMealChart = () => {
    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mt-auto p-3 m-3">
                    <h1 className="display-4 fw-normal">Meal Chart</h1>
                    <Link to={'/techer_dashboard/add_meal'} className='btn btn-lg' title="Add a meal chart"><i className="bi bi-clipboard2-plus-fill text-dark"></i></Link>
                    <Link to={'/teacher_dashboard/document'} className='btn btn-lg' title="Return"><i className="bi bi-arrow-left-circle text-dark"></i></Link>
                </div>
            </div >
            <hr />
            <div className="table-responsive small">
                <table className="table table-striped table-sm m-2">
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Date</th>
                            <th scope="col">Morning Tea</th>
                            <th scope="col">Lunch</th>
                            <th scope="col">Afternoon Tea</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>3/4/2024</td>
                            <td>Weetbix, Milk, Apple</td>
                            <td>Pasta</td>
                            <td>Muffins</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>placeholder</td>
                            <td>irrelevant</td>
                            <td>visual</td>
                            <td>layout</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>data</td>
                            <td>rich</td>
                            <td>dashboard</td>
                            <td>tabular</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>information</td>
                            <td>placeholder</td>
                            <td>illustrative</td>
                            <td>data</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default TMealChart