'use client'

import { Swiper, SwiperSlide } from 'swiper/react';

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

const PopularMovies = () => {
    const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;
    const MAX_POPULAR_MOVIES = 20;

    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [error, setError] = useState(false);

    const fetchPopularMovies = async () => {
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
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
        <div>
            <h1 className="mt-[50px] mb-[10px] text-[50px]">POPULAR</h1>
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
                    <SwiperSlide key={index} className="px-2">
                        <a href={`/movie/${result.id}`}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                                className="w-full rounded"
                                style={{ maxWidth: 240 }}
                            />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PopularMovies;