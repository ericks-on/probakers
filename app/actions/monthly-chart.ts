'use server';

import { sql } from '@vercel/postgres';
import { MoneyFlow, MonthlyChart, Product } from '../lib/definitions';

// Get monthly chart
export async function getMonthlyChart(): Promise<MonthlyChart[]> {
    let moneyFlow: MoneyFlow[] = [];
    let monthlyChart: MonthlyChart[] = [];
    let rawProducts: Product[] = [];

    try {
        const { rows } = await sql`
            SELECT * FROM probakers_money_flow
        `;
        moneyFlow = rows as MoneyFlow[];
    } catch (error) {
        console.error('Error getting money flow:', error);
        return [];
    }

    try {
        const { rows } = await sql`
            SELECT * FROM product_probakers
        `;
        rawProducts = rows as Product[];
    } catch (error) {
        console.error('Error getting products:', error);
        return [];
    }

    // get expenses from raw products

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

    // add expenses from raw products to monthly chart
    rawProducts.forEach((product) => {
        const date = new Date(product.createdat);
        const month = date.getMonth();
        const year = date.getFullYear();

        const index = monthlyChart.findIndex(
            (chart) => chart.month === month && chart.year === year
        );

        if (index === -1) {
            monthlyChart.push({
                month,
                total_expenses: product.price,
                total_income: 0,
                profit: 0 - product.price,
                year,
            });
        } else {
            monthlyChart[index].total_expenses += product.price;
            monthlyChart[index].profit -= product.price;
        }
    });

    return monthlyChart.sort((a, b) => {
        if (a.year === b.year) {
            return b.month - a.month;
        }
        return a.year - b.year;
    })
}


