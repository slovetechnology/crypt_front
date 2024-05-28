import React, { useEffect, useRef, useState } from 'react'
import logo from '../assets/images/logobrand.png'
import { TfiAngleDown } from "react-icons/tfi";
import { PiWindowsLogoThin } from "react-icons/pi";
import { LuBoxes } from "react-icons/lu";
import { GiBookPile } from "react-icons/gi";
import { MdMapsHomeWork, MdConnectWithoutContact, MdOutlineSecurity } from "react-icons/md";
import { LuFileSearch } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { MoveToTop } from '../utils/utils';


const Header = () => {
    const [toggleDrop, setToggleDrop] = useState(false)
    const [toggleDroptwo, setToggleDroptwo] = useState(false)

    const styleDrop = {
        display: toggleDrop === true ? "flex" : "none"
    }
    const reverseDrop = {
        display: toggleDrop === true ? "none" : "flex"
    }
    const styleDroptwo = {
        display: toggleDroptwo === true ? 'flex' : "none"
    }
    const reverseDroptwo = {
        display: toggleDroptwo === true ? "none" : "flex"
    }

    const closer = useRef()
    const closertwo = useRef()

    useEffect(
        () => {
            if (closer) {
                window.addEventListener('click', (event) => {
                    if (closer.current !== null) {
                        if (!closer.current.contains(event.target)) {
                            setToggleDrop(false)
                        }
                    }
                }, true)
            }
        }, []
    )


    useEffect(
        () => {
            if (closertwo) {
                window.addEventListener('click', (event) => {
                    if (closertwo.current !== null) {
                        if (!closertwo.current.contains(event.target)) {
                            setToggleDroptwo(false)
                        }
                    }
                }, true)
            }
        }, []
    )

    return (
        <>
            <div className='flex justify-between items-center py-[0.75rem] px-[2rem] fixed top-0 left-0 w-[100%] bg-[#1E2833] border-b border-[grey] z-30'>
                <div className='flex gap-[5rem]'>
                    <div>
                        <Link to='/' className='flex items-center'>
                            <img src={logo} className=' w-[4rem] h-[auto]'></img>
                            <div className=' font-mono capitalize text-[white] font-bold'>the force</div>
                        </Link>
                    </div>
                    <div className='flex  gap-5 items-center'>
                        <div className='relative '>
                            <div className=' w-fit h-fit py-[0.5rem] px-[1rem] bg-[white] rounded-[6px]' >
                                <div className='flex gap-1'
                                >
                                    <PiWindowsLogoThin className='text-[1.1rem] mt-[0.1rem] text-[#1E2833]' />
                                    <div className=' text-[0.9rem] font-[550] text-[#1E2833] capitalize cursor-pointer' style={reverseDrop} onClick={() => setToggleDrop(true)}>overview</div>
                                    <div className=' text-[0.9rem] font-[550] text-[#1E2833] capitalize cursor-pointer' style={styleDrop}>overview</div>
                                    <TfiAngleDown className={`mt-[0.55rem] text-[0.5rem] text-[#1E2833] ${toggleDrop === true ? ' rotate-180' : 'rotate-0'} trans`} />
                                </div>
                            </div>
                            <div className=' bg-white p-[2rem] w-[40rem] h-fit absolute top-[4.2rem] left-[-10rem] shd' style={styleDrop} ref={closer}>
                                <div className='flex gap-[5rem] w-full'>
                                    <Link to='/trading' className='flex flex-col gap-1 hover:bg-[#929da0] rounded-lg p-2  w-[50%] lnk' onClick={MoveToTop}>
                                        <div className='flex gap-2'>
                                            <LuBoxes className='text-[1.2rem] text-[#1E2833] mt-[0.1rem]' />
                                            <div className='text-[#1E2833] text-[0.95rem] font-[550] capitalize'>trading plans</div>
                                        </div>
                                        <div className='text-[0.80rem] pl-[1.7rem] text-[#818080]'>
                                            View the different trading plans you can invest and trade cryptocurrency with on the AI algorithm trading system.
                                        </div>
                                    </Link>
                                    <Link to='/performances' className='flex flex-col gap-1 hover:bg-[#929da0] rounded-lg p-2 w-[50%] lnk' onClick={MoveToTop}>
                                        <div className='flex gap-2'>
                                            <GiBookPile className='text-[1.2rem] text-[#1E2833] mt-[0.2rem]' />
                                            <div className='text-[#1E2833] text-[0.95rem] font-[550] capitalize'>past performances</div>
                                        </div>
                                        <div className='text-[0.8rem] pl-[1.7rem] text-[#818080]'>
                                           View records of recent performances on the AI algorithm trading system and be sure of how efficient we've been.
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className=' border-r-[0.1rem] h-6'></div>
                        <div className='relative'>
                            <div className='flex gap-1  hover:text-blue-500'>
                                <div className=' text-[0.9rem] font-[550] text-white capitalize cursor-pointer' style={reverseDroptwo} onClick={() => setToggleDroptwo(true)}>company</div>
                                <div className=' text-[0.9rem] font-[550] text-white capitalize cursor-pointer' style={styleDroptwo}>company</div>
                                <TfiAngleDown className={`mt-[0.55rem] text-[0.5rem] text-[white]  ${toggleDroptwo === true ? ' rotate-180' : 'rotate-0'} trans`} />
                            </div>
                            <div className='flex flex-col gap-5 bg-white py-[2rem] pl-[2.5rem] pr-3 w-[14rem] h-fit absolute top-[3.7rem] left-[-2rem] shd' ref={closertwo} style={styleDroptwo}>
                                <Link to='/' onClick={MoveToTop} className='flex gap-2 hover:bg-[#d4dcdf] rounded-lg p-3 transition-all'>
                                    <MdMapsHomeWork className='text-[1.2rem] text-[#1E2833] mt-[0.1rem]' />
                                    <div className='text-[#1E2833] text-[0.95rem] font-[550]'>Home</div>
                                </Link>
                                <Link to='/contact' onClick={MoveToTop} className='flex gap-2 hover:bg-[#d4dcdf] rounded-lg p-3 transition-all'>
                                    <MdConnectWithoutContact className='text-[1.2rem] text-[#1E2833] mt-[0.1rem]' />
                                    <div className='text-[#1E2833] text-[0.95rem] font-[550]'>Contact</div>
                                </Link>
                                <Link to='/about' className='flex gap-2 hover:bg-[#d4dcdf] rounded-lg p-3 transition-all' onClick={MoveToTop}>
                                    <LuFileSearch className='text-[1.2rem] text-[#1E2833] mt-[0.1rem]' />
                                    <div className='text-[#1E2833] text-[0.95rem] font-[550]'>About</div>
                                </Link>
                                <Link to='/legal' onClick={MoveToTop} className='flex gap-2 hover:bg-[#d4dcdf] rounded-lg p-3 transition-all'>
                                    <MdOutlineSecurity className='text-[1.2rem] text-[#1E2833] mt-[0.1rem]' />
                                    <div className='text-[#1E2833] text-[0.95rem] font-[550]'>Legal & Security</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <Link to='/login' onClick={MoveToTop}>
                        <button className=' outline-0 w-fit h-fit py-[0.25rem] px-[1.4rem] border-2 text-[0.9rem] text-[white] font-[550] rounded-lg border-[#E96E28] hover:bg-[#E96E28] hover:text-[white] flex items-center justify-center'>Sign In</button>
                    </Link>
                    <Link to='/signup' onClick={MoveToTop}>
                        <button className=' outline-0 w-fit h-fit py-[0.25rem] px-[1.4rem] text-[0.9rem] text-[white] rounded-lg bg-[#E96E28] hover:bg-[#1E2833] border-2 border-[#E96E28] hover:border-[#E96E28] font-[550] flex items-center justify-center' >Sign Up</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Header