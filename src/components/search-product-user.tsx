import ViewMessageApi from "@/components/message-api";

interface Product {
    _id?: string;
    name: string;
    price: number;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}
export default function SearchProductUser({ data, response }: { data?: Product[], response: { status: number | undefined, message: string}}) {
    console.log(data);
    return (
        <section className={"flex flex-col items-center justify-center h-[100vh] m-0"}>
            <p className={"tracking-wider text-blue-300 italic uppercase"}>Últimos produtos registrados por você</p>
            <ViewMessageApi status={response.status} message={response.message} />
            <ul className={`grid ${data?.length as number >= 6 ? "grid-cols-4" : "grid-cols-3"} gap-2 border border-black bg-[#232323] rounded-xl p-10`}>
                {data?.map((product: Product) => (
                    <li key={product._id} className={"flex flex-col items-center justify-center bg-blue-500 p-3 rounded-[5px] text-center text-wrap"}>
                        <img src={product.image} alt={product.name} width={200} height={200}/>
                        <p>{product.name}</p>
                        <p>R${product.price}</p>
                        <p>{product.description}</p>
                        <p>Data de cadastro: {new Date(product.createdAt as Date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}