import validator from 'validator'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import {toast} from 'react-toastify'
// API to register user
const registerUser= async(req,res)=>{
    try {
        const {name,email,password}=req.body 
        if (!name || !email || !password){
            return res.json({success:false,message:"Missing Details"}) // missing sth
        }
        if (!validator.isEmail(email)) // invalid email
        {
            return res.json({success:false,message:"Invalid email"})
        }
        if (password.length<8){  //weak password
            return res.json({success:false,message:"Please enter strong password"}) 
        }
        // HAShing USER PASSWORD
        const salt = await bycrypt.genSalt(10)
        const hashedPassword=await bycrypt.hash(password,salt)
        const userData={
            name,
            email,
            password:hashedPassword
        }
        const newUser= new userModel(userData)
        const user= await newUser.save()
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//API for user login
const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if (!user){
            return res.json({success:false,message:"User do not exist"})
        }
        const isMatch= await bycrypt.compare(password,user.password)
        if (isMatch)
        {
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
             return res.json({success:true,token})
        } else {
            return res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
         return res.json({success:false,message:error.message})
    }
}
//api get user profile

const getProfile= async(req,res)=>{
    try {
        const {userId}=req.body
        const userData=await userModel.findById(userId).select('-password')
        res.json({success:true,userData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to update user profile
const updateProfile=async(req,res)=>{
    try {
        const {userId,name,phone,address,dob,gender}=req.body
        const imageFile=req.file
        if (!name || !phone || !dob || !gender || !imageFile) {
            return res.json({success:false,message:"Data missing"})
        }
        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
        if (imageFile){
            // uplpad img to cloudinary
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageurl= imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image:imageurl})
            
            
        }
        res.json({success:true,message:"Profile updated"})
    //    res.json({success:true,message:"Profile updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// api to book appointment
const bookAppointment= async(req,res) =>{
    try {
        const {userId, docId, slotDate, slotTime}=req.body
        const docData= await doctorModel.findById(docId).select('-password')
        if (!docData.available){
            return res.json({success:false,message:"Doctor not available"})
        }
        let slots_booked=docData.slots_booked

        // check for availability

        if (slots_booked[slotDate]){
           if (slots_booked[slotDate].includes(slotTime)){
            return res.json({success:false,message:"Slot not available"}) 
           } else {
           slots_booked[slotDate].push(slotTime)
        } 
        } else {
            slots_booked[slotDate]= []
            slots_booked[slotDate].push(slotTime)
        }
        const userData=await userModel.findById(userId).select('-password')
        delete docData.slots_booked
        const appointmentData={
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,slotDate,
            date:Date.now()
        }
        const newAppointment= new appointmentModel(appointmentData)
        await newAppointment.save()
        // save new slots data in Doc data
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:"Appointment booked"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
// API to get user appointments for front-end my-appointments page

const listAppointment= async(req,res)=>{
    try {
        
        const {userId}=req.body
        const appointments=await appointmentModel.find({userId})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
// api to cancel appointment
const cancelAppointment=async(req,res)=>{
    try {
        const {userId,appointmentId}=req.body
        
        const appointmentData=await appointmentModel.findById(appointmentId)

        //verify appointment user
        if (appointmentData.userId!== userId){
            return res.json({success:false,message:'Unauthorized action'})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        //releasing doc slot
        const {docId,slotDate,slotTime}=appointmentData
        const doctorData=await doctorModel.findById(docId)
        let slots_booked=doctorData.slots_booked

        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:'Appointment Cancelled'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment}