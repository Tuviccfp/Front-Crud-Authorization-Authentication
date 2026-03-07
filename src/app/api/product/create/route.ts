import { NextRequest, NextResponse } from "next/server";

interface Product {
    name: string;
    price: number;
    description: string;
    image: string;
    userCreate: string;
}

export async function POST(req: NextRequest) {
    const data = await req.json() as Product
    if(data == null) {
        return NextResponse.json(
            { message: "Erro ao cadastrar produto, dados em branco! Tente novamente." },
            { status: 502 }
        )
    }
    const response = await fetch("http://localhost:8080/api/product/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${req.cookies.get("authToken")?.value}`
        },
        body: JSON.stringify(data)
    });
    if(response.status === 200) {
        return NextResponse.json(
            { message: "Produto cadastrado com sucesso!" },
        )
    }
    return response;
}