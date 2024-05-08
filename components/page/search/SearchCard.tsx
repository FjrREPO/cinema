'use client'

interface SearchCardProps {
    movie: any;
}

const SearchCard = ({ movie }: SearchCardProps) => {
    return (
        <>
            <div className="">
                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row max-w-[60vw] md:max-w-[40vw] lg:max-w-[30vw] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    {movie.poster_path ? (
                        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    ) : (
                        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMWyV35Ep8jqRdCdjfCFz7SFoS2N9wrwklFQuAwyDviA&s`} alt="Placeholder" />
                    )}
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">{movie.overview}</p>
                        <a className="flex w-fit rounded mb-5 px-5 py-2 bg-[#fff] text-[#333333]" href={`/movie/${movie.id}`}>See Details</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchCard;