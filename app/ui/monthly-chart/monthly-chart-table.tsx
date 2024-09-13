'use client'

import { Suspense, useState } from 'react';
import {  MonthlyChart } from '../../lib/definitions';
import TableSkeleton from '../skeletons/table-skeleton';
import PrintButton from '../print-button';
import { CiCalendarDate } from 'react-icons/ci';


export default function MonthlyChartTable(
    {  items }: {  items: MonthlyChart[] | string }) {
    const [date, setDate] = useState('all');
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [ariaDisabledDate, setAriaDisabledDate] = useState(true);
    const currentYear = new Date().getFullYear();

    const allMonths = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let availableYears = new Set([currentYear]);
    if (typeof items !== 'string') {
        availableYears = new Set(items.map(item => item.year));
    }

    if (date !== 'all') {
        items = items as MonthlyChart[];
        items = items.filter((item) => item.month === month && item.year === year); 
    } else {
        items = items as MonthlyChart[];
    }

    function allOption(checkbox: any) {
        if (checkbox.target.checked) {
            setDate('all');
            setAriaDisabledDate(true);
        } else {
            setDate(`${currentYear}-${month + 1}`);
            setAriaDisabledDate(false);
        }
    }

    return (
        <Suspense fallback={<TableSkeleton />}>
            <div className="container min-96 shadow w-full md:max-h-screen overflow-auto" id="printTable">
                <h1 className="text-2xl text-green-800 font-bold p-2">Monthly Chart</h1>
                {/* select options to print */}
                <div className="flex justify-end p-2" id='dateOption'>
                    <div className="flex gap-2 items-center">
                        <div className="flex items-center gap-2">
                            <label htmlFor="alldate" className="text-xl text-gray-800">All</label>
                            <input type="checkbox" name="date" id="alldate" value="all" checked={date === 'all'} onChange={ allOption } />
                        </div>
                        {/* month and year select */}
                        <div className='flex gap-2 items-center'>
                            <label htmlFor="date" className="text-xl text-gray-800">Date</label>
                            <div className='flex gap-2'>
                                <select className='px-4 py-2 border text-grey-800 rounded-lg' name="month" id="month"
                                    disabled={ariaDisabledDate} defaultValue={month}
                                        onChange={(e) => setMonth(parseInt(e.target.value))} 
                                >
                                    {allMonths.map((month, index) => (
                                        <option key={index} value={index}>{month}</option>
                                    ))}
                                </select>
                                <select className='px-4 py-2 border text-grey-800 rounded-lg' name="year" id="year"
                                    disabled={ariaDisabledDate} defaultValue={year}
                                    onChange={(e) => setYear(parseInt(e.target.value))}
                                >
                                    {[...availableYears].map((year, index) => (
                                        <option key={index} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <PrintButton />
                </div>
                <table className="w-full mt-6 border-t">
                    <thead className="border-b-2 border-green-300">
                        <tr>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Month</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Total Expenses</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[200px] truncate">Total Income</th>
                            <th className="px-4 py-3 text-left text-gray-800 max-w-[150px] truncate">Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate flex gap-2 items-center">
                                    <CiCalendarDate className="text-green-500" />
                                    {allMonths[item.month]} {item.year}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[200px] truncate">KSH {item.total_expenses}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">KSH {item.total_income}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 bg-green-50 max-w-[150px] truncate">KSH {item.profit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Suspense>
    );
}

