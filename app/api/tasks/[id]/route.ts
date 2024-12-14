import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Task } from "@/models/Task";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const bearer = req.headers.get("Authorization");    
    const url = req.url;
    const id = url.split("/").at(-1);

    const accessToken = bearer?.split(" ")[1] || "";

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
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
        return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
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
        return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
    }

    await connectToDB();

    const taskDetail = await Task.findOne({ _id: id });
    const users = await User.find();

    const updatedComments = taskDetail.comments.map((comment: {
        _id?: string;
        fullName: string;
        userId: string;
        description: string;
        avatar: string;
        adding_at:string;
        likes: string[];
    }) => {
        if(!comment?.avatar) {
            const findedUser = users.find((user) => user._id == comment.userId);            
            comment.avatar = findedUser?.avatar;
        }

        return comment;
    });    

    taskDetail.comments = [
        ...updatedComments
    ];

    return NextResponse.json({ message: 'Deleted Successfully!', data: taskDetail });
};