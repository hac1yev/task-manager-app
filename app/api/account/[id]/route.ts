import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const bearer = req.headers.get("Authorization");
    const url = req.url;

    const accessToken = bearer?.split(" ")[1] || "";    
    const id = url.split("/").at(-1);
        
    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await connectToDB();

    await User.deleteOne({ _id: id });

    const response = NextResponse.json({ message: 'Success' });
    
    response.cookies.set('refreshToken', '', {
        expires: new Date(0),
        path: '/',
        httpOnly: true,
        secure: true
    });

    return response;
};