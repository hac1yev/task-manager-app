import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Task } from "@/models/Task";
import { Trash } from "@/models/Trash";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const bearer = req.headers.get("Authorization");
    const url = req.url;
    const id = url.split("/").at(-1);

    const accessToken = bearer?.split(" ")[1] || "";

    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Access token is not valid!' }, { status: 403 });
    }

    await connectToDB();
    
    await Task.updateOne({ _id: id }, { isDeleted: true });

    await Trash.updateOne({}, { $push: { trashTasks: id }}, { upsert: true });
    
    return NextResponse.json({ message: 'Success!' });
};

export async function PUT(req: Request) {
    const bearer = req.headers.get("Authorization");
    const method = await req.json();
    const url = req.url;
    const id = url.split("/").at(-1);

    const accessToken = bearer?.split(" ")[1] || "";

    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Access token is not valid!' }, { status: 403 });
    }

    await connectToDB();

    if(method === "DELETE") {
        await Trash.updateOne({}, { $pull: { trashTasks: id } });
        await Task.deleteOne({ _id: id });    
    
        return NextResponse.json({ message: 'Deleted Successfully!' });
    }else{
        await Trash.updateOne({}, { $pull: { trashTasks: id } });
        await Task.updateOne({ _id: id }, { isDeleted: false });    
    
    }
    return NextResponse.json({ message: 'Restored Successfully!' });
};