import { connectToDB } from "@/lib/connectToDB";
import { hashPassword } from "@/lib/hashPassword";
import { verifyAccessToken } from "@/lib/verifyToken";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const bearer = req.headers.get("Authorization");
    const { fullName,email,password,role,title,status } = await req.json();

    const accessToken = bearer?.split(" ")[1] || "";

    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
    }

    const hashedPassword = await hashPassword(password);

    await connectToDB();

    const user = new User({ fullName, email, password: hashedPassword, role, status, title });

    await user.save();
    
    return NextResponse.json({ message: 'Added!', addedUser: user });
};

export async function GET(req: Request) {
    const bearer = req.headers.get("Authorization");

    const accessToken = bearer?.split(" ")[1] || "";    

    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
    }

    await connectToDB();

    const users = await User.find();    

    const filtererUser = JSON.parse(JSON.stringify(users)).filter((user: Partial<UserType>) => user.role !== 'Admin');
    
    return NextResponse.json({ message: 'Success', users: filtererUser }, { status: 200 });
};