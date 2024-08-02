// import { NextRequest, NextResponse } from 'next/server';
// import { connectToDB } from '@/lib/utils';
// import { News } from '@/lib/models';

// export const GET = async (request: NextRequest) => {
//   try {
//     await connectToDB();
//     const { searchParams } = new URL(request.url);
//     const category = searchParams.get('category');

//     const query: { category?: string } = {};
//     if (category) query.category = category;

//     const news = await News.find(query).sort({ createdAt: -1 });
//     const response = { news };

//     return new NextResponse(JSON.stringify(response), { status: 200 });
//   } catch (error) {
//     console.error("Error in fetching:", error);
//     return new NextResponse("Error in fetching: " + error, { status: 500 });
//   }
// };
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils';
import { News } from '@/lib/models';

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '1', 10); // Лимит по умолчанию - 1 новость

    const query: { category?: string } = {};
    if (category) query.category = category;

    const news = await News.find(query)
      // .sort({ createdAt: -1 })
      .skip((page - 1) * limit) // Пропуск предыдущих новостей
      .limit(limit); // Ограничение количества загружаемых новостей

    const response = { news };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error in fetching:", error);
    return new NextResponse("Error in fetching: " + error, { status: 500 });
  }
};
