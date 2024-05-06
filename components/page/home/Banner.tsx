'use client'

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarouselItem from '@/components/element/Carousel'

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;

interface Movie {
  backdrop_path: any;
  poster_path?: string;
  title: string;
  overview: string;
  id: number;
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

  const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: "block", background: "red", zIndex: 40 }} onClick={onClick}>
        Previous
      </div>
    );
  };
  
  const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: "block", background: "green", zIndex: 40 }} onClick={onClick}>
        Next
      </div>
    );
  };
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear',
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  return (
    <div>
      <Slider {...settings}>
        {topMovies.map((movie, index) => (<CarouselItem key={index} movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;