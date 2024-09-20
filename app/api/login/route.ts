import { comparePassword } from "@/lib/comparePassword";
import { connectToDB } from "@/lib/connectToDB";
import { User } from "@/models/User";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email,password } = await req.json();

    await connectToDB();

    const user = await User.findOne({ email });
    
    if(!user) {        
        return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
    }    

    const passwordIsValid = await comparePassword(password, user.password);

    if(!passwordIsValid) {
        return NextResponse.json({ message: 'Password is not correct!' }, { status: 401 });
    }

    const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const refreshSecretKey = new TextEncoder().encode(process.env.REFRESH_SECRET_KEY);

    const accessToken = await new SignJWT({ 
        email,
        role: email === 'ilkinhaciyev955@gmail.com' ? 'Admin' : 'User' 
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(jwtSecretKey);

    const refreshToken = await new SignJWT({ 
        email,
        role: email === 'ilkinhaciyev955@gmail.com' ? 'Admin' : 'User' 
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(refreshSecretKey);
    
    const response = NextResponse.json({ 
        _id: user._id,
        role: email === 'ilkinhaciyev955@gmail.com' ? 'Admin' : 'User', 
        fullName: user.fullName,
        title: user.title,
        email,
        message: "Login successfully!", 
        accessToken, 
    }, { status: 200 });

    response.cookies.set({
        name: 'refreshToken',
        value: refreshToken,
        path: '/',
        httpOnly: true,
        secure: true   
    });

    return response;
};