import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  const {dToken,appointments,getAppointments,completeAppointment,cancelAppointment,verifyPaymentOnline}=useContext(DoctorContext)
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
  useEffect(()=>{
    if (dToken){
      getAppointments()
    }
    else {
      toast.error("chiu")
    }
  },[dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointment</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments.reverse().map((item,index)=>(
            <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100' key={index}>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt=''/> <p>{item.userData.name}</p>
              </div>
              <div>
                <p onClick={()=>verifyPaymentOnline(item._id)} className='text-xs inline border border-primary px-2 rounded-full cursor-pointer'>
                  {item.payment?'Online':'Cash'}
                </p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}, {item.slotTime}</p>
              <p>{item.slotDate}</p>
              <p>{item.amount} VNĐ</p>
            {
              item.cancelled 
              ? <p className='text-red-600'>Cancelled</p>
              :item.isCompleted 
              ?<p className='text-green-400'>Completed</p> 
              :<div className='flex'>
              <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
              <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
            </div>
            }

              
            </div>
          ))
        }
      </div>
      </div>
  )
}

export default DoctorAppointments