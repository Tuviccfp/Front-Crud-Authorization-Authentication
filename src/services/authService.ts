import { redirect } from "next/navigation";

const urlAPI = "http://localhost:3000"

export const authService = {
    async login(email: string, password: string) {
        const response = await fetch(`http://localhost:3000/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        return {
            status: response.status,
            message: data.message,
        }
    },

    async register(name?: string, email?: string, password?: string) {
        const response = await fetch(`${urlAPI}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password})
        });
        const data = await response.json();
        return {
            status: response.status,
            message: data.message,
        }
    }
}