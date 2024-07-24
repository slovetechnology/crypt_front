import React, { useEffect, useRef, useState } from 'react'
import Loading from '../../../PageComponents/Loading'
import { Apis, UserPutApi, imageurl } from '../../../services/API'
import moment from 'moment'
import { FaAngleDown, FaAngleUp, FaCheck } from 'react-icons/fa6'
import { Alert } from '../../../utils/utils'
import { MdContentCopy } from 'react-icons/md'

const WithdrawalsModal = ({ singleWithdrawal, closeView, setStart, setEnd, setPagelengthstart, setPagelengthend, setSearch, setWrite, refetchAllWithdrawals, setAllWithdrawals }) => {
    const [loading, setLoading] = useState(false)
    const [statusShow, setStatusShow] = useState(false)
    const [status, setStatus] = useState(singleWithdrawal.status)
    const [update, setUpdate] = useState(false)
    const [beforeshow, setBeforeshow] = useState(true)
    const [copy, setCopy] = useState(false)
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
        if (statusShow) {
            MoveToBottom()
        }
    }, [MoveToBottom])

    setTimeout(() => {
        setBeforeshow(false)
    }, 1500)

    const copyFunction = () => {
        setTimeout(() => {
            setCopy(false)
        }, 2000)
        navigator.clipboard.writeText(singleWithdrawal.wallet_address)
        setCopy(true)
    }

    const AdminUpdateWithdrawal = async () => {

        const formbody = {
            withdrawal_id: singleWithdrawal.id,
            user: singleWithdrawal.user,
            status: status
        }

        if (update) {
            setLoading(true)
            const move = document.querySelector('.move')
            move.scrollTo({
                top: 0,
            })
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
            <div className={`bg-white rounded-lg lg:w-1/2 md:w-3/4 w-11/12 lg:h-[90vh] h-[80vh] ${loading ? 'overflow-hidden' : 'overflow-y-auto scroll'}  move`} ref={toggler}>
                <div className={`w-full h-full relative  ${beforeshow && 'flex items-center justify-center'}`}>
                    {loading && <Loading />}
                    {beforeshow && <div className='beforeshow'></div>}
                    {!beforeshow &&
                        <div className='md:w-[90%] w-11/12 mx-auto md:py-8 py-4 flex flex-col gap-8 md:text-[0.9rem] text-[0.8rem]'>
                            <div className='flex flex-col gap-4 border p-1 overflow-hidden'>
                                <div className=' uppercase font-bold border px-1 '>user details:</div>
                                <div className='flex items-center justify-center md:w-[5.8rem] md:h-[5.8rem] w-20 h-20  rounded-full bg-[#c9b8eb] mx-auto'>
                                    <img src={`${imageurl}/profiles/${singleWithdrawal.wthuser.image}`} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                                </div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-2'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>username:</div>
                                        <div className='md:text-[0.95rem] text-sm'>{singleWithdrawal.wthuser.username}</div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>email:</div>
                                        <div className='md:text-[0.95rem] text-sm'>{singleWithdrawal.wthuser.email}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 border p-1 overflow-hidden'>
                                <div className=' uppercase font-bold border px-1 '>withdrawal details:</div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>amount:</div>
                                        <div className='md:text-[0.95rem] text-sm'><span className='text-[0.85rem]'>$</span>{singleWithdrawal.amount.toLocaleString()}</div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>crypto:</div>
                                        <div className='md:text-[0.95rem] text-sm capitalize'>{singleWithdrawal.crypto}</div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>network:</div>
                                        <div className='md:text-[0.95rem] text-sm capitalize'>{singleWithdrawal.network}</div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>wallet address:</div>
                                        <div className='flex gap-1 items-center'>
                                            <div className='md:text-[0.95rem] text-sm'>{singleWithdrawal.wallet_address?.slice(0, 5)}.....{singleWithdrawal.wallet_address?.slice(-8)}</div>
                                            <button className='outline-none w-fit h-fit py-2 px-2.5 text-[0.8rem] text-black bg-[#c9b8eb] rounded-md capitalize flex items-center justify-center' onClick={() => copyFunction()}>
                                                {!copy && <MdContentCopy />}
                                                {copy && <FaCheck />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>date/time:</div>
                                        <div className='md:text-[0.95rem] text-sm'>{moment(singleWithdrawal.createdAt).format('DD-MM-yyyy')} / {moment(singleWithdrawal.createdAt).format('h:mm')}</div>
                                    </div>
                                    <div className='flex justify-between items-center my-6'>
                                        <div className='italic '>status:</div>
                                        <div className='flex flex-col'>
                                            <div className='px-2 py-1 h-fit md:w-48 w-36 bg-white adsha cursor-pointer' onClick={() => { setStatusShow(!statusShow); MoveToBottom() }} >
                                                <div className='flex justify-between items-center text-[0.8rem]'>
                                                    <span >{status}</span>
                                                    <FaAngleDown className={`${statusShow ? 'rotate-180' : 'rotate-0'} trans`} />
                                                </div>
                                            </div>
                                            {statusShow && <div className='px-2 py-1 h-fit md:w-48 w-36 bg-white adsha'>
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
                            {update && <div className='flex items-center justify-center -mt-4'>
                                <button className='w-fit h-fit py-[0.5rem] px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-lg text-white font-medium' onClick={AdminUpdateWithdrawal}>update details</button>
                            </div>}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default WithdrawalsModal