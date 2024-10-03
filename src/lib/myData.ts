import { ManagerField } from "./definitions";
import { Manager } from "./models";
import { connectToDB } from "./utils";


export const fetchManager = async (): Promise<ManagerField[]> => {
    try {
        await connectToDB();
        
        const managers: Array<ManagerField> = await Manager.find({}).lean();
        return managers.map(manager => ({
            _id: manager._id.toString(),
            name: manager.name,
            phone: manager.phone,
            viber: manager.viber || "", // Добавляем пустую строку по умолчанию
            telegram: manager.telegram || "", // Добавляем пустую строку по умолчанию
            whatsapp: manager.whatsapp || "", // Добавляем пустую строку по умолчанию
            image: manager.image, // Если image существует, оно уже должно быть типизировано
        }));

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch managers!");
    }
};
