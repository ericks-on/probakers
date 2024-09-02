'use client'

import { useState } from "react";
import { RiShutDownLine } from "react-icons/ri";

export default function SignOutButton() {
    const [clicked, setClicked] = useState(false);
    return (
        <button className="flex justify-center items-center p-2 text-green-700 hover:bg-gray-100 cursor-pointer w-full text-xl"
            aria-disabled={clicked}
            onClick={() => setClicked(true)}
        >
            {clicked ? (
                <span className="animate-spin inline-block w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full"></span>
            ) : (
                <div className="flex items-center gap-2 w-full h-full">
                    <RiShutDownLine />
                    <span className="hidden md:block">Sign out</span>
                </div>
            )}
            
        </button>
    );
}