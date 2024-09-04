'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
import { Sale } from '../lib/definitions';

// Add a new sale
export async function addSale(
    prevState: string | undefined,
    formdata: FormData
) {
    try {
        const typeProduct = formdata.get('typeProduct') as string;
        const typeSale = formdata.get('typeSale') as string;
        const quantity = formdata.get('quantity') as string;
        const price = formdata.get('price') as string;
        const date = formdata.get('date') as string;

        // Validate data
        if (!typeProduct || !typeSale || !quantity || isNaN(parseInt(quantity)) ||
            !price || isNaN(parseInt(price))) {
            return 'Invalid input data';
        }

        if (!date) {
            return 'please select a date';
        }

        if (new Date(date) > new Date()) {
            return 'Date should not be in the future';
        }


        const sale = {
            id: uuidv4(),
            typeProduct,
            typeSale,
            quantity: parseInt(quantity),
            price: parseInt(price),
            date: new Date(date).toISOString(),
        };

        // Insert the new sale into the database
        await sql`
            INSERT INTO sale_probakers (id, typeProduct, typeSale, quantity, price, createdat)
            VALUES (${sale.id}, ${sale.typeProduct}, ${sale.typeSale}, 
            ${sale.quantity}, ${sale.price}, ${sale.date})
        `;

    } catch (error) {
        console.error('Error adding sale:', error);
        return 'Error adding sale';
    }
    // Revalidate the page 
    revalidatePath('/inventory/sales');
    redirect('/inventory/sales');
}

// Delete a sale by ID
export async function deleteSale(id: string) {
    try {
        await sql`
            DELETE FROM sale_probakers
            WHERE id = ${id}
        `;

    } catch (error) {
        console.error('Error deleting sale:', error);
        return 'Error deleting sale';
    }
    // Revalidate the page
    revalidatePath('/inventory/sales');
    redirect('/inventory/sales');
}

// Get all sales
export async function getSales() {
    try {
        const { rows } = await sql`
            SELECT id, typeProduct, typeSale, quantity, price, createdat FROM sale_probakers
        `;
        return rows as Sale[];
    } catch (error) {
        console.error('Error fetching sales:', error);
        return 'Error fetching sales';
    }
}

// Get sales by date
export async function getSalesByDate(date: string) {
    try {
        if (date === 'all') {
            return getSales();
        }
        const { rows } = await sql`
            SELECT id, typeProduct, typeSale, quantity, price, createdat
            FROM sale_probakers
            WHERE createdAt = ${new Date(date).toISOString()}
        `;
        return rows as Sale[];
    } catch (error) {
        console.error('Error fetching sales by date:', error);
        return 'Error fetching sales by date';
    }
}


// 'use server'

// import { prisma } from '../lib/prisma';
// import { revalidatePath } from 'next/cache';
// import { Sale } from '../lib/definitions';
// import { v4 as uuidv4 } from 'uuid';
// import { redirect } from 'next/navigation';

// export async function addSale(
//     prevState: string | undefined,
//     formdata: FormData
// ) {
//     try {
//         const typeProduct = formdata.get('typeProduct') as string;
//         const typeSale = formdata.get('typeSale') as string;
//         const quantity = formdata.get('quantity') as string;
//         const price = formdata.get('price') as string;

//         // Validate data
//         if (!typeProduct || !typeSale || !quantity || isNaN(parseInt(quantity)) ||
//             !price || isNaN(parseInt(price))) {
//             return 'Invalid input data';
//         }

//         const sale = {
//             id: uuidv4(),
//             typeProduct,
//             typeSale,
//             quantity: parseInt(quantity),
//             price: parseInt(price),
//         };

//         await prisma.sale.create({
//             data: sale,
//         });

        
//     } catch (error) {
//         console.error('Error adding sale:', error);
//         return 'Error adding sale';
//     }
//     // Revalidate the page 
//     revalidatePath('/inventory/sales');
//     redirect('/inventory/sales');
// }

// export async function deleteSale(id: string) {
//     try {
//         await prisma.sale.delete({
//             where: {
//                 id,
//             },
//         }) as Sale;

        
//     } catch (error) {
//         console.error('Error deleting sale:', error);
//         return 'Error deleting sale';
//     }
//     // Revalidate the page
//     revalidatePath('/inventory/sales');
//     redirect('/inventory/sales');
// }

// export async function getSales() {
//     try {
//         const sales = await prisma.sale.findMany() as Sale[];
//         return sales;
//     } catch (error) {
//         console.error('Error fetching sales:', error);
//         return 'Error fetching sales';
//     }
// }

// // sale by date
// export async function getSalesByDate(date: string) {
//     try {
//         if (date === 'all') {
//             return getSales();
//         }
//         const sales = await prisma.sale.findMany({
//             where: {
//                 createdAt: {
//                     equals: new Date(date),
//                 },
//             },
//         }) as Sale[];
//         return sales;
//     } catch (error) {
//         console.error('Error fetching sales by date:', error);
//         return 'Error fetching sales by date';
//     }
// }