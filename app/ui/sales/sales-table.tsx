import { Suspense } from "react";
import TableSkeleton from "@/app/ui/skeletons/table-skeleton";
import { getSales, deleteSale } from "@/app/actions/sales";
import DeleteButton from "../delete-button";
import { CiCalendarDate } from "react-icons/ci";

export default async function SalesTable() {
    const items = await getSales();

    return (
        <Suspense fallback={<TableSkeleton />}>
            <div className="container min-96 shadow w-full md:max-h-screen overflow-auto">
                <h1 className="text-2xl text-green-800 font-bold p-2">Sales</h1>
                <table className="w-full mt-6 border-t">
                    <thead className="border-b-2 border-green-300">
                        <tr>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Date</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Type of Sale</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Type of Product</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Quantity sold</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Price</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate flex gap-2 items-center">
                                    <CiCalendarDate className="text-green-500" />
                                    {item.createdAt.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate">{item.typeSale}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate">{item.typeProduct}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">{item.quantity}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">{item.price}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">
                                    <DeleteButton id={item.id} deleteFunction={deleteSale} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Suspense>
    );
}
