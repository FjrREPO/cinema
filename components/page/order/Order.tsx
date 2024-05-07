'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Payment from '@/components/element/Payment';

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
                        <div className='flex flex-col bg-black/50 min-h-[100vh] items-center justify-center'>
                            <h1 className='flex justify-center text-xl font-bold mb-5'>{movie.title}</h1>
                            <table className="border border-white border-collapse border-[4px] w-[80vw] text-center">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b border-r border-white">Jenis Paket</th>
                                        <th className="px-5 py-3 border-b border-r border-white">Kapasitas</th>
                                        <th className="px-5 py-3 border-b border-r border-white">Ukuran Layar</th>
                                        <th className="px-5 py-3 border-b border-r border-white">Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-5 py-3 border-r border-b border-white">REGULAR</td>
                                        <td className="px-5 py-3 border-r border-b border-white">4 orang</td>
                                        <td className="px-5 py-3 border-r border-b border-white">42 inch</td>
                                        <td className="px-5 py-3 border-r border-b border-white">100.000</td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 py-3 border-r border-b border-white">VIP</td>
                                        <td className="px-5 py-3 border-r border-b border-white">8 orang</td>
                                        <td className="px-5 py-3 border-r border-b border-white">55 inch</td>
                                        <td className="px-5 py-3 border-r border-b border-white">180.000</td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 py-3 border-r border-b border-white">VVIP</td>
                                        <td className="px-5 py-3 border-r border-b border-white">16 orang</td>
                                        <td className="px-5 py-3 border-r border-b border-white">70 inch</td>
                                        <td className="px-5 py-3 border-r border-b border-white">260.000</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='mt-10'>
                                <Payment/>
                            </div>
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