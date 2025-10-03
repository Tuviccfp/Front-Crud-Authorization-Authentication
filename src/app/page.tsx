import Image from "next/image";
import LoginComponent from "@/components/form-login";
import ToggleBtnTheme from "@/components/togglebtn-theme";

export default function Home() {
  return (
      <main className="flex justify-center h-[100vh]">
        <ToggleBtnTheme />
        <LoginComponent />
      </main>
  );
}
