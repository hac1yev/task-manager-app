import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Task } from "@/models/Task";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId,fullName,description,adding_at } = await req.json();
    const taskId = req.url.split("/").at(-2);
    const bearer = req.headers.get("Authorization");    

    const accessToken = bearer?.split(" ")[1] || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
    }
    
    await connectToDB();

    await Task.findByIdAndUpdate({ _id: taskId }, { $push: { comments: { userId, fullName, description, adding_at } } });

    const task = await Task.findById({ _id: taskId });

    const taskObj = JSON.parse(JSON.stringify(task));

    return NextResponse.json({ message: 'Comment Added', addedComment: taskObj.comments.at(-1) });
};