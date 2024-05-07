import Trailer from '@/components/data/Trailer';
import { IoMdArrowRoundBack } from "react-icons/io";

interface MovieParams {
    id: string;
}

const fetchMovieData = async (movieId: string) => {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API}`
        );
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

const MovieDetails = async ({ params }: { params: MovieParams }) => {
    const movieId = params.id;
    const movieData = await fetchMovieData(movieId);

    if (!movieData) {
        return <div>Error loading movie data</div>;
    }

    return (
        <div
            className="w-full bg-cover min-h-[100vh]"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movieData.backdrop_path})`
            }}
        >
            <div className='bg-black/50 min-h-[100vh]'>
                <button className='absolute top-[5%] left-[2%]'>
                    <a href="/"><IoMdArrowRoundBack className='w-[50px] h-[50px]' /></a>
                </button>
                <div
                    className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6"
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                        className="rounded-lg"
                        style={{ width: '100%', height: '90vh' }}
                        alt=""
                    />
                    <div className="p-2 h-fit rounded-[20px]"
                    >
                        <h2 className="text-[50px] mb-3 font-bold">
                            {movieData.title || movieData.name}
                        </h2>
                        <p className="text-md mb-3">{movieData.overview}</p>
                        <p className="text-md mb-3">
                            <span className="font-semibold mr-1">Popularity:</span>
                            {movieData.popularity}
                        </p>
                        <p className="mb-3">
                            <span className="font-semibold mr-1">Date Released:</span>
                            {movieData.release_date || movieData.first_air_date}
                        </p>
                        <p className="mb-3">
                            <span className="font-semibold mr-1">Rating:</span>
                            {movieData.vote_count}
                        </p>
                        <div className='flex flex-col gap-3'>
                            <span className='font-bold'>Genre:</span>
                            <div className='flex flex-row gap-3'>
                                {movieData.genres?.map((genre: any) => (
                                    <p key={genre.id} className='px-5 py-2 bg-white text-black rounded-[20px] font-bold'>{genre.name}</p>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-row gap-5 justify-center'>
                            <Trailer movieId={`${movieData.id}`} />
                            <a href={`/movie/${movieData.id}/order`}><button className='movie__btn mt-10 px-20 py-5 bg-[#e6bc17] rounded-[20px] font-bold'>Order Ticket</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;