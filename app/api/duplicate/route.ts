import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Task } from "@/models/Task";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const bearer = req.headers.get("Authorization");
    const id = await req.json();

    const accessToken = bearer?.split(" ")[1] || "";    
        
    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Access token is expired' }, { status: 403 });
    }    

    await connectToDB();

    const task = await Task.findOne({ _id: id });

    const obj = JSON.parse(JSON.stringify(task));

    delete obj._id;    
    
    const newTask = new Task({ ...obj });
    await newTask.save();

    return NextResponse.json({ message: 'Success', duplicateTask: newTask });
};