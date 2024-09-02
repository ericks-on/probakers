import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
    role: string;
    info: {
        username: string;
        email: string;
    };
};

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;
    }
}