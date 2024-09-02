'use client'

import { addProduct } from "@/app/actions/products";
import { useActionState } from "react";
import clsx from 'clsx';

export default function ProductsForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        addProduct,
        undefined,
    );
    return (
        <div className="md:w-72">
            <h1 className="text-xl text-center font-semibold text-grey-800">Add Product</h1>
            <form className="mt-6" action={formAction}>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="text-gray-700" htmlFor="name">Product Name</label>
                        <input className="w-full px-4 py-2 mt-2 border text-grey-800 rounded-lg" type="text" id="name" name="name" />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="price">Price</label>
                        <input className="w-full px-4 py-2 mt-2 border text-grey-800 rounded-lg" type="number" id="price" name="price" />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="quantity">Quantity</label>
                        <input className="w-full px-4 py-2 mt-2 border text-grey-800 rounded-lg" type="number" id="quantity" name="quantity" />
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
                                'Add Product'
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