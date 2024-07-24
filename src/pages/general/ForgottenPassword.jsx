import React, { useEffect, useRef, useState } from 'react'
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { Apis, UserPostApi } from '../../services/API';
import { Alert } from '../../utils/utils';
import Loading from '../../PageComponents/Loading';

const ForgottenPassword = ({ closePass }) => {
    const passwordField = useRef()
    const [screen, setScreen] = useState(4)
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
        if (passwords.confirm_password !== passwords.new_password) return setConfirmError('password(s) mismatch')
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
        <div className='fixed bg-black/40 w-full h-full  left-0 top-0 flex items-center justify-center px-4 z-50'>
            <div className={`bg-white  py-4 w-fit h-fit rounded-xl  shld overflow-auto relative`} ref={passwordField}>
                {loading && <Loading />}
                {screen === 1 && <>
                    <div className='md:w-[85%] w-11/12 mx-auto'>
                        <form onSubmit={FindEmail}>
                            <div className='flex justify-center flex-col gap-2 items-center'>
                                <div className='w-12 h-12 border-2 border-black rounded-full flex items-center justify-center'>
                                    <IoLockClosedOutline className='text-2xl' />
                                </div>
                                <div className='text-[0.9rem] font-extrabold'>Trouble logging in?</div>
                                <div className='text-center text-[0.8rem] font-[600]'>Enter your email address to find your account and reset password</div>
                            </div>
                            <div className='flex flex-col gap-5 mt-8'>
                                <div className='flex flex-col gap-2 relative'>
                                    <div className='text-xs capitalize font-[600]'>enter email address</div>
                                    <input className='outline-none w-full border-b border-black lg:text-[0.9rem] text-base ipt focus:outline-none' type='email' placeholder='E.g: john14@gmail.com' value={email} onChange={e => setEmail(e.target.value)}></input>
                                    <div className='text-xs text-[red] absolute -bottom-4 left-0'>{emailError}</div>
                                </div>
                                <div className='flex items-center justify-center mt-2'>
                                    <button className='outline-none bg-orange py-2 md:px-24 h-fit md:w-fit w-full rounded-md capitalize text-[0.9rem] text-white cursor-pointer font-[550]' >find account</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>}
                {screen === 2 && <>
                    <div className='md:w-[85%] w-11/12 mx-auto'>
                        <form onSubmit={VerifyEmail}>
                            <div className='flex justify-center flex-col gap-2 items-center'>
                                <div className='w-12 h-12 border-2 border-black rounded-full flex items-center justify-center'>
                                    <MdVerified className='text-[1.7rem]' />
                                </div>
                                <div className='text-[0.9rem] font-extrabold'>Verify your email address</div>
                                <div className='text-center text-[0.8rem] font-[600]'>A verification code was sent to your email address, copy and paste the code below</div>
                            </div>
                            <div className='flex flex-col gap-5 mt-8'>
                                <div className='flex flex-col gap-2 relative'>
                                    <div className='text-xs capitalize font-[600]'>enter verification code:</div>
                                    <input className='outline-none w-full  border-b border-black lg:text-[0.9rem] text-base focus:outline-none ipt' type='text' placeholder='Six digits code' value={code} onChange={e => setCode(e.target.value)}></input>
                                    <div className='text-xs text-[red] absolute -bottom-4 left-0'>{codeError}</div>
                                </div>
                                <div className='flex items-center justify-center mt-2'>
                                    <button className='outline-none bg-orange py-2 md:px-[7.5rem] h-fit md:w-fit w-full rounded-md capitalize text-[0.9rem] text-white cursor-pointer font-[550]' >verify email</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>}
                {screen === 3 && <>
                    <div className='md:w-[85%] w-11/12 mx-auto'>
                        <form onSubmit={ChangePassword}>
                            <div className='flex justify-center flex-col gap-2 items-center'>
                                <div className='w-12 h-12 border-2 border-black rounded-full flex items-center justify-center'>
                                    <IoLockOpenOutline className='text-2xl' />
                                </div>
                                <div className='text-[0.9rem] font-extrabold capitalize'>password re-set</div>
                                <div className='text-center text-[0.8rem] font-[600]'>Set a new password for your account by filling the password fields below</div>
                            </div>
                            <div className='flex flex-col gap-5 mt-8'>
                                <div className='flex flex-col gap-2 relative'>
                                    <div className='text-xs capitalize font-[600]'>enter new password</div>
                                    <input className='outline-none w-full  border-b border-black lg:text-[0.9rem] text-base focus:outline-none  ipt' type={eye === true ? 'text' : 'password'} placeholder='Characters more than five' name='new_password' value={passwords.new_password} onChange={passwordHandler}></input>
                                    <EyeIcon className='absolute bottom-0 right-0 text-base text-orange cursor-pointer' onClick={() => setEye(!eye)} />
                                    <div className='text-xs text-[red] absolute -bottom-4 left-0'>{passError}</div>
                                </div>
                                <div className='flex flex-col gap-2 relative'>
                                    <div className='text-xs capitalize font-[600]'>confirm password</div>
                                    <input className='outline-none w-full  border-b border-black lg:text-[0.9rem] text-base focus:outline-none ipt' type={eye2 === true ? 'text' : 'password'} placeholder='Re-type password' name='confirm_password' value={passwords.confirm_password} onChange={passwordHandler}></input>
                                    <EyeIcon2 className='absolute bottom-0 right-0 text-base text-orange cursor-pointer' onClick={() => setEye2(!eye2)} />
                                    <div className='text-xs text-[red] absolute -bottom-4 left-0'>{confirmError}</div>
                                </div>
                                <div className='flex items-center justify-center mt-2'>
                                    <button className='outline-none bg-orange py-2 md:px-24 h-fit ,md:w-fit w-full rounded-md capitalize text-[0.8rem] text-white cursor-pointer font-[550]'>change password</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>}
                {screen === 4 && <>
                    <div className='md:w-[85%] w-11/12 mx-auto'>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <div className='w-12 h-12 border-2 border-[green] rounded-full flex items-center justify-center'>
                                <RiVerifiedBadgeLine className='text-2xl text-[green]' />
                            </div>
                            <div className='text-[0.9rem] font-extrabold uppercase text-center'>password Reset!</div>
                            <div className='text-center text-[0.8rem] font-[600]'>Password reset successful, you can now login with new password created</div>
                            <div className='flex gap-1 cursor-pointer mt-4 items-center text-sm text-[green] hover:text-orange' onClick={closePass}>
                                <div className='font-[600] capitalize'>back to login</div>
                                <FaArrowRight/>
                            </div>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default ForgottenPassword