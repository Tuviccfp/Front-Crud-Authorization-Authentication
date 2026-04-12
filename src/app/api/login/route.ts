import {NextRequest, NextResponse} from "next/server";
import { cookies } from "next/headers";

function validateBody(body: {email?: string, password?: string}) {
    if(!body.email && !body.password) return NextResponse
        .json({ message: "Preencha todos os campos!" }, { status: 400 });
}

function applyCookies(res: NextResponse, backRes: Response) {
    const cookieHeader = backRes.headers.getSetCookie();
    if(cookieHeader && cookieHeader.length > 0) {
        cookieHeader.forEach(cookie => {
            res.headers.append("Set-Cookie", cookie);
        })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as {
            email?: string;
            password?: string;
        };

        validateBody(body);

        const backRes = await fetch("http://localhost:8080/api/login/enter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if(!backRes.ok) return NextResponse
            .json({ message: "Credênciais inválidas! Tente novamente." }, { status: 401 });

        const res = NextResponse.json(await backRes.json());

        applyCookies(res, backRes);

        return res;
    } catch (e) {
        return NextResponse.json({ message: "Erro ao realizar login!" }, { status: 500 });
    }
}