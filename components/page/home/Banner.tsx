'use client'

import { useEffect, useState } from 'react';
import { Navigation, EffectFade, Autoplay, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CarouselItem from '@/components/element/Carousel';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;

interface Movie {
  backdrop_path: string;
  poster_path?: string;
  title: string;
  overview: string;
  id: number;
}

const fetchTopMovies = async (): Promise<Movie[]> => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: { results: Movie[] } = await res.json();
    return data.results.slice(0, 5);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Banner = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<typeof Swiper | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchTopMovies()
     .then((movies) => setTopMovies(movies))
     .catch((error) => {
        console.error(error);
        setError(true);
      });
  }, []);

  const handleSlideChange = (swiper: any) => {
    setCurrentImageIndex(swiper.realIndex);
  };

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <Swiper
        modules={[Autoplay, EffectFade, Thumbs]}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        effect={'fade'}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={handleSlideChange}
      >
        {topMovies.map((movie, index) => (
          <SwiperSlide key={index}>
            {index === currentImageIndex && (
              <div id={`image-${index}`}>
                <CarouselItem movie={movie} />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        className="mySwiper"
      >
        {topMovies.map((movie, index) => (
          <SwiperSlide key={index}>
            <img
              style={{ width: '25vw', height: '20vh', objectFit: 'cover' }}
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Banner;