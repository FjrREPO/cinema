function Navbar() {
    return (
        <div>
            <div className="flex flex-row w-full justify-between p-5">
                <div className="flex">
                    <img src="https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo.png" width="60px" alt="" />
                </div>
                <div className="flex justify-end">
                    <ul>
                        <li>Movies</li>
                        <li><a href="/admin">Admin</a></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-row w-full justify-between p-5"></div>
        </div>
    )
}

export default Navbar