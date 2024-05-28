import React, { useEffect, useRef, useState } from 'react'
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { Apis, UserPostApi } from '../../services/API';
import { Alert } from '../../utils/utils';
import Loading from '../../PageComponents/Loading';

const ForgottenPassword = ({ closePass }) => {
    const passwordField = useRef()
    const [screen, setScreen] = useState(1)
    const [loading, setLoading] = useState(false)
    const [eye, setEye] = useState(false)
    const [eye2, setEye2] = useState(false)
    const EyeIcon = eye === true ? IoEye : IoMdEyeOff
    const EyeIcon2 = eye2 === true ? IoEye : IoMdEyeOff
    const [emailError, setEmailError] = useState('')
    const [codeError, setCodeError] = useState('')
    const [passError, setPassError] = useState('')
    const [confirmError, setConfirmError] = useState('')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [passwords, setPasswords] = useState({
        new_password: '',
        confirm_password: ''
    })
    const passwordHandler = event => {
        setPasswords({
            ...passwords,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        if (passwordField) {
            window.addEventListener('click', (event) => {
                if (passwordField.current !== null) {
                    if (!passwordField.current.contains(event.target)) {
                        closePass()
                    }
                }
            }, true)
        }
    }, [])

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
                setScreen(2)
            } else {
                setEmailError(`${response.msg}`)
            }
        } catch (error) {
            return setEmailError(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const VerifyEmail = async (e) => {
        e.preventDefault()

        setTimeout(() => {
            setCodeError(false)
          }, 2000)

        if (!code) return setCodeError('verification code is required')
        setLoading(true)
        try {
            const formbody = {
                email: email,
                code: code
            }
            const response = await UserPostApi(Apis.user.verify_email, formbody)
            if (response.status === 200) {
                setScreen(3)
            } else {
                setCodeError(`${response.msg}`)
            }
        } catch (error) {
            return setCodeError(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const ChangePassword = async (e) => {
        e.preventDefault()

        setTimeout(() => {
            setPassError(false)
            setConfirmError(false)
          }, 2000)

        if (!passwords.new_password) return setPassError('password is required')
        if (!passwords.confirm_password) return setConfirmError('confirm Password is required')
        if (passwords.confirm_password !== passwords.new_password) return setConfirmError('password(s) do not match')
        setLoading(true)
        try {
            const formbody = {
                email: email,
                password: passwords.new_password,
                confirm_password: passwords.confirm_password
            }
            const response = await UserPostApi(Apis.user.change_password, formbody)
            if (response.status === 200) {
                setScreen(4)
            } else {
                Alert('Request Failed', `${response.msg}`, 'error')
            }
        } catch (error) {
            return Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }





    return (
        <div className='fixed bg-black/40 w-full h-[100%]  left-0 top-0 flex items-center justify-center z-[50]'>
            <div className={`bg-[white]  py-[1rem] w-fit h-fit rounded-xl  shld overflow-auto relative`} ref={passwordField}>
            {loading && <Loading/>}
                {screen === 1 && <>
                    <div className='w-[85%] mx-auto'>
                        <form onSubmit={FindEmail}>
                            <div className='flex justify-center flex-col gap-2 items-center'>
                                <div className='w-[3rem] h-[3rem] border-2 border-[black] rounded-[50%] flex items-center justify-center'>
                                    <IoLockClosedOutline className='text-[1.5rem]' />
                                </div>
                                <div className='text-[0.9rem] font-[800]'>Trouble logging in?</div>
                                <div className='text-center text-[0.8rem] font-[600]'>Enter your account's email address to find your account and change password</div>
                            </div>
                            <div className='flex flex-col gap-5 mt-[2rem]'>
                                <div className='flex flex-col gap-2 relative'>
                                    <div className='text-[0.75rem] capitalize font-[600]'>enter email address</div>
                                    <input className='outline-none w-full  border-b border-[black] text-[0.9rem] ipt' type='email' placeholder='E.g: john14@gmail.com' value={email} onChange={e => setEmail(e.target.value)}></input>
                                    <FaCheck className='absolute top-[2.25rem] right-0 text-[0.7rem] text-[#E96E28]' />
                                    <div className='text-[0.75rem] mt-[-0.5rem] text-[red] absolute bottom-[-1rem] left-0'>{emailError}</div>
                                </div>
                                <div className='flex items-center justify-center mt-[0.5rem]'>
                                    <button className='outline-none bg-[#E96E28] py-[0.5rem] px-[6rem] h-fit w-fit rounded-md capitalize text-[0.9rem] text-[white] cursor-pointer font-[550]' >find account</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>}
                {screen === 2 && <>
                    <div className='w-[85%] mx-auto'>
                        <form onSubmit={VerifyEmail}>
                            <div className='flex justify-center flex-col gap-2 items-center'>
                                <div className='w-[3rem] h-[3rem] border-2 border-[black] rounded-[50%] flex items-center justify-center'>
                                    <MdVerified className='text-[1.7rem]' />
                                </div>
                                <div className='text-[0.9rem] font-[800]'>Verify your email address</div>
                                <div className='text-center text-[0.8rem] font-[600]'>A verification code was sent to your email, copy and paste the code below</div>
                            </div>
                            <div className='flex flex-col gap-5 mt-[2rem]'>
                                <div className='flex flex-col gap-2 relative'>
                                    <div className='text-[0.75rem] capitalize font-[600]'>enter verification code:</div>
                                    <input className='outline-none w-full  border-b border-[black] text-[0.9rem] ipt' type='text' value={code} onChange={e => setCode(e.target.value)}></input>
                                    <FaCheck className='absolute top-[2.25rem] right-0 text-[0.7rem] text-[#E96E28]' />
                                    <div className='text-[0.75rem] mt-[-0.5rem] text-[red] absolute bottom-[-1rem] left-0'>{codeError}</div>
                                </div>
                                <div className='flex items-center justify-center mt-[0.5rem]'>
                                    <button className='outline-none bg-[#E96E28] py-[0.5rem] px-[7.5rem] h-fit w-fit rounded-md capitalize text-[0.9rem] text-[white] cursor-pointer font-[550]' >verify email</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>}
                {screen === 3 && <>
                    <div className='w-[85%] mx-auto'>
                        <form onSubmit={ChangePassword}>
                            <div className='flex justify-center flex-col gap-2 items-center'>
                                <div className='w-[3rem] h-[3rem] border-2 border-[black] rounded-[50%] flex items-center justify-center'>
                                    <IoLockOpenOutline className='text-[1.5rem]' />
                                </div>
                                <div className='text-[0.9rem] font-[800] capitalize'>password re-set</div>
                                <div className='text-center text-[0.8rem] font-[600]'>Set a new password for your account by filling the password fields below</div>
                            </div>
                            <div className='flex flex-col gap-5 mt-[2rem]'>
                                <div className='flex flex-col gap-2 relative'>
                                    <div className='text-[0.75rem] capitalize font-[600]'>enter new password</div>
                                    <input className='outline-none w-full  border-b border-[black] text-[0.9rem]  ipt' type={eye === true ? 'text' : 'password'} placeholder='Characters more than five' name='new_password' value={passwords.new_password} onChange={passwordHandler}></input>
                                    <EyeIcon className='absolute top-[2.2rem] right-0 text-[0.8rem] text-[#E96E28] cursor-pointer' onClick={() => setEye(!eye)} />
                                    <div className='text-[0.75rem] mt-[-0.5rem] text-[red] absolute bottom-[-1rem] left-0'>{passError}</div>
                                </div>
                                <div className='flex flex-col gap-2 relative'>
                                    <div className='text-[0.75rem] capitalize font-[600]'>confirm password</div>
                                    <input className='outline-none w-full  border-b border-[black] text-[0.9rem] ipt' type={eye2 === true ? 'text' : 'password'} placeholder='Re-type password' name='confirm_password' value={passwords.confirm_password} onChange={passwordHandler}></input>
                                    <EyeIcon2 className='absolute top-[2.2rem] right-0 text-[0.8rem] text-[#E96E28] cursor-pointer' onClick={() => setEye2(!eye2)} />
                                    <div className='text-[0.75rem] mt-[-0.5rem] text-[red] absolute bottom-[-1rem] left-0'>{confirmError}</div>
                                </div>
                                <div className='flex items-center justify-center mt-[0.5rem]'>
                                    <button className='outline-none bg-[#E96E28] py-[0.5rem] px-[6rem] h-fit w-fit rounded-md capitalize text-[0.8rem] text-[white] cursor-pointer font-[550]'>change password</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>}
                {screen === 4 && <>
                    <div className='px-[8rem]'>
                        <div className='flex justify-center flex-col gap-2 items-center'>
                            <div className='w-[3rem] h-[3rem] border-2 border-[green] rounded-[50%] flex items-center justify-center'>
                                <RiVerifiedBadgeLine className='text-[1.5rem] text-[green]' />
                            </div>
                            <div className='text-[0.9rem] font-[800] uppercase text-center'>password changed!</div>
                            <div className='flex gap-2 cursor-pointer' onClick={closePass}>
                                <div className='font-[600] capitalize text-[0.8rem]'>back to login</div>
                                <FaArrowRight className='hover:bg-[green] hover:rounded-full hover:p-[0.2rem]' />
                            </div>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default ForgottenPassword