'use client';
import TextInput from "../TextInput/TextInput";
import Image from "next/image";
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Button from "../Buttons/Button";
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";

const drivePermis = [
    { label: "В", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
    { label: "Код 95", value: "Код 95" },
    { label: "Есть своё авто", value: "Есть своё авто" },
];

const documents = [
    { label: "Паспорт ЕС", value: "Паспорт ЕС" },
    { label: "Польская Виза", value: "Документ на работу" },
    { label: "Карта Побыту", value: "Документ на образование" },
    { label: "Биометрический Паспорт(UA)", value: "Документ на допрос" },
    { label: "Песель", value: "Песель" },
];

export default function AnketaModalContent({ onClose }: { onClose: () => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [selectedDrive, setSelectedDrive] = useState<{ label: string; value: string }[]>([]);
    const [selectedDocuments, setSelectedDocuments] = useState<{ label: string; value: string }[]>([]);
    const [langue, setLangue] = useState({ name: "Не знает языков", level: "" });
    const [isAdditionalDataOpen, setIsAdditionalDataOpen] = useState(false);

    const handleLangueChange = (field: string, value: string) => {
        setLangue(prevLangue => ({ ...prevLangue, [field]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const body = {
            name: formData.get('name') || '',
            age: formData.get('age') || '',
            phone: formData.get('phone') || '',
            professions: formData.get('professions') || '',
            locations: formData.get('locations') || '',
            documents: selectedDocuments.map(d => d.value).join(', '),
            drivePermis: selectedDrive.map(d => d.value).join(', '),
            langue: {
                name: formData.get('langue') || '',
                level: formData.get('langueLvl') || ''
            },
            comment: formData.get('comment') ? [{
                text: formData.get('comment'),
                date: new Date()
            }] : []
        };

        try {
            const response = await fetch('/api/addCandidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const result = await response.json();
            if (response.ok) {
                console.log('Кандидат создан:', result);
            } else {
                // Обработка ошибки
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
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
                                        width={150} height={150}
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
                                    name='file'
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                />
                            </label>
                            <TextInput title="ФИО" id='name' type="text" placeholder="Иван Иванов" required className="input input-bordered input-success input-sm w-full my-1" />
                            <TextInput title="Специальность" id='profession' placeholder="Каменщик, штукатур, маляр" type="text" required className="input input-bordered input-success input-sm w-full my-1" />
                            <TextInput title="Номер телефона (Viber, WhatsApp)" placeholder="+48143456789" name="phone" type="tel" required id='phone' className="input input-bordered input-success input-sm w-full my-1" />

                            <label htmlFor="age">
                                <div className="text-sm font-bold">Дата рождения</div>
                                <input
                                    className="input input-bordered input-success input-sm w-full my-1"
                                    id="age"
                                    name="age"
                                    type="date"
                                />
                            </label>
                            <TextInput title="Местоположение" placeholder="Дюссельдорф" name="locations" type="text" required id='locations' className="input input-bordered input-success input-sm w-full my-1" />

                            <details className={`collapse ${isAdditionalDataOpen ? 'bg-gray-200' : ''}`}>
                                <summary className="collapse-title text-xl font-medium cursor-pointer" onClick={() => setIsAdditionalDataOpen(!isAdditionalDataOpen)}>
                                    <div className="flex justify-between items-center  px-5 rounded-md w-full mx-auto">
                                        <span className="text-sm font-bold">Дополнительные данные</span>
                                        {isAdditionalDataOpen ? <ArrowBigUpDash className="animate-bounce"/> : <ArrowBigDownDash className="animate-bounce"/>}
                                    </div>
                                </summary>
                                {isAdditionalDataOpen && (
                                    <div className="collapse-content">
                                        <label className='flex gap-1 items-end' htmlFor="langue">
                                            <div className='flex flex-col justify-between h-full'>
                                                <div className="text-sm font-bold">Знание языка</div>
                                                <select className="select w-full max-w-xs select-success select-sm" id="langue" name="langue">
                                                    <option disabled value="">Знание языка</option>
                                                    <option value='Не знает языков'>Не знает языков</option>
                                                    <option value='Английский'>Английский</option>
                                                    <option value='Немецкий'>Немецкий</option>
                                                    <option value='Польский'>Польский</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col justify-between h-full'>
                                                <div className="text-sm font-bold">Уровень</div>
                                                <select className="select w-full max-w-xs select-success select-sm" id="langueLvl" name="langueLvl" value={langue.level} onChange={(e) => handleLangueChange('level', e.target.value)}>
                                                    <option disabled value="">Уровень знание языка</option>
                                                    <option>Уровень А1</option>
                                                    <option>Уровень А2</option>
                                                    <option>Уровень B1</option>
                                                    <option>Уровень B2</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label htmlFor="drivePermis" className="w-full">
                                            <h3 className="text-sm font-bold">Категории В/У</h3>
                                            <MultiSelect
                                                options={drivePermis}
                                                value={selectedDrive}
                                                onChange={setSelectedDrive}
                                                labelledBy="drivePermis"
                                                disableSearch
                                                hasSelectAll={false}
                                                className="w-full text-sm"
                                            />
                                        </label>
                                        <label htmlFor="documents" className="w-full">
                                            <div>
                                                <h3 className="text-sm font-bold">Документы в наличии</h3>
                                                <MultiSelect
                                                    options={documents}
                                                    value={selectedDocuments}
                                                    onChange={setSelectedDocuments}
                                                    labelledBy="documents"
                                                    disableSearch
                                                    hasSelectAll={false}
                                                    className="w-full text-sm"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                )}
                            </details>

                            <div className="flex justify-center gap-3">
                                <Button text="Закрыть" onClick={onClose} className="bg-myred-default text-white btn-outline" />
                                <Button text="Отправить" className="btn-primary" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
