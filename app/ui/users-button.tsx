import { getSession } from "next-auth/react";
import { User } from "../lib/definitions";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { auth } from "@/auth";

export default async function UsersButton() {
    const session = await auth();
    const user = session?.user;
    const isAdmin = user?.role === 'admin';
    if (isAdmin)
        return (
        <Link href='/inventory/admin/users' className="flex gap-2  shadow border-b border-green-600">
            <div className="flex items-center gap-2 p-2 text-green-700 hover:bg-gray-100 cursor-pointer w-full text-xl">
                <CiUser />
                <span className="hidden md:block">Users</span>
            </div>
            </Link>
        )
    return <div></div>
    
}