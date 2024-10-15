// import { ManagerField  } from "./definitions";
// import { Manager } from "./models";
// import { connectToDB } from "./utils";


// export const fetchManager = async (): Promise<ManagerField[]> => {
//     try {
//         await connectToDB();
        
//         const managers: Array<ManagerField> = await Manager.find({onSite: true}).lean();
//         return managers.map(manager => ({
//             _id: manager._id.toString(),
//             name: manager.name,
//             phone: manager.phone,
//             viber: manager.viber || "", // Добавляем пустую строку по умолчанию
//             telegram: manager.telegram || "", // Добавляем пустую строку по умолчанию
//             whatsapp: manager.whatsapp || "", // Добавляем пустую строку по умолчанию
//             image: manager.image, // Если image существует, оно уже должно быть типизировано
//         }));
//     } catch (err) {
//         console.log(err);
//         throw new Error("Failed to fetch managers!");
//     }
// };

// // export const fetchProfession = async (): Promise<ProfessionField[]> => {
// //     try {
// //          await connectToDB(); // Добавлен await для гарантии асинхронного подключения
// //          const professions = await Profession.find({}, 'name category') // Получаем профессии с полями name и category
// //          .sort({ name: 1 }) // Сортируем по name в алфавитном порядке
// //          .lean(); // Преобразуем результат в простой объект JavaScript
     
     
// //      // Преобразуем список профессий в новый формат
// //      const formattedProfessions = professions.map(profession => ({
// //          _id: profession._id.toString(), // Преобразуем _id в строку
// //          name: profession.name, // Оставляем поле name как есть
// //          category: profession.category // Оставляем поле category как есть
// //      }));
     
// //      return formattedProfessions; // Возвращаем преобразованный список профессий
     
// //     } catch (err) {
// //         console.log(err);
// //         throw new Error("Failed to fetch Profession!");
// //     }
// // };