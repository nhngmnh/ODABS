import React, { useContext,useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
const AllAppointments = () => {

  const {aToken,appointments,getAllAppointments,cancelAppointment}=useContext(AdminContext)
  const calculateAge = (dob) => {
    if (!dob) return '-'; 
    const today = new Date();
    const [year, month, day] = dob.split('-').map(Number); 
    const birthDate = new Date(year, month - 1, day);

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) {
      age--;
    }

    return age;
  };
  useEffect(() => {
    
      if (aToken) {
        try {
          getAllAppointments();
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }}
      }, [aToken])
  
  return (
    <div className='w-full max-w-6xl m-5'>
    <p className='mb-3 text-lg font-medium'>AllAppointments</p>
    <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
      <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
        <p>#</p>
         <p>Patient</p>
         <p>Age</p>
         <p>Date & Time</p>
         <p>Doctor</p>
         <p>Fees</p>
         <p>Actions</p>
        
      </div>
      {
        appointments.map((item,index)=>
          <div className=' flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-800 py-3 px-6 border hover:bg-primary'>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full'src={item.userData.image} alt=""/> <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{item.slotDate}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt=""/>
              <p>{item.docData.name}</p>
            </div>
            <p>{item.docData.fees} VNĐ</p>
            {item.cancelled 
            ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
            : item.isCompleted 
            ? <p className='text-green-500 text-xs font-medium'>Completed</p> 
            :<img onClick={()=>cancelAppointment(item._id)}className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
           
          </div>
        )
      }
    </div>
    </div>
  )
}

export default AllAppointments