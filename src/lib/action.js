import { title } from "process";
import {  Vacancy } from "./models";
import { connectToDB } from "./utils";

export const fetchVacancy = async () => {
    try {
        await connectToDB();
        console.log("Connected to the db");
        const vacancy = await Vacancy.find().lean();
        console.log('vacancy', vacancy)
        return vacancy.map(vacancy => ({
            _id: vacancy._id.toString(),
            title: vacancy.title,
          }));
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch Langue!");
    }
};