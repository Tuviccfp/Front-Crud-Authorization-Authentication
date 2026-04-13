import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        const data = await req.json() as {
            email: string;
            password: string;
        }
        const response = await fetch("http://localhost:8080/api/login/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const returnData = await response.json();
        return NextResponse.json({
            status: returnData.status,
            message: returnData.message,
        });
    } catch (e) {
        return NextResponse.json({message: e, status: 500});
    }
}