import * as React from 'react';
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {redirect} from "next/navigation";

export default async function ActiveLink() {
    const cookie = await cookies();
    const setCookie = cookie.get("authToken")?.value;

    if(!setCookie) {
        redirect('/')
    }

    let user;
    try {
        user = jwt.verify(setCookie, process.env.JWT_SECRET as string)
        console.log(user);
    } catch (e) {
        console.log(e)
    }
    console.log(process.env.JWT_SECRET as string)
    console.log(setCookie);
    return (
        <h1>Profile</h1>
    )
}