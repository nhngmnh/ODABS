import React, { useContext } from 'react'
import { doctors } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate=useNavigate()
  const {doctors}=useContext(AppContext)
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-black'>
      <h1 className='text-bold text-3xl font-medium'>
        Top Doctors to Book
      </h1>
      <p className='sm:w-1/3 text-center text-sm'>
      Simply browse through our extensive list of trusted doctors.
      </p>
      <div className='w-full grid grid-cols-auto gap-6 pt-5 gay-y-6 px-3 sm:px-0'>
          {doctors.slice(0,10).map((item,index)=>(
            
          <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='border border-blue-500 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
            <img className='bg-blue-500 'src={item.image} alt=''/>
           <div className='p-4 bg-white'>
            <div className={`flex items-center gap-2 text-sm ${item.available? 'text-green-500':'text-gray-500'}`}>
            <p className="flex items-center gap-2">
              <span className={`w-2 h-2 ${item.available ?'bg-green-500': 'bg-gray-500'}  rounded-full`}></span>
                <p>{item.available? 'Available':'Not available'}</p>
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
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}}className='flex rounded-full bg-gray-600 text-white px-6 py-2 cursor-pointer  hover:bg-primary hover:text-white transition-all duration-300'>more</button>
    </div>
  )
}

export default TopDoctors