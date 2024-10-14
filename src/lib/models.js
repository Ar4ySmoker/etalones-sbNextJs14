import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id:{
      type: String
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    name: {
      type: String,
      required: [true, "Fullname is required"],
      minLength: [3, "fullname must be at least 3 characters"],
      maxLength: [25, "fullname must be at most 25 characters"],
    },
    phone: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const reviewsShema = new mongoose.Schema({
  name:{
    type: String
  },
  rating:{
    type: Number
  },
  comment:{
    type: String
  },
  image: {
    type: String, // Поле для URL изображения
  },
  userId: {
    type: String, // Храните идентификатор пользователя
  },
  email:{
    type: String
  },
  likes: [{
    type: String
  }],  
  dislikes: [{
    type: String
  }], 

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
  avatar:{
  name: String,
  data: Buffer,
  contentType: String
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
  age:{
    type: Date,
  },
  langue:{
    name: String,
    level: String,
   },
  currentPage:{
  type: String,
  },
  locations: {
  type: String,
    
  },
  professions: [{
    name:  String,
    experience: String,
  }],
  drivePermis: [{
  type: String,
}],
  documents: [{ 
    docType: String,
    dateOfIssue: String,
    dateExp: String,
    numberDoc: String
  }],
  langue:{
  name: String,
  level: String,
   },
   comment: [{
    text: {
  type: String
    },
    date: {
  type: Date,
  default: Date.now
    }
  }],
},
{ timestamps: true }
)
const newsSchema = new mongoose.Schema({
  image: {
      name: String,
      data: Buffer,
      contentType: String
  },
  source: {
      type: String,
      required: true
  },
  title: {
      type: String,
      required: true
  },
  category: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  content: [{
      title: String,
      content: String
  }],
}, { timestamps: true });

const professionSchema = new mongoose.Schema({
  name: {
type: String,
unique: true,
  },
  category: {
    type: String,
  },
  experience: {
    type: String,
  },
}
)
export const User =  mongoose.models.User || mongoose.model("User", userSchema);
export const Profession = mongoose.models.Profession || mongoose.model("Profession", professionSchema);
export const News = mongoose.models.News || mongoose.model("News", newsSchema);
export const Reviews = mongoose.models.Reviews || mongoose.model("Reviews", reviewsShema);
export const VacancyOnServer = mongoose.models.VacancyOnServer || mongoose.model("VacancyOnServer", vacancyOnServerShema);
export const Vacancy = mongoose.models.Vacancy || mongoose.model("Vacancy", vacancyShema);
export const Manager = mongoose.models.Manager || mongoose.model("Manager", managerShema);
export const Candidate = mongoose.models.Candidate || mongoose.model("Candidate", candidateSchema);
