
const Note = () => {
    return (
        <div>
            <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
                <div className="list-group">
                    <label className="list-group-item d-flex gap-3">
                        <input className="form-check-input flex-shrink-0" type="checkbox" value="" checked={true} style={{ fontSize: '1.375em' }} />
                        <span className="pt-1 form-checked-content">
                            <strong>Child A needs medicine at 12pm</strong>
                            <small className="d-block text-body-secondary">
                                <svg className="bi me-1" width="1em" height="1em"><use xlinkHref="#calendar-event"></use></svg>
                                11:30am–12:30pm
                            </small>
                        </span>
                    </label>
                    <label className="list-group-item d-flex gap-3">
                        <input className="form-check-input flex-shrink-0" type="checkbox" value="" checked={true} style={{ fontSize: '1.375em' }} />
                        <span className="pt-1 form-checked-content">
                            <strong>Finish sales report</strong>
                            <small className="d-block text-body-secondary">
                                <svg className="bi me-1" width="1em" height="1em"><use xlinkHref="#calendar-event"></use></svg>
                                1:00–2:00pm
                            </small>
                        </span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Note