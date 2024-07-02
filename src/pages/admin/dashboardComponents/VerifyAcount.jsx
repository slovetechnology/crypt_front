import React, { useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io';
import { MdVerified } from 'react-icons/md';
import LoadingAdmin from '../../../PageComponents/LoadingAdmin';
import { Apis, UserPostApi } from '../../../services/API';
import { Alert } from '../../../utils/utils';
import { PROFILE } from '../../../store';
import { useAtom } from 'jotai';

const VerifyAcount = ({ setToggle }) => {
    const [user, setUser] = useAtom(PROFILE)

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [code, setCode] = useState('')
    const [codeError, setCodeError] = useState('')
    const [verifyScreen, setVerifyScreen] = useState(1)
    const [loading, setLoading] = useState(false)

    const FindEmail = async (e) => {
        e.preventDefault()

        setTimeout(() => {
            setEmailError(false)
        }, 2000)

        if (!email) return setEmailError('email address is required')
        setLoading(true)
        try {
            const formbody = {
                email: email
            }
            const response = await UserPostApi(Apis.user.find_email, formbody)
            if (response.status === 200) {
                setVerifyScreen(2)
            } else {
                setEmailError(`${response.msg}`)
            }
        } catch (error) {
            return setEmailError(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const ValidateEmail = async e => {
        e.preventDefault()

        setTimeout(() => {
            setCodeError('')
        }, 2000)

        if (!code) return setCodeError('enter verification code sent to your email')
        const formbody = {
            code: code,
            email: email
        }
        setLoading(true)
        try {
            const response = await UserPostApi(Apis.user.validate_email, formbody)
            if (response.status === 200) {
                Alert('Request Successful', 'Email verified successfully', 'success')
                setUser(response.msg)
                setToggle('update profile')
            } else {
                setCodeError(`${response.msg}`)
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }

    document.documentElement.style.overflow = loading === true ? 'hidden' : 'auto'

    return (
        <div className='pt-[2rem] z-10 h-screen'>
            <div className='w-[95%] mx-auto'>
                {loading && <LoadingAdmin />}
                <div className='flex gap-1 items-center capitalize text-[0.85rem] cursor-pointer text-[#7665D5] hover:text-[grey] w-fit' onClick={() => setToggle('update profile')}>
                    <IoMdArrowBack />
                    <span>back</span>
                </div>
                <div className='mt-[7rem]'>
                    <div className='flex items-center  justify-center gap-1'>
                        <div className='text-[2rem] text-[#e0dfdf] capitalize  font-bold'>verify your account</div>
                        <MdVerified className='text-[#7665D5] text-[3rem]' />
                    </div>
                    {verifyScreen === 1 && <form onSubmit={FindEmail}>
                        <div className='flex flex-col gap-[2.5rem] mt-[3rem] items-center justify-center'>
                            <div className='flex flex-col gap-2 relative'>
                                <div className='text-[0.85rem] capitalize text-[#e0dfdf]'> email address</div>
                                <input className='outline-none rounded-[3px] w-[20rem] h-[2.4rem] bg-[#0E0B1C] pl-[1rem] border border-[#7665D5] text-[0.9rem] text-[#e0dfdf] ipt' type='email' placeholder='Enter your account email address' value={email} onChange={e => setEmail(e.target.value)}></input>
                                <div className='text-[0.75rem]  text-[#b84141] absolute bottom-[-1.4rem] left-0'>{emailError}</div>
                            </div>
                            <div className='flex items-center  mt-[0.5rem]'>
                                <button className='outline-none bg-[#7665D5] py-[0.5rem] px-[2rem] h-fit w-fit rounded-md capitalize text-[0.9rem] text-[white] cursor-pointer font-[550]' >find email</button>
                            </div>
                        </div>
                    </form>}
                    {verifyScreen === 2 && <form onSubmit={ValidateEmail}>
                        <div className='flex flex-col gap-[2.5rem] mt-[3rem] items-center justify-center'>
                            <div className='flex flex-col gap-4 relative items-center'>
                                <div className='text-[0.85rem]  text-[#e0dfdf]'> A six digits verification code was sent to <span className='text-[#7665D5]'>{email?.slice(0, 3)}*****{email?.slice(-10)}</span>, copy and enter below</div>
                                <input className='outline-none rounded-[3px] w-[20rem] h-[2.4rem] bg-[#0E0B1C] pl-[1rem] border border-[#7665D5] text-[0.9rem] text-[#e0dfdf] ipt' type='text' placeholder='Enter verification code' value={code} onChange={e => setCode(e.target.value)}></input>
                                <div className='text-[0.75rem]  text-[#b84141] absolute bottom-[-1.4rem] left-[5rem]'>{codeError}</div>
                            </div>
                            <div className='flex items-center  mt-[0.5rem]'>
                                <button className='outline-none bg-[#7665D5] py-[0.5rem] px-[2rem] h-fit w-fit rounded-md capitalize text-[0.9rem] text-[white] cursor-pointer font-[550]' >verify email</button>
                            </div>
                        </div>
                    </form>}
                </div>
            </div>
        </div>
    )
}

export default VerifyAcount