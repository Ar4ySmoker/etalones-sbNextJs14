import mongoose from "mongoose";
import { type } from "os";

const managerShema = new mongoose.Schema({
  name:{
    type: String,
  },
  phone:{
    type:String,
    unique: true,
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

export const Vacancy = mongoose.models.Vacancy || mongoose.model("Vacancy", vacancyShema)
export const Manager = mongoose.models.Manager || mongoose.model("Manager", managerShema)
