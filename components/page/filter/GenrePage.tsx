"use client"

import { useState, useEffect } from "react";
import SearchCard from "../search/SearchCard";
import { IoMdArrowRoundBack } from "react-icons/io";
import GenresData from "@/components/data/GenresData";

interface LanguageFilterProps {
    onSelectGenre: any;
}

interface Movie {
    backdrop_path: any;
    poster_path?: string;
    title: string;
    overview: string;
    id: number;
}

const GenrePage: React.FC<LanguageFilterProps> = ({ onSelectGenre }) => {
    const [searchTerm, setSearchTerm] = useState(onSelectGenre);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [genres] = useState(GenresData);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API}&sort_by=popularity.desc&page=1&with_genres=${onSelectGenre}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                setError("Failed to fetch movies. Please try again later.");
            }
        };
        fetchMovies();
    }, [searchTerm]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const foundGenre = genres.find(genre => genre.id == onSelectGenre);

    return (
        <>
        <button className="absolute top-[5%] left-[2%]">
            <a href="/"><IoMdArrowRoundBack className="w-[50px] h-[50px]" /></a>
        </button>
        <div className="flex text-xl justify-center mt-10 mb-10">Genre Result for : {foundGenre?.name}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10 mx-[5vw]">
                {movies.map((movie) => (
                    <div key={movie.id}>
                        <SearchCard movie={movie} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default GenrePage