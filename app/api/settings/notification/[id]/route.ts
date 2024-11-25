import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Settings } from "@/models/Settings";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = req.url;
    const userId = url.split("/").at(-1);
    const accessToken = req.headers.get("Authorization")?.split(" ").at(-1) || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);

    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await connectToDB();

    const settings: any = await Settings.findOne({ userId });    
    
    return NextResponse.json({ message: 'sadasdas', settings });
}