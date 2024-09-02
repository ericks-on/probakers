import { DefaultSession } from 'next-auth';
import type { NextAuthConfig } from 'next-auth';


export const authConfig = {
    providers: [],
    pages: {
        signIn: '/',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnInventory = nextUrl.pathname.startsWith('/inventory');
            const isAssetRequest = /\.(jpg|jpeg|png|gif|svg|css|js|ico|woff2?)$/.test(nextUrl.pathname);
            // for assets
            if (isAssetRequest) return true;
            

            if (isOnInventory) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/inventory', nextUrl));
            }
            return true;
            
        },
        
    },
    secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig;