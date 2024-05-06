import Movie from '@/components/page/movie/Movie';

interface MovieParams {
    id: string;
}

export default async function MovieDetails({ params }: { params: MovieParams }) {
    return (
        <div className='w-full'>
            <Movie params={params}/>
        </div>
    );
}