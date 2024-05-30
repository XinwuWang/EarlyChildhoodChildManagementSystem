import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Resource = () => {
    const [resource, setResource] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/child/resource')
            .then(result => {
                if (result.data.Status) {
                    console.log(result.data.Result)
                    setResource(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className="accordion" id="accordionPanelsStayOpenExample">

                {

                    resource.map((e, index) => (
                        <div className="accordion-item" key={e.id}>
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse-${e.id}`} aria-expanded="false" aria-controls={`panelsStayOpen-collapse-${e.id}`}>
                                    <strong>{index + 1}. &apos;{e.title}&apos;</strong>
                                </button>
                            </h2>
                            <div id={`panelsStayOpen-collapse-${e.id}`} className="accordion-collapse collapse">
                                <div>
                                    <div className="accordion-body m-3">
                                        <p>{e.resource_description}</p>
                                        <p><small>*Source: {e.link}</small></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))

                }
            </div>
            <div className="container pt-5 mb-3">
                <div className="row">
                    <div className="col text-center">
                        <Link to='/child_dashboard' className='btn btn-success'>Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resource