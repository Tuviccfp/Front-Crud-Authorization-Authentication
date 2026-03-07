"use client"
import React, { useState } from "react";
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import {ArrowBigLeft} from "lucide-react";

interface Product {
    name: string;
    price: number;
    description: string;
    image: string;
    userCreate: string;
}

export default function CreateProduct() {
    const params = useParams()
    const id = params.id;
    const router = useRouter()

    const [product, setProduct] = useState<Product>({
        name: "",
        price: 0,
        description: "",
        image: "",
        userCreate: `${id}`,
    });
    const [returnMessageOperation, setReturnMessageOperation] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type} = e.target;
        setProduct({
            ...product,
            [name]: type === 'number' ? Number(value) : value
        });
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/product/create", product, {withCredentials: true});
            console.log(response);
            if(response.status === 200) {
                setReturnMessageOperation("Produto cadastrado com sucesso!");
                setProduct({
                    name: "",
                    price: 0,
                    description: "",
                    image: "",
                    userCreate: `${id}`,
                });
            }
            setTimeout(() => {
                setReturnMessageOperation("");
            }, 3000)
        } catch (e) {
            setReturnMessageOperation("Erro ao cadastrar produto! Tente novamente.");
            setProduct({
                name: "",
                price: 0,
                description: "",
                image: "",
                userCreate: `${id}`,
            });
            setTimeout(() => {
                setReturnMessageOperation("");
            }, 3000)
            console.log(e);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={"flex items-center justify-center h-[100vh] m-0" }>
            <fieldset className={"flex flex-col items-center justify-center bg-white border border-black rounded-xl p-4 w-[35vw] text-black relative"}>
                <button type="button" onClick={() => router.back()} className={"absolute left-0 top-0 m-4 w-auto flex flex-row gap-2 items-center justify-center border-transparent"}> <ArrowBigLeft/>Voltar</button>
                <label htmlFor="name" className={"mt-2"}>Nome: </label>
                <input type="text" name="name" id="name" className={"input-theme w-[11vw]"} placeholder="Digite o nome do produto" onChange={handleChange} value={product.name}/>

                <label htmlFor="price" className={"mt-2 after:content-['R$'] after:ml-1 "}>Preço</label>
                <input type="number" id="price" name="price" className={"input-theme w-[11vw] "} placeholder="Digite o preço do produto" onChange={handleChange} value={product.price}/>

                <label htmlFor="description" className={"mt-2"}>Descrição</label>
                <input type="text" id="description" name="description" className={"input-theme w-[11vw]"} placeholder="Digite a descrição do produto" onChange={handleChange} value={product.description}/>

                <label htmlFor="image" className={"mt-2"}>Url da imagem</label>
                <input type="text" id="image" name="image" className={"input-theme w-[11vw]"} placeholder="Digite a URL da imagem do produto" onChange={handleChange} value={product.image}/>

                <button type="submit" className={"btn-theme mt-2"}>Cadastrar</button>
            </fieldset>
            <p>{returnMessageOperation}</p>
        </form>
    )
}