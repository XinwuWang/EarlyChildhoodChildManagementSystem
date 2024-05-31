import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const TEditSunblockChart = () => {
    const { id } = useParams()
    const [sunblock, setSunblock] = useState({
        apply_date: '',
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/sunblock_chart/${id}`)
            .then(result => {
                if (result.data.Status && result.data.Result.length > 0) {
                    setSunblock({
                        ...sunblock,
                        apply_date: result.data.Result[0].apply_date,
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
            apply_date: sunblock.apply_date
        }

        axios.put(`http://localhost:3000/teacher/edit_sunblock_chart/${id}`, Data)
            .then(result => {
                if (result.data.Status) {
                    navigate('/teacher_dashboard/sunblock_chart')
                    setTimeout(() => {
                        alert('Sunblock chart updated successfully');
                    }, 300);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }



    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Edit Sunblock Chart</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='sunblock_date' className='form-label'>Date</label>
                        <input
                            type='date'
                            name='sunblock_date'
                            id='sunblock_date'
                            placeholder='Choose a date'
                            className='form-control rounded-0'
                            value={sunblock.apply_date}
                            onChange={(e) => setSunblock({ ...sunblock, apply_date: e.target.value })}
                            required />
                    </div>

                    <div className='col-12 mt-4 p-2'>
                        <button className='btn btn-success w-100 mb-2' type='submit'>Save</button>
                        <Link to={'/teacher_dashboard/sunblock_chart'} className="btn btn-light w-100">Cancel</Link>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default TEditSunblockChart