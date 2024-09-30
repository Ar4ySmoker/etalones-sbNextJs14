'use client'
import TextInput from "../TextInput/TextInput";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Button from "../Buttons/Button";

const drivePermis = [
    { label: "В", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D"},
    { label: "E", value: "E"},
    { label: "Код 95", value: "Код 95"},
    { label: "Есть своё авто", value: "Есть своё авто"},
  ];

const documents = [
    { label: "Пасспорт ЕС", value: "Пасспорт ЕС"},
    { label: "Польская Виза", value: "Документ на работу"},
    { label: "Карта Побыту", value: "Документ на образование"},
    { label: "Биометричесуий Пасспорт(UA)", value: "Документ на допрос"},
    { label: "Песель", value: "Песель"},
  ];
  
export default function Anketa() {
    const [file, setFile] = useState(null);
    const [selectedDrive, setSelectedDrive] = useState([]);
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    let [langue, setLangue] = useState({ name: "Не знает языков", level: "" });


    
  const handleLangueChange = (field, value) => {
    setLangue(prevLangue => ({ ...prevLangue, [field]: value }));
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    

    const formData = new FormData(event.target);
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
        console.log('Candidate created:', result);
       
      } else {
        // setErrorMessage(result.message); // Устанавливаем сообщение об ошибке
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
    return (
       <>
       <div className="w-full p-5 h-full  flex justify-center items-center absolute top-20 " >
      <div className="my-5 flex relative flex-wrap-reverse">
      {/* <div className="absolute w-full h-full blur rounded-lg bg-gradient-to-br from-red-700 via-black to-red-700 animate-tilt"></div> */}

      
          <div className="
          relative w-full h-full px-auto  rounded-lg 
            flex flex-col   text-start my-auto   ">
          <h1>Anketa</h1>
          <form onSubmit={handleSubmit} className="flex gap-5 rounded-xl justify-center flex-wrap-reverse border-solid border-2 border-black bg-gray-100 p-5">
          
              <div className="flex flex-col items-start justify-start w-max">
<TextInput title="ФИО" id='name' type="text" placeholder="Иван Иванов" required className=" input input-bordered input-success input-sm w-full  my-1" />
<TextInput title="Специальность" id='profession' placeholder="Каменщик, штукатур, маляр" type="text" required className=" input input-bordered input-success input-sm max-w-xs my-1" />

<label htmlFor="age">
            <div className="text-md font-bold">Дата рождения</div>
            <input
              className="input input-bordered input-success input-sm  max-w-xs "
              id="age"
              name="age"
              type="date"
            />
          </label>
<TextInput title="Номер телефона (Viber, WhatsApp)" placeholder="+48143456789" name="phone" type="phone" required id='phone' className=" input input-bordered input-success input-sm max-w-xs my-1" />
<TextInput title="Местоположение" placeholder="Дюссельдорф" name="locations" type="text" required id='locations' className=" input input-bordered input-success input-sm max-w-xs my-1" />
<Button text="Отправить" className="btn-primary"/>

                    </div>
              <div className="flex flex-col gap-3 justify-start">
              <figure className="self-center ">
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
                  <label htmlFor="">

                  <div className="font-bold">Загрузите фото</div>
                  <input
          className="file-input file-input-bordered input-sm w-full"
                  type='file'
                  name='file'
                  onChange={(e) => setFile(e.target.files?.[0])}
              />
              </label>
                 <label className='flex gap-1 items-end' htmlFor="langue">
          <div className='flex flex-col justify-between h-full'>
          <div className="text-md font-bold">Знание языка</div>
          
          <select className="select w-full max-w-xs select-success select-sm" id="langue" name="langue" >
          <option disabled selected value={null}>Знание языка</option>
        <option>Не знает языков</option>
        <option >Английский</option>
        <option >Немецкий</option>
        <option >Польский</option>

        </select>
          </div>
          <div className='flex flex-col justify-between  h-full'>
          <div className="text-md font-bold">Уровень</div>
          <select className="select w-full max-w-xs select-success select-sm" id="langueLvl" name="langueLvl" value={langue.level || ''} onChange={(e) => handleLangueChange('level', e.target.value || '')}>
          <option disabled selected value={null}>Уровень знание языка</option>
        <option >Уровень А1</option>
        <option >Уровень А2</option>
        <option >Уровень B1</option>
        <option >Уровень B2</option>
        </select>
          </div>
        </label>
        <label htmlFor="drivePermis">
        <div>
      <h3 className="text-md font-bold">Категории В/У</h3>
      <MultiSelect
        options={drivePermis}
        value={selectedDrive}
        onChange={setSelectedDrive}
        labelledBy="drivePermis"
        disableSearch
        hasSelectAll={false}


      />
    </div>
        </label>  
        <label htmlFor="drivePermis">
        <div>
      <h3 className="text-md font-bold">Документы в наличии</h3>
      <MultiSelect
        options={documents}
        value={selectedDocuments}
        onChange={setSelectedDocuments}
        labelledBy="drivePermis"
        disableSearch
        hasSelectAll={false}
        className="w-100"
      />
    </div>
        </label>                
{/* <Button text="Отправить" className="btn-primary"/> */}
              </div>

          </form>
      </div>
      </div>
      </div>
      </>
    );
}