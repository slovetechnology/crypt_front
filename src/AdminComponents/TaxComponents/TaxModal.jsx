import React, { useEffect, useRef, useState } from 'react'
import { Apis, UserPutApi, imageurl } from '../../services/API'
import moment from 'moment';
import { FaXmark } from 'react-icons/fa6';
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import avatar from '../../assets/images/avatar.png'
import Loading from '../../GeneralComponents/Loading';
import { Alert } from '../../utils/utils';
import ModalLayout from '../../utils/ModalLayout';
import { useAtom } from 'jotai';
import { ADMINSTORE } from '../../store';
import {Image} from 'antd'

const TaxModal = ({ closeView, refetchAllTaxes, singleTax }) => {
    const [adminStore] = useAtom(ADMINSTORE)

    const [message, setMessage] = useState('')
    const toggler = useRef()
    const [status, setStatus] = useState(singleTax.status)
    const [statusShow, setStatusShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    const [beforeshow, setBeforeshow] = useState(true)

    setTimeout(() => {
        setBeforeshow(false)
    }, 1500)

    const Statuses = [
        "processing",
        "received",
        "failed"
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
            if (statusShow || status !== singleTax.status || message !== '') {
                MoveToBottom()
            }
        }
    }, [MoveToBottom]
    )

    const UpdateHandlerForText = () => {
        if (message === '' && status === singleTax.status) {
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    const UpdateHandlerForStatus = (item) => {
        setStatus(item)
        setStatusShow(false)
        if (item === singleTax.status && message === '') {
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    const GenerateTaxMessage = () => {
        const NewTaxAmount = singleTax.amount / 2
        setMessage(`Your first tax payment cleared. Now you have to pay an additional ${adminStore.tax_percentage / 2}% tax fee of $${NewTaxAmount} to successfully complete your withdrawal. Pay now?`)
        setUpdate(true)
    }


    const UpdateTaxPayment = async () => {

        const formbody = {
            tax_id: singleTax.id,
            user_id: singleTax.user,
            message: message,
            status: status,
        }

        if (update) {
            setLoading(true)
            const move = document.querySelector('.move')
            move.scrollTo({
                top: 0,
            })

            try {
                const response = await UserPutApi(Apis.admin.update_taxes, formbody)
                if (response.status === 200) {
                    refetchAllTaxes()
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
                                <div className='flex items-center justify-center md:w-[5.8rem] md:h-[5.8rem] w-20 h-20 rounded-full bg-[#c9b8eb] mx-auto'>
                                    {Object.values(singleTax).length !== 0 &&
                                        <>
                                            {singleTax.taxPayer.image ? <img src={`${imageurl}/profiles/${singleTax.taxPayer.image}`} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                                                :
                                                <img src={avatar} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                                            }
                                        </>
                                    }
                                </div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-2'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>username:</div>
                                        {Object.values(singleTax).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleTax.taxPayer.username}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>email:</div>
                                        {Object.values(singleTax).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleTax.taxPayer.email}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 border p-1'>
                                <div className=' uppercase font-bold border px-1 '>tax payment details:</div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>amount:</div>
                                        {Object.values(singleTax).length !== 0 && <div className='md:text-[0.95rem] text-sm'>${singleTax.amount.toFixed(1).toLocaleString()}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>crypto:</div>
                                        {Object.values(singleTax).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleTax.crypto}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>deposit address:</div>
                                        {Object.values(singleTax).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleTax.deposit_address?.slice(0, 5)}.....{singleTax.deposit_address?.slice(-8)}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>date/time:</div>
                                        {Object.values(singleTax).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{moment(singleTax.createdAt).format('DD-MM-yyyy')} / {moment(singleTax.createdAt).format('h:mm')}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic'>proof of payment:</div>
                                        {Object.values(singleTax).length !== 0 && <Image src={`${imageurl}/taxPayment/${singleTax.payment_proof}`} height={200}/>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>tax message:</div>
                                        <div className='flex flex-col gap-1'>
                                            <textarea placeholder='Type A Message' className='p-2 md:w-52 w-44 h-32 text-black lg:text-[0.85rem] text-base outline-none bg-transparent border border-[#c9b8eb] rounded-md resize-none ipt scroll' value={message} onChange={e => setMessage(e.target.value)} onKeyUp={UpdateHandlerForText}></textarea>
                                            <button className='bg-[#c9b8eb] py-1 px-4 text-black w-fit ml-auto rounded-full font-semibold text-[0.8rem]' onClick={GenerateTaxMessage}>Generate</button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-6 my-6'>
                                        <div className='flex justify-between items-center'>
                                            <div className='italic'>status:</div>
                                            {singleTax.status === 'processing' ? <div className='relative'>
                                                <div className='px-2 py-1 h-fit md:w-44 w-36 bg-white rounded-sm sha cursor-pointer' onClick={() => { setStatusShow(!statusShow); MoveToBottom() }} >
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
                                                {statusShow && <div className='h-fit w-full absolute top-[1.8rem] left-0 bg-white border border-[lightgrey] rounded-md z-50'>
                                                    {Statuses.map((item, i) => (
                                                        <div key={i} className={`flex flex-col px-2 py-0.5 hover:bg-[#e6e5e5] ${i === Statuses.length - 1 ? 'hover:rounded-b-md' : 'border-b border-[#ebeaea]'}`}>
                                                            <div className='flex items-center cursor-pointer hover:bg-[#e6e5e5]' onClick={() => UpdateHandlerForStatus(item)}>
                                                                <div className={`text-[0.85rem] font-bold ${item === 'received' && 'text-[green]'} ${item === 'failed' && 'text-[red]'}`}>{item}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>}
                                            </div>
                                                :
                                                <>
                                                    {Object.values(singleTax).length !== 0 && <div className={`md:text-base text-sm capitalize ${singleTax.status === 'received' && 'text-[green]'} ${singleTax.status === 'failed' && 'text-[red]'}`}>{singleTax.status}</div>}
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {update && <div className='flex items-center justify-center -mt-4'>
                                <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium ' onClick={UpdateTaxPayment}>update details</button>
                            </div>}
                        </div>}
                </div>
            </div>
        </ModalLayout>
    )
}

export default TaxModal