'use client'

import { addUser } from "@/app/actions/users";
import { useActionState } from "react";
import clsx from 'clsx';

export default function UserForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        addUser,
        undefined,
    );
    return (
        <div className="md:w-72">
            <h1 className="text-xl text-center font-semibold text-grey-800">Add User</h1>
            <form className="mt-6" action={formAction}>
                <div className="grid grid-cols-1 gap-2">
                    <div>
                        <label className="text-gray-700" htmlFor="username">Username</label>
                        <input className="w-full px-4 py-2 mt-2 border text-grey-800 rounded-lg" type="text" id="username" name="username" />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="password">Password</label>
                        <input className="w-full px-4 py-2 mt-2 border text-grey-800 rounded-lg" type="password" id="password" name="password" />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
                        <input className="w-full px-4 py-2 mt-2 border text-grey-800 rounded-lg" type="password" id="confirmPassword" name="confirmPassword" />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="email">Email</label>
                        <input className="w-full px-4 py-2 mt-2 border text-grey-800 rounded-lg" type="email" id="email" name="email" />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="firstname">First Name</label>
                        <input className="w-full px-4 py-2 mt-2 border text-grey-800 rounded-lg" type="text" id="firstname" name="firstname" />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="lastname">Last Name</label>
                        <input className="w-full px-4 py-2 mt-2 border text-grey-800 rounded-lg" type="text" id="lastname" name="lastname" />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="role">Role</label>
                        {/* admin or normal */}
                        <select className="w-full px-4 py-2 mt-2 border text-grey-800 rounded-lg" id="role" name="role">
                            <option value="normal">normal</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>
                    <div className="flex justify-center items-center h-full">
                        <button className={clsx(
                            "px-2 py-2 mt-2 md:m-0 text-white bg-green-500 rounded-lg cursor-pointer",
                            isPending && 'opacity-50 cursor-not-allowed'
                        )}
                            aria-disabled={isPending}>
                            {isPending ? (
                                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                            ) : (
                                'Add User'
                            )}
                        </button>
                    </div>
                </div>
                {errorMessage && (
                    <p className="text-sm text-center text-[20px] text-red-500">{errorMessage}</p>
                )}
            </form>
        </div>
    );
}