'use client';
import TextInput from "../TextInput/TextInput";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";
import CMultiSelect from "../Multiselect/Multiselect";
import { sendMessage, sendPhoto } from "@/app/api/telegram/telegram";
import { useRouter } from "next/navigation";

const drivePermis = [
    { label: "В", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
    { label: "Код 95", value: "Код 95" },
    { label: "Есть своё авто", value: "Есть своё авто" },
];

const documents1 = [
    { label: "Виза", value: "Виза" },
    { label: "Песель", value: "Песель" },
    { label: "Паспорт", value: "Паспорт" },
    { label: "Паспорт ЕС", value: "Паспорт ЕС"},
    { label: "Паспорт Биометрия Украины", value: "Паспорт Биометрия Украины" },
    { label: "Параграф 24", value: "Параграф 24" },
    { label: "Карта побыту", value: "Карта побыту" },
    { label: "Геверба", value: "Геверба" },
    { label: "Карта сталого побыта", value: "Карта сталого побыта" },
    { label: "Приглашение", value: "Приглашение" },
];

const experienceOptions = [
    { label: "Без опыта", value: "Без опыта"},
    { label: "Меньше года", value: "Меньше года" },
    { label: "Более года", value: "Более года" },
    { label: "От 2-х лет", value: "От 2-х лет" },
    { label: "Более 10-ти лет", value: "Более 10-ти лет" },
];

export default function AnketaModalContent({ onClose }: { onClose: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [selectedDrive, setSelectedDrive] = useState<{ label: string; value: string }[]>([]);
    // const [selectedDocuments, setSelectedDocuments] = useState<{ label: string; value: string }[]>([]);
    const [documentEntries, setDocumentEntries] = useState<{ docType: string; dateOfIssue: string; dateExp: string; numberDoc: string }[]>([]);

    const [isAdditionalDataOpen, setIsAdditionalDataOpen] = useState(false);
    const [professions, setProfessions] = useState<{ _id: string; name: string }[]>([]);
    const [professionsWithExperience, setProfessionsWithExperience] = useState([{ name: '', experience: '' }]);
    const [formData, setFormData] = useState({
        source: 'сайт',
        name: '',
        phone: '',
        age: '',
        locations: '',
        langue: {
            name: '',
            level: ''
        }
    });
    const router = useRouter();

    useEffect(() => {
        const fetchProfessions = async () => {
            try {
                const response = await fetch('/api/profession');
                if (!response.ok) throw new Error('Ошибка при загрузке профессий');
                const data = await response.json();
                setProfessions(data);
            } catch (error) {
                console.error('Ошибка загрузки профессий:', error);
            }
        };

        fetchProfessions();
    }, []);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLSelectElement>, field: 'name' | 'experience') => {
        const value = e.target.value;
        const updated = [...professionsWithExperience];
        updated[index] = { ...updated[index], [field]: value };
        setProfessionsWithExperience(updated);
    };
    const handleLangueChange = (field: 'name' | 'level', value: string) => {
                setFormData(prevData => ({
                    ...prevData,
                    langue: {
                        ...prevData.langue,
                        [field]: value
                    }
                }));
            };
        
    const addProfessionExperience = () => {
        setProfessionsWithExperience([...professionsWithExperience, { name: '', experience: '' }]);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const calculateAge = (birthDate: Date) => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    
    //     const { name, phone, locations } = formData;
    //     const language = formData.langue.name;
    //     const languageLevel = formData.langue.level;
    //     const birthDate = new Date(formData.age);
    //     const calculatedAge = calculateAge(birthDate);
    
    //     // Составляем сообщение
    //     const message = `
    //     Имя: ${name}
    //     Телефон: ${phone}
    //     Профессии: 
    //     ${professionsWithExperience.map(prof => `${prof.name} (${prof.experience})`).join('<br>')}
    //     Возраст: ${calculatedAge}
    //     Местоположение: ${locations}
    //     Язык: ${language}
    //     Уровень языка: ${languageLevel}
    //     Документы: ${selectedDocuments.map(d => d.value).join(', ')}
    //     Категории В/У: ${selectedDrive.map(d => d.label).join(', ')}
    // `;
    
    
    //     setIsLoading(true);
    
    //     try {
    //         // Если файл загружен, отправляем его с сообщением
    //         if (file) {
    //             const arrayBuffer = await file.arrayBuffer();
    //             const buffer = Buffer.from(arrayBuffer);
    //             await sendPhoto(buffer, message); // Отправляем фото с описанием
    //         } else {
    //             // Если файла нет, просто отправляем текстовое сообщение
    //             await sendMessage(message);

    //             await sendMessage(phone);
    //         }
    
    //         // Отправка данных на сервер
    //         const body = {
    //             ...formData,
    //             avatar: {
    //                 name: file?.name,
    //                 data: file ? await file.arrayBuffer() : null,
    //                 contentType: file?.type,
    //             },
    //             professions: professionsWithExperience,
    //             langue: {
    //                 name: formData.langue.name,
    //                 level: formData.langue.level
    //             },
    //             documents: selectedDocuments.map(doc => doc.value) || [],
    //             drivePermis: selectedDrive.map(d => d.value) || [],
    //             age: new Date(formData.age),
    //         };
    
    //         const response = await fetch('/api/addCandidate', { 
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(body)
    //         });
    
    //         const result = await response.json();
    //         if (response.ok) {
    //             console.log('Candidate created:', result);
    //         } else {
    //             // setErrorMessage(result.message); // Устанавливаем сообщение об ошибке
    //         }
    //     } catch (error) {
    //         console.error('Ошибка отправки сообщения:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, phone, locations } = formData;
    const language = formData.langue.name;
    const languageLevel = formData.langue.level;
    const birthDate = new Date(formData.age);
    const calculatedAge = calculateAge(birthDate);

    const body = {
        ...formData,
        avatar: {
            name: file?.name,
            data: file ? await file.arrayBuffer() : null,
            contentType: file?.type,
        },
        professions: professionsWithExperience,
        langue: {
            name: formData.langue.name,
            level: formData.langue.level
        },
        documents: documentEntries.map(entry => ({
            docType: entry.docType,
            dateOfIssue: entry.dateOfIssue,
            dateExp: entry.dateExp,
            numberDoc: entry.numberDoc,
        })),
        drivePermis: selectedDrive.map(d => d.value) || [],
        age: new Date(formData.age), 
    };

    const documentsString = documentEntries.map(entry => entry.docType).join('\n -');
    if (file) {
        const arrayBuffer = await file.arrayBuffer();
        body.avatar.data = Buffer.from(arrayBuffer);
    }


    try {
        const message = `
        Имя: ${name}
    Телефон: ${phone}
    Возраст: ${calculatedAge} 
    
    Профессии: 
- ${professionsWithExperience.map(prof => `${prof.name} (${prof.experience})`).join('\n -')}
    
    Местоположение: ${locations}
        
    Язык: ${language}
    Уровень языка: ${languageLevel}
        
    Документы: 
- ${documentsString}
        
    Категории В/У: 
- ${selectedDrive.map(d => d.label).join('\n -')}
      `;
      setIsLoading(true);
      if (file) {
                    const arrayBuffer = await file.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    await sendPhoto(buffer, message); // Отправляем фото с описанием
                    await sendMessage(phone);

                } else {
                    // Если файла нет, просто отправляем текстовое сообщение
                    await sendMessage(message);
    
                    await sendMessage(phone);
                }
        const response = await fetch('/api/addCandidate', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const result = await response.json();
        if (response.ok) {            
            onClose()
            alert("Ваша анкета успешно отправлена, мы свяжемся с вами в ближайшее время")
            console.log('Candidate created:', result);
     
        } else {
          // setErrorMessage(result.message); // Устанавливаем сообщение об ошибке
        }
      } catch (error) {
        console.error('Network error:', error);
      }
};

    


    return (
        <div className="flex justify-center items-center text-black max-w-[500px]">
            <div className="my-5 w-full h-full flex relative flex-wrap-reverse">
                <div className="relative w-full px-auto rounded-lg flex flex-col text-start">
                    <form onSubmit={handleSubmit} className="flex gap-5 rounded-xl justify-center flex-wrap border-solid border-2 border-black bg-gray-100 p-3 overflow-y-auto max-h-[80vh] scrollbar-hidden">
                        <div className="flex flex-col justify-start w-full">
                            <figure className="self-center">
                                {file ? (
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt="Uploaded file"
                                        width={300} height={300}
                                        className="rounded-md"
                                    />
                                ) : (
                                    <Image
                                        src="/defaultAvatar.jpg"
                                        alt="Uploaded file"
                                        width={70} height={70}
                                    />
                                )}
                            </figure>
                            <label>
                                <div className="font-bold text-sm">Загрузите фото</div>
                                <input
                                    className="file-input file-input-bordered input-sm w-full"
                                    type='file'
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                />
                            </label>
                            <TextInput onChange={handleFormChange} title="ФИО" name='name' type="text" placeholder="Иван Иванов" required className="input input-bordered input-success input-sm w-full my-1" id='name' />
                            <TextInput onChange={handleFormChange} title="Номер телефона (Viber, WhatsApp)" name="phone" type="tel" required className="input input-bordered input-success input-sm w-full my-1" id='phone' />
                            <label htmlFor="age">
                                <div className="text-sm font-bold">Дата рождения</div>
                                <input
                                    className="input input-bordered input-success input-sm w-full my-1"
                                    id="age"
                                    name="age"
                                    type="date"
                                    onChange={handleFormChange}
                                    required
                                />
                            </label>
                            <TextInput onChange={handleFormChange} title="Местоположение" name="locations" type="text" required className="input input-bordered input-success input-sm w-full my-1" id="locations" />

                            <p className="font-bold text-sm">Профессии и опыт</p>
                            {professionsWithExperience.map((item, index) => (
                                <div key={index} className="flex gap-2 my-1 items-center">
                                    <select
                                        value={item.name}
                                        onChange={(e) => handleChange(index, e, 'name')}
                                        className="input input-bordered input-success input-sm w-full"
                                        required
                                    >
                                        <option disabled value="">Выберите профессию</option>
                                        {professions.map((profession) => (
                                            <option key={profession._id} value={profession.name}>
                                                {profession.name}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        value={item.experience}
                                        onChange={(e) => handleChange(index, e, 'experience')}
                                        className="input input-bordered input-success input-sm w-full"
                                        required
                                    >
                                        <option disabled value="">Опыт работы</option>
                                        {experienceOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = [...professionsWithExperience];
                                            updated.splice(index, 1); // Удаляем профессию по индексу
                                            setProfessionsWithExperience(updated);
                                        }}
                                        className="btn btn-error btn-sm"
                                    >
                                        -
                                    </button>
                                </div>
                            ))}

                            <button type="button" onClick={addProfessionExperience} className="btn btn-sm btn-success btn-outline mt-2">Добавить профессию</button>

                            <div className={`collapse relative box-content ${isAdditionalDataOpen ? 'bg-gray-200' : ''}`}>
                                <input type="checkbox" onClick={() => setIsAdditionalDataOpen(!isAdditionalDataOpen)} />
                                <div className="collapse-title text-xl font-medium">
                                    <div className="flex justify-between items-center px-5 rounded-md w-full mx-auto">
                                        <span className="text-sm font-bold">Дополнительные данные</span>
                                        {isAdditionalDataOpen ? <ArrowBigUpDash className="animate-bounce" /> : <ArrowBigDownDash className="animate-bounce" />}
                                    </div>
                                </div>
                                <div className="collapse-content ">
                                    <label className='flex gap-1 items-end'>
                                        <div className='flex flex-col justify-between h-full'>
                                            <div className="text-sm font-bold">Знание языка</div>
                                            <select className="select w-full max-w-xs select-success select-sm" name="langue" onChange={(e) => handleLangueChange('name', e.target.value)}>
                                                <option disabled value="">Знание языка</option>
                                                <option value='Не знает языков'>Не знает языков</option>
                                                <option value='Английский'>Английский</option>
                                                <option value='Немецкий'>Немецкий</option>
                                                <option value='Польский'>Польский</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col justify-between h-full'>
                                            <div className="text-sm font-bold">Уровень</div>
                                            <select className="select w-full max-w-xs select-success select-sm" name="langueLvl" onChange={(e) => handleLangueChange('level', e.target.value)}>
                                                <option disabled value="">Уровень знание языка</option>
                                                <option value='A1'>Уровень A1</option>
                                                <option value='A2'>Уровень A2</option>
                                                <option value='B1'>Уровень B1</option>
                                                <option value='B2'>Уровень B2</option>
                                               
                                            </select>
                                        </div>
                                    </label>
                                    <CMultiSelect options={drivePermis} placeholder="Категории В/У" className="w-full my-1 text-sm"     onChange={(selected: string[]) => setSelectedDrive(selected.map(value => ({ label: value, value })))} />
                                    <CMultiSelect options={documents1} placeholder="Выберите документы" className="w-full my-1 text-sm" 
                                    onChange={(selected: string[]) => {
                                        const newEntries = selected.map(value => ({
                                            docType: value,
                                            dateOfIssue: '',
                                            dateExp: '',
                                            numberDoc: '',
                                        }));
                                        setDocumentEntries(newEntries);
                                    }}  />
                                </div>
                            </div>

                            <div className="flex justify-center gap-3">
                                <Button text="Закрыть" onClick={onClose} className="bg-myred-default text-white btn-outline" />
                                <Button text="Отправить" isSubmit={true} className="btn-success btn-outline" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const { name, phone, age, locations } = formData;
//     const language = formData.langue.name;
//     const languageLevel = formData.langue.level;
//     const birthDate = new Date(formData.age);
//     const calculatedAge = calculateAge(birthDate);
//     const body = {
//         ...formData,
//         avatar: {
//             name: file?.name,
//             data: file ? await file.arrayBuffer() : null,
//             contentType: file?.type,
//         },
//         professions: professionsWithExperience,
//         langue: {
//             name: formData.langue.name,
//             level: formData.langue.level
//         },
//         documents: selectedDocuments.map(doc => doc.value) || [],
//         drivePermis: selectedDrive.map(d => d.value) || [],
//         age: new Date(formData.age), 
//     };
//     if (file) {
//         const arrayBuffer = await file.arrayBuffer();
//         body.avatar.data = Buffer.from(arrayBuffer);
//     }


//     console.log('Отправляемые данные:', body);
//     console.log('Профессии и опыт:', professionsWithExperience);
//     try {
//         const message = `
//         Имя: ${name}
//         Телефон: ${phone}
//         Профессии: 
//         ${professionsWithExperience.map(prof => `${prof.name} (${prof.experience})`).join(', ')}
//         Возраст: ${calculatedAge} 
//         Местоположение: ${locations}
//         Язык: ${language}
//         Уровень языка: ${languageLevel}
//         Документы: ${selectedDocuments.map(d => d.value).join(', ')}
//         Категории В/У: ${selectedDrive.map(d => d.label).join(', ')}
//       `;
//       setIsLoading(true);
//       await sendMessage(message);

//         const response = await fetch('/api/addCandidate', { 
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(body)
//         });
//         const result = await response.json();
//         if (response.ok) {
//           console.log('Candidate created:', result);
     
//         } else {
//           // setErrorMessage(result.message); // Устанавливаем сообщение об ошибке
//         }
//       } catch (error) {
//         console.error('Network error:', error);
//       }
// };
