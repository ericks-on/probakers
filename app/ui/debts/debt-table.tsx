'use client'

import { Suspense, useState } from "react";
import TableSkeleton from "@/app/ui/skeletons/table-skeleton";
import { getSales, deleteSale } from "@/app/actions/sales";
import DeleteButton from "@/app/ui/delete-button";
import { CiCalendarDate } from "react-icons/ci";
import PrintButton from "@/app/ui/print-button";
import { Debt } from "@/app/lib/definitions";
import { deleteDebt, updateDebt } from "@/app/actions/debts";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";




export default function DebtTable(
    { dates, items }: { dates: string[], items: Debt[] | string }) {
    const [date, setDate] = useState('all');
    const [updating, setUpdating] = useState(false);
    const [ariaDisabledDate, setAriaDisabledDate] = useState(false);
    const today = new Date().toISOString().split('T')[0];

    if (date !== 'all') {
        items = items as Debt[];
        items = items.filter((item) => item.createdat.toISOString().split('T')[0] === date);
    } else {
        items = items as Debt[];
    }

    function allOption(checkbox: any) {
        if (checkbox.target.checked) {
            setDate('all');
            setAriaDisabledDate(true);
        } else {
            setDate(today);
            setAriaDisabledDate(false);
        }
    }

    const onPaidButtonClicked = async (id: string) => {
    // alert
    if (!confirm('Are you sure you want to mark this debt as paid?')) {
        return;
    }
    // mark as paid
    setUpdating(true);
    const error = await updateDebt(id, true);
    if (error) {
        alert(error)
    }
    }

    return (
        <Suspense fallback={<TableSkeleton />}>
            <div className="container min-96 shadow w-full md:max-h-screen overflow-auto" id="printTable">
                <h1 className="text-2xl text-green-800 font-bold p-2">Debts</h1>
                {/* select options to print */}
                <div className="flex justify-end p-2" id='dateOption'>
                    <div className="flex gap-2 items-center">
                        <div className="flex items-center gap-2">
                            <label htmlFor="alldate" className="text-xl text-gray-800">All</label>
                            <input type="checkbox" name="date" id="alldate" value="all" checked={date === 'all'} onChange={ allOption } />
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="date" className="text-xl text-gray-800">Date</label>
                            <input type="date" name="date" id="date" aria-disabled={ariaDisabledDate}
                                    onChange={(e) => setDate(new Date(e.target.value).toISOString().split('T')[0])}/>
                        </div>
                    </div>
                    <PrintButton />
                </div>
                <table className="w-full mt-6 border-t">
                    <thead className="border-b-2 border-green-300">
                        <tr>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Date</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Name</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Amount</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Paid</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate" id="actions-col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate flex gap-2 items-center">
                                    <CiCalendarDate className="text-green-500" />
                                    {item.createdat.toISOString().split('T')[0]}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate">{item.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate">KSH {item.amount}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">
                                    {item.paid ? (
                                        <TiTick className="text-green-500 text-3xl" />
                                    ) : (
                                        <ImCross className="text-red-500 text-2xl" />
                                    )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate actions-val flex gap-2 items-center" >
                                    <DeleteButton id={item.id} deleteFunction={deleteDebt} />
                                    {!item.paid && (
                                        updating ? (
                                            <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                                        ) : (
                                            <button className="px-2 py-1 text-white bg-green-500 rounded-lg cursor-pointer"
                                                id={item.id} onClick={() => onPaidButtonClicked(item.id)}
                                            >paid?</button>
                                        )
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Suspense>
    );
}


