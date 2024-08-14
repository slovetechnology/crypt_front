import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment';
import { FaRegRectangleXmark, FaXmark } from "react-icons/fa6";
import { MdOutlineDeleteForever } from 'react-icons/md';
import { IoEye } from 'react-icons/io5';
import { IoMdEyeOff } from 'react-icons/io';
import { SlLockOpen } from 'react-icons/sl';
import { PiWarningCircleBold } from 'react-icons/pi';
import avatar from '../../assets/images/avatar.png'
import { Alert } from '../../utils/utils';
import Loading from '../../GeneralComponents/Loading';
import { Apis, imageurl, PostApi, UserPutApi } from '../../services/API';
import ModalLayout from '../../utils/ModalLayout';

const UsersModal = ({ closeView, singleUser, userFigures, refetchAllUsers }) => {
    const toggler = useRef()
    const [beforeshow, setBeforeshow] = useState(true)
    const [fundScreen, setFundScreen] = useState(1)
    const [withdrawalScreen, setWithdrawalScreen] = useState(1)
    const [amount, setAmount] = useState('')
    const [amountError, setAmountError] = useState(false)
    const [suspendScreen, setSuspendScreen] = useState(1)
    const [password, setPassword] = useState('')
    const [suspendError, setSuspendError] = useState('')
    const [eye, setEye] = useState(false)
    const EyeIcon = eye === true ? IoEye : IoMdEyeOff
    const [loading, setLoading] = useState(false)

    setTimeout(() => {
        setBeforeshow(false)
    }, 1500)

    const MoveToBottom = () => {
        const move = document.querySelector('.move')
        move.scrollTo({
            top: move.scrollHeight,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        if (suspendScreen !== 1 || fundScreen !== 1 || withdrawalScreen !== 1) {
            MoveToBottom()
        }
    }, [MoveToBottom])

    const FundUserAccount = async () => {
        setTimeout(() => {
            setAmountError(false)
        }, 1000)

        if (!amount) return setAmountError(true)
        if (isNaN(amount)) return setAmountError(true)

        const formbody = {
            user_id: singleUser.id,
            amount: parseFloat(amount)
        }

        setLoading(true)
        try {
            const response = await UserPutApi(Apis.admin.fund_user_account, formbody)
            if (response.status === 200) {
                Alert('Request Successful', `${response.msg}`, 'success')
                setFundScreen(1)
                closeView()
            } else {
                Alert('Request Failed', `${response.msg}`, 'error')
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }

    }

    const SetWithdrawalMinimum = async () => {
        setTimeout(() => {
            setAmountError(false)
        }, 1000)

        if (!amount) return setAmountError(true)
        if (isNaN(amount)) return setAmountError(true)

        const formbody = {
            user_id: singleUser.id,
            withdrawal_minimum: parseFloat(amount)
        }

        setLoading(true)
        try {
            const response = await UserPutApi(Apis.admin.update_withdrawal_minimum, formbody)
            if (response.status === 200) {
                Alert('Request Successful', `${response.msg}`, 'success')
                refetchAllUsers()
                setWithdrawalScreen(1)
                closeView()
            } else {
                Alert('Request Failed', `${response.msg}`, 'error')
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }

    }

    const Suspend_Unsuspend_UserAccount = async () => {
        setTimeout(() => {
            setSuspendError('')
        }, 1500)

        if (!password) return setSuspendError('field cannot be void')

        const formbody = {
            user_id: singleUser.id,
            password: password
        }

        setLoading(true)
        try {
            const response = await PostApi(Apis.admin.suspend_unsuspend_users, formbody)
            if (response.status === 200) {
                refetchAllUsers()
                Alert('Request Successful', `${response.msg}`, 'success')
                setSuspendScreen(1)
                closeView()

            } else {
                setSuspendError(`${response.msg}`)
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }


    return (
        <ModalLayout closeView={closeView} toggler={toggler}>
            <div className={`bg-white rounded-lg lg:w-1/2 md:w-4/6 w-11/12 lg:h-[90vh] md:h-[80vh] h-[70vh] ${loading ? 'overflow-hidden' : 'overflow-y-auto scroll'}  move`} ref={toggler}>
                <div className={`w-full h-full relative  ${beforeshow && 'flex items-center justify-center'}`}>
                    {beforeshow && <div className='beforeshow'></div>}
                    {!beforeshow &&
                        <div className='md:w-[90%] w-11/12 mx-auto md:py-8 py-4 flex flex-col gap-8 md:text-[0.9rem] text-[0.8rem]'>
                            <div className='flex flex-col gap-4 border p-1'>
                                <div className=' uppercase font-bold border px-1 '>user details:</div>
                                <div className='flex items-center justify-center md:w-[5.8rem] md:h-[5.8rem] w-20 h-20 rounded-full bg-[#c9b8eb] mx-auto' >
                                    {Object.values(singleUser).length !== 0 &&
                                        <>
                                            {singleUser.image ? <img src={`${imageurl}/profiles/${singleUser.image}`} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                                                :
                                                <img src={avatar} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                                            }
                                        </>
                                    }
                                </div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-2'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>full name:</div>
                                        {Object.values(singleUser).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleUser.full_name}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>username:</div>
                                        {Object.values(singleUser).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleUser.username}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>email:</div>
                                        {Object.values(singleUser).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleUser.email}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>country:</div>
                                        {Object.values(singleUser).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleUser.country}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>joined:</div>
                                        {Object.values(singleUser).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{moment(singleUser.createdAt).format('DD-MM-yyyy')}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 border p-1'>
                                <div className=' uppercase font-bold border px-1 '>deposit records:</div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>total amount deposited:</div>
                                        {Object.values(userFigures).length !== 0 && <div className='md:text-[0.95rem] text-sm'>${userFigures.total_investment.toLocaleString()}</div>}
                                    </div>
                                </div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>account balance:</div>
                                        {Object.values(userFigures).length !== 0 && <div className='md:text-[0.95rem] text-sm'>${userFigures.wallet_balance.toLocaleString()}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4'>
                                {fundScreen === 1 ?
                                    <div className='flex justify-center'>
                                        <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={() => { setFundScreen(2); setSuspendScreen(1); setWithdrawalScreen(1); MoveToBottom() }}>fund user account</button>
                                    </div>
                                    :
                                    <div className='w-fit h-fit md:px-8 p-6 rounded-md bg-white adsha mx-auto  text-black relative'>
                                        {loading && <Loading />}
                                        <FaXmark className='absolute top-0 right-1 cursor-pointer text-xl' onClick={() => setFundScreen(1)} />
                                        <div className='font-[650] border-b text-center uppercase'>Fund {singleUser.username} account</div>
                                        <div className='flex flex-col gap-8 items-center justify-center mt-6'>
                                            <div className='flex flex-col gap-1.5 text-sm capitalize'>
                                                <div className='text-center'>Enter an amount</div>
                                                <div className='flex gap-0.5 items-center text-xs'>
                                                    <div>$</div>
                                                    <input className={`outline-none border lg:text-[0.85rem] text-base w-full h-8 rounded-[3px] px-2 bg-transparent ipt ${amountError ? 'border-[red]' : 'border-[#9f7ae7]'}`} value={amount} onChange={e => setAmount(e.target.value)}></input>
                                                </div>
                                            </div>
                                            <div className='mx-auto'>
                                                <button className='outline-none w-fit h-fit py-2 px-4 md:text-[0.8rem] text-xs text-white bg-[#9f7ae7] rounded-md capitalize font-bold' onClick={FundUserAccount}>send funds</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='mt-4'>
                                {withdrawalScreen === 1 ?
                                    <div className='flex justify-center'>
                                        <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={() => { setWithdrawalScreen(2); setSuspendScreen(1); setFundScreen(1); MoveToBottom() }}>set user withdrawal minimum</button>
                                    </div>
                                    :
                                    <div className='w-fit h-fit md:px-8 p-6 rounded-md bg-white adsha mx-auto  text-black relative'>
                                        {loading && <Loading />}
                                        <FaXmark className='absolute top-0 right-1 cursor-pointer text-xl' onClick={() => setWithdrawalScreen(1)} />
                                        <div className='font-[650] border-b text-center uppercase'>set {singleUser.username} withdrawal minimum</div>
                                        <div className='flex flex-col gap-8 items-center justify-center mt-6'>
                                            <div className='flex gap-4 items-center'>
                                                <div className='flex flex-col gap-1.5 text-sm capitalize'>
                                                    <div className='text-center'>Enter an amount</div>
                                                    <div className='flex gap-0.5 items-center text-xs'>
                                                        <div>$</div>
                                                        <input className={`outline-none border lg:text-[0.85rem] text-base w-full h-8 rounded-[3px] px-2 bg-transparent ipt ${amountError ? 'border-[red]' : 'border-[#9f7ae7]'}`} value={amount} onChange={e => setAmount(e.target.value)}></input>
                                                    </div>
                                                </div>
                                                <div className='text-xs py-1 px-3 h-fit w-fit bg-white sha flex flex-col gap-2 text-black items-center font-semibold rounded-md'>
                                                    <div>current:</div>
                                                    {Object.values(singleUser).length !== 0 && <div>${singleUser.withdrawal_minimum.toLocaleString()}</div>}
                                                </div>
                                            </div>
                                            <div className='mx-auto'>
                                                <button className='outline-none w-fit h-fit py-2 px-6 md:text-[0.8rem] text-xs text-white bg-[#9f7ae7] rounded-md capitalize font-bold' onClick={SetWithdrawalMinimum}>set</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='mt-2'>
                                {suspendScreen === 1 &&
                                    <div className='flex justify-center'>
                                        <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={() => { setSuspendScreen(2); setFundScreen(1); setWithdrawalScreen(1); MoveToBottom() }}>{singleUser.suspend === 'true' ? 'unsuspend' : 'suspend'} user</button>
                                    </div>
                                }
                                {suspendScreen !== 1 && <div className='w-fit h-fit md:p-8 px-2 py-4 rounded-md bg-white adsha mx-auto  text-black relative'>
                                    {loading && <Loading />}
                                    {suspendScreen === 2 &&
                                        <div className='flex flex-col gap-8 items-center justify-center'>
                                            <div className='flex flex-col gap-2'>
                                                <div className='text-center md:text-[1.1rem] text-sm text-black font-medium'>{singleUser.suspend === 'true' ? 'Are you sure you want to unsuspend this user?' : 'Are you sure you want to suspend this user?'}</div>
                                                <div className='flex justify-center items-center gap-0.5  text-xs font-medium'>
                                                    <span className='text-center'>{singleUser.suspend === 'true' ? 'User will be now be able to access account' : 'User will be unable to access account'}</span>
                                                    <PiWarningCircleBold className='text-[red]' />
                                                </div>
                                            </div>
                                            <div className='flex md:gap-16 gap-4 items-center'>
                                                <button className='outline-none w-fit h-fit py-2 px-4 md:text-[0.8rem] text-xs text-white bg-[#5e5d5d] rounded-md capitalize flex items-center gap-1 font-bold' type='button' onClick={() => setSuspendScreen(1)}>
                                                    <span>cancel action</span>
                                                    <FaRegRectangleXmark />
                                                </button>
                                                <button className={`outline-none w-fit h-fit py-2 px-4 md:text-[0.8rem] text-xs text-white ${singleUser.suspend === 'true' ? 'bg-[#584383]' : 'bg-[#7e3232] '} rounded-md capitalize flex items-center gap-1 font-bold`} onClick={() => setSuspendScreen(3)}>
                                                    <span>proceed action</span>
                                                    <MdOutlineDeleteForever />
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    {suspendScreen === 3 && <div className='flex flex-col gap-2 items-center justify-center'>
                                        <div className='md:text-[1.1rem] text-sm font-medium text-center'>{singleUser.suspend === 'true' ? `Last step to unsuspend ${singleUser.username}'s account!` : `Last step to suspend ${singleUser.username}'s account!`}</div>
                                        <div className='flex gap-1 items-center justify-center text-xs text-[red]'>
                                            <span className='text-black font-medium text-center'>Admin, enter your password to finalize action</span>
                                            <SlLockOpen />
                                        </div>
                                        <div className='flex flex-col gap-8 items-center justify-center mt-4'>
                                            <div className='relative'>
                                                <input className='outline-none border border-[#c9b8eb] bg-transparent lg:text-[0.85rem] text-base w-52 h-8 rounded-md pl-2 pr-7 py-1 text-black ipt' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} type={`${eye === true ? 'text' : 'password'}`}></input>
                                                <EyeIcon className='absolute top-2 right-2 text-base text-[red] cursor-pointer' onClick={() => setEye(!eye)} />
                                                <div className='absolute -bottom-5 left-0 text-xs text-[red]'>{suspendError}</div>
                                            </div>
                                            <div className='flex md:gap-16 gap-4 items-center'>
                                                <button className='outline-none w-fit h-fit py-2 px-4 md:text-[0.8rem] text-xs text-white  bg-[#5e5d5d] rounded-md capitalize flex items-center gap-1 font-bold' type='button' onClick={() => { setSuspendScreen(1); setPassword('') }}>
                                                    <span>cancel action</span>
                                                    <FaRegRectangleXmark />
                                                </button>
                                                <button className={`outline-none w-fit h-fit py-2 px-4 md:text-[0.8rem] text-xs text-white ${singleUser.suspend === 'true' ? 'bg-[#584383]' : 'bg-[#7e3232] '}  rounded-md capitalize flex items-center gap-1 font-bold`} onClick={Suspend_Unsuspend_UserAccount}>
                                                    <span>{singleUser.suspend === 'true' ? 'unsuspend' : 'suspend'} account</span>
                                                    <MdOutlineDeleteForever />
                                                </button>
                                            </div>
                                        </div>
                                    </div>}
                                </div>}
                            </div>
                        </div>}
                </div>
            </div>
        </ModalLayout>
    )
}

export default UsersModal