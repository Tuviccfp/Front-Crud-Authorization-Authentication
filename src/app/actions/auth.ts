"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    const cookie = await cookies();
    const result = await fetch("http://localhost:8080/api/login/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${cookie.get("authToken")?.value}`
        }
    });
    cookie.set("authToken", "" ,{
        httpOnly: true,
        expires: new Date(0),
        path: "/"
    });
    console.log(result);
    redirect("/");
}