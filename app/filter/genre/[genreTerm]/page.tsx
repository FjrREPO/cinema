import GenrePage from "@/components/page/filter/GenrePage";

const page = ({ params: { genreTerm } }: { params: { genreTerm: any } }) => {

    return (
        <>
            <div>
                <GenrePage onSelectGenre={genreTerm} />
            </div>
        </>
    );
};

export default page;