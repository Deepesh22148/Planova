import UserModel from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        // Validate password
        const isValid = await user.isPasswordValid(password);
        if (!isValid) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        // Authentication successful
        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error', error: (error as Error).message }, { status: 500 });
    }
}