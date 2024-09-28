import React, { useEffect, useRef, useState } from 'react'
import Loading from '../GeneralComponents/Loading'
import { Apis, UserPutApi, imageurl } from '../services/API'
import moment from 'moment'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { Alert, MoveToTopDiv } from '../utils/utils'
import { MdContentCopy } from 'react-icons/md'
import avatar from '../assets/images/avatar.png'
import ModalLayout from '../utils/ModalLayout'
import { useAtom } from 'jotai'
import { ADMINSTORE } from '../store'
import { RiAiGenerate } from 'react-icons/ri'

const WithdrawalsModal = ({ singleWithdrawal, closeView, refetchAllWithdrawals }) => {
    const [adminStore] = useAtom(ADMINSTORE)

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [statusShow, setStatusShow] = useState(false)
    const [status, setStatus] = useState(singleWithdrawal?.status)
    const [update, setUpdate] = useState(false)
    const [beforeshow, setBeforeshow] = useState(true)
    const [copy, setCopy] = useState(false)
    const toggler = useRef()

    setTimeout(() => {
        setBeforeshow(false)
    }, 1500)

    const Statuses = [
        "processing",
        "confirmed"
    ]

    const MoveToBottom = () => {
        const move = document.querySelector('.move')
        move.scrollTo({
            top: move.scrollHeight,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        if (!loading) {
            if (statusShow || status !== singleWithdrawal.status || message !== '') {
                MoveToBottom()
            }
        }
    }, [MoveToBottom])


    const copyFunction = () => {
        setTimeout(() => {
            setCopy(false)
        }, 2000)
        navigator.clipboard.writeText(singleWithdrawal.withdrawal_address)
        setCopy(true)
    }

    const UpdateHandlerForText = () => {
        if (message === '' && status === singleWithdrawal.status) {
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    const UpdateHandlerForStatus = (item) => {
        setStatus(item)
        setStatusShow(false)
        if (item === singleWithdrawal.status && message === '') {
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    const GenerateWithdrawalMessage = () => {
        const TaxAmount = singleWithdrawal.amount * adminStore.tax_percentage / 100
        setMessage(`To complete your withdrawal amount of $${singleWithdrawal.amount}, you must pay a ${adminStore.tax_percentage}% tax fee of $${TaxAmount}.`)
        setUpdate(true)
    }

    const AdminUpdateWithdrawal = async () => {

        const formbody = {
            withdrawal_id: singleWithdrawal.id,
            message: message,
            status: status
        }

        if (update) {
            setLoading(true)
            MoveToTopDiv()

            try {
                const response = await UserPutApi(Apis.admin.update_withdrawals, formbody)
                if (response.status === 200) {
                    refetchAllWithdrawals()
                    Alert('Request Successful', `${response.msg}`, 'success')
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
    }

    return (
        <ModalLayout closeView={closeView} toggler={toggler}>
            <div className={`bg-white rounded-lg lg:w-1/2 md:w-4/6 w-11/12 lg:h-[90vh] md:h-[80vh] h-[70vh] ${loading ? 'overflow-hidden' : 'overflow-y-auto scroll'}  move`} ref={toggler}>
                <div className={`w-full h-full relative  ${beforeshow && 'flex items-center justify-center'}`}>
                    {loading && <Loading />}
                    <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
                    {beforeshow && <div className='beforeshow'></div>}
                    {!beforeshow &&
                        <div className='md:w-[90%] w-11/12 mx-auto md:py-8 py-4 flex flex-col gap-8 md:text-[0.9rem] text-[0.8rem]'>
                            <div className='flex flex-col gap-4 border p-1'>
                                <div className=' uppercase font-bold border px-1 '>user details:</div>
                                <div className='flex items-center justify-center md:w-[5.8rem] md:h-[5.8rem] w-20 h-20  rounded-full bg-[#c9b8eb] mx-auto'>
                                    {Object.values(singleWithdrawal).length !== 0 &&
                                        <>
                                            {singleWithdrawal.wthUser.image ? <img src={`${imageurl}/profiles/${singleWithdrawal.wthUser.image}`} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                                                :
                                                <img src={avatar} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                                            }
                                        </>
                                    }
                                </div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-2'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>username:</div>
                                        {Object.values(singleWithdrawal).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleWithdrawal.wthUser.username}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>email:</div>
                                        {Object.values(singleWithdrawal).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleWithdrawal.wthUser.email}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 border p-1'>
                                <div className=' uppercase font-bold border px-1 '>withdrawal details:</div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>amount:</div>
                                        {Object.values(singleWithdrawal).length !== 0 && <div className='md:text-[0.95rem] text-sm'>${singleWithdrawal.amount.toLocaleString()}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>crypto:</div>
                                        {Object.values(singleWithdrawal).length !== 0 && <div className='md:text-[0.95rem] text-sm capitalize'>{singleWithdrawal.crypto}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>network:</div>
                                        {Object.values(singleWithdrawal).length !== 0 && <div className='md:text-[0.95rem] text-sm capitalize'>{singleWithdrawal.network}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>withdrawal address:</div>
                                        <div className='flex gap-1.5 items-center'>
                                            {Object.values(singleWithdrawal).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleWithdrawal.withdrawal_address?.slice(0, 5)}.....{singleWithdrawal.withdrawal_address?.slice(-8)}</div>}
                                            <button className='outline-none w-fit h-fit py-2 px-2.5 text-[0.8rem] text-black bg-[#c9b8eb] rounded-md capitalize flex items-center justify-center' onClick={() => copyFunction()}>
                                                {!copy && <MdContentCopy />}
                                                {copy && <FaCheck />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>date / time:</div>
                                        {Object.values(singleWithdrawal).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{moment(singleWithdrawal.createdAt).format('DD-MM-yyyy')} / {moment(singleWithdrawal.createdAt).format('h:mm')}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>message:</div>
                                        <div className='flex flex-col gap-1.5'>
                                            <textarea placeholder='Write A Message' className='p-2 md:w-52 w-44 h-32 text-black lg:text-[0.85rem] text-base outline-none bg-transparent border border-[#c9b8eb] rounded-md resize-none ipt scroll' value={message} onChange={e => setMessage(e.target.value)} onKeyUp={UpdateHandlerForText}></textarea>
                                            {Object.values(adminStore).length !== 0 && <button className='bg-[#c9b8eb] py-1 px-4 text-black w-fit ml-auto rounded-full font-semibold text-[0.8rem] flex items-center gap-0.5' onClick={GenerateWithdrawalMessage}>
                                                <span>Generate</span>
                                                <RiAiGenerate className='text-xs'/>
                                            </button>}
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center my-6'>
                                        <div className='italic '>status:</div>
                                        {singleWithdrawal?.status === 'processing' ?
                                            <div className='relative'>
                                                <div className='px-2 py-1 h-fit md:w-44 w-36 rounded-[3px] bg-white sha cursor-pointer' onClick={() => { setStatusShow(!statusShow); MoveToBottom() }} >
                                                    <div className='flex justify-between items-center text-[0.8rem]'>
                                                        <span >{status}</span>
                                                        <div className='text-sm'>
                                                            {!statusShow ? <TiArrowSortedDown />
                                                                :
                                                                <TiArrowSortedUp />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                {statusShow && <div className='h-fit w-full absolute top-[1.8rem] left-0 bg-white border border-[lightgrey] rounded-md z-10 text-[0.85rem] font-bold'>
                                                    {Statuses.map((item, i) => (
                                                        <div key={i} className={`flex flex-col px-2 py-0.5 cursor-pointer hover:bg-[#ececec] ${i !== Statuses.length - 1 && 'border-b border-[#ebeaea]'}`} onClick={() => UpdateHandlerForStatus(item)}>
                                                            <div className='flex items-center'>
                                                                <div className={`${item === 'confirmed' && 'text-[green]'}`}>{item}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>}
                                            </div>
                                            :
                                            <>
                                                {Object.values(singleWithdrawal).length !== 0 && <div className='md:text-base text-sm capitalize text-[green]'>{singleWithdrawal.status}</div>}
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            {update && <div className='flex items-center justify-center -mt-4'>
                                <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={AdminUpdateWithdrawal}>update details</button>
                            </div>}
                        </div>
                    }
                </div>
            </div>
        </ModalLayout>
    )
}

export default WithdrawalsModal