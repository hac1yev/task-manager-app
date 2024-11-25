import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Settings } from "@/models/Settings";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { notificationSettings,userId } = await req.json();
    const bearer = req.headers.get("Authorization");
    const url = req.url;

    const accessToken = bearer?.split(" ")[1] || "";    
    const id = url.split("/").at(-1);
        
    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await connectToDB();

    const newSettingsNotification = new Settings({ userId, notification: notificationSettings });
    await newSettingsNotification.save();

    return NextResponse.json({ message: 'Success' });
};