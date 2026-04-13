import { NextRequest, NextResponse } from "next/server";
import { ProductDocument } from "@/../../packages/shared/interfaces/product"

export async function PUT(req: NextRequest) {
    const data = await req.json() as ProductDocument
    if(!data) {
        return NextResponse.json(
            { message: "Erro ao editar produto, dados em branco! Tente novamente."},
            { status: 400 }
        )
    }
    const response = await fetch(`http://localhost:8080/api/product/update/${data._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${req.cookies.get("authToken")?.value}`
        },
        body: JSON.stringify(data)
        });
    console.log(response);
    if(response.status === 200) {
        return NextResponse.json(
            { message: "Produto cadastrado com sucesso!" },
        )
    }
    return response;
}