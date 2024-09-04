'use client'

import { Product } from "@/app/lib/definitions";
import { Suspense, useState } from "react";
import TableSkeleton from "@/app/ui/skeletons/table-skeleton";
import { deleteProduct } from "@/app/actions/products";
import DeleteButton from "../delete-button";
import { CiCalendarDate } from "react-icons/ci";
import PrintButton from "../print-button";

export default function ProductsTable(
    { items, dates }: { items: Product[] | string, dates: string[] }) {
    const [date, setDate] = useState('all');
    const [ariaDisabledDate, setAriaDisabledDate] = useState(false);
    const today = new Date().toISOString().split('T')[0];


    if (date === 'all') {
        items = items as Product[];
    } else {
        items = items as Product[];
        items = items.filter((item) => item.createdat.toISOString().split('T')[0] === date);
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

    return (
        <Suspense fallback={<TableSkeleton />}>
            <div className="container min-96 shadow w-full md:max-h-screen overflow-auto" id="printTable">
                <h1 className="text-2xl text-green-800 font-bold p-2">Products</h1>
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
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Product Name</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Quantity</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Price</th>
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
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">{item.quantity}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate">{item.price}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate actions-val">
                                    <DeleteButton id={item.id} deleteFunction={deleteProduct} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Suspense>
    );
}


// import { Suspense } from "react";
// import TableSkeleton from "@/app/ui/skeletons/table-skeleton";
// import { getProducts, deleteProduct } from "@/app/actions/products"; // Update these imports to match your new functions
// import DeleteButton from "../delete-button";
// import { CiCalendarDate } from "react-icons/ci";

// export default async function ProductsTable() {
//     const items = await getProducts();

//     return (
//         <Suspense fallback={<TableSkeleton />}>
//             <div className="container min-96 shadow w-full md:max-h-screen overflow-auto">
//                 <h1 className="text-2xl text-green-800 font-bold p-2">Raw Products</h1>
//                 <table className="w-full mt-6 border-t">
//                     <thead className="border-b-2 border-green-300">
//                         <tr>
//                             <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Date</th>
//                             <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Product Name</th>
//                             <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Quantity</th>
//                             <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Price</th>
//                             <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {items.map((item, index) => (
//                             <tr key={index} className="border-b">
//                                 <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate flex gap-2 items-center">
//                                     <CiCalendarDate className="text-green-500" />
//                                     {item.createdAt.toLocaleString()}
//                                 </td>
//                                 <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate">{item.name}</td>
//                                 <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">{item.quantity}</td>
//                                 <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">{item.price}</td>
//                                 <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">
//                                     <DeleteButton id={item.id} deleteFunction={deleteProduct} />
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </Suspense>
//     );
// }
