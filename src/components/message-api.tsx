import Lottie, {LottieProps} from "react-lottie"
import {JSX} from "react/jsx-runtime";
import {useEffect, useState} from "react";
import errorLottie from "./../../public/error.json"
import okayLottie from "./../../public/okay.json"

export default function ViewMessageApi({status, message}: { status: number | undefined, message: string}) {
    // const [defineMessageOptions, setDefineMessageOptions] = useState<boolean>(false);
    // const caseOptionsError = [400, 401, 404, 500, 300];
    const caseOptionsOkay = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];

    const defaultOptionsOkay: LottieProps["options"] = {
        loop: true,
        autoplay: true,
        animationData: okayLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const defaultOptionsError: LottieProps["options"] = {
        loop: true,
        autoplay: true,
        animationData: errorLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    console.log("linha 31 componente MessageAPI" ,status);
    return (
        <>
            {status === 0 ? null : (
                <span className={"flex items-center justify-center gap-2 bg-blue-400 border border-transparent rounded-xl p-2"}>
                    <Lottie width={60} height={60} options={caseOptionsOkay.includes(status as number) ? defaultOptionsOkay : defaultOptionsError} />
                    <p className={"text-center text-white"}>{message}</p>
                </span>
            )}
        </>

    )
}