"use client"
import * as React from 'react';
// import {cookies} from "next/headers";
// import jwt, {JwtPayload} from "jsonwebtoken";
// import {redirect} from "next/navigation";
import {logout} from "@/app/actions/auth";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";

interface User {
    _id?: string;
    name?: string;
    email?: string;
}
export default function ActiveLink() {
    const router = useRouter();
    const [userData, setUserData] = useState<User | undefined>({
        _id: "",
        name: "",
        email: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch("/api/user", { method: "GET" });
            const data = await response.json();
            setUserData(data);
        }
        fetchUserData()
    }, [])

    if(!userData) {
        <p>Dados carregando...</p>
    }
    return (
        <main>
            <button type="button" onClick={() => logout()}>Logout</button>
            {/*<h1>{userData?.name + userData?.email}</h1>*/}
            <button className={"border border-white m-2 p-1"} onClick={() => router.push(`/product/create/${userData?._id}`)}>Cadastre um novo produto</button>
            {/*<button onClick={() => logout()}>Logout</button>*/}
        </main>
    )
}