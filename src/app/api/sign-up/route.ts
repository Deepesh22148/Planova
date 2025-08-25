import UserModel from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const {
            username,
            fullname,
            address,
            email,
            phone,
            password,
        } = await req.json();

        console.log("Axios reached");
        
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
        }

        // Create new user
        const newUser = new UserModel({
            name : fullname,
            username : username,
            address : address,
            email : email,
            phone : phone,
            password : password,
        });

        console.log(newUser);
        await newUser.save();

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error', error: (error as Error).message }, { status: 500 });
    }
}