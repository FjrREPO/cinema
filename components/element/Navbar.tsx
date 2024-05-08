import SearchBox from "@/components/element/SearchBox";
import LanguageFilter from "@/components/filter/LanguageFilter";
import GenreFilter from "@/components/filter/GenreFilter";

function Navbar() {

    return (
        <div>
            <div className="absolute inset-0 z-30 h-fit">
                <div className="flex flex-row w-full justify-between p-5 items-center"
                    style={{
                        backgroundColor: 'rgba(128, 128, 128, 0.2)',
                    }}
                >
                    <div className="flex">
                        <img src="https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo.png" width="60px" alt="" />
                    </div>
                    <SearchBox />
                    <div>
                        <a href="/login">Login</a>
                    </div>
                </div>
                <div className="flex flex-row w-full justify-between px-5"
                    style={{
                        backgroundColor: 'rgba(128, 128, 128, 0.2)',
                    }}
                >
                    <div>
                        <ul className="flex flex-row items-center">
                            <li className="navbar__li">
                                <LanguageFilter/>
                            </li>
                            <li className="navbar__li">
                                <GenreFilter/>
                            </li>
                        </ul>
                    </div>
                    <div className="flex">
                        <ul className="flex flex-row items-center">
                            <li
                                className="navbar__li"
                                style={{
                                    backdropFilter: 'blur(8px)',
                                    backgroundColor: 'rgba(128, 128, 128, 0.4)',
                                    padding: '10px',
                                }}

                            ><a href="/about">About</a></li>
                            <li
                                className="navbar__li"><a href="/admin"
                                    style={{
                                        backdropFilter: 'blur(8px)',
                                        backgroundColor: 'rgba(128, 128, 128, 0.4)',
                                        padding: '10px',
                                    }}
                                >Admin</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar