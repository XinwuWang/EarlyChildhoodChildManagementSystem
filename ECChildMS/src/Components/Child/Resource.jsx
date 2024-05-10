import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'


const Resource = () => {
    const [resource, setResource] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/child/resource')
            .then(result => {
                // console.log(result.data)
                if (result.data.Status) {
                    console.log(result.data.Result)
                    setResource(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    // const handleDelete = (id) => {
    //     if (window.confirm("ALERT! Are you sure you want to delete this information?")) {
    //         axios.delete('http://localhost:3000/auth/delete_resource/' + id)
    //             .then(result => {
    //                 if (result.data.Status) {
    //                     setResource(resource.filter(e => e.id !== id))
    //                     window.location.reload()
    //                 } else {
    //                     alert(result.data.Error)
    //                 }
    //             })
    //             .catch(err => console.log(err))
    //     }


    // }


    return (
        <div>
            <div className="accordion" id="accordionPanelsStayOpenExample">

                {

                    resource.map(e => (
                        <div className="accordion-item" key={e.id}>
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse-${e.id}`} aria-expanded="false" aria-controls={`panelsStayOpen-collapse-${e.id}`}>
                                    {e.id}. &apos;{e.title}&apos;
                                </button>
                            </h2>
                            <div id={`panelsStayOpen-collapse-${e.id}`} className="accordion-collapse collapse">
                                <div>
                                    <div className="accordion-body m-3">
                                        <p>{e.resource_description}</p>
                                        <p>Source: {e.link}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))

                }
            </div>
        </div>
    )
}

export default Resource