'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { MdOutlineLocalFireDepartment, MdOutlineLocalPlay } from "react-icons/md";

import 'swiper/css'; import 'swiper/css/effect-coverflow'; import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';

interface Movie {
    backdrop_path: any;
    poster_path?: string;
    title: string;
    overview: string;
    id: number;
}

const TopMovies = () => {
    const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;
    const MAX_POPULAR_MOVIES = 20;

    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [error, setError] = useState(false);

    const fetchPopularMovies = async () => {
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${TMDB_TOKEN}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const data: { results: Movie[] } = await res.json();
            return data.results.slice(0, MAX_POPULAR_MOVIES);
        } catch (error) {
            setError(true);
            console.error(error);
            return [];
        }
    };

    useEffect(() => {
        fetchPopularMovies().then((movies) => setPopularMovies(movies));
    }, []);

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div className='ml-5 mr-5'>
            <h1 className="mt-[50px] mb-[10px] text-[30px] font-bold">TOP MOVIES</h1>
            <Swiper
                slidesPerView="auto"
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Navigation]}
                navigation={true}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 25,
                    },
                }}
            >
                {popularMovies.map((result, index) => (
                    <SwiperSlide key={index} className="px-2 relative">
                        <a href={`/movie/${result.id}`} className="block relative">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                                className="w-full rounded"
                                alt={`Poster for ${result.title}`}
                            />
                            <div className='absolute top-0 left-0 bg-black p-3 rounded-br-[20px] hover:bg-[#d4b60f] hover:text-[#fff] duration-300'>
                                <MdOutlineLocalPlay className='w-10 h-10 text-[#d4b60f] cursor-pointer hover:text-[#fff] duration-300' />
                            </div>
                            <div className='absolute top-0 right-0 bg-black p-3 rounded-bl-[20px]'>
                                <MdOutlineLocalFireDepartment className='w-10 h-10 text-[#f20a25]' />
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopMovies;