import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Appointments from './pages/Appointments'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Banking from './pages/Banking'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='/doctors' element={<Doctors />}/>
            <Route path='/doctors/:speciality' element={<Doctors />}/>
            <Route path='/my-appointments' element={<MyAppointments />} />
            <Route path='/appointment/:docId' element={<Appointments />} />
            <Route path='/my-profile' element={<MyProfile />} />
            <Route path='/about' element={<About/>}/>
            <Route path='/banking' element={<Banking/>}/>
        </Routes > 
        <Footer/>
    </div>
  )
}

export default App


