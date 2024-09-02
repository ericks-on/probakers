import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { User } from './app/lib/definitions';
import { PrismaClient } from './generated/prisma-client-js';

const prisma = new PrismaClient();


async function getUser(username: string) {
    try {
        // Fetch user from the database using Prisma
        const user = await prisma.user.findUnique({
            where: { username },
        }) as User;

        return user || undefined;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

// get user by id
async function getUserById(id: string) {
    try {
        // Fetch user from the database using Prisma
        const user = await prisma.user.findUnique({
            where: { id },
        }) as User;

        return user || undefined;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    callbacks: {
        async jwt({ token, user }) {
            if (token.sub) {
                const userDetails = await getUserById(token.sub);
                token.role = userDetails.role as string;
                token.info = {
                    username: userDetails.username,
                    email: userDetails.email,
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.role && token.info) {
                session.user.role = token.role as string;
                session.user.info = token.info as { username: string, email: string };
            }
            return session;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ username: z.string(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { username, password } = parsedCredentials.data;
                    const user = await getUser(username);
                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    // filter out the password from the user object
                    // delete user.password;
                    // user.password = 'hidden';

                    if (passwordsMatch) {
                        // Hide password in the returned user object
                        const { password, ...userWithoutPassword } = user;
                        return userWithoutPassword;
                    }
                }

                console.log('Invalid credentials');
                return null;
            },
        }),       
    ],
});
