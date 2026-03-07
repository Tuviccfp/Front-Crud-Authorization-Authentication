import {NextRequest, NextResponse} from "next/server";
import { jwtVerify } from "jose";
import {router} from "next/client";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("authToken")?.value

    const protectedRoutes = ["/profile", "/product/create/", "/update", "/delete", "/create-new-acess"];

    const request = req.nextUrl.pathname;
    // const isProtectedRoute = protectedRoutes.some(route => request.startsWith(route));

    if(request == "/" && token) {
        return NextResponse.redirect(new URL("/profile", req.url));
    }

    if(protectedRoutes.some(route => request.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    try {
        //Transformo em Uint8Array exigência da biblioteca jose
        const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
        const tokenRefine = await jwtVerify(token as string, secret)
        const { role } = tokenRefine.payload;
        const protectedRoutesWithoutAdmin = ["/new-product", "/update", "/delete", "/create-new-acess"]
        const protectedRoutesWithEmployee = ["/new-product"]

        if(protectedRoutesWithoutAdmin.some(route => request.startsWith(route)) && role !== "admin") {
            console.log("Acesso negado!");
            return Response.redirect(new URL("/profile", req.url));
        }
        if(protectedRoutesWithEmployee.some(route => request.startsWith(route)) && role !== "employee") {
            console.log("Acesso negado!");
            return Response.redirect(new URL("/profile", req.url));
        }
    } catch (e) {

    }
}