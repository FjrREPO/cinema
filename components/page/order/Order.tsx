'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Movie {
    id: string;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
}

async function fetchMovie(movieId: string): Promise<Movie | null> {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movie');
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

function Order({ movieId }: { movieId: string }) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovieData = async () => {
            setLoading(true);
            const data = await fetchMovie(movieId);
            if (data) {
                setMovie(data);
            }
            setLoading(false);
        };
        fetchMovieData();
    }, [movieId]);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                movie ? (
                    <div
                        className="w-full bg-cover min-h-[100vh]"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
                        }}
                    >
                        <div className='bg-black/50'>
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                            <table className="border-2 table-auto border-collapse border-white">
                                <thead>
                                    <tr>
                                        <th className='p-5'>Jenis Paket</th>
                                        <th className='p-5'>Kapasitas</th>
                                        <th className='p-5'>Ukuran Layar</th>
                                        <th className='p-5'>Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='p-5'>regular </td>
                                        <td className='p-5'>4 orang</td>
                                        <td className='p-5'>42 inch</td>
                                        <td className='p-5'>100.000</td>
                                    </tr>
                                    <tr>
                                        <td className='p-5'>VIP</td>
                                        <td className='p-5'>8 orang</td>
                                        <td className='p-5'>55 inch</td>
                                        <td className='p-5'>130.000</td>
                                    </tr>
                                    <tr>
                                        <td className='p-5'>VVIP</td>
                                        <td className='p-5'>16 orang</td>
                                        <td className='p-5'>70 inch</td>
                                        <td className='p-5'>280.000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p>Movie not found</p>
                )
            )}
        </>
    );
}

export default Order;