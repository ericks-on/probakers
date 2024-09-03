'use client'

import { Kitchen } from "@/app/lib/definitions";
import { Suspense, useState } from "react";
import TableSkeleton from "@/app/ui/skeletons/table-skeleton";
import { deleteKitchen, getKitchen } from "@/app/actions/kitchen";
import DeleteButton from "../delete-button";
import { CiCalendarDate } from "react-icons/ci";
import PrintButton from "../print-button";

export default function KitchenTable(
    { items, dates }: { items: Kitchen[] | string, dates: string[] }) {
    const [date, setDate] = useState('all');
    
    if (date === 'all') {
        items = items as Kitchen[];
    } else {
        items = items as Kitchen[];
        items = items.filter((item) => item.createdat.toISOString().split('T')[0] === date);
    }

    return (
        <Suspense fallback={<TableSkeleton />}>
            <div className="container min-96 shadow w-full md:max-h-screen overflow-auto" id="printTable">
                <h1 className="text-2xl text-green-800 font-bold p-2">Kitchen</h1>
                {/* select options to print */}
                <div className="flex justify-end p-2" id='dateOption'>
                    <select className="p-2 border border-green-300 rounded-md"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    >
                        <option value="all">All</option>
                        {dates.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                        ))}
                    </select>
                    <PrintButton />
                </div>
                <table className="w-full mt-6 border-t">
                    <thead className="border-b-2 border-green-300">
                        <tr>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Date</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Raw product used</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Quantity</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Type of Produce</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Quantity of produce</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate flex gap-2 items-center">
                                    <CiCalendarDate className="text-green-500" />
                                    {item.createdat.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate">{item.rawproduct}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">{item.quantity}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate">{item.type}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">{item.quantity}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">
                                    <DeleteButton id={item.id} deleteFunction={deleteKitchen} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Suspense>
    );
}
