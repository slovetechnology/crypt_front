import React, { useEffect, useRef, useState } from 'react'
import { NOTIFICATIONS, UNREADNOTIS } from '../../../store'
import { useAtom } from 'jotai'
import { IoMdSettings, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { HiCheckCircle } from "react-icons/hi2";
import { TbNotification } from "react-icons/tb";
import { PiNotification } from "react-icons/pi"
import { FaXmark } from "react-icons/fa6";
import { MdError } from 'react-icons/md';
import { IoNotificationsOutline } from 'react-icons/io5';
import { Apis, PostApi, UserPutApi } from '../../../services/API';
import moment from 'moment';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import nothnyet from '../../../assets/images/nothn.png'



const Notifications = ({ refetchUnreadNotis, refetchNotifications, setToggle, setUrlState }) => {
    const [notis] = useAtom(NOTIFICATIONS)
    const [unreadNotis, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [mark, setMark] = useState(false)
    const [showNotis, setShowNotis] = useState(false)
    const [dlsingleNoti, setDlSingleNoti] = useState({})
    const [upSingleNoti, SetUpSingleNoti] = useState({})
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(4)
    const [pagestart, setpagestart] = useState(1)
    const [pageend, setpageend] = useState(notis.length / 4)

    const closer = useRef()

    useEffect(
        () => {
            if (closer) {
                window.addEventListener('click', (event) => {
                    if (closer.current !== null) {
                        if (!closer.current.contains(event.target)) {
                            setShowNotis(false)
                        }
                    }
                }, true)
            }
        }, []
    )



    const singleDeleteNotification = (item) => {
        setDlSingleNoti(item)
    }

    const DeleteNotification = async () => {
        const formbody = {
            notification_id: dlsingleNoti.id,
        }
        try {
            const response = await PostApi(Apis.notification.delete_notification, formbody)
            if (response.status === 200) {
                refetchNotifications()
                refetchUnreadNotis()
                setpageend(response.msg.length / 4)
                if (pagestart > Math.ceil(response.msg.length / 4)) {
                    let altstart = start
                    let altend = end
                    let altlengthstart = pagestart

                    altend -= 4
                    setEnd(altend)

                    altstart -= 4
                    setStart(altstart)

                    altlengthstart -= 1
                    setpagestart(altlengthstart)
                }
            }
        } catch (error) {
        }
    }

    const singleUpdateNotification = (item) => {
        SetUpSingleNoti(item)
    }


    const MarkSingleRead = async () => {
        const formbody = {
            notification_id: upSingleNoti.id,
        }
        try {
            const response = await UserPutApi(Apis.notification.update_single, formbody)
            if (response.status === 200) {
                refetchNotifications()
                refetchUnreadNotis()
            }
        } catch (error) {
        }
    }

    const MarkAllRead = async () => {
        try {
            const response = await UserPutApi(Apis.notification.update_all)
            if (response.status === 200) {
                refetchNotifications()
                setUnreadNotis(0)
            }
        } catch (error) {
        }
    }

    let MoveNotisPage = () => {

        if (end < notis.length) {
            let altstart = start
            let altend = end
            let altlengthstart = pagestart

            altend += 4
            setEnd(altend)

            altstart += 4
            setStart(altstart)

            altlengthstart += 1
            setpagestart(altlengthstart)
        }
    }

    let BackNotisPage = () => {

        if (end > 4) {
            let altstart = start
            let altend = end
            let altlengthstart = pagestart

            altend -= 4
            setEnd(altend)

            altstart -= 4
            setStart(altstart)

            altlengthstart -= 1
            setpagestart(altlengthstart)
        }
    }

    return (
        <div className='relative'>
            <>
                <div className={`flex items-center justify-center border w-9 h-9 rounded-full text-xl text-light border-light cursor-pointer ${showNotis ? 'hidden' : 'flex'}`} onClick={() => setShowNotis(true)}>
                    <IoNotificationsOutline />
                </div>
                <div className={`flex items-center justify-center border w-9 h-9 rounded-full text-xl text-light border-light cursor-pointer ${showNotis ? 'flex' : 'hidden'}`}>
                    <IoNotificationsOutline />
                </div>
                <div className='rounded-full w-5 h-[1.2rem] absolute -top-2 -right-1 cursor-pointer text-white text-[0.65rem] font-bold bg-light  shlz'  >
                    <div className={`w-full h-full flex items-center justify-center ${showNotis ? 'hidden' : 'flex'}`} onClick={() => setShowNotis(true)}>
                        {unreadNotis.length > 0 ?
                            <span>{unreadNotis.length}</span>
                            :
                            <span ><TbNotification /></span>
                        }
                    </div>
                    <div className={`w-full h-full flex items-center justify-center ${showNotis ? 'flex' : 'hidden'}`}>
                        {unreadNotis.length > 0 ?
                            <span>{unreadNotis.length}</span>
                            :
                            <span><PiNotification
                            /></span>
                        }
                    </div>
                </div>
            </>

            <div className={`md:absolute md:top-12 md:-right-4 md:left-auto md:w-60 md:h-fit md:rounded-sm fixed top-0 left-0 h-screen w-full bg-white z-50 py-3 px-2 ${showNotis ? 'block' : 'hidden'}`} ref={closer}>
                <div className='text-black flex flex-col relative mt-2 md:mt-0'>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-1 items-center md:text-base text-2xl capitalize font-[800]'>
                            <div className='cursor-pointer md:hidden' onClick={() => setShowNotis(false)}><FaAngleLeft /></div>
                            <div>notifications</div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='relative'>
                                <div className='rounded-full w-fit h-fit p-1 bg-[#b4b3b3] cursor-pointer md:text-[0.85rem] text-lg' onClick={() => { setMark(!mark); setSearchNoti(false) }}>
                                    <IoMdSettings />
                                </div>
                                {mark && <div className='md:w-36 w-40 h-fit py-1 px-2 flex items-center justify-center gap-1 bg-white shantf2 font-bold absolute md:top-6 top-8 right-0 rounded-md cursor-pointer z-20 hover:bg-[#f1f1f1] md:text-xs text-sm' onClick={MarkAllRead}>
                                    <span>Mark all as read</span>
                                    <IoMdCheckmarkCircleOutline className='text-light' />
                                </div>}
                            </div>
                        </div>
                    </div>
                    {notis.length > 0 ? <div className='mt-2 md:mt-0'>
                        {notis.slice(start, end).map((item, i) => (
                            <div key={i} className='flex flex-col items-center md:pt-2 pt-3 md:text-xs text-[0.8rem]'>
                                <div className={` p-2 rounded-md ${item.read === 'true' ? '' : 'bg-[#c0b9e4]'} relative shantf  w-full h-fit cursor-pointer overflow-hidden`} onMouseOver={() => singleUpdateNotification(item)} >
                                    <div onClick={() => { setToggle(item.URL); setUrlState(item.URL_state); MarkSingleRead(); setShowNotis(false) }} className='flex flex-col gap-2'>
                                        <div className='flex gap-0.5 items-center border-b border-[grey] w-fit'>
                                            <div className='capitalize font-[800]'>{item.title}</div>
                                            {item.status !== 'failed' ? <HiCheckCircle className='text-light ' />
                                                :
                                                <MdError className='text-[#c94747]' />}
                                        </div>
                                        <div className='font-[600]'>{item.content}</div>
                                        <div className=' text-[0.7rem] text-[#3d3d3d] font-bold mt-2'>{moment(item.createdAt).fromNow()}</div>
                                    </div>
                                    <FaXmark className='text-[#5f5f5f] text-[0.85rem] cursor-pointer hover:bg-[grey] hover:text-[#272727] absolute top-0 right-0 rounded-full' onMouseOver={() => singleDeleteNotification(item)} onClick={DeleteNotification} />
                                </div>
                            </div>
                        ))}
                    </div>
                        :
                        <div className='mt-32 md:mt-20 flex justify-center'>
                            <img src={nothnyet} className='md:h-20 h-48 w-auto'></img>
                        </div>
                    }
                </div>
                {notis.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end'>
                    {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-zinc-500 text-zinc-600 hover:bg-semi-white cursor-pointer' onClick={BackNotisPage}><FaAngleLeft /></div>}
                    {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
                    {end < notis.length && <div className='py-1 px-2 rounded-md border border-zinc-500 text-zinc-600 hover:bg-semi-white cursor-pointer' onClick={MoveNotisPage}><FaAngleRight /></div>}
                </div>}
            </div>
        </div>
    )
}

export default Notifications