import {cookies} from "next/headers";

export async function managementCookies() {
    const cookie = await cookies();
    return cookie.get("authToken")?.value;
};