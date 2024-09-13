'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { MoneyFlow } from '../lib/definitions';

// Create a new money flow
export async function createMoneyFlow(
    prevState: string | undefined,
    formdata: FormData
) {
    const expense = formdata.get('expense') as string;
    const in_mandazi = formdata.get('in_mandazi') as string;
    const in_cakes = formdata.get('in_cakes') as string;
    const date = formdata.get('date') as string;

    // Validate data
    if (!expense || !in_mandazi || !in_cakes || isNaN(parseInt(expense))
        || isNaN(parseInt(in_mandazi)) || isNaN(parseInt(in_cakes))
    ) {
        return 'Invalid input data';
    }

    if (!date) {
            return 'please select a date';
        }

    if (new Date(date) > new Date()) {
        return 'Date should not be in the future';
    }

    try {
        await sql`
            INSERT INTO probakers_money_flow (expense, in_mandazi, in_cakes, createdat)
            VALUES (${expense}, ${in_mandazi}, ${in_cakes}, ${date})
        `;
    } catch (error) {
        console.error('Error creating money flow:', error);
        return 'Error creating money flow';
    }
    // Revalidate the page
    revalidatePath('/inventory/money-flow');
    redirect('/inventory/money-flow');
}

// Delete a money flow by id
export async function deleteMoneyFlow(id: string) {
    try {
        await sql`
            DELETE FROM probakers_money_flow
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error('Error deleting money flow:', error);
        return 'Error deleting money flow';
    }
    // Revalidate the page
    revalidatePath('/inventory/money-flow');
    redirect('/inventory/money-flow');
}

// Get all money flows
export async function getMoneyFlows() {
    try {
        const { rows } = await sql`
            SELECT * FROM probakers_money_flow
        `;
        return rows as MoneyFlow[];
    } catch (error) {
        console.error('Error getting money flows:', error);
        return [];
    }
}