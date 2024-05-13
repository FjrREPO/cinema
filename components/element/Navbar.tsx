import SearchBox from "@/components/element/SearchBox";
import LanguageFilter from "@/components/filter/LanguageFilter";
import GenreFilter from "@/components/filter/GenreFilter";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoNotificationsCircle } from "react-icons/io5";
import { MdOutlineLocalPlay } from 'react-icons/md';

function Navbar() {

    return (
        <div>
            <div className="absolute inset-0 z-30 h-fit">
                <div className="flex flex-row w-full justify-between py-5 px-7 items-center"
                    style={{
                        backgroundColor: 'rgba(128, 128, 128, 0.2)',
                    }}
                >
                    <div className="flex">
                        <img src="https://res.cloudinary.com/dutlw7bko/image/upload/v1715232136/Cinema/Logo/cinema1_pman5x.png" className="w-[80px] w-fit" alt="" />
                    </div>
                    <SearchBox />
                    <div className="flex flex-row gap-5 items-center">
                        <a href="#"><MdOutlineLocalPlay className="w-[40px] h-[40px] duration-300 hover:text-[#d4b60f]"/></a>
                        <a href="#"><IoNotificationsCircle className="w-[40px] h-[40px] duration-300 hover:text-[#d4b60f]"/></a>
                        <a href="/login"><IoPersonCircleSharp className="w-[40px] h-[40px] duration-300 hover:text-[#d4b60f]"/></a>
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