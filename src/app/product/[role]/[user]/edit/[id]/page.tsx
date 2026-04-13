"use client"
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {type} from "node:os";
import CreateProduct from "@/components/create-product";
import {productService} from "@/services/productService";
import { ProductDocument } from "@/../../../packages/shared/interfaces/product"
import ModelFormProduct from "@/components/create-product";

export default function EditProductPage() {
    const { id, user } = useParams();
    const [editProduct, setEditProduct] = useState<ProductDocument>({
        name: "",
        price: 0,
        description: "",
        image: "",
        userCreate: user as string
    })

    const [messageReturnFetch, setMessageReturnFetch] = useState({
        status: 0,
        message: ""
    });

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await productService.editProduct(id as string, editProduct)
            setMessageReturnFetch({message: response.message, status: response.status});
        } catch (e: any) {
            setMessageReturnFetch({message: e.message, status: e.status});
        }
    }

    useEffect(() => {
        const fetchProductList = async () => {
            const response = await fetch(`/api/product/list/${id}`, { method: "GET" });
            const data = await response.json();
            setEditProduct(data.result);
        }
        fetchProductList();
    }, [id]);
    return (
        <>
            <h1>Edit</h1>
            <ModelFormProduct handleSubmit={submit} data={editProduct} returnData={setEditProduct} messageModel={messageReturnFetch}/>
        </>

    )

}