import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Task } from "@/models/Task";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const bearer = req.headers.get("Authorization");    
    const url = req.url;
    const id = url.split("/").at(-1);

    const accessToken = bearer?.split(" ")[1] || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Access token is not valid!' }, { status: 403 });
    }

    await connectToDB();

    await Task.deleteOne({ _id: id });

    return NextResponse.json({ message: 'Deleted Successfully!' });
};

export async function POST(req: Request) {
    const bearer = req.headers.get("Authorization");    
    const url = req.url;
    const id = url.split("/").at(-1);
    const data = await req.json();
        
    const accessToken = bearer?.split(" ")[1] || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Access token is not valid!' }, { status: 403 });
    }

    await connectToDB();

    await Task.updateOne({ _id: id }, { ...data });

    return NextResponse.json({ message: 'Deleted Successfully!' });
};

export async function GET(req: Request) {
    const bearer = req.headers.get("Authorization");    
    const url = req.url;
    const id = url.split("/").at(-1);
        
    const accessToken = bearer?.split(" ")[1] || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Access token is not valid!' }, { status: 403 });
    }

    await connectToDB();

    const taskDetail = await Task.findOne({ _id: id });

    return NextResponse.json({ message: 'Deleted Successfully!', data: taskDetail });
};