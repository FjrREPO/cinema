import Order from "@/components/page/order/Order";

export default function Page({ params: { id } }: { params: { id: string } }) {
    return (
        <div className='w-full'>
            <Order movieId={id} />
        </div>
    );
}