interface Movie {
    backdrop_path: any;
    poster_path?: string;
    title: string;
    overview: string;
    id: number;
}

const CarouselItemImage = ({ movie }: { movie: Movie }) => {
    return (
        <img
            style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
            className='z-10'
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
        />
    );
};

const CarouselItemContent = ({ movie }: { movie: Movie }) => {
    return (
        <div
            className='absolute bottom-[5vh] pl-[5vw] z-20 w-fit rounded-tr-[10px] rounded-br-[10px]'
            style={{
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(128, 128, 128, 0.7)',
                padding: '20px',
            }}
        >
            <h1 className='w-[60vw] lg:w-[30vw] text-[50px] z-30'>{movie.title}</h1>
            <h1 className='w-[70vw] lg:w-[30vw] mb-5'>{movie.overview}</h1>
            <a className="flex w-fit rounded mb-5 p-5 bg-[#333333]" href={`/movie/${movie.id}`}>See Details</a>
        </div>
    );
};

const Carousel = ({ movie }: { movie: Movie }) => {
    return (
        <div>
            {movie.backdrop_path && (
                <div>
                    <CarouselItemImage movie={movie} />
                    <CarouselItemContent movie={movie} />
                </div>
            )}
        </div>
    );
};

export default Carousel