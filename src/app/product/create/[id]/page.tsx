"use client"
import React, { useState } from "react";
import {useParams, useRouter} from "next/navigation";
import {productService} from "@/services/productService";
import ModelFormProduct from "@/components/create-product";
import { ProductDocument } from "@/../../../packages/shared/interfaces/product"
import ViewMessageApi from "@/components/message-api";

export default function CreateProduct() {
    const params = useParams()
    const id = params.id;
    const router = useRouter()

    const [messageReturnFetch, setMessageReturnFetch] = useState({
        status: 0,
        message: "",
    });

    const [product, setProduct] = useState<ProductDocument>({
        name: "",
        price: 0,
        description: "",
        image: "",
        userCreate: `${id}`,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await productService.createProduct(product);
            setMessageReturnFetch({status: response.status, message: response.message});
            setTimeout(() => {
                setMessageReturnFetch({status: 0, message: ""});
            }, 4000);
        } catch (error: any) {
            console.log(error);
            setMessageReturnFetch({status: error.response.status, message: error.response.data.message});
            setTimeout(() => {
                setMessageReturnFetch({status: 0, message: ""});
            }, 4000)
        } finally {
            setProduct({
                name: "",
                price: 0,
                description: "",
                image: "",
                userCreate: `${id}`,
            });
            setTimeout(() => {
                //redirecionar pro produto já cadastrado
                setMessageReturnFetch({status: 0, message: ""});
                router.push(`/product/list/${id}`)
                router.refresh();
            }, 4000);
            router.refresh();
        }
    }

    return (
        <>
            <ModelFormProduct handleSubmit={handleSubmit} data={product} returnData={setProduct} messageModel={messageReturnFetch}/>
        </>

    )
}