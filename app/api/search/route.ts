import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Task } from "@/models/Task";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const accessToken = req.headers.get("Authorization")?.split(" ")[1] || "";    
    const url = req.url;

    const arr = url.split("?")[1].split("&");
    const newArr = arr.map((item) => {
        const a = item.split("=");
        return a;
    });

    const { q,page } = Object.fromEntries(newArr);

    const isValidAccessToken = await verifyAccessToken(accessToken);
    
    if(!isValidAccessToken) {
        return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
    }

    await connectToDB();

    const regex = new RegExp(q, "i");

    const data = await Task.find({
        $or: [
            { title: { $regex: regex } },
        ]
    });
    
    console.log(data);

    return NextResponse.json({ message: 'asassa', tasks: data });
};