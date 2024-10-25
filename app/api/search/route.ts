import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = req.url;

    console.log(url);
    

    return NextResponse.json({ message: 'asassa' });
};