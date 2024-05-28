import React, { useState } from 'react'
import Pagelayout from '../../PageComponents/Pagelayout'
import { FaHandsClapping } from "react-icons/fa6";
import { MdMarkEmailUnread, MdLock } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logobrand.png'
import ForgottenPassword from './ForgottenPassword';
import Loading from '../../PageComponents/Loading'
import { Alert, CookieName, MoveToTop, UserRole } from '../../utils/utils'
import { Apis, UserPostApi } from '../../services/API'
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt'


const LoginPage = () => {
    const navigate = useNavigate()
    const [forgotPass, setForgotPass] = useState(false)
    const [eye, setEye] = useState(false)
    const [error, setError] = useState(false)
    const EyeIcon = eye === true ? IoEye : IoMdEyeOff
    const [emailmsg, setEmailMsg] = useState('')
    const [passmsg, setPassMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    
    const submitForm = async event => {
        event.preventDefault()
        setTimeout(() => {
            setEmailMsg('')
            setPassMsg('')
            setError(false)
        }, 1000)
        if (!form.email) {
            setEmailMsg('enter email address')
            return setError(true)
        }
        if (!form.password) {
            setPassMsg('enter password')
            return setError(true)
        }
        const formbody = {
            email: form.email,
            password: form.password
        }
        setLoading(true)
        try {
            const response = await UserPostApi(Apis.user.login, formbody)
            if (response.status === 200) {
                Cookies.set(CookieName, response.token)
                const decoded = decodeToken(response.token)
                const findRole = UserRole.find(item => item.role === decoded.role)
                if (findRole) return navigate(`${findRole.url}`)
            } else {
                return Alert('Request Failed', response.msg, 'error')
            }
        } catch (error) {
            Alert('Request Unsuccessful', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }
    document.documentElement.style.overflow = forgotPass === true ? 'hidden' : 'auto'

    return (
        <Pagelayout>

            <div className='py-[5rem] bg-[whitesmoke]'>
                {forgotPass === true && <ForgottenPassword closePass={() => setForgotPass(false)} />}
                <div className="w-[85%] bg-[white] mx-auto py-[1.2rem] rounded-xl relative shb">
                    <div className='w-[97%] mx-auto flex'>
                        <div className='w-[60%] relative'>
                            <div className='bgc rounded-lg'></div>
                            <div className='absolute top-[1rem] left-[1rem]'>
                                <img src={logo} className='w-[auto] h-[7rem]'></img>
                            </div>
                        </div>
                        <div className='w-[50%]'>
                            <div className='w-full h-[100vh]'></div>
                        </div>
                    </div>
                    <div className='w-[39vw] h-[fit] bg-[white] absolute top-[3.5rem] right-[4rem] rounded-[20px] pt-[4rem] pb-[6rem]  sha'>
                        <div className='relative w-full h-full'>
                            {loading && <Loading />}
                            <div className='w-[70%] mx-auto'>
                                <div className='flex gap-2 items-center justify-center'>
                                    <FaHandsClapping className='text-[1.2rem] text-[#E96E28]' />
                                    <div className='text-[1.7rem] capitalize font-[550]'>welcome back!</div>
                                </div>
                                <div className='text-[0.9rem] mt-[0.1rem] text-[#6b6a6a] capitalize text-center font-[550]'>continue to log in</div>
                                <form onSubmit={submitForm}>
                                    <div className='flex gap-[1rem] mt-[2rem] flex-col'>
                                        <div className='flex gap-[0.5rem] flex-col relative'>
                                            <div className='flex gap-1'>
                                                <MdMarkEmailUnread className='text-[0.9rem] mt-[0.12rem]' />
                                                <div className='text-[0.75rem] capitalize font-[550]'>email address</div>
                                            </div>
                                            <input placeholder='Enter email address' className=' outline-none rounded-[3px] w-full h-fit py-[0.5rem] bg-[#e9e9e9] pl-[1rem] justify-center text-[0.9rem] ipt' type='email' value={form.email} name='email' onChange={inputHandler}></input>
                                            <div className={`text-[0.75rem] mt-[-0.3rem] absolute bottom-[-1.2rem] left-0 ${error === true ? 'text-[red]' : 'text-[black]'}`}>{emailmsg}</div>
                                        </div>
                                    </div>
                                    <div className='flex gap-[1rem] mt-[2.5rem] flex-col'>
                                        <div className='flex gap-[0.5rem] flex-col relative'>
                                            <div className='flex gap-1'>
                                                <MdLock className='text-[0.9rem] mt-[0.12rem]' />
                                                <div className='text-[0.75rem] capitalize font-[550]'>password</div>
                                            </div>
                                            <input placeholder='Enter password' className=' outline-none rounded-[3px] w-full h-fit py-[0.5rem]  bg-[#e9e9e9] pl-[1rem] justify-center text-[0.9rem] ipt ' type={eye === true ? 'text' : 'password'} value={form.password} name='password' onChange={inputHandler}></input>
                                            <EyeIcon className='absolute top-[2.3rem] right-2 cursor-pointer' onClick={() => setEye(!eye)} />
                                            <div className={`text-[0.75rem] mt-[-0.3rem] absolute bottom-[-1.2rem] left-0 ${error === true ? 'text-[red]' : 'text-[black]'}`}> {passmsg} </div>
                                        </div>
                                    </div>
                                    <div className='text-[0.8rem] font-[550] text-[#E96E28] text-right pt-[0.5rem] cursor-pointer capitalize' onClick={() => setForgotPass(!forgotPass)}>forgot password?</div>
                                    <div className='flex flex-col gap-[0.5rem] items-center mt-[3rem]'>
                                        <button className='outline-none bg-[#E96E28] py-[0.5rem] px-[8rem] h-fit w-fit rounded-md capitalize text-[0.9rem] text-[white] cursor-pointer font-[550]' type='submit' >login</button>
                                        <div className='text-[#6b6a6a] text-[0.8rem] font-[550]'>Don't have an account?
                                            <Link to='/signup' onClick={MoveToTop} className='cursor-pointer text-[#E96E28] font-[550]' > Sign Up</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Pagelayout>
    )
}

export default LoginPage