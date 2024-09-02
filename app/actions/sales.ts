'use server'

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';
import { Sale } from '../lib/definitions';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';

export async function addSale(
    prevState: string | undefined,
    formdata: FormData
) {
    try {
        const typeProduct = formdata.get('typeProduct') as string;
        const typeSale = formdata.get('typeSale') as string;
        const quantity = formdata.get('quantity') as string;
        const price = formdata.get('price') as string;

        // Validate data
        if (!typeProduct || !typeSale || !quantity || isNaN(parseInt(quantity)) ||
            !price || isNaN(parseInt(price))) {
            return 'Invalid input data';
        }

        const sale = {
            id: uuidv4(),
            typeProduct,
            typeSale,
            quantity: parseInt(quantity),
            price: parseInt(price),
        };

        await prisma.sale.create({
            data: sale,
        });

        // Revalidate the page 
        revalidatePath('/inventory/sales');
        redirect('/inventory/sales');
    } catch (error) {
        console.error('Error adding sale:', error);
        return 'Error adding sale';
    }
}

export async function deleteSale(id: string) {
    try {
        await prisma.sale.delete({
            where: {
                id,
            },
        }) as Sale;

        // Revalidate the page
        revalidatePath('/inventory/sales');
        redirect('/inventory/sales');
    } catch (error) {
        console.error('Error deleting sale:', error);
        return 'Error deleting sale';
    }
}

export async function getSales() {
    try {
        const sales = await prisma.sale.findMany() as Sale[];
        return sales;
    } catch (error) {
        console.error('Error fetching sales:', error);
        return 'Error fetching sales';
    }
}
