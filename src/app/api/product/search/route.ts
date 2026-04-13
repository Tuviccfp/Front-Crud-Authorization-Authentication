import {NextRequest} from "next/server";

export async function GET(req: NextRequest) {
    try {
        return await fetch("http://localhost:8080/api/user/profile/list-products-user", { method: "GET",
        headers: {
            "Authorization": `Bearer ${req.cookies.get("authToken")?.value}`
        }});
    } catch (e) {
        return e
    }
}