import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const TEditFormulaChart = () => {
    const { id } = useParams()
    const [formulaChart, setFormulaChart] = useState({
        feeding_date: '',
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/formula_chart/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setFormulaChart({
                        ...formulaChart,
                        feeding_date: result.data.Result[0].feeding_date,
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

    const handleSubmit = (e) => {
        e.preventDefault()


        const Data = {
            feeding_date: formulaChart.feeding_date
        }

        axios.put(`http://localhost:3000/teacher/edit_formula_chart/${id}`, Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/formula_chart')
                    setTimeout(() => {
                        alert('Formula chart chart updated successfully');
                    }, 300);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }



    // Render loading state while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Edit Formula Chart</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='feeding_date' className='form-label'>Date</label>
                        <input
                            type='date'
                            name='feeding_date'
                            id='feeding_date'
                            className='form-control rounded-0'
                            value={formulaChart.feeding_date}
                            onChange={(e) => setFormulaChart({ ...formulaChart, feeding_date: e.target.value })}
                            required />
                    </div>

                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/formula_chart'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default TEditFormulaChart