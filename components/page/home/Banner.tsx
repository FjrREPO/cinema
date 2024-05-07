'use client'

import { useEffect, useState } from 'react';
import { Navigation, A11y, EffectFade, Autoplay, Thumbs, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CarouselItem from '@/components/element/Carousel';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;

interface Movie {
  backdrop_path: any;
  poster_path?: string;
  title: string;
  overview: string;
  id: number;
}

const fetchTopMovies = async (): Promise<Movie[]> => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
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
    throw error;
  }
};

const Banner = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<typeof Swiper | null>(null);

  useEffect(() => {
    fetchTopMovies()
      .then((movies) => setTopMovies(movies))
      .catch((error) => setError(true));
  }, []);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <Swiper
        modules={[FreeMode, Autoplay, EffectFade, A11y, Thumbs]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        effect={'fade'}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {topMovies.map((movie, index) => (
          <SwiperSlide key={index}>
            <CarouselItem movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        loop={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {topMovies.map((movie, index) => (
          <SwiperSlide key={index}>
            <img
              style={{ width: '25vw', height: '20vh', objectFit: 'cover' }}
              className='z-10'
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
