import { verifyRefreshToken } from "@/lib/verifyToken";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const cookie = req.headers.get("cookie");

    const refreshToken = cookie?.split("=")[1] || "";

    const isValidRefreshToken = await verifyRefreshToken(refreshToken);
    
    if(isValidRefreshToken) {
        const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

        const newAccessToken = await new SignJWT({ 
            email: isValidRefreshToken.email,
            role: isValidRefreshToken.role 
        })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30s')
        .sign(jwtSecretKey);

        return NextResponse.json({
            role: isValidRefreshToken.role, 
            message: 'New access token created!', 
            newAccessToken 
        }); 
    }

    return NextResponse.json({ message: 'Refresh token is not valid!' }, { status: 401 });
};