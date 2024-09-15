'use client'

import { Suspense, useState } from 'react';
import { deleteMoneyFlow } from '../../actions/money-flow';
import { MoneyFlow } from '../../lib/definitions';
import TableSkeleton from '../skeletons/table-skeleton';
import PrintButton from '../print-button';
import { CiCalendarDate } from 'react-icons/ci';
import DeleteButton from '../delete-button';


export default function MoneyFlowTable(
    { dates, items }: { dates: string[], items: MoneyFlow[] | string }) {
    const [date, setDate] = useState('all');
    const [ariaDisabledDate, setAriaDisabledDate] = useState(false);
    const today = new Date().toISOString().split('T')[0];

    if (date !== 'all') {
        items = items as MoneyFlow[];
        items = items.filter((item) => item.createdat.toISOString().split('T')[0] === date);
    } else {
        items = items as MoneyFlow[];
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
                <h1 className="text-2xl text-green-800 font-bold p-2">Money Flow</h1>
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
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Daily Expense</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">In Mandazi</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">In Cakes</th>
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
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate">{item.expense}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate">{item.in_mandazi}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">{item.in_cakes}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate actions-val" >
                                    <DeleteButton id={item.id} deleteFunction={deleteMoneyFlow} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Suspense>
    );
}

