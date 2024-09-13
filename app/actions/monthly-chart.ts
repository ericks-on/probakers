'use server';

import { sql } from '@vercel/postgres';
import { MoneyFlow, MonthlyChart } from '../lib/definitions';

// Get monthly chart
export async function getMonthlyChart(): Promise<MonthlyChart[]> {
    let moneyFlow: MoneyFlow[] = [];
    let monthlyChart: MonthlyChart[] = [];

    try {
        const { rows } = await sql`
            SELECT * FROM probakers_money_flow
        `;
        moneyFlow = rows as MoneyFlow[];
    } catch (error) {
        console.error('Error getting money flow:', error);
        return [];
    }

    moneyFlow.forEach((item) => {
        const date = new Date(item.createdat);
        const month = date.getMonth();
        const year = date.getFullYear();

        // Convert fields to numbers to avoid string concatenation
        const expense = Number(item.expense);
        const incomeMandazi = Number(item.in_mandazi);
        const incomeCakes = Number(item.in_cakes);
        const totalIncome = incomeMandazi + incomeCakes;
        const profit = totalIncome - expense;

        const index = monthlyChart.findIndex(
            (chart) => chart.month === month && chart.year === year
        );

        if (index === -1) {
            monthlyChart.push({
                month,
                total_expenses: expense,
                total_income: totalIncome,
                profit: profit,
                year,
            });
        } else {
            monthlyChart[index].total_expenses += expense;
            monthlyChart[index].total_income += totalIncome;
            monthlyChart[index].profit += profit;
        }
    });

    return monthlyChart.sort((a, b) => {
        if (a.year === b.year) {
            return b.month - a.month;
        }
        return a.year - b.year;
    })
}
