import mongoose from "mongoose";

const reviewsShema = new mongoose.Schema({
  name:{
    type: String
  },
  rating:{
    type: String
  },
  comment:{
    type: String
  }
},{ timestamps: true })

const managerShema = new mongoose.Schema({
  image: {
    name: String,
    data: Buffer,
    contentType: String
},
  name:{
    type: String,
  },
  phone:{
    type:String,
    unique: true,
  },
  telegram:{
type:String
  },
  viber:{
  type:String
      },
  whatsapp:{
 type:String
          },
  candidates:[{
    
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate'
  }],
})

const vacancyShema = new mongoose.Schema({
  title:{
    type: String
  },
  town:{
    type: String
  },
  workHours:{
    type: String
  },
  workPrice:{
    type: String
  },
  image:{
    type: String
  }
})
const vacancyOnServerShema = new mongoose.Schema({
  image: {
    name: String,
    data: Buffer,
    contentType: String
},
  title:{
  type: String
},
  roof_type:{
  type: String
},
  location:{
  type:String
},
  auto:{
type: String
},
  positions_available:{
  type:String
},
  salary:{
  type:String
},
  homePrice:{
  type:String
},
  home_descr:{
  type:String
},
  work_descr:{
  type:String
},
  grafik:{
  type:String
},
  documents:{
  type:String
},
  manager:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager'},
category:{
type: String
}

})
const candidateSchema = new mongoose.Schema({
  source:{
type: String
  },
  name: {
type: String,
  },
  phone:{
    type: String,
  },
  time:{
  type: String,  
  },
  currentPage:{
type: String,
  }
},
{ timestamps: true }
)
export const Reviews = mongoose.models.Reviews || mongoose.model("Reviews", reviewsShema)
export const VacancyOnServer = mongoose.models.VacancyOnServer || mongoose.model("VacancyOnServer", vacancyOnServerShema)
export const Vacancy = mongoose.models.Vacancy || mongoose.model("Vacancy", vacancyShema)
export const Manager = mongoose.models.Manager || mongoose.model("Manager", managerShema)
export const Candidate = mongoose.models.Candidate || mongoose.model("Candidate", candidateSchema);
