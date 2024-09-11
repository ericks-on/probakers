'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Debt } from '../lib/definitions';

// Create a new debt
export async function createDebt(
    prevState: string | undefined,
    formdata: FormData
) {
    const name = formdata.get('name') as string;
    const amount = formdata.get('amount') as string;
    const date = formdata.get('date') as string;

    // Validate data
    if (!name || !amount || isNaN(parseInt(amount))) {
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
            INSERT INTO probakers_debts (name, amount)
            VALUES (${name}, ${amount})
        `;
    } catch (error) {
        console.error('Error creating debt:', error);
        return 'Error creating debt';
    }
    // Revalidate the page
    revalidatePath('/inventory/debt');
    redirect('/inventory/debt');
}

// Delete a debt by id
export async function deleteDebt(id: string) {
    try {
        await sql`
            DELETE FROM probakers_debts
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error('Error deleting debt:', error);
        return 'Error deleting debt';
    }
    // Revalidate the page
    revalidatePath('/inventory/debt');
    redirect('/inventory/debt');
}

// Get all debts
export async function getDebts() {
    try {
        const { rows } = await sql`
            SELECT * FROM probakers_debts
        `;
        return rows as Debt[];
    } catch (error) {
        console.error('Error fetching debts:', error);
        return 'Error fetching debts';
    }
}

// update a debt by id
export async function updateDebt(id: string, paid: boolean) {
    try {
        await sql`
            UPDATE probakers_debts
            SET paid = ${paid}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error('Error updating debt:', error);
        return 'Error updating debt';
    }
    // Revalidate the page
    revalidatePath('/inventory/debt');
    redirect('/inventory/debt');
}