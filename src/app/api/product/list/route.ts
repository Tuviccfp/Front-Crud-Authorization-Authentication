import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const status = searchParams.get("status");
        const name = searchParams.get("name");
        console.log(status, name);
        const url = new URL("http://localhost:8080/api/product/list");
        if(status) url.searchParams.append("status", status);
        if(name) url.searchParams.append("name", name);
        console.log(url.toString());
        return await fetch(url.toString(), { method: "GET" });
    }
    catch (e) {
        console.log(e);
    }
}