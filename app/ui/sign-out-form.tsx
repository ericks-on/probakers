import { signOut } from "@/auth";
import SignOutButton from "./sign-out-button";

export default function SignOutForm() {
    return (
        <form
            className="flex gap-2  shadow border-b border-green-600 absolute bottom-2 left-2"
            action={async () => {
                'use server';
                await signOut({
                    redirect: true,
                    redirectTo: '/',
                });
            }}>
            <SignOutButton />
        </form>
    )
}