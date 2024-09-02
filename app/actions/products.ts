'use server'

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';
import { Product } from '../lib/definitions';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';

export async function addProduct(
    prevState: string | undefined,
    formdata: FormData
) {
    try {
        const name = formdata.get('name') as string;
        const price = formdata.get('price') as string;
        const quantity = formdata.get('quantity') as string;

        // Validate data
        if (!name || !price || isNaN(parseInt(price)) ||
            !quantity || isNaN(parseInt(quantity))) {
            return 'Invalid input data';
        }

        const product = {
            id: uuidv4(),
            name,
            price: parseInt(price),
            quantity: parseInt(quantity),
        };

        await prisma.product.create({
            data: product,
        });

        // Revalidate the page 
        revalidatePath('/inventory/products');
        redirect('/inventory/products');
    } catch (error) {
        console.error('Error adding product:', error);
        return 'Error adding product';
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: {
                id,
            },
        }) as Product;

        // Revalidate the page
        revalidatePath('/inventory/products');
        redirect('/inventory/products');
    } catch (error) {
        console.error('Error deleting product:', error);
        return 'Error deleting product';
    }
}

export async function getProducts() {
    try {
        const products = await prisma.product.findMany() as Product[];
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return 'Error fetching products';
    }
}
