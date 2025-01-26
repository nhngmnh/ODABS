import React,{ useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality,docId}) => {
    const {doctors}=useContext(AppContext)
    const [relDoc,setRelDoc]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
       if(doctors.length>0 && speciality){
          const doctorsData=doctors.filter((doc)=> doc.speciality===speciality && doc._id!==docId)
          setRelDoc(doctorsData) 
       }

    },[doctors,speciality,docId])
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-black'>
      <h1 className='text-bold text-3xl font-medium'>
        Related Doctors
      </h1>
      <p className='sm:w-1/3 text-center text-sm'>
      Simply browse through our extensive list of trusted doctors.
      </p>
      <div className='w-full grid grid-cols-auto gap-6 pt-5 gay-y-6 px-3 sm:px-0'>
          {relDoc.slice(0,5).map((item,index)=>(
          <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
            <img className='bg-blue-50 'src={item.image} alt=''/>
           <div className='p-4'>
            <div className='flex items-center gap-2 text-sm text-green-500'>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Available
            </p>
            </div>
            <div>
            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
            <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
           </div>
          </div>
          ))}
      </div>
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}}className='flex rounded-full bg-gray-300 px-6 py-2 cursor-pointer  hover:bg-primary hover:text-white transition-all duration-300'>more</button>
    </div>
  )
}

export default RelatedDoctors