'use client'

import { useActionState } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import { authenticate } from "../actions/login";

export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <form action={ formAction }  className="flex flex-col w-full md:w-1/2 p-6 bg-white border border-green-200 shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold mb-6 text-center text-green-700">Login</h1>
            <div className="flex flex-col mb-4">
                <label htmlFor="username" className="flex gap-2 items-center mb-2 text-green-600">
                    <CiMail className="text-xl" />
                    <span>Username</span>
                </label>
                <input type="text" name="username" id="username" className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="flex flex-col mb-6">
                <label htmlFor="password" className="flex gap-2 items-center mb-2 text-green-600">
                    <CiLock className="text-xl" />
                    <span>Password</span>
                </label>
                <input type="password" name="password" id="password" className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="flex justify-center mb-4">
                <button className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-300">
                    {isPending ? (
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (   <span>Login</span>
                    )}
                </button>
            </div>
            {/* <p className="text-center text-green-600">Don't have an account? <a href="/signup" className="text-green-700 hover:underline">Sign up</a></p> */}
        </form>


    );
}