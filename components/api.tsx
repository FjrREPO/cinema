const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;

interface Movie {
    backdrop_path: any;
    poster_path?: string;
    title: string;
    overview: string;
    id: number;
}

const fetchTopMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data: { results: Movie[] } = await res.json();
    return data.results.slice(0, 5);
};

export { fetchTopMovies };