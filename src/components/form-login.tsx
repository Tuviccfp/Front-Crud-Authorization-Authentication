"use client"

import type {ChangeEvent, FormEvent} from "react";
import {useState} from "react";
import axios from "axios";
import {ArrowLeftRight} from "lucide-react";
import {useRouter} from "next/navigation";
import {logout} from "@/app/actions/auth";

interface User {
    name?: string | undefined;
    email: string;
    password: string;
}

export default function LoginComponent() {
    const router = useRouter();
    const [btnToogleAccess, setBtnToogleAccess] = useState<boolean>(false);
    const [data, setData] = useState<User>({
        name: "",
        email: "",
        password: ""
    });
    const [returnMessageOperation, setReturnMessageOperation] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log(data);
            const response = await axios.post(`/api/login`, data, {withCredentials: true});
            if (response.status === 200) {
                setReturnMessageOperation("Login realizado com sucesso!");
                router.push("/profile");
                router.refresh();
            }
            setData({
                name: "",
                email: "",
                password: ""
            })
        } catch (e) {
            setReturnMessageOperation("Erro ao realizar login! Tente novamente.");
            setData({
                name: "",
                email: "",
                password: ""
            });
        }
    }

    const handleSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post<User>(`http://localhost:8080/api/login/register`, data);
            if (response.status === 200) {
                setReturnMessageOperation("Cadastro realizado com sucesso!");
                setData({
                    name: "",
                    email: "",
                    password: ""
                })
            } else if (response.status === 400) {
                setReturnMessageOperation("Erro ao realizar o cadastro! Tente novamente.");
            }
        } catch (e) {
            setReturnMessageOperation("Erro ao realizar o cadastro! Tente novamente.");
            setData({
                name: "",
                email: "",
                password: ""
            });
        }
    }

    return (
        <form
            onSubmit={btnToogleAccess ? handleSubmitLogin : handleSubmitRegister}
            className={"flex flex-col items-center justify-center h-[100vh] m-0"}
        >
            {btnToogleAccess ? (
                <button type={"button"} className={"tracking-wider uppercase flex gap-0.5 items-center p-2 m-0"} onClick={() => setBtnToogleAccess(false)}>
                    <ArrowLeftRight size={15}/>
                    Login
                </button>) : (
                <button type={"button"} className={"tracking-wider uppercase flex gap-0.5 items-center p-2 m-0"} onClick={() => setBtnToogleAccess(true)}>
                    <ArrowLeftRight size={15}/>
                    Cadastro
                </button>
            )}
            {btnToogleAccess ? (
                <p>Para entrar com a sua conta, basta preencher seus dados: </p>
            ) : (
                <p> Para criar uma nova conta, basta preencher os dados de registro abaixo: </p>
            )}
            {btnToogleAccess ? (
                    <fieldset id={"screen-mobile"} style={{boxShadow: "6px 6px 6px rgb(88, 138, 192)"}} className={"flex flex-col items-center gap-1.5 w-[35vw] p-4 text-black bg-white border rounded-xl border-black dark:text-black dark:border-white"}>
                        <label className={"text-[18px]"} htmlFor="email">E-mail: </label>
                        <input className={"w-[13vw] input-theme"} type="email" name="email" id="email" value={data.email} onChange={handleChange}/>

                        <label className={"text-[18px]"} htmlFor="password">Senha: </label>
                        <input className={"w-[13vw] input-theme"} type="password" name="password" id="password" value={data.password} onChange={handleChange}/>

                        <button className={"btn-theme"}
                                type="submit">Login
                        </button>
                        <p>{returnMessageOperation}</p>
                    </fieldset>
                ) : (
                <fieldset id={"screen-mobile"} style={{boxShadow: "6px 6px 6px rgb(88, 138, 192)"}} className={"flex flex-col items-center gap-1.5 w-[35vw] p-4 text-black bg-white border rounded-xl border-black dark:text-black dark:border-white"}>
                    <label className={"text-[18px]"} htmlFor="name">Nome: </label>
                    <input className={"w-[13vw] input-theme"} type="text" name="name" id="name" value={data.name} onChange={handleChange}/>

                    <label className={"text-[18px]"} htmlFor="email">E-mail: </label>
                    <input className={"w-[13vw] input-theme"} type="email" name="email" id="email" value={data.email} onChange={handleChange}/>

                    <label className={"text-[18px]"} htmlFor="password">Senha: </label>
                    <input className={"w-[13vw] input-theme"} type="password" name="password" id="password" value={data.password} onChange={handleChange}/>

                    <button className={"btn-theme"}
                            type="submit">Login
                    </button>
                    <p>{returnMessageOperation}</p>
                </fieldset>
            )}
        </form>
    );
}