import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils';
import { Candidate } from '@/lib/models';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    await connectToDB();   

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

// export const POST = async (request: NextRequest) => {
//     try {
//         await connectToDB();

//         const data = await request.formData();

//         // Extract fields, ensuring correct handling for different types
//         const name = data.get('name') as string;
//         const phone = data.get('phone') as string;
//         const age = new Date(data.get('age') as string); // Ensure age is a Date
//         const locations = data.get('locations') as string;
//         const professions = {
//             name: data.get('profession') as string, // Adjusted for the profession input
//         };
//         const drivePermis = JSON.parse(data.get('drivePermis') as string || '[]');
//         const documents = JSON.parse(data.get('documents') as string || '[]');
        
//         // Extract language information, ensuring it's parsed correctly
//         const langue = {
//             name: data.get('langue') as string || '',
//             level: data.get('langueLvl') as string || ''
//         };
        
//         const currentPage = data.get('currentPage') as string;
//         const source = 'сайт'; // Set the source directly as it seems static

//         let avatar: { name: string; data: Buffer; contentType: string } | null = null;

//         // Check if a file is uploaded
//         const file = data.get('avatar');
//         if (file instanceof File) {
//             const bufferData = await file.arrayBuffer();
//             const buffer = Buffer.from(bufferData);
//             avatar = {
//                 name: file.name,
//                 data: buffer,
//                 contentType: file.type,
//             };
//         }

//         // Create a new candidate
//         const newCandidate = new Candidate({
//             name,
//             phone,
//             age,
//             locations,
//             professions,
//             drivePermis,
//             documents,
//             langue,
//             currentPage,
//             source,
//             avatar, // Include image if present
//         });

//         // Save the candidate to the database
//         await newCandidate.save();

//         return new NextResponse(
//             JSON.stringify({ success: true, message: "Кандидат успешно создан", candidate: newCandidate }),
//             { status: 201 }
//         );

//     } catch (error) {
//         console.error("Ошибка при создании кандидата:", error);
//         return new NextResponse(
//             JSON.stringify({ success: false, message: "Ошибка при создании кандидата", error: error.message }),
//             { status: 500 }
//         );
//     }
// };
