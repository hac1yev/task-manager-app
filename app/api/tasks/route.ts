import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Task } from "@/models/Task";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const bearer = req.headers.get("Authorization");    

    const accessToken = bearer?.split(" ")[1] || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
    }

    await connectToDB();

    const tasks = await Task.find({ isDeleted: false });

    return NextResponse.json({ message: 'Success', tasks });
};

export async function POST(req: Request) {
    const bearer = req.headers.get("Authorization");    
    const data = await req.json();

    const accessToken = bearer?.split(" ")[1] || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
    }
    
    await connectToDB();

    const newTask = new Task({ ...data });
    await newTask.save();

    return NextResponse.json({ message: 'Success', addedTask: newTask });
};