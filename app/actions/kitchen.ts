'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
import { Kitchen } from '../lib/definitions';

// Add a new kitchen item
export async function addKitchen(
    prevState: string | undefined,
    formdata: FormData
) {
    try {
        const rawproduct = formdata.get('raw') as string;
        const type = formdata.get('type') as string;
        const quantity = formdata.get('quantity') as string;
        const quantityProduce = formdata.get('quantityProduce') as string;
        const date = formdata.get('date') as string;

        // Validate data
        if (!rawproduct || !type || !quantity || isNaN(parseInt(quantity)) ||
            !quantityProduce || isNaN(parseInt(quantityProduce))) {
            return 'Invalid input data';
        }

        if (!date) {
            return 'please select a date';
        }

        if (new Date(date) > new Date()) {
            return 'Date should not be in the future';
        }

        const kitchen = {
            id: uuidv4(),
            rawproduct,
            type,
            quantity: parseInt(quantity),
            producequantity: parseInt(quantityProduce),
            createdat: new Date(date).toISOString(),
        };

        // Insert the new item into the database
        await sql`
            INSERT INTO kitchen_probakers (id, rawproduct, type, quantity, producequantity, createdat)
            VALUES (${kitchen.id}, ${kitchen.rawproduct}, 
            ${kitchen.type}, ${kitchen.quantity}, ${kitchen.producequantity}, ${kitchen.createdat})
        `;

    } catch (error) {
        console.error('Error adding kitchen item:', error);
        return 'Error adding kitchen item';
    }
    // Revalidate the page 
    revalidatePath('/inventory/kitchen');
    redirect('/inventory/kitchen');
}

// Delete a kitchen item by ID
export async function deleteKitchen(id: string) {
    try {
        await sql`
            DELETE FROM kitchen_probakers
            WHERE id = ${id}
        `;

    } catch (error) {
        console.error('Error deleting kitchen item:', error);
        return 'Error deleting kitchen item';
    }
    // Revalidate the page
    revalidatePath('/inventory/kitchen');
    redirect('/inventory/kitchen');
}

// Get all kitchen items
export async function getKitchen() {
    try {
        const { rows } = await sql`
            SELECT * FROM kitchen_probakers
        `;
        return rows as Kitchen[];
    } catch (error) {
        console.error('Error fetching kitchen items:', error);
        return 'Error fetching kitchen items';
    }
}

// Get kitchen items by date
export async function getKitchenByDate(date: string) {
    try {
        if (date === 'all') {
            return getKitchen();
        }
        const { rows } = await sql`
            SELECT * FROM kitchen_probakers
            WHERE createdAt = ${date}
        `;
        return rows as Kitchen[];
    } catch (error) {
        console.error('Error fetching kitchen items by date:', error);
        return 'Error fetching kitchen items by date';
    }
}



// 'use server'

// import { prisma } from '../lib/prisma';
// import { revalidatePath } from 'next/cache';
// import { Kitchen } from '../lib/definitions';
// import { v4 as uuidv4 } from 'uuid';
// import { redirect } from 'next/navigation';

// export async function addKitchen(
//     prevState: string | undefined,
//     formdata: FormData
// ) {
//     try {
//         const rawproduct = formdata.get('raw') as string;
//         const type = formdata.get('type') as string;
//         const quantity = formdata.get('quantity') as string;
//         const quantityProduce = formdata.get('quantityProduce') as string;

//         // Validate data
//         if (!rawproduct || !type || !quantity || isNaN(parseInt(quantity)) ||
//             !quantityProduce || isNaN(parseInt(quantityProduce))) {
//             return 'Invalid input data';
//         }

//         const kitchen = {
//             id: uuidv4(),
//             rawproduct,
//             type,
//             quantity: parseInt(quantity),
//             producequantity: parseInt(quantityProduce),
//         };

//         await prisma.kitchen.create({
//             data: kitchen,
//         });

        
//     } catch (error) {
//         console.error('Error adding kitchen item:', error);
//         return 'Error adding kitchen item';
//     }
//     // Revalidate the page 
//     revalidatePath('/inventory/kitchen');
//     redirect('/inventory/kitchen');
// }

// export async function deleteKitchen(id: string) {
//     try {
//         await prisma.kitchen.delete({
//             where: {
//                 id,
//             },
//         }) as Kitchen;

        
//     } catch (error) {
//         console.error('Error deleting kitchen item:', error);
//         return 'Error deleting kitchen item';
//     }
//     // Revalidate the page
//     revalidatePath('/inventory/kitchen');
//     redirect('/inventory/kitchen');
// }

// export async function getKitchen() {
//     try {
//         const kitchens = await prisma.kitchen.findMany() as Kitchen[];
//         return kitchens;
//     } catch (error) {
//         console.error('Error fetching kitchen items:', error);
//         return 'Error fetching kitchen items';
//     }
// }

// // kitchen by date
// export async function getKitchenByDate(date: string) {
//     try {
//         if (date === 'all') {
//             return getKitchen();
//         }
//         const kitchens = await prisma.kitchen.findMany({
//             where: {
//                 createdAt: date,
//             },
//         }) as Kitchen[];
//         return kitchens;
//     } catch (error) {
//         console.error('Error fetching kitchen items by date:', error);
//         return 'Error fetching kitchen items by date';
//     }
// }
