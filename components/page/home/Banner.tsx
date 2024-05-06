'use client'

import styled, { keyframes } from 'styled-components';

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;

interface Movie {
    backdrop_path: any;
    poster_path?: string;
    title: string;
    overview: string;
}

const slideAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate(0, 100px);
    filter: blur(33px);
  }

  to {
    opacity: 1;
    transform: translate(0);
    filter: blur(0);
  }
`;

const BannerContainer = styled.div`
  position: relative;
  width: 80vw;
  height: 100vh;
`;

const SlideItem = styled.div`
  width: 200px;
  height: 300px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  border-radius: 20px;
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: no-repeat;
  display: inline-block;
  transition: 0.5s;
  border: 2px white solid;

  &:nth-child(1),
  &:nth-child(2) {
    top: 0;
    left: 0;
    transform: translate(0, 0);
    border-radius: 0;
    width: 100%;
    height: 100%;
  }

  &:nth-child(3) {
    left: 50%;
  }

  &:nth-child(4) {
    left: calc(50% + 220px);
    height: 250px;
    width: 175px;
  }

  &:nth-child(5) {
    left: calc(50% + 420px);
    height: 200px;
    width: 150px;
  }

  /* here n = 0, 1, 2, 3,... */
  &:nth-child(n + 6) {
    left: calc(50% + 660px);
    opacity: 0;
  }
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 100px;
  width: 300px;
  text-align: left;
  color: #eee;
  transform: translate(0, -50%);
  font-family: system-ui;
`;

const Name = styled.div`
  font-size: 40px;
  text-transform: uppercase;
  font-weight: bold;
  opacity: 0;
  animation: ${slideAnimation} 1s ease-in-out 1 forwards;
`;

const Description = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  opacity: 0;
  animation: ${slideAnimation} 1s ease-in-out 0.3s 1 forwards;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  opacity: 0;
  animation: ${slideAnimation} 1s ease-in-out 0.6s 1 forwards;
`;

const Banner = async () => {
    let topMovies = [];

    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_TOKEN}`,
                },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        topMovies = data.results.slice(0, 5);
        return (
            <div className='flex justify-center'>
                <div className="banner__container">
                    <div className="slide">
                        {topMovies?.map((result: Movie, index: number) => (
                            result.poster_path && (
                                <SlideItem style={{ background: `url(https://image.tmdb.org/t/p/w1280${result.backdrop_path})` }} key={index}>
                                    <Content className="content">
                                        <Name className="name">{result.title}</Name>
                                        <Description className="des">{result.overview}</Description>
                                        <Button>See More</Button>
                                    </Content>
                                </SlideItem>
                            )
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div>
                <p>Failed to fetch data</p>
            </div>
        );
    }
};

export default Banner;
