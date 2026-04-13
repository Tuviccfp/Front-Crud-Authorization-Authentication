import {logout} from "@/app/actions/auth";
import * as React from "react";
import {useRouter} from "next/navigation";

export default function HubActions({userID, role, name} : {userID: string | undefined, role: string | undefined, name: string | undefined}) {
    const router = useRouter();
    return (
        <div className={"flex flex-col justify-center text-center items-center box-border rounded-[5px] sm:w-[100vw] lg:w-auto"}>
            <p className={"flex gap-2"}>Bem vindo <p className={"tracking-wide"}>{name}</p></p>
            <p>Menu naveção</p>

            <span className={"flex items-center justify-center rounded-[5px] lg:flex-col lg:w-auto sm:flex-row sm:w-[100vw]"}>
                <button className={"border border-white m-2 p-1 rounded-[5px] cursor-pointer box-border lg:hover:p-2 lg:hover:w-[15vw] lg:w-[12vw] sm:w-[20vw] sm:hover:w-auto sm:hover:p-2"} type="button" onClick={() => logout()}>Logout</button>
                <button className={"border border-white m-2 p-1 rounded-[5px] cursor-pointer box-border lg:hover:p-2 lg:hover:w-[15vw] lg:w-[12vw] sm:w-[35vw] sm:hover:w-auto sm:hover:p-2"} type="button" onClick={() => router.push(`/product/create/${userID}`)}>Cadastre um novo produto</button>
                <button className={"border border-white m-2 p-1 rounded-[5px] cursor-pointer box-border lg:hover:p-2 lg:hover:w-[15vw] lg:w-[12vw] sm:w-[35vw] sm:hover:w-auto sm:hover:p-2"} type="button" onClick={() => router.push(`/product/${role}/${userID}/list`)}>Ver produtos cadastrados</button>
            </span>

            {/*{role === "admin" && <button className={"border border-white m-2 p-1"} onClick={() => router.push(`/product/list/admin`)}></button>}*/}
        </div>
    )
}