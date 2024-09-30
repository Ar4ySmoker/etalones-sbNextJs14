import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils'; 
import {Candidate} from '@/lib/models'; 




export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    await connectToDB();

    // Проверяем, существует ли кандидат с таким номером телефона
    const existingCandidate = await Candidate.findOne({ phone: body.phone });
    if (existingCandidate) {
      return new NextResponse(
        JSON.stringify({
          message: "Кандидат с таким номером телефона уже существует",
        }),
        {
          status: 400,
        }
      );
    }

    const newCandidate = new Candidate(body);
    await newCandidate.save();

    return new NextResponse(
      JSON.stringify({ message: "Candidate is created", candidate: newCandidate }),
      { status: 201 }
    );

  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating user",
        error,
      }),
      {
        status: 500,
      }
    );
  }
};
