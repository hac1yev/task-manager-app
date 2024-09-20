import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const response = NextResponse.json({ message: 'Success' });

    response.cookies.set('refreshToken', '', {
        expires: new Date(0),
        path: '/',
        httpOnly: true,
        secure: true
    });

    return response;
};