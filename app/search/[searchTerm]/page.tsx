'use client';

import SearchCard from '@/components/page/search/SearchCard';
import { useState, useEffect } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API

interface Movie {
    backdrop_path: any;
    poster_path?: string;
    title: string;
    overview: string;
    id: number;
}

interface SearchPageProps {
    params: {
        searchTerm: string;
    };
}

const SearchPage = ({ params }: SearchPageProps) => {
    const [searchTerm, setSearchTerm] = useState(params.searchTerm);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${params.searchTerm}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                setMovies(data.results);
                console.log(`QUERY = ${apiUrl} && ${apiUrl}`)
            } catch (error) {
                setError('Failed to fetch movies. Please try again later.');
            }
        };
        fetchMovies();
    }, [searchTerm]);

    if (error) {
        return <h1 className="text-center pt-6">{error}</h1>;
    }

    if (!movies || movies.length === 0) {
        return <h1 className="text-center pt-6">No results found</h1>;
    }

    return (
        <div>
            <button className='absolute top-[5%] left-[2%]'>
                <a href="/"><IoMdArrowRoundBack className='w-[50px] h-[50px]' /></a>
            </button>
            <div className="flex text-xl justify-center mt-10 mb-10">Search Result for : "{params.searchTerm}"</div>
            <div className='flex flex-col justify-center items-center gap-10'>
                {movies.map((movie) => (
                    <div key={movie.id}>
                        <SearchCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;