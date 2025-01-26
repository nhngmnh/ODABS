import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import {toast} from 'react-toastify'
import axios from 'axios'
const DoctorProfile = () => {

  const {dToken,profileData, setProfileData,getProfileData,backendurl}=useContext(DoctorContext)
 // const {backendurl}=useContext(AppContext)
  const [isEdit,setIsEdit]=useState(false)
  const updateProfile = async()=>{
    try {
      const updateData={
        name:profileData.name,
        image:profileData.image,
        about:profileData.about,
        address:profileData.address,
        fees:profileData.fees,
        available:profileData.available
      }
      const {data}=await axios.post(backendurl+'/api/doctor/update-profile',updateData,{headers:{dToken}})

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }
  useEffect(()=>{
    if (dToken){
      getProfileData()
    }
  },[dToken])
  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg ' src={profileData.image} alt=''/>
        </div>
          {/* name,degree,exp*/}
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
        <p className='flex items-center gap-2 text-3xl font-medium text-gray-700' >
        {isEdit? <input type="text" onChange={(e)=>setProfileData(prev=>({...prev,name:e.target.value}))} value={profileData.name}/>:profileData.name}
          </p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>
          {/* about */}
          <div >
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{isEdit?<input type="text" onChange={(e)=>setProfileData(prev=>({...prev,about:e.target.value}))} value={profileData.about}/>:profileData.about}</p>
          </div>
          <p className='text-gray-600 font-medium mt-4'>
            Appointment fee: {isEdit? <input type='number' onChange={(e)=>setProfileData(prev=>({...prev,fees:e.target.value}))} value={profileData.fees}/>:profileData.fees}<span> VNĐ</span>
          </p>
          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
            {isEdit ? (
  <>
    <input
      type="text"
      onChange={(e) => setProfileData((prev) => ({
        ...prev,
        address: { ...prev.address, line1: e.target.value }
      }))}
      value={profileData.address.line1}
    />
    <br />
    <input
      type="text"
      onChange={(e) => setProfileData((prev) => ({
        ...prev,
        address: { ...prev.address, line2: e.target.value }
      }))}
      value={profileData.address.line2}
    />
  </>
) : (
  <>
    <p>{profileData.address.line1}</p>
    <br />
    <p>{profileData.address.line2}</p>
  </>
)}

            </p>
          </div>
          <div className='flex gap-1 pt-2'>
            <input onChange={()=>isEdit && setProfileData(prev=>({...prev,available:!prev.available}))} checked={profileData.available} type='checkbox' name='' id=''/>
            <label htmlFor=''>Available</label>
          </div>
          {
            isEdit 
            ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:text-white hover:bg-primary transition-all'>Save</button>
            : <button onClick={()=>setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:text-white hover:bg-primary transition-all'>Edit</button>
          }
          
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile