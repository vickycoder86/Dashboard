import React from 'react'
import logo from "../../src/images/logo-with-text.png"

const Header = () => {
  return (
    <>
    {/* <div className='flex justify-center '>
    <ul className='flex gap-3'>
      <li>Home</li>
      <li>About us</li>
      <li>Contact us</li>
    </ul>
    </div> */}

<div className='maindashboard'>
      <div className=" flex width-full h-[60px] bg-[#A0DCF5]">
        <img src={logo} className='dashboard-logo' />
        <div className='dashboard company'>
        <button className='dashboard-btn'>ABC-ENTERPRISES(2023-24)</button>
        {/* <img src={usericon} className='dashboard-head' /> */}
        </div>
      </div>
      </div>
    </>
  )
}

export default Header