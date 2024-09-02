import { verifyAccessToken } from "@/lib/verifyToken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const bearer = req.headers.get("Authorization");    

    const accessToken = bearer?.split(" ")[1] || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Access token is not valid!' }, { status: 403 });
    }

    return NextResponse.json({ message: 'Success' });
};