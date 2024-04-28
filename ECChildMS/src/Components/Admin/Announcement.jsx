


const Announcement = () => {
    return (
        <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
            <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <img src="https://www.clipartmax.com/png/middle/416-4164629_latest-announcement-latest-news-icon-latest-news-icon-png.png" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 className="mb-0">Dress up day tomorrow!</h6>
                            <p className="mb-0 opacity-75">Please dress your children in green to celebrate St Patrick&apos;s Day tomorrow.</p>
                        </div>
                        <small className="opacity-50 text-nowrap">now</small>
                    </div>
                </a>
                <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <img src="https://www.clipartmax.com/png/middle/416-4164629_latest-announcement-latest-news-icon-latest-news-icon-png.png" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 className="mb-0">Donation</h6>
                            <p className="mb-0 opacity-75">Donate a golden coin for our community!</p>
                        </div>
                        <small className="opacity-50 text-nowrap">3d</small>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Announcement