import { ProductDocument } from "@/../../../packages/shared/interfaces/product"
import ViewMessageApi from "@/components/message-api";
import * as React from "react";
import {ArrowBigLeft} from "lucide-react";
import { useRouter } from "next/navigation";
interface ComponentProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    data: ProductDocument;
    returnData: (data: ProductDocument) => void;
    messageModel: {
        status: number,
        message: string
    }
}

export default function ModelFormProduct(props: ComponentProps) {
    const router = useRouter()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name, type} = e.target;
        props.returnData({
            ...props.data,
            [name]: type === "number" ? Number(value) : value
        })
    }
    return (
        <form onSubmit={props.handleSubmit} className={"flex items-center justify-center h-[100vh] m-0" }>
            <fieldset className={"flex flex-col items-center justify-center bg-white border border-black rounded-xl p-4 w-[35vw] text-black relative"}>
                <button type="button" onClick={() => router.back()} className={"absolute left-0 top-0 m-4 w-auto flex flex-row gap-2 items-center justify-center border-transparent"}> <ArrowBigLeft/>Voltar</button>
                <label htmlFor="name" className={"mt-2"}>Nome: </label>
                <input required type="text" name="name" id="name" className={"input-theme w-[11vw]"} placeholder="Digite o nome do produto" onChange={handleChange} value={props.data.name}/>

                <label htmlFor="price" className={"mt-2 after:content-['R$'] after:ml-1 "}>Preço</label>
                <input required type="number" id="price" name="price" className={"input-theme w-[11vw] "} placeholder="Digite o preço do produto" onChange={handleChange} value={props.data.price}/>

                <label htmlFor="description" className={"mt-2"}>Descrição</label>
                <input required type="text" id="description" name="description" className={"input-theme w-[11vw]"} placeholder="Digite a descrição do produto" onChange={handleChange} value={props.data.description}/>

                <label htmlFor="image" className={"mt-2"}>Url da imagem</label>
                <input required type="text" id="image" name="image" className={"input-theme w-[11vw]"} placeholder="Digite a URL da imagem do produto" onChange={handleChange} value={props.data.image}/>

                <button type="submit" className={"btn-theme mt-2"}>Cadastrar</button>
            </fieldset>
            <ViewMessageApi status={props.messageModel.status} message={props.messageModel.message} />
        </form>
    )
}