'use client'

import { useState, useEffect } from 'react';

interface Genre {
    id: number;
    name: string;
}

const GenreFilter = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [genres, setGenres] = useState<Genre[]>([]);

    const fetchGenres = async () => {
        try {
            const url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
            const headers = {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            };

            const response = await fetch(url, { headers });
            const data = await response.json();
            const mappedGenres = data.genres.map((genre: any) => ({
                id: genre.id,
                name: genre.name,
            }));
            setGenres(mappedGenres.sort((a: any, b: any) => a.name.localeCompare(b.name)));
        } catch (error) {
            setError('Failed to fetch genres. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchGenres();
    }, []);

    if (error) {
        return <ErrorComponent message={error} />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <select
            onChange={(event) => {
                const selectedGenre = event.target.value;
                window.location.href = `/filter/genre/${selectedGenre}`;
            }}
            style={{
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(128, 128, 128, 0.4)',
                padding: '10px',
            }}
        >
            <option value="">Select Genre</option>
            {genres.map((genre: any, index) => (
                <option key={index} value={genre.id}>
                    {genre.name}
                </option>
            ))}
        </select>
    );
};

const ErrorComponent = ({ message }: { message: string }) => {
    return <div style={{ color: 'ed' }}>{message}</div>;
};

export default GenreFilter;