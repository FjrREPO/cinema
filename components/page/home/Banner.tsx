'use client';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;

interface Movie {
  backdrop_path: any;
  poster_path?: string;
  title: string;
  overview: string;
}

const Banner = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTopMovies = async () => {
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

        const data = await res.json();
        const movies = data.results.slice(0, 5);
        setTopMovies(movies);
      } catch (error) {
        setError(true);
      }
    };

    fetchTopMovies();
  }, []);

  if (error) {
    return <p>Failed to fetch data</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Adjust slide speed (milliseconds)
    autoplay: true,
    autoplaySpeed: 6000, // Adjust time each slide is displayed (milliseconds)
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear',
  };

  return (
    <div>
      <Slider {...settings}>
        {topMovies.map((result: Movie, index: number) => (
          <div key={index}>
            {result.backdrop_path && (
              <div>
                <img
                  style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
                  className=''
                  src={`https://image.tmdb.org/t/p/w1280${result.backdrop_path}`}
                  alt={result.title}
                />
                <div className='absolute top-[30vh] pl-[5vw] z-50 w-fit' style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(128, 128, 128, 0.7)', padding: '20px', borderRadius: '10px' }}>
                  <h1 className='w-[30vw] text-[50px]'>{result.title}</h1>
                  <h1 className='w-[20vw]'>{result.overview}</h1>
                </div>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;