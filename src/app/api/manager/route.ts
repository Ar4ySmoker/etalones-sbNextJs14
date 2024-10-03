import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils';
import { Manager } from '@/lib/models';

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();

    const managers = await Manager.find({onSite: true})
      .sort({ createdAt: -1 });

    console.log("Fetched managers:", managers);

    const response = {
      managers,
      totalCount: managers.length,
    };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error in fetching:", error);
    return new NextResponse("Error in fetching: " + error, { status: 500 });
  }
};
