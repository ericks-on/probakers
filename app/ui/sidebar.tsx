import Link from "next/link";

import { AiOutlineDollar } from "react-icons/ai";
import { CiHome, CiMail, CiShop, CiUser } from "react-icons/ci";
import { GiWoodenCrate } from "react-icons/gi";
import UsersButton from "./users-button";
import { auth } from "@/auth";
import { profile } from "console";

interface User {
    name: string;
    info: {
        username: string;
        email: string;
    }
}

export default async function Sidebar() {
    const session = await auth();
    let user = null;
    let username = null;
    let email = null;
    if (session) {
        user = session.user
        username = user.info.username;
        email = user.info.email;
    } 

    return (
        <aside className="flex md:flex-col w-screen md:w-60 p-4 bg-gray-300 h-16 md:h-screen gap-2">
            <h1 className="text-3xl mb-4 hidden md:block">Pro Bakers</h1>
            {user && username && email &&(
                <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-4 flex flex-col">
                        <div className="flex items-center gap-2 ">
                            <CiUser className="w-8 h-8 text-gray-600" />
                            <h2 className="text-xl font-bold text-gray-900 truncate">{user.name}</h2>
                        </div>
                        <p className="text-gray-600  truncate">@{username}</p>
                        <div className="flex items-center mt-2">
                            <CiMail className="w-5 h-5 text-gray-500" />
                            <span className="ml-2 text-gray-700 truncate">{email}</span>
                        </div>
                    </div>
                </div>
            )}
            <Link href='/inventory' className="flex gap-2 border-b border-green-600 shadow">
                <div className="flex items-center gap-2 p-2 text-green-700 hover:bg-gray-100 cursor-pointer w-full text-xl">
                    <CiHome />
                    <span className="hidden md:block">Home</span>
                </div>
            </Link>
            <Link href='/inventory/kitchen' className="flex gap-2 border-b border-green-600 shadow ">
                <div className="flex items-center gap-2 p-2 text-green-700 hover:bg-gray-100 cursor-pointer w-full text-xl">
                    <CiShop />
                    <span className="hidden md:block">Kitchen</span>
                </div>
            </Link>
            <Link href='/inventory/sales' className="flex gap-2  shadow border-b border-green-600">
                <div className="flex items-center gap-2 p-2 text-green-700 hover:bg-gray-100 cursor-pointer w-full text-xl">
                    <AiOutlineDollar />
                    <span className="hidden md:block">Sales</span>
                </div>
            </Link>
            <Link href='/inventory/products' className="flex gap-2  shadow border-b border-green-600">
                <div className="flex items-center gap-2 p-2 text-green-700 hover:bg-gray-100 cursor-pointer w-full text-xl">
                    <GiWoodenCrate />
                    <span className="hidden md:block">Raw Products</span>
                </div>
            </Link>
            <UsersButton />
        </aside>
    )
}