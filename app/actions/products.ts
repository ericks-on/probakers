'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
import { Product } from '../lib/definitions';

// Add a new product
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

        // Insert the new product into the database
        await sql`
            INSERT INTO product_probakers (id, name, price, quantity)
            VALUES (${product.id}, ${product.name}, ${product.price}, ${product.quantity})
        `;

    } catch (error) {
        console.error('Error adding product:', error);
        return 'Error adding product';
    }
    // Revalidate the page 
    revalidatePath('/inventory/products');
    redirect('/inventory/products');
}

// Delete a product by ID
export async function deleteProduct(id: string) {
    try {
        await sql`
            DELETE FROM product_probakers
            WHERE id = ${id}
        `;

    } catch (error) {
        console.error('Error deleting product:', error);
        return 'Error deleting product';
    }
    // Revalidate the page
    revalidatePath('/inventory/products');
    redirect('/inventory/products');
}

// Get all products
export async function getProducts() {
    try {
        const { rows } = await sql`
            SELECT * FROM product_probakers
        `;
        return rows as Product[];
    } catch (error) {
        console.error('Error fetching products:', error);
        return 'Error fetching products';
    }
}

// Get products by date
export async function getProductsByDate(date: string) {
    if (date === 'all') {
        return getProducts();
    }
    try {
        const { rows } = await sql`
            SELECT * FROM product_probakers
            WHERE createdAt = ${new Date(date).toISOString()}
        `;
        return rows as Product[];
    } catch (error) {
        console.error('Error fetching products by date:', error);
        return 'Error fetching products by date';
    }
}


// 'use server'

// import { prisma } from '../lib/prisma';
// import { revalidatePath } from 'next/cache';
// import { Product } from '../lib/definitions';
// import { v4 as uuidv4 } from 'uuid';
// import { redirect } from 'next/navigation';

// export async function addProduct(
//     prevState: string | undefined,
//     formdata: FormData
// ) {
//     try {
//         const name = formdata.get('name') as string;
//         const price = formdata.get('price') as string;
//         const quantity = formdata.get('quantity') as string;

//         // Validate data
//         if (!name || !price || isNaN(parseInt(price)) ||
//             !quantity || isNaN(parseInt(quantity))) {
//             return 'Invalid input data';
//         }

//         const product = {
//             id: uuidv4(),
//             name,
//             price: parseInt(price),
//             quantity: parseInt(quantity),
//         };

//         await prisma.product.create({
//             data: product,
//         });

        
//     } catch (error) {
//         console.error('Error adding product:', error);
//         return 'Error adding product';
//     }
//     // Revalidate the page 
//     revalidatePath('/inventory/products');
//     redirect('/inventory/products');
// }

// export async function deleteProduct(id: string) {
//     try {
//         await prisma.product.delete({
//             where: {
//                 id,
//             },
//         }) as Product;

        
//     } catch (error) {
//         console.error('Error deleting product:', error);
//         return 'Error deleting product';
//     }
//     // Revalidate the page
//     revalidatePath('/inventory/products');
//     redirect('/inventory/products');
// }

// export async function getProducts() {
//     try {
//         const products = await prisma.product.findMany() as Product[];
//         return products;
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         return 'Error fetching products';
//     }
// }

// // products by date
// export async function getProductsByDate(date: string) {
//     if (date === 'all') {
//         return getProducts();
//     }
//     try {
//         const products = await prisma.product.findMany({
//             where: {
//                 createdAt: new Date(date),
//             },
//         }) as Product[];
//         return products;
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         return 'Error fetching products';
//     }
// }