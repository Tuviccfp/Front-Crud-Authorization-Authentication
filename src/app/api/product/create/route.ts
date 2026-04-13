import { NextRequest, NextResponse } from "next/server";

interface Product {
    name: string;
    price: number;
    description: string;
    image: string;
    userCreate: string;
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json() as Product;
        if(!data) return NextResponse.json({message: "Não é permitido campos vázios"});

        const response = await fetch("http://localhost:8080/api/product/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${req.cookies.get("authToken")?.value as string}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok) return NextResponse.json({message: "Erro ao cadastrar produto! Tente novamente."}, {status: 400});

        return NextResponse.json("Produto cadastrado com sucesso!");
    } catch (e) {
        return NextResponse.json({message: e})
    }
}