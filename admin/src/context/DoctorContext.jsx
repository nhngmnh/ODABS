import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const DoctorContext= createContext()
const DoctorContextProvider=(props)=>{

    const backendurl=import.meta.env.VITE_BACKEND_URL
    const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')

    const [appointments,setAppointments]=useState([])
    const [dashData,setDashData]=useState(false)
    const [profileData,setProfileData]=useState(false)
//    const [payment,setPayment]=useState(false)
    const getAppointments= async()=>{
        try {
            const {data}=await axios.get(backendurl+'/api/doctor/appointments',{headers:{dToken}})
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);
;
                
            } else {
                toast.error(data.message)
                console.log();
                
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const completeAppointment=async(appointmentId)=>{
        try {
            const {data}=await axios.post(backendurl+'/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
            if (data.success){
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const cancelAppointment=async(appointmentId)=>{
        try {
            const {data}=await axios.post(backendurl+'/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
            if (data.success){
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getDashData=async()=>{
        try {
            const {data}=await axios.get(backendurl+'/api/doctor/dashboard',{headers:{dToken}})
            if (data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
                
            } else { toast.error(data.message+"b")
            }

            } catch (error) {
        console.log(error);
            toast.error(error.message+"ggg")
        }
    }
    const getProfileData= async()=>{
        try {
            const {data}=await axios.get(backendurl+'/api/doctor/profile',{headers:{dToken}})
            if (data.success){
                setProfileData(data.profileData)
                console.log(data.profileData);
            }
        } catch (error) {
            toast.error(error.message+"ggg")
        }
    }   

    const verifyPaymentOnline=async(appointmentId)=>{
        try {
            const {data}=await axios.post(backendurl+'/api/doctor/change-payment-state',{appointmentId},{headers:{dToken}})
            if (data.success) {

                    toast.success(data.message)
                    getAppointments()
                    //setPayment(true)
                    console.log(data)
                } else {
                    toast.error(data.message)
                }
            
        } catch (error) {
            toast.error(error.message+"ggg")
        }
    }
    const value={
        dToken,setDToken,backendurl,
        appointments,setAppointments,
        getAppointments, completeAppointment,cancelAppointment,
        dashData,setDashData,getDashData,
        profileData,setProfileData, getProfileData,
        verifyPaymentOnline
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider