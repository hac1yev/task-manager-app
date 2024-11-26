import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Settings } from "@/models/Settings";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const bearer = req.headers.get("Authorization");
    const accessToken = bearer?.split(" ")[1] || "";    
        
    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await connectToDB();

    const settings = await Settings.find();
    
    return NextResponse.json({ message: 'Success', settings });
};