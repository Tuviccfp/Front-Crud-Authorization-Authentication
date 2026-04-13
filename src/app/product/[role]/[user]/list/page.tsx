"use client"
import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {CircleAlert, Delete, Pencil, SearchIcon} from "lucide-react";
import {ArrowRight} from "lucide-react";
import ViewMessageApi from "@/components/message-api";
import {productService} from "@/services/productService";

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

export default function ListProduct() {
    const route = useRouter();
    const { user, role } = useParams()
    const [products, setProducts] = useState<Product[]>([]);
    const [messageReturnAPI, setMessageReturnAPI] = useState<{message: string, status: number | undefined}>({
        status: 0,
        message: "",
    });
    const [searchNameProduct, setSearchNameProduct] = useState<string>("");
    const [valueSelect, setValueSelect] = useState<string | number>("all");

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        setValueSelect(value);
    }
    const handleSearchNameProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setSearchNameProduct(value);
    }

    const submitProductsBySearch = async () => {
        try {
            const data = await productService.searchProduct(searchNameProduct, valueSelect as string);
            setMessageReturnAPI({status: data.status, message: data.message})
            setProducts(data.result || []);

            setTimeout(() => {
                setMessageReturnAPI({status: 0, message: ""})
            }, 4000);
        } catch (e: any) {
            setMessageReturnAPI({status: e.response?.status, message: e.response?.data.message});
            setTimeout(() => {
                setMessageReturnAPI({status: 0, message: ""})
            }, 4000);
        } finally {
        }
    }
    const fetchProducts = async () => {
        try {
            const data = await productService.listProduct()
            setMessageReturnAPI({status: data.status, message: data.message})
            setProducts(data.result || []);
            setTimeout(() => {
                setMessageReturnAPI({status: 0, message: ""})
            }, 4000);
        } catch (e: any) {
            setMessageReturnAPI({status: e.data?.status, message: e.data?.data.message});
            setTimeout(() => {
                setMessageReturnAPI({status: 0, message: ""})
            }, 4000);
        }
    }

    useEffect(() => {
        fetchProducts()
        submitProductsBySearch()
    }, []);

    return (
        <section className={"text-center"}>
            <h1 className={"m-4 tracking-wider uppercase whitespace-nowrap"}>Listagem de produtos</h1>
            <span className={"flex items-center justify-center gap-2 text-black"}>
                <input type="text" name={"name"} className={"input-theme w-[20vw] bg-white"} placeholder="Pesquisar produto" onChange={handleSearchNameProduct} value={searchNameProduct} />
                <select name="filter" id="filter" className={"input-theme w-[20vw] bg-white"} onChange={handleChangeSelect} value={valueSelect}>
                    <option value="">Todos</option>
                    <option value="asc">Mais barato</option>
                    <option value="desc">Mais caro</option>
                </select>
                {role === "admin" ? (
                    <select name="sort" id="sort" className={"input-theme w-[20vw] bg-white"} onChange={handleChangeSelect} value={valueSelect}>
                        <option value="">Todos</option>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>

                ) : null}
                <button type="button" className="w-[10vw] bg-blue-400 p-1 rounded" onClick={submitProductsBySearch}> <SearchIcon className={"w-[10vw]"}/></button>
            </span>
            <ul className={"grid lg:grid-cols-4 place-items-center-safe gap-2 md:grid-cols-1"}>
                {products.map((product: Product) => (
                    <li className={"flex flex-col items-center justify-center border border-transparent p-2 h-auto bg-blue-500 rounded-[5px] hover:m-4 hover:p-4 hover:w-[25vw] lg:w-[20vw] sm:w-[50vw]"} key={product._id}>
                        <img width={200} height={200} src={product.image} alt={product.name} />
                        <p className={"tracking-wide"}>{product.name}</p>
                        <p className={"tracking-wide"}>R$ {product.price}</p>
                        <p className={"tracking-wide"}>{product.description}</p>
                        <span className={"flex gap-2"}>
                            {role === "admin" ? (
                                <>
                                    <div data-mensagem={"Editar produto"} className={"menu-tooltip"}>
                                        <Pencil color={"black"} onClick={() => route.push(`/product/${role}/${user}/edit/${product._id}`)}/>
                                    </div>
                                    <div data-mensagem={"Excluir produto"} className="menu-tooltip">
                                        <Delete color={"black"} onClick={() => route.push(`/delete/${product._id}`)}/>
                                    </div>
                                </>
                            ) : null}

                            <div data-mensagem={"Acessar produto"} className={"menu-tooltip"}>
                                <ArrowRight color={"black"} onClick={() => route.push(`/product/list/${role}/${product._id}`)}/>
                            </div>
                        </span>
                    </li>
                ))}
                <ViewMessageApi status={messageReturnAPI.status} message={messageReturnAPI.message} />
            </ul>
        </section>
    )
}