'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { User } from '../lib/definitions';

// Add a new user
export async function addUser(
    prevState: string | undefined,
    formdata: FormData
) {
    try {
        const username = formdata.get('username') as string;
        const password = formdata.get('password') as string;
        const confirmPassword = formdata.get('confirmPassword') as string;
        const email = formdata.get('email') as string;
        const firstname = formdata.get('firstname') as string;
        const lastname = formdata.get('lastname') as string;
        const role = formdata.get('role') as string;

        // Validate data
        if (!username || !password || !email || !firstname || !lastname) {
            return 'Invalid input data';
        }

        if (password !== confirmPassword) {
            return 'Passwords do not match';
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await sql`
            INSERT INTO Users_probakers (id, username, password, email, name, role)
            VALUES (${uuidv4()}, ${username}, ${hashedPassword}, ${email}, ${firstname} || ' ' || ${lastname}, ${role})
        `;

    } catch (error) {
        console.error('Error adding user:', error);
        return 'Error adding user';
    }
    // Revalidate the page 
    revalidatePath('/inventory/admin/users');
    redirect('/inventory/admin/users');
}

// Delete a user by ID
export async function deleteUser(id: string) {
    try {
        await sql`
            DELETE FROM Users_probakers
            WHERE id = ${id}
        `;

    } catch (error) {
        console.error('Error deleting user:', error);
        return 'Error deleting user';
    }
    // Revalidate the page
    revalidatePath('/inventory/admin/users');
    redirect('/inventory/admin/users');
}

// Get all users
export async function getUsers() {
    try {
        const { rows } = await sql`
            SELECT id, username, email, name, role, createdat FROM Users_probakers
        `;

        // Change password to hidden from the response
        const users = rows.map((user: any) => ({
            ...user,
            password: 'hidden',
        })) as User[];

        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return 'Error fetching users';
    }
}


// 'use server'

// import { prisma } from '../lib/prisma';
// import { revalidatePath } from 'next/cache';
// import { User } from '../lib/definitions';
// import { v4 as uuidv4 } from 'uuid';
// import { redirect } from 'next/navigation';
// import bcrypt from 'bcrypt';

// export async function addUser(
//     prevState: string | undefined,
//     formdata: FormData
// ) {
//     try {
//         const username = formdata.get('username') as string;
//         const password = formdata.get('password') as string;
//         const confirmPassword = formdata.get('confirmPassword') as string;
//         const email = formdata.get('email') as string;
//         const firstname = formdata.get('firstname') as string;
//         const lastname = formdata.get('lastname') as string;
//         const role = formdata.get('role') as string;

//         // Validate data
//         if (!username || !password || !email || !firstname || !lastname) {
//             return 'Invalid input data';
//         }

//         if (password !== confirmPassword) {
//             return 'Passwords do not match';
//         }

//         const user = {
//             id: uuidv4(),
//             username,
//             password: await bcrypt.hash(password, 10),
//             email,
//             name: `${firstname} ${lastname}`,
//             role
//         };

//         const newUser = await prisma.user.create({
//             data: user,
//         });

        
//     } catch (error) {
//         console.error('Error adding user:', error);
//         return 'Error adding user';
//     }
//     // Revalidate the page 
//     revalidatePath('/inventory/admin/users');
//     redirect('/inventory/admin/users');
// }

// export async function deleteUser(id: string) {
//     try {
//         const user = await prisma.user.delete({
//             where: {
//                 id,
//             },
//         }) as User;

        
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         return 'Error deleting user';
//     }
//     // Revalidate the page
//     revalidatePath('/inventory/admin/users');
//     redirect('/inventory/admin/users');
// }

// export async function getUsers() {
//     try {
//         const users = await prisma.user.findMany() as User[];
//         // Change password to hidden from the response
//         users.forEach(user => {
//             delete user.password;
//             user.password = 'hidden';
//         });
//         return users;
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         return 'Error fetching users';
//     }
// }
