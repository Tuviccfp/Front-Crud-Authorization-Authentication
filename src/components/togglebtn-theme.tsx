"use client"
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ToggleBtnTheme() {
    const { theme , setTheme } = useTheme();

    const handleToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }
    return (
        <div className={"fixed top-4 left-4 m-2"}>
            <button onClick={handleToggle}>
                {theme === "light" ? <Moon /> : <Sun />}
            </button>
        </div>
    )
}