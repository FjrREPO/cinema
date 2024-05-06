function Navbar() {
    return (
        <div className="absolute inset-0 z-50">
            <div className="flex flex-row w-full justify-between p-5">
                <div className="flex">
                    <img src="https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo.png" width="60px" alt="" />
                </div>
                <div className="flex">
                    <ul className="flex flex-row gap-[10px]">
                        <li><a href="/about">About</a></li>
                        <li><a href="/admin">Admin</a></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-row w-full justify-between p-5"></div>
        </div>
    )
}

export default Navbar