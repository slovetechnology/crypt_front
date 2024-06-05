import React, { useEffect, useRef, useState } from 'react'
import Loading from '../../../PageComponents/Loading'
import { Apis, UserPutApi, imageurl } from '../../../services/API'
import moment from 'moment'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'
import { Alert } from '../../../utils/utils'

const WithdrawalsModal = ({ singleWithdrawal, closeView, setStart, setEnd, setPagelengthstart, setPagelengthend, setSearch, setWrite, refetchAllWithdrawals, setAllWithdrawals }) => {
    const [loading, setLoading] = useState(false)
    const [statusShow, setStatusShow] = useState(false)
    const [status, setStatus] = useState(singleWithdrawal.status)
    const [update, setUpdate] = useState(false)
    const toggler = useRef()

    const withdrawalStatuses = [
        {
            status: 'pending'
        },
        {
            status: 'confirmed'
        }
    ]

    useEffect(() => {
        if (toggler) {
            window.addEventListener('click', (event) => {
                if (toggler.current !== null) {
                    if (!toggler.current.contains(event.target)) {
                        closeView()
                    }
                }
            }, true)
        }
    }, [])

    const MoveToBottom = () => {
        const move = document.querySelector('.move')
        move.scrollTo({
            top: move.scrollHeight,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        MoveToBottom()
    }, [MoveToBottom])


    const AdminUpdateWithdrawal = async () => {

        const formbody = {
            withdrawal_id: singleWithdrawal.id,
            user: singleWithdrawal.user,
            status: status
        }

        if (update) {
            setLoading(true)
            try {
                const response = await UserPutApi(Apis.admin.update_withdrawals, formbody)
                if (response.status === 200) {
                    Alert('Request Successful', 'Withdrawal updated successfully', 'success')
                    setAllWithdrawals(response.msg)
                    refetchAllWithdrawals()
                    setWrite(false)
                    setSearch('')
                    setPagelengthend(response.msg.length / 6)
                    setPagelengthstart(1)
                    setStart(0)
                    setEnd(6)
                } else {
                    Alert('Request Failed', `${response.msg}`, 'error')
                }
            } catch (error) {
                Alert('Request Failed', `${error.message}`, 'error')
            } finally {
                setLoading(false)
                closeView()
            }
        }
    }

    return (
        <div className='w-full h-screen fixed  top-0 left-0 flex items-center justify-center bg-[#0000008a] z-20'>
            <div className='bg-white rounded-lg w-[50vw] h-[90vh] overflow-y-auto scroll move' ref={toggler}>
                <div className='w-full h-full relative'>
                    {loading && <Loading />}
                    <div className='w-[90%] mx-auto py-[2rem] flex flex-col gap-[2rem]'>
                        <div className='flex flex-col gap-[1rem] border p-1'>
                            <div className='text-[0.9rem] uppercase font-bold border px-1 '>user details:</div>
                            <div className='flex items-center justify-center w-[5.8rem] h-[5.8rem] rounded-full bg-[#c9b8eb] mx-auto'>
                                <img src={`${imageurl}/profiles/${singleWithdrawal.wthuser.image}`} className='w-[5.5rem] h-[5.5rem] rounded-full object-cover'></img>
                            </div>
                            <div className='w-[80%] mx-auto flex flex-col gap-2'>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>username:</div>
                                    <div className='text-[0.95rem]'>{singleWithdrawal.wthuser.username}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>email:</div>
                                    <div className='text-[0.95rem]'>{singleWithdrawal.wthuser.email}</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[1rem] border p-1'>
                            <div className='text-[0.9rem] uppercase font-bold border px-1 '>withdrawal details:</div>
                            <div className='w-[80%] mx-auto flex flex-col gap-4'>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>amount:</div>
                                    <div className='text-[0.95rem]'><span className='text-[0.85rem]'>$</span>{singleWithdrawal.amount.toLocaleString()}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>crypto:</div>
                                    <div className='text-[0.95rem] capitalize'>{singleWithdrawal.crypto}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>network:</div>
                                    <div className='text-[0.95rem] capitalize'>{singleWithdrawal.network}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>wallet address:</div>
                                    <div className='text-[0.95rem]'>{singleWithdrawal.wallet_address}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>date/time:</div>
                                    <div className='text-[0.95rem]'>{moment(singleWithdrawal.createdAt).format('DD-MM-yyyy')} / {moment(singleWithdrawal.createdAt).format('h:mm')}</div>
                                </div>
                                <div className='flex justify-between items-center my-[1.5rem]'>
                                    <div className='italic text-[0.9rem]'>status:</div>
                                    <div className='flex flex-col'>
                                        <div className='px-[0.5rem] py-[0.25rem] h-fit w-[12rem] bg-[white] adsha cursor-pointer' onClick={() => { setStatusShow(!statusShow); MoveToBottom() }} >
                                            <div className='flex justify-between items-center text-[0.8rem]'>
                                                <span >{status}</span>
                                                {!statusShow && <FaAngleDown className='hover:bg-[#e6e5e5] rounded-full ' />}
                                                {statusShow && <FaAngleUp className='hover:bg-[#e6e5e5] rounded-full ' />}
                                            </div>
                                        </div>
                                        {statusShow && <div className='px-[0.5rem] py-[0.25rem] h-fit w-[12rem] bg-[white] adsha'>
                                            {withdrawalStatuses.map((item, i) => (
                                                <div className='flex flex-col mt-2' key={i}>
                                                    <div className='flex items-center cursor-pointer hover:bg-[#e6e5e5]' onClick={() => { setStatus(item.status); setStatusShow(false); setUpdate(true) }}>
                                                        <div className={`text-[0.85rem] font-bold ${item.status === 'confirmed' && 'text-[#b19e32]'}`}>{item.status}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {update && <div className='flex items-center justify-center mt-[-1rem]'>
                            <button className='w-fit h-fit py-[0.5rem] px-[1.5rem] text-[0.85rem] capitalize bg-[#462c7c] rounded-lg text-white font-[550]' onClick={AdminUpdateWithdrawal}>update details</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WithdrawalsModal