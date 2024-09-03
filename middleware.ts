import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyRefreshToken } from './lib/verifyToken';

const authPages = ['/login','/forget-password'];

const isAuthPage = (url: string) => authPages.includes(url);

export async function middleware(request: NextRequest) {
    const { url,nextUrl,cookies } = request;
    const refreshToken = cookies.get("refreshToken")?.value || "";

    const notAuthPage = ['/','/team'];
    const isValidRefreshToken = await verifyRefreshToken(refreshToken);

    if(notAuthPage.includes(nextUrl.pathname)) {
        if(isValidRefreshToken) {
            return NextResponse.next();
        }else{
            return NextResponse.redirect(new URL("/login", url));
        }
    }
    
    const isAuthPageRequested = isAuthPage(nextUrl.pathname);
    
    if(isAuthPageRequested) {
        if(isValidRefreshToken) {
            return NextResponse.redirect(new URL('/', url));
        }

        return NextResponse.next();
    };
}

export const config = {
  matcher: ['/', '/login', '/team'],
};