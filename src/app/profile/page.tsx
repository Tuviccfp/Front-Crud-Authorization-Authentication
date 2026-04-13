"use client"
import * as React from 'react';
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import HubActions from "@/components/hub-actions";
import ToggleBtnTheme from "@/components/togglebtn-theme";
import SearchProductUser from "@/components/search-product-user";
import {isAxiosError} from "axios";

interface User {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
}
interface Product {
    name: string;
    price: number;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}
export default function ActiveLink() {
    const router = useRouter();
    const [userData, setUserData] = useState<User | undefined>({
        _id: "",
        name: "",
        email: "",
        role: ""
    });
    const [lastCreateProduct, setLastCreateProduct] = useState<Product[]>();
    const [messageReturnApi, setMessageReturnApi] = useState<{message: string, status: number | undefined}>({
        status: 0,
        message: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch("/api/user", { method: "GET" });
            const data = await response.json();
            setUserData(data);
        }
        const fetchLastCreateProduct = async () => {
            try {
                const response = await fetch("/api/product/search", { method: "GET" });
                const data = await response.json();
                setLastCreateProduct(data.result);
                setMessageReturnApi({status: response.status, message: data.message})
                console.log(data.message);
                setTimeout(() => {
                    setMessageReturnApi({status: 0, message: ""})
                }, 4000)
            } catch (e) {
                if(isAxiosError(e)) {
                    setMessageReturnApi({status: e.response?.status, message: e.response?.data.message});
                    setTimeout(() => {
                        setMessageReturnApi({status: 0, message: ""})
                    }, 4000)
                }
            }
        }
        fetchUserData();
        fetchLastCreateProduct();
    }, [])
    console.log(lastCreateProduct)
    if(!userData) {
        <p>Dados carregando...</p>
    }
    return (
        <main className={"flex justify-around items-center border border-white box-border sm:flex-col lg:flex-row"}>
            <ToggleBtnTheme />
            <HubActions userID={userData?._id} role={userData?.role} name={userData?.name} />
            <SearchProductUser data={lastCreateProduct} response={messageReturnApi} />

        </main>
    )
}