import React, { useState } from 'react'
import { MdVerified } from 'react-icons/md';
import LoadingAdmin from '../../../../GeneralComponents/LoadingAdmin';
import { Apis, UserPostApi } from '../../../../services/API';
import { Alert } from '../../../../utils/utils';
import { PROFILE } from '../../../../store';
import { useAtom } from 'jotai';
import Dashboard from '../Dashboard';
import { useNavigate } from 'react-router-dom';
import VerifyLayout from '../../../../UserComponents/VerifyLayout';

const VerifyEmail = () => {
    const [, setUser] = useAtom(PROFILE)

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [code, setCode] = useState('')
    const [codeError, setCodeError] = useState('')
    const [verifyScreen, setVerifyScreen] = useState(1)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const FindEmail = async (e) => {
        e.preventDefault()

        setTimeout(() => {
            setEmailError(false)
        }, 2000)

        if (!email) return setEmailError('email address is required')

        const formbody = {
            email: email
        }

        setLoading(true)
        try {
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
                navigate('/dashboard/profile')
            } else {
                setCodeError(`${response.msg}`)
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <VerifyLayout>
            <div className='relative mt-28'>
                {loading && <LoadingAdmin />}
                <div className=''>
                    {verifyScreen === 1 && <form onSubmit={FindEmail}>
                        <div className='flex flex-col gap-10 items-center justify-center'>
                            <div className='flex flex-col gap-2'>
                                <div className='text-[0.85rem] capitalize text-semi-white'> email address</div>
                                <div className='relative'>
                                    <input className='outline-none rounded-[3px] w-64 md:w-80 h-10 bg-transparent px-4 border border-light lg:text-[0.9rem] text-semi-white ipt' type='email' placeholder='Enter your account email address' value={email} onChange={e => setEmail(e.target.value)}></input>
                                    <div className='text-xs  text-[#c42e2e] absolute -bottom-5 left-0'>{emailError}</div>
                                </div>
                            </div>
                            <div className='flex items-center mt-2'>
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
        </VerifyLayout>
    )
}

export default VerifyEmail