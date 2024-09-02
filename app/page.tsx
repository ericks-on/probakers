import Image from "next/image";
import SignUpForm from "./ui/sign-up-form";
import LoginForm from "./ui/login-form";
import KitchenTable from "./ui/kitchen/kitchen-table";
import { get } from "http";
import KitchenForm from "./ui/kitchen/kitchen-form";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen min-w-screen items-center justify-center gap-2">
      {/* <SignUpForm /> */}
      <LoginForm />
    </main>
  );
}
