'use client'


import { useActionState } from "react";
import clsx from 'clsx';
import { createMoneyFlow } from "@/app/actions/money-flow";

export default function MoneyFlowForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        createMoneyFlow,
        undefined,
    );
    return (
        <div className="md:w-72">
            <h1 className="text-xl text-center font-semibold text-grey-800">Add Money Flow</h1>
            <form className="mt-6" action={formAction}>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="text-gray-700" htmlFor="expense">Expense</label>
                        <input className="w-full px-4 py-2 mt-2 border text-grey-800 rounded-lg" type="number" id="expense" name="expense" defaultValue={0} />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="in_mandazi">In Mandazi</label>
                        <input className="w-full px-4 py-2 mt-2 border text-grey-800 rounded-lg" type="number" id="in_mandazi" name="in_mandazi" />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="in_cakes">In Cakes</label>
                        <input className="w-full px-4 py-2 mt-2 border text-grey-800 rounded-lg" type="number" id="in_cakes" name="in_cakes" />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="date">Date</label>
                        <input className="w-full px-4 py-2 mt-2 border text-grey-800 rounded-lg" type="date" id="date" name="date" />
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
                                'Add Money Flow'
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

