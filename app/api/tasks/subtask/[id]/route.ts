import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Task } from "@/models/Task";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const bearer = req.headers.get("Authorization");    
    const data = await req.json();
    const url = req.url;
    const id = url.split("/").at(-1);

    const accessToken = bearer?.split(" ")[1] || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
    }    

    await connectToDB();
    
    await Task.updateOne({ _id: id }, { $push: { subtask: { ...data } }});

    return NextResponse.json({ message: 'Success' });
};