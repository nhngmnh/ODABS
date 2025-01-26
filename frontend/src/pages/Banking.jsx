import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banking = () => {

    const navigate=useNavigate()
  return (
   
    
    <div className=' flex bg-white justify-center items-center rounded-lg px-6 sm:px-6 lg:px-6 my-2 md:mx-5 gap-x-8 gap-y-4'>
    <div>
    <p className='py-6 gap-y-6  text-xl items-center'>
        Bank to this account,<br/> return to your appointment page<br/>
        and wait your doctor/ administrator<br/>
        to verify the transaction.</p>
       
    </div>
        
    <img className='w-80 justify-left'src={assets.banking} alt=''/>
    
     <button className='bg-primary text-white px-8 py-3 rounded-full font-bold hidden md:block'onClick={()=>navigate('/my-appointments')}>Return to appointment page</button>   
    </div>
    
  )
}

export default Banking