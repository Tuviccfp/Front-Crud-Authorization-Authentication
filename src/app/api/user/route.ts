import { NextRequest, NextResponse } from "next/server";
import {cookies} from "next/headers";

export async function GET(req: NextRequest) {
    try {
        const response = await fetch("http://localhost:8080/api/user/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${req.cookies.get("authToken")?.value}`
            }
        });
        const data = await response.json();
        console.log("linha 17: ", data);
        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({message: e})
    }
}