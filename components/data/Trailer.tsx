'use client'

import { useState, useEffect } from 'react';

interface TrailerData {
    key: string;
}

interface TrailerProps {
    movieId: string;
}

const Trailer = ({ movieId }: TrailerProps) => {
    const [trailerData, setTrailerData] = useState<TrailerData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API}`
                );
                const data = await res.json();
                if (data.results.length > 0) {
                    setTrailerData(data.results[0]);
                } else {
                    setError('No trailer found for this movie.');
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
                setError(errorMessage);
            }
        };
        fetchTrailer();
    }, [movieId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!trailerData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="trailer">
            <a href={`https://www.youtube.com/embed/${trailerData.key}`} target='_blank'>
                <button className='movie__btnTrailer mt-10 px-20 py-5 bg-[#13a4e8] rounded-[20px] font-bold'>Watch Trailer</button>
            </a>
        </div>
    );
};

export default Trailer;