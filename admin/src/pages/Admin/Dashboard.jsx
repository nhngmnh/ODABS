import React from 'react'
import { useContext } from 'react'
import { AdminContext} from '../../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Dashboard = () => {

  const {aToken,dashData,getDashData,cancelAppointment} =useContext(AdminContext)
  const slotDateFormat=(m)=>{
    let d=m.split('_')
    return d[0]+'-'+d[1]+'-'+d[2]
  }
  useEffect(()=>{
    if (aToken){
      getDashData()
    }
  },[aToken])
  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3' >
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all' >
          <img  className='w-14'src={assets.doctor_icon} alt=''/>
          <div>
            <p>{dashData.doctors}</p>
            <p>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt=''/>
          <div>
            <p>{dashData.appointments}</p>
            <p>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt=''/>
          <div>
            <p>{dashData.patients}</p>
            <p>Patients</p>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt=''/>
          <p>Latest Bookings</p>
        </div>
        <div>
          <div className='pt-4 border border-t-0'>
            {
              dashData.latestAppointments.map((item,index)=>(
                <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-200' key={index}>
                  <img className='rounded-full w-10' src={item.docData.image} alt=''/>
                  <div className='flex-1 text-sm'>
                    <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                    <p className='text-gray-700'>{slotDateFormat(item.slotDate)}</p>
                  </div>
                  {item.cancelled 
                              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                              : item.isCompleted 
                              ? <p className='text-green-500 text-xs font-medium'>Completed</p> 
                              :<img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard