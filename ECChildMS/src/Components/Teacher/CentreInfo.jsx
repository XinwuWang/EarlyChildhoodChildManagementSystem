
const CentreInfo = () => {
    return (
        <div>
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            1. Centre philosophy
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                        <div className="accordion-body">
                            <p>Our centre is a home away home. We aim to provide quality education for children aged from 6 months to 5 years.</p>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            2. Our spaces
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <p>Our indoor environments are built purposely to support the learning and development of different age groups and each room is equipped with high-quality, age-focused resources designed to spark curious minds. Our internal environments are connected to a challenging outdoor area, to encourage physical outdoor learning for your child.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CentreInfo