'use server'

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';
import { Kitchen } from '../lib/definitions';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';

export async function addKitchen(
    prevState: string | undefined,
    formdata: FormData
) {
    try {
        const rawproduct = formdata.get('raw') as string;
        const type = formdata.get('type') as string;
        const quantity = formdata.get('quantity') as string;
        const quantityProduce = formdata.get('quantityProduce') as string;

        // Validate data
        if (!rawproduct || !type || !quantity || isNaN(parseInt(quantity)) ||
            !quantityProduce || isNaN(parseInt(quantityProduce))) {
            return 'Invalid input data';
        }

        const kitchen = {
            id: uuidv4(),
            rawproduct,
            type,
            quantity: parseInt(quantity),
            producequantity: parseInt(quantityProduce),
        };

        await prisma.kitchen.create({
            data: kitchen,
        });

        
    } catch (error) {
        console.error('Error adding kitchen item:', error);
        return 'Error adding kitchen item';
    }
    // Revalidate the page 
    revalidatePath('/inventory/kitchen');
    redirect('/inventory/kitchen');
}

export async function deleteKitchen(id: string) {
    try {
        await prisma.kitchen.delete({
            where: {
                id,
            },
        }) as Kitchen;

        
    } catch (error) {
        console.error('Error deleting kitchen item:', error);
        return 'Error deleting kitchen item';
    }
    // Revalidate the page
    revalidatePath('/inventory/kitchen');
    redirect('/inventory/kitchen');
}

export async function getKitchen() {
    try {
        const kitchens = await prisma.kitchen.findMany() as Kitchen[];
        return kitchens;
    } catch (error) {
        console.error('Error fetching kitchen items:', error);
        return 'Error fetching kitchen items';
    }
}

// kitchen by date
export async function getKitchenByDate(date: string) {
    try {
        if (date === 'all') {
            return getKitchen();
        }
        const kitchens = await prisma.kitchen.findMany({
            where: {
                createdAt: date,
            },
        }) as Kitchen[];
        return kitchens;
    } catch (error) {
        console.error('Error fetching kitchen items by date:', error);
        return 'Error fetching kitchen items by date';
    }
}
