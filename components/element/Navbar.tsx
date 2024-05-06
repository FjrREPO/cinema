import { FaSearch } from "react-icons/fa";

function Navbar() {
    return (
        <div className="absolute inset-0 z-30">
            <div className="flex flex-row w-full justify-between p-5"
                style={{
                    backgroundColor: 'rgba(128, 128, 128, 0.2)',
                }}
            >
                <div className="flex">
                    <img src="https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo.png" width="60px" alt="" />
                </div>
                <div className="box">
                    <form name="search">
                        <input type="text" className="navbar__input" name="txt" />
                    </form>
                    <FaSearch className="navbar__search" />
                </div>
            </div>
            <div className="flex flex-row w-full justify-between px-5"
                style={{
                    backgroundColor: 'rgba(128, 128, 128, 0.2)',
                }}
            >
                <div>
                    <ul className="flex flex-row items-center">
                        <li className="navbar__li">Popular</li>
                        <li className="navbar__li">Top Rated</li>
                    </ul>
                </div>
                <div className="flex">
                    <ul className="flex flex-row items-center">
                        <li className="navbar__li"><a href="/about">About</a></li>
                        <li className="navbar__li"><a href="/admin">Admin</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar