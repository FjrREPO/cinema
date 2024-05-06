import Banner from "@/components/page/home/Banner";
import PopularMovies from "@/components/page/home/PopularMovies";
import TopMovies from "@/components/page/home/TopMovies";

export default async function Home() {
  return (
    <div>
      {/* <h1 className="flex justify-center text-[100px]">AHMED KARBU</h1> */}
      <a href="/about">about page</a>
      <Banner />
      <PopularMovies />
      <TopMovies />
    </div>
  );
}