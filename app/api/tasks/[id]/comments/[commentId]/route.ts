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

export async function POST(req: Request) {
    const commentId = req.url.split("/").at(-1);
    const taskId = req.url.split("/").at(-3);
    const { userId,type } = await req.json();
        
    const bearer = req.headers.get("Authorization");    

    const accessToken = bearer?.split(" ")[1] || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Access token is not valid!' }, { status: 403 });
    }

    await connectToDB();

    const task = await Task.findOne({ _id: taskId });

    const { comments } = task;

    const parsedComments = JSON.parse(JSON.stringify(comments));
    
    const findedCommentIndex = parsedComments.findIndex((comment: any) => comment._id === commentId);
    
    if(type === 'like') {
        if(!parsedComments[findedCommentIndex].likes.includes(userId)) {
            parsedComments[findedCommentIndex].likes = [...parsedComments[findedCommentIndex].likes, userId];
        }    
    }else{
        parsedComments[findedCommentIndex].likes = parsedComments[findedCommentIndex].likes.filter((user: string) => user !== userId) 
    }
 
    await Task.updateOne({ _id: taskId }, { comments: parsedComments });

    return NextResponse.json({ message: 'Success' })
}