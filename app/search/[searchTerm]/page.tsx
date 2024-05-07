'use client';

import { useState, useEffect } from 'react';

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
                console.log(`QUERY = ${searchTerm} && ${apiUrl}`)
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
            {movies.map((movie) => (
                <div key={movie.id}>
                    <h1>{movie.title}</h1>
                    {/* <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> */}
                </div>
            ))}
        </div>
    );
};

export default SearchPage;