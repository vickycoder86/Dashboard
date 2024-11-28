import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {

  const navigate= useNavigate();

  const getSignIn=()=>{
    navigate("/Login")
  }
  return (
    <div className='bg-gradient-to-r from-slate-100 to-slate-200 h-screen justify-around flex flex-row'>
      {/* left side */}
      <div className='flex text-center flex-col space-y-5  justify-center items-center h-screen '>
        <div className='text-3xl font-sans font-bold'>
          <p>Welcome Back !</p>
        </div>
        <div className='text-slate-500'>
          <p>Simple Hisaab - The Preffered Choice for Textile Businesses <br/>Simple Hisaab - ERP Solution </p>
        </div>
        <div>
          <button className='bg-[#34B3ED] text-white font-bold py-2 px-10 rounded-full'
          onClick={getSignIn}>SIGN IN</button>
        </div>
      </div>
      {/* right- side */}
      <div className='flex space-y-5  flex-col h-screen justify-center items-center'>
        <div className='text-3xl font-sans font-bold'>
          <p>Create Account</p>
        </div>
        <div>
          {/* for facebook logo/insta logo/twitter logo */}
        </div>
        <div className='flex flex-col space-y-5'>
          <input type='text' placeholder='Enter Your Name' className='outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-full'/>
          <input type='text' placeholder='Enter Your Email' className='outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-full'/>
          <input type='password' placeholder='Create  Password' className='outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-full'/>
          <div>
          <input type='text' placeholder='Mobile Number' className='outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-full'/>
          <button className='bg-[#53f533] text-white font-bold px-10 py-2 ml-2 rounded-md w-40'>Get OTP</button>
          
          </div>
          <input type='number' placeholder='OTP' className='outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-full'/>

          <select className='outline-none bg-transparent border border-zinc-500 px-5 h-10 rounded-full'>
            <option>Admin</option>
            <option>Management</option>
            <option>Others</option>
          </select>

        </div>
        <div>
          <button className='bg-[#34B3ED] text-white font-bold px-10 py-2 rounded-full'>SIGN UP</button>
        </div>
      </div>
    </div>
  )
}

export default Welcome