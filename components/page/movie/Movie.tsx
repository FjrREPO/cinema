import Image from 'next/image';
import { IoMdArrowRoundBack } from "react-icons/io";

interface MovieParams {
    id: string;
}

interface MovieData {
    title?: string;
    name?: string;
    backdrop_path?: string;
    poster_path?: string;
    overview?: string;
    release_date?: string;
    first_air_date?: string;
    vote_count?: number;
    production_companies?: {
        logo_path?: string;
    }[];
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
            className="w-full bg-cover"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movieData.backdrop_path})`
            }}
        >
            <div className='bg-black/50'>
                <button className='absolute top-[5%] left-[2%]'>
                    <a href="/"><IoMdArrowRoundBack className='w-[50px] h-[50px]' /></a>
                </button>
                <div
                    className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6"
                >
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                        width={400}
                        height={250}
                        className="rounded-lg"
                        style={{ maxWidth: '100%', minHeight: '100%' }}
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
                        {movieData.production_companies && (
                            <ProductionCompanies companies={movieData.production_companies} />
                        )}
                        <div className='flex justify-center'>
                            <a href={`/movie/${movieData.id}/order`}><button className='movie__btn mt-10 px-20 py-5 bg-[#e6bc17] rounded-[20px] font-bold'>Pesan Tiket</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductionCompanies = ({ companies }: { companies: MovieData['production_companies'] }) => {
    return (
        <div className='flex flex-col gap-5'>
            <h1 className='flex font-bold text-[20px]'>Production Companies</h1>
            <div className='movie__logo grid grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-x-10 lg:gap-x-20 gap-y-5 items-center justify-center xl:grid-cols-3'>
                {companies?.map((company) => (
                    <div key={company.logo_path} className='bg-white max-w-[50vw] md:min-w-[15vw] md:max-w-[40vw] lg:max-w-[20vw] xl:max-w-[10vw] p-10 rounded-[20px]'>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                            alt="Production Company Logo"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieDetails;