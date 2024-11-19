import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import fs from 'node:fs';
import path from 'path';

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
    const { fullName,email,title,role,biography,avatar,fileName } = await req.json();
    const bearer = req.headers.get("Authorization");
    const url = req.url;
    
    const accessToken = bearer?.split(" ")[1] || "";    
    const id = url.split("/").at(-1);
        
    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Access token is expired' }, { status: 403 });
    }    


    let imagePath;

    if (avatar && typeof avatar === 'string' && avatar.startsWith('data:image')) {
        const extension = avatar.match(/data:image\/(.*?);base64/)?.[1];
        const file = `${fileName}.${extension}`; 
        const fullFilePath = path.join(process.cwd(), 'public', 'images', file);

        const directory = path.dirname(fullFilePath);
        fs.mkdirSync(directory, { recursive: true });

        const base64Data = avatar.split(";base64,").pop();
        if (!base64Data) {
            throw new Error("Invalid base64 data");
        }

        const buffer = Buffer.from(base64Data, 'base64');
        console.log(buffer);

        const stream = fs.createWriteStream(fullFilePath);

        stream.on('error', (error) => {
            console.error('Error saving the image:', error);
            throw new Error("Saving image failed!");
        });

        stream.write(buffer);
        stream.end();

        imagePath = `/images/${file}`;
    }
    
    await connectToDB();    

    await User.updateOne({ _id: id }, { fullName, email, title, role, biography, avatar: imagePath });

    return NextResponse.json({ message: 'Success' });
};

export async function GET(req: Request) {
    const bearer = req.headers.get("Authorization");
    const url = req.url;

    const accessToken = bearer?.split(" ")[1] || "";    
    const id = url.split("/").at(-1);
        
    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Access token is expired' }, { status: 403 });
    }

    await connectToDB();

    const user = await User.findOne({ _id: id });

    return NextResponse.json({ message: 'Success', user });
};