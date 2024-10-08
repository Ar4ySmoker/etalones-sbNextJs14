import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/utils";
import { Profession } from "@/lib/models";

export const GET = async() =>{
    try{
await connectToDB()
const profession = await Profession.find().sort({ name: 1 })
return new NextResponse(JSON.stringify(profession), {status:200})

    }
    catch(error){
return new NextResponse("error in fetch professions" + error, {status:500})
    }
}