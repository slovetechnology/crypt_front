import React from 'react'
import logo from '../assets/images/logobrand.png'
import { Link } from 'react-router-dom';
import { FaRegCopyright } from "react-icons/fa6";
import { PiTelegramLogoLight } from "react-icons/pi";
import { TfiInstagram } from "react-icons/tfi";
import { SiFacebook } from "react-icons/si";
import { MoveToTop } from '../utils/utils';

const Footer = () => {
  return (
    <div className='bg-[#1E2833] pb-[1rem] z-10 border-t border-[#171a1d] pt-[2.5rem]'>
      <div className='lg:w-4/5 w-11/12 mx-auto '>
        <div className='grid gap-5 grid-cols-1 lg:grid-cols-5'>
          <div className='flex flex-col gap-[0.5rem] lg:col-span-3'>
            <Link to='/' className='flex items-center'>
              <img src={logo} className='w-[5rem] h-[auto] ml-[-1rem]'></img>
              <div className='capitalize text-[white] font-bold text-[1.4rem]'>the force</div>
            </Link>
            <div className='text-[#94A3B8] md:w-[80%] lg:w-[60%]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet quod omnis voluptate similique facere! Neque, cupiditate minus ea nulla fugit.</div>
            <div className='flex gap-4 items-center mt-[1rem]'>
              <Link to='/contact' onClick={MoveToTop}>
                <div className='h-[1.9rem] w-[1.9rem] border-2 border-[white] rounded-[50%] flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer  transition-all text-[white] text-[1.2rem] hover:text-[rgb(233,110,40)]'>
                  <PiTelegramLogoLight />
                </div>
              </Link>
              <Link to='/contact' onClick={MoveToTop}>
                <div className='h-[1.9rem] w-[1.9rem] border-2 border-[white]  rounded-[50%] flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer transition-all text-[white] text-[1.1rem] hover:text-[#E96E28]'>
                  <TfiInstagram />
                </div>
              </Link>
              <Link to='/contact' onClick={MoveToTop}>
                <div className='h-[1.9rem] w-[1.9rem] border-2 border-[white]  rounded-[50%] flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer transition-all text-[white] text-[1.1rem] hover:text-[#E96E28]'>
                  <SiFacebook />
                </div>
              </Link>
            </div>
          </div>
          <div className='text-[#94A3B8] capitalize lg:col-span-2 mt-[1rem]'>
            <div className='font-medium text-[1.5rem] '>quick links</div>
            <div className="border-b border-[#29415c] pt-[0.5rem] w-[60%]"></div>
            <div className='flex flex-col gap-4  mt-[1rem]'>
              <Link to='/' onClick={MoveToTop} className='hover:text-[#E96E28] w-fit'>home</Link>
              <Link to='/about' onClick={MoveToTop} className='hover:text-[#E96E28] w-fit'>about us</Link>
              <Link to='/contact' onClick={MoveToTop} className='hover:text-[#E96E28] w-fit'>contact us</Link>
              <Link to='/trading' onClick={MoveToTop} className='hover:text-[#E96E28] w-fit'>trading plans</Link>
              <Link to='/terms' onClick={MoveToTop} className='hover:text-[#E96E28] w-fit'>terms and conditions</Link>
              <Link to='/privacy' onClick={MoveToTop} className='hover:text-[#E96E28] w-fit'>privacy</Link>
            </div>
          </div>
        </div>
        <div className='flex gap-[0.3rem] w-full h-[3.3rem] bg-[#172029] items-center  text-[#94A3B8] mt-[3rem] pl-[1rem]'>
          <FaRegCopyright className='text-[0.8rem]' />
          <div className=' text-[0.8rem]'>2024, Al Algo, All rights reserved.</div>
        </div>
      </div>
    </div>
  )
}

export default Footer