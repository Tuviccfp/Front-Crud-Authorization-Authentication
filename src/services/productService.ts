import axios from "axios";
import {ProductDocument} from "@/../../../packages/shared/interfaces/product";
interface Product {
    name: string;
    price: number;
    description: string;
    image: string;
    userCreate: string;
}
const urlAPI = "http://localhost:3000"
export const productService = {
    async createProduct(product: ProductDocument) {
        const response = await fetch(`http://localhost:3000/api/product/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product)
            });
        const data = await response.json();
        return {
            status: response.status,
            message: data.message,
        }
    },

    async listProduct() {
        const response = await fetch(`${urlAPI}/api/product/list`, {
            method: "GET"
        });
        const data = await response.json();
        return {
            status: response.status,
            message: data.message,
            result: data.result,
        }
    },

    async searchProduct(name: string, status: string | number) {
        const query = {
            name: `${name}`,
            status: `${!status ? "ativo" : status}`,
        }
        const queryString = new URLSearchParams(query).toString();

        const response = await fetch(`${urlAPI}/api/product/list?${queryString}`, { method: "GET" });
        const data = await response.json();
        return {
            status: response.status,
            message: data.message,
            result: data.result,
        }
    },

    async editProduct(id: string, product: ProductDocument) {
        const response = await fetch(`${urlAPI}/api/product/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product)
        });
        const data = await response.json();
        return {
            status: response.status,
            message: data.message,
        }
    }
}