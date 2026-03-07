"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    const cookie = await cookies();
    cookie.set("authToken", "" ,{
        httpOnly: true,
        expires: new Date(0),
        path: "/"
    });
    redirect("/");
}