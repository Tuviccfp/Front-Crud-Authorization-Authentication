"use client"

import type {ChangeEvent, FormEvent} from "react";
import {useState} from "react";
import {ArrowLeftRight} from "lucide-react";
import {useRouter} from "next/navigation";
import ViewMessageApi from "@/components/message-api";
import {authService} from "@/services/authService";

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
    const [returnMessageOperation, setReturnMessageOperation] = useState<{message: string, status: number}>({
        message: "",
        status: 0,
    });

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
            const response = await authService.login(data.email, data.password)
            router.push("/profile");
            router.refresh();
            setReturnMessageOperation({message: response.message, status: response.status});
        } catch (e: Error | any) {
            setReturnMessageOperation({message: e?.data.message, status: e.response?.status});
        } finally {
            setData({
                name: "",
                email: "",
                password: ""
            });
            setTimeout(() => {
                setReturnMessageOperation({message: "", status: 0});
            }, 4000)
        }
    }

    const handleSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await authService.register(data.name, data.email, data.password);
            setReturnMessageOperation({message: response.message, status: response.status});
        } catch (e: any) {
            setReturnMessageOperation({message: e.response.data.message, status: e.response.status});
            setData({
                name: "",
                email: "",
                password: ""
            });
        } finally {
            setData({
                name: "",
                email: "",
                password: ""
            })
            setTimeout(() => {
                setReturnMessageOperation({message: "", status: 0});
            }, 4000)
        }
    }
    console.log(returnMessageOperation);
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
                <>
                    <p>Para entrar com a sua conta, basta preencher seus dados: </p>
                    <fieldset id={"screen-mobile"} style={{boxShadow: "6px 6px 6px rgb(88, 138, 192)"}} className={"flex flex-col items-center gap-1.5 w-[35vw] p-4 text-black bg-white border rounded-xl border-black dark:text-black dark:border-white"}>
                        <label className={"text-[18px]"} htmlFor="email">E-mail: </label>
                        <input className={"w-[13vw] input-theme"} type="email" name="email" id="email" value={data.email} onChange={handleChange}/>

                        <label className={"text-[18px]"} htmlFor="password">Senha: </label>
                        <input className={"w-[13vw] input-theme"} type="password" name="password" id="password" value={data.password} onChange={handleChange}/>

                        <button className={"btn-theme"}
                                type="submit">Login
                        </button>
                        {/*<p>{returnMessageOperation}</p>*/}
                        <ViewMessageApi status={returnMessageOperation.status} message={returnMessageOperation.message} />
                    </fieldset>
                </>
                ) : (
                <>
                    <p> Para criar uma nova conta, basta preencher os dados de registro abaixo: </p>
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

                        <ViewMessageApi status={returnMessageOperation.status} message={returnMessageOperation.message} />
                    </fieldset>
                </>
            )}
        </form>
    );
}