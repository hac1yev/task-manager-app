import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { verifyRefreshToken } from './lib/verifyToken';

const authPages = ['/login','/forget-password'];

const isAuthPage = (url: string) => authPages.includes(url);

export async function middleware(request: NextRequest) {
    const { url,nextUrl,cookies } = request;
    const refreshToken = cookies.get("refreshToken")?.value || "";
    
    if(nextUrl.pathname === '/settings') {
        return NextResponse.redirect(new URL("/settings/account", url));
    }

    const notAuthPage = ['/', '/team', '/in-progress', '/completed', '/to-do', '/search'];
    const isValidRefreshToken = await verifyRefreshToken(refreshToken);

    if(notAuthPage.includes(nextUrl.pathname) || nextUrl.pathname.startsWith('/tasks')) {        
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
  matcher: ['/', '/login', '/team', '/tasks/:path*', '/in-progress', '/completed', '/to-do', '/search','/settings'],
};