import React, { useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io';
import { MdVerified } from 'react-icons/md';
import LoadingAdmin from '../../../PageComponents/LoadingAdmin';
import { Apis, UserPostApi } from '../../../services/API';
import { Alert } from '../../../utils/utils';
import { PROFILE } from '../../../store';
import { useAtom } from 'jotai';

const VerifyAcount = ({ setToggleExtra }) => {
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
                setToggleExtra('')
            } else {
                setCodeError(`${response.msg}`)
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }

    document.documentElement.style.overflow = loading ? 'hidden' : 'auto'

    return (
        <div className='pt-10 h-screen'>
            <div className='relative'>
                {loading && <LoadingAdmin />}
                <div className='flex gap-1 items-center capitalize text-[0.85rem] cursor-pointer text-light hover:text-[grey] w-fit' onClick={() => {setToggleExtra('')}}>
                    <IoMdArrowBack />
                    <span>back</span>
                </div>
                <div className='mt-28'>
                    <div className='flex items-center  justify-center gap-1'>
                        <div className='md:text-[2rem] text-[1.4rem] text-semi-white capitalize  font-bold'>verify your account</div>
                        <MdVerified className='text-light md:text-[3rem] text-3xl' />
                    </div>
                    {verifyScreen === 1 && <form onSubmit={FindEmail}>
                        <div className='flex flex-col gap-10 mt-12 items-center justify-center'>
                            <div className='flex flex-col gap-2'>
                                <div className='text-[0.85rem] capitalize text-semi-white'> email address</div>
                                <div className='relative'>
                                    <input className='outline-none rounded-[3px] w-64 md:w-80 h-10 bg-transparent px-4 border border-light lg:text-[0.9rem] text-semi-white ipt' type='email' placeholder='Enter your account email address' value={email} onChange={e => setEmail(e.target.value)}></input>
                                    <div className='text-xs  text-[#c42e2e] absolute -bottom-5 left-0'>{emailError}</div>
                                </div>
                            </div>
                            <div className='flex items-center  mt-2'>
                                <button className='outline-none bg-light py-2 px-8 rounded-md capitalize text-xs md:text-sm text-white cursor-pointer font-[600]' >find email</button>
                            </div>
                        </div>
                    </form>}
                    {verifyScreen === 2 && <form onSubmit={ValidateEmail}>
                        <div className='flex flex-col gap-10 mt-12 items-center justify-center'>
                            <div className='flex flex-col gap-4 items-center'>
                                <div className='text-[0.85rem]  text-semi-white text-center'> A six digits verification code was sent to <span className='text-[#7665D5]'>{email?.slice(0, 3)}*****{email?.slice(-10)}</span>, copy and enter below</div>
                                <div className='relative'>
                                    <input className='outline-none rounded-[3px] w-64 md:w-80 h-10 bg-transparent px-4 border border-light lg:text-[0.9rem] text-semi-white ipt' type='text' placeholder='Enter verification code' value={code} onChange={e => setCode(e.target.value)}></input>
                                    <div className='text-xs  text-[#c42e2e] absolute -bottom-5 left-0'>{codeError}</div>
                                </div>
                            </div>
                            <div className='flex items-center  mt-2'>
                                <button className='outline-none bg-light py-2 px-8 h-fit w-fit rounded-md capitalize md:text-sm text-xs text-white cursor-pointer font-[600]' >verify email</button>
                            </div>
                        </div>
                    </form>}
                </div>
            </div>
        </div>
    )
}

export default VerifyAcount