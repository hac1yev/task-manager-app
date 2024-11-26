import { connectToDB } from "@/lib/connectToDB";
import { verifyAccessToken } from "@/lib/verifyToken";
import { Settings } from "@/models/Settings";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const bearer = req.headers.get("Authorization");
    const url = req.url;

    const accessToken = bearer?.split(" ")[1] || "";    
    const id = url.split("/").at(-1);
        
    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await connectToDB();

    await User.deleteOne({ _id: id });
    await Settings.deleteOne({ userId: id });

    return NextResponse.json({ message: 'Success' });
};

export async function POST(req: Request) {
    const { fullName,email,title,role,biography,avatar } = await req.json();
    const bearer = req.headers.get("Authorization");
    const url = req.url;
    let myNewImage;
    
    const accessToken = bearer?.split(" ")[1] || "";    
    const id = url.split("/").at(-1);
        
    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }    

    const base64Data = avatar.replace(/^data:image\/\w+;base64,/, '');
    const binaryData = Buffer.from(base64Data, 'base64');    

    try {
        const response = await fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({
            image: binaryData.toString('base64'),
            type: 'base64',
          }),
        });
  
        const responseData = await response.json();
  
        myNewImage = responseData.data.link;
  
    } catch (error) {
        console.log(error);
    }            

    await connectToDB();    

    await User.updateOne({ _id: id }, { fullName, email, title, role, biography, avatar: myNewImage });

    const newUserInfo = { fullName, email, title, role, biography, avatar: myNewImage }; 

    return NextResponse.json({ message: 'Success', newUserInfo });
};

export async function GET(req: Request) {
    const bearer = req.headers.get("Authorization");
    const url = req.url;

    const accessToken = bearer?.split(" ")[1] || "";    
    const id = url.split("/").at(-1);
        
    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await connectToDB();

    const user = await User.findOne({ _id: id });

    return NextResponse.json({ message: 'Success', user });
};

export async function PUT(req: Request) {
    const bearer = req.headers.get("Authorization");
    const url = req.url;

    const accessToken = bearer?.split(" ")[1] || "";    
    const id = url.split("/").at(-1);
        
    const isAccessTokenValid = await verifyAccessToken(accessToken);

    if(!isAccessTokenValid) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await connectToDB();

    await User.updateOne({ _id: id }, { avatar: "" });

    return NextResponse.json({ message: 'Successfully deleted!' });
}