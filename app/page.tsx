import Banner from "@/components/page/home/Banner";
import PopularMovies from "@/components/page/home/PopularMovies";
import TopMovies from "@/components/page/home/TopMovies";

export default async function Home() {
  return (
    <div>
      <Banner />
      <PopularMovies />
      <TopMovies />
    </div>
  );
}