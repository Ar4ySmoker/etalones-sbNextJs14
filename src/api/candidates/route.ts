import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils';
import { Manager } from '@/lib/models';

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();
    console.log("Connected to DB successfully");
    
    const managers = await Manager.find({});
    console.log("Fetched managers:", managers);
    
    const response = {
      managers
    };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error in fetching:", (error as Error).message);
    return new NextResponse("Error in fetching: " + (error as Error).message, { status: 500 });
  }
};
