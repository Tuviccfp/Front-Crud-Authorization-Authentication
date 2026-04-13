import {NextRequest, NextResponse} from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
){
    try {
        const { id } = await params;
        console.log(id);
        const response = await fetch(`http://localhost:8080/api/product/list/${id}`, { method: "GET",
        headers: {
        }});
        const data = await response.json();
        return NextResponse.json(data);
    } catch (e) {
        console.log(e)
        return NextResponse.json({message: "Erro"})
    }
}