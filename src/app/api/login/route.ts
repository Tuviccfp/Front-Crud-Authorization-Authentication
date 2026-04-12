"use server"
import {NextRequest, NextResponse} from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse){
    const cookie = await cookies();
    const pushCookie = cookie.get("authToken")?.value
    console.log("linha 8: ", pushCookie);
    try {
        const body = await req.json() as {
            email?: string;
            password?: string;
        };
        const { email, password } = body;

        if(!email && !password) return NextResponse
            .json({ message: "Preencha todos os campos!" }, { status: 400 });

        const backRes = await fetch("http://localhost:8080/api/login/enter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if(!backRes.ok) return NextResponse
            .json({ message: "Credênciais inválidas! Tente novamente." }, { status: 401 });


        const cookieHeader = backRes.headers.getSetCookie();

        if(cookieHeader && cookieHeader.length > 0) {
            cookieHeader.forEach(cookie => {
                res.headers.append("Set-Cookie", cookie);
            })
        }
        return res;
    } catch {
        return NextResponse.json({message: 'Erro ao realizar login! Tente novamente.'}, {status: 500});
    }
}