import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Task } from "@/models/Task";
import { Trash } from "@/models/Trash";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const bearer = req.headers.get("Authorization");

    const accessToken = bearer?.split(" ")[1] || "";

    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Access token is not valid!' }, { status: 403 });
    }

    await connectToDB();

    const tasks = await Task.find({ isDeleted: true });

    return NextResponse.json({ message: 'Success', tasks });
};

export async function PUT(req: Request) {
    const bearer = req.headers.get("Authorization");
    const method = await req.json();

    const accessToken = bearer?.split(" ")[1] || "";

    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Access token is not valid!' }, { status: 403 });
    }

    await connectToDB();

    if(method === 'DELETE') {
        await Trash.deleteOne({});
        await Task.deleteMany({ isDeleted: true });    

        return NextResponse.json({ message: 'Deleted Successfully!' });
    }else{
        await Trash.deleteOne({});
        await Task.updateMany({ isDeleted: true }, { isDeleted: false });    

        return NextResponse.json({ message: 'Restored Successfully!' });
    }  
};