import { Card, CardBody, CardFooter, Image, Link } from "@nextui-org/react";

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;

const TopMovies = async () => {
    let topMovies = [];

    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
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
            <div className=" flex flex-col">
                <h1 className="mb-[10px]">TopMovies</h1>
                <div className="justify-center">
                    <div className="gap-1 grid grid-cols-2 sm:grid-cols-5 justify-center w-full">
                        {topMovies.map((result: any, index: any) => (
                            <Link href={`/movie/${result.id}`} key={index}>
                                <Card shadow="sm">
                                    <CardBody className="overflow-visible p-0">
                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            width="100%"
                                            alt={result.title}
                                            className="w-full object-cover rounded-[10px] h-full max-w-[15vw] m-auto"
                                            src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                                        />
                                    </CardBody>
                                    <CardFooter className="flex-col text-small justify-between items-center">
                                        <b>{result.title}</b>
                                        <p className="text-default-500 justify-center">{result.release_date}</p>
                                    </CardFooter>
                                </Card>
                            </Link>
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

export default TopMovies;