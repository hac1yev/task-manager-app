import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Notification } from "@/models/Notification";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const bearer = req.headers.get("Authorization");    
    const data = await req.json();

    const accessToken = bearer?.split(" ")[1] || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
    }

    await connectToDB();

    const newNotification = new Notification({ ...data });
    await newNotification.save();
    
    return NextResponse.json({ message: 'Success', notification: newNotification });
};

export async function GET(req: Request) {
    const bearer = req.headers.get("Authorization");    

    const accessToken = bearer?.split(" ")[1] || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
    }
    
    await connectToDB();

    const notifications = await Notification.find();

    return NextResponse.json({ message: 'Success', notifications });
}

export async function PUT(req: Request) {
    const { ids,userId } = await req.json();
    const bearer = req.headers.get("Authorization");    

    const accessToken = bearer?.split(" ")[1] || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
    }

    await connectToDB();
    
    async function addUserIdToNotification(id: string) {
        const notification: any = await Notification.findOne({ _id: id });
        
        if(!notification?.isReadUsers.includes(userId)) {
            await Notification.findByIdAndUpdate({ _id: id }, { $push: { isReadUsers: userId } });
        }
    };

    ids.forEach((id: string) => {
        addUserIdToNotification(id);
    }); 

    return NextResponse.json({ message: 'Success' });
};