import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const bearer = req.headers.get("Authorization");
    const url = req.url;

    const accessToken = bearer?.split(" ")[1] || "";    
    const id = url.split("/").at(-1);
        
    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Access token is expired' }, { status: 403 });
    }

    await connectToDB();

    await User.deleteOne({ _id: id });

    return NextResponse.json({ message: 'Success' });
};

export async function POST(req: Request) {
    const { fullName,email,title,role } = await req.json();
    const bearer = req.headers.get("Authorization");
    const url = req.url;

    const accessToken = bearer?.split(" ")[1] || "";    
    const id = url.split("/").at(-1);
        
    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Access token is expired' }, { status: 403 });
    }    

    await connectToDB();

    await User.updateOne({ _id: id }, { fullName, email, title, role });

    return NextResponse.json({ message: 'Success' });
};