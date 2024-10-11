import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Task } from "@/models/Task";
import { NextResponse } from "next/server"

export async function DELETE(req: Request) {
    const commentId = req.url.split("/").at(-1);
    const taskId = req.url.split("/").at(-3);
    
    const bearer = req.headers.get("Authorization");    

    const accessToken = bearer?.split(" ")[1] || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Access token is not valid!' }, { status: 403 });
    }
    
    await connectToDB();

    const task = await Task.findOne({ _id: taskId });

    const { comments } = task;
    
    const filteredComments = JSON.parse(JSON.stringify(comments)).filter((comment: any) => comment._id !== commentId);

    await Task.updateOne({ _id: taskId }, { comments: filteredComments });

    return NextResponse.json({ message: 'Deleted!' });
};