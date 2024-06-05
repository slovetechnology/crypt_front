import React, { useEffect, useRef, useState } from 'react'
import { NOTIFICATIONS, PROFILE, UNREADNOTIS } from '../../../store'
import { useAtom } from 'jotai'
import { IoMdNotificationsOff, IoMdSettings, IoMdSearch, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { HiCheckCircle } from "react-icons/hi2";
import { TbNotification } from "react-icons/tb";
import { PiNotification } from "react-icons/pi"
import { FaXmark } from "react-icons/fa6";
import { FiX } from 'react-icons/fi';
import { MdError } from 'react-icons/md';
import { IoNotificationsOutline } from 'react-icons/io5';
import { Apis, PostApi, UserPutApi } from '../../../services/API';
import moment from 'moment';

const Notifications = ({ altnotis, setAltNotis, refetchUnreadNotis, refetchNotifications, setToggle, setUrlState, pagelengthend, setPagelengthend }) => {
    const [user, setUser] = useAtom(PROFILE)
    const [notis] = useAtom(NOTIFICATIONS)
    const [unreadNotis, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [mark, setMark] = useState(false)
    const [notify, setNotify] = useState(false)
    const [showNotis, setShowNotis] = useState(false)
    const [searchNoti, setSearchNoti] = useState(false)
    const [dlsingleNoti, setDlSingleNoti] = useState({})
    const [upSingleNoti, SetUpSingleNoti] = useState({})
    const [search, setSearch] = useState('')
    const [write, setWrite] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(3)
    const [pagelengthstart, setPagelengthstart] = useState(1)


    const styleShow = {
        display: showNotis === true ? "block" : "none"
    }
    const styler = {
        display: showNotis === true ? "flex" : "none"
    }
    const reverseShow = {
        display: showNotis === true ? "none" : "flex"
    }

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

    const Notification = async () => {
        setNotify(!notify)
        setShowNotis(false)

        const formbody = {
            user_id: user.id,
            notify: notify
        }
        try {
            const response = await UserPutApi(Apis.user.notification, formbody)
            if (response.status === 200) {
                setUser(response.msg)
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        }
    }


    const handleSearch = () => {
        if (!search) {
            setAltNotis(notis)
            setPagelengthend(notis.length / 3)
            setWrite(false)
            setPagelengthstart(1)
            setStart(0)
            setEnd(3)
        }
        else {
            const showSearch = altnotis.filter(item => item.title.includes(search.toLowerCase()))
            setAltNotis(showSearch)
            setPagelengthend(showSearch.length / 3)
            setWrite(true)
            setPagelengthstart(1)
            setStart(0)
            setEnd(3)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setAltNotis(notis)
        setPagelengthend(notis.length / 3)
        setWrite(false)
        setPagelengthstart(1)
        setStart(0)
        setEnd(3)
    }

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
                setAltNotis(response.msg)
                setSearch('')
                setWrite(false)
                setPagelengthend(response.msg.length / 3)
                if (pagelengthstart > Math.ceil(response.msg.length / 3)) {
                    let altstart = start
                    let altend = end
                    let altlengthstart = pagelengthstart

                    altend -= 3
                    setEnd(altend)

                    altstart -= 3
                    setStart(altstart)

                    altlengthstart -= 1
                    setPagelengthstart(altlengthstart)
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
                setAltNotis(response.msg)
            }
        } catch (error) {
        }
    }

    const MarkAllRead = async () => {
        try {
            const response = await UserPutApi(Apis.notification.update_all)
            if (response.status === 200) {
                setAltNotis(response.msg)
                refetchNotifications()
                setUnreadNotis(0)
            }
        } catch (error) {
        }
    }

    let MoveNotisPage = () => {

        if (end < altnotis.length) {
            let altstart = start
            let altend = end
            let altlengthstart = pagelengthstart

            altend += 3
            setEnd(altend)

            altstart += 3
            setStart(altstart)

            altlengthstart += 1
            setPagelengthstart(altlengthstart)
        }
    }

    let BackNotisPage = () => {

        if (end > 3) {
            let altstart = start
            let altend = end
            let altlengthstart = pagelengthstart

            altend -= 3
            setEnd(altend)

            altstart -= 3
            setStart(altstart)

            altlengthstart -= 1
            setPagelengthstart(altlengthstart)
        }
    }

    return (
        <div className='relative'>
            <div className={`flex items-center justify-center border w-[2.3rem] h-[2.3rem] rounded-full text-[1.2rem]  cursor-pointer ${user.notify === 'true' ? 'text-[green] border-[green]' : 'text-[#afa7df] border-[#afa7df]'} `} onClick={Notification}>
                <IoNotificationsOutline />
            </div>
            {user.notify === 'true' && <div className='rounded-full w-[1.25rem] h-[1.2rem] absolute top-[-0.5rem] right-[-0.3rem] cursor-pointer text-white text-[0.6rem] font-bold bg-[green] flex items-center justify-center shlz'  >
                <div className=' rounded-full flex justify-center items-center w-full h-full' onClick={() => { setShowNotis(true) }} style={reverseShow}>
                    {unreadNotis.length > 0 ?
                        <span>{unreadNotis.length}</span>
                        :
                        <span className='text-[0.65rem]'><TbNotification /></span>
                    }
                </div>
                <div className=' rounded-full flex justify-center items-center w-full h-full' style={styler}>
                    {unreadNotis.length > 0 ?
                        <span>{unreadNotis.length}</span>
                        :
                        <span className='text-[0.65rem]'><PiNotification
                        /></span>
                    }
                </div>
            </div>}

            <div className='absolute top-11 right-[-1rem] w-[15rem] h-fit rounded-[2px] bg-white z-50' style={styleShow} ref={closer}>
                {notis.length > 0 ? <div className=' text-[0.75rem] text-black flex flex-col relative py-3'>
                    <div className='flex justify-between px-2 items-center'>
                        <div className='capitalize text-[1rem] font-[800]'>notifications</div>
                        <div className='flex gap-2 items-center'>
                            <div className='relative'>
                                <div className='rounded-full w-[1.2rem] h-[1.2rem] flex items-center justify-center bg-[#b4b3b3] cursor-pointer' onClick={() => { setMark(!mark); setSearchNoti(false) }}>
                                    <IoMdSettings className='text-[0.8rem]' />
                                </div>
                                {mark && <div className='w-[9rem] h-fit py-1 px-2 flex items-center gap-1 bg-[white] shantf2 font-bold absolute top-6 right-0 rounded-md cursor-pointer z-20 hover:bg-[#f1f1f1]' onClick={MarkAllRead}>
                                    <span>Mark all as read?</span>
                                    <IoMdCheckmarkCircleOutline className='text-[0.9rem]' />
                                </div>}
                            </div>
                            <div className='relative z-20'>
                                <div className='rounded-full w-[1.2rem] h-[1.2rem] flex items-center justify-center bg-[#b4b3b3] cursor-pointer text-black' onClick={() => { setSearchNoti(!searchNoti); setMark(false) }}>
                                    <IoMdSearch className='text-[0.83rem]' />
                                </div>
                                {searchNoti && <div className='w-[10rem] h-[1.5rem] absolute top-6 right-0'>
                                    <div className='w-full h-full relative'>
                                        <input className='outline-none pl-2 shantf2 rounded-[5px]  w-full h-full bg-[white]' type='text' value={search} onChange={e => setSearch(e.target.value)} placeholder='search by title' onKeyUp={handleSearch}></input>
                                        {write &&
                                            <div className='absolute top-[0.35rem] right-2 text-[0.5rem] cursor-pointer bg-[#585858] rounded-[50%] w-[0.75rem] h-[0.75rem] flex items-center text-[white] justify-center' onClick={CancelWrite}>
                                                <FiX />
                                            </div>
                                        }
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                    {altnotis.slice(start, end).map((item, i) => (
                        <div key={i} className='flex flex-col items-center pt-2 px-2'>
                            <div className={` p-[0.5rem] rounded-md ${item.read === 'true' ? '' : 'bg-[#c0b9e4]'} relative shantf  w-full h-fit cursor-pointer overflow-hidden`} onMouseOver={() => singleUpdateNotification(item)} >
                                <div onClick={() => { setToggle(item.URL); setUrlState(item.URL_state); MarkSingleRead(); setShowNotis(false) }} className='flex flex-col gap-1'>
                                    <div className='flex items-center'>
                                        <div className='flex gap-[0.2rem] items-center'>
                                            <div className='capitalize font-[800] border-b text-[0.8rem] border-[grey] w-fit'>{item.title}</div>
                                            {item.status !== 'failed' ? <HiCheckCircle className='text-[#7665D5] ' />
                                                :
                                                <MdError className='text-[#c94747]' />}
                                        </div>
                                    </div>
                                    <div className='font-bold'>{item.content}</div>
                                    <div className=' text-[0.7rem] text-[#3d3d3d] font-bold mt-[0.5rem]'>{moment(item.createdAt).fromNow()}</div>
                                </div>
                                <FaXmark className='text-[#5f5f5f] text-[0.85rem] cursor-pointer hover:bg-[grey] hover:text-[#272727] absolute top-0 right-0 rounded-full' onMouseOver={() => singleDeleteNotification(item)} onClick={DeleteNotification} />
                            </div>
                        </div>
                    ))}
                </div>
                    :
                    <div className='text-[black] font-bold capitalize  text-[0.9rem] p-2'>
                        <div className='p-[0.3rem] flex gap-1 items-center justify-center shantf rounded-xl'>
                            <span>no notification</span>
                            <IoMdNotificationsOff className='text-[#7665D5] text-[1.1rem]' />
                        </div>
                    </div>
                }
                {notis.length > 0 && <div className='flex flex-col gap-1 text-[0.75rem] px-2 py-2'>
                    {Math.ceil(pagelengthend) > 1 && <div className='flex justify-end font-bold text-[grey]'>{pagelengthstart} of {Math.ceil(pagelengthend)}</div>}
                    <div className='flex items-center justify-end  gap-2 text-white '>
                        {pagelengthstart > 1 && <button className='w-fit h-fit py-[0.25rem] px-[1rem] rounded-[10rem] bg-[#8d84bb] hover:bg-[#4e438d] capitalize' onClick={BackNotisPage}>prev</button>}
                        {end < altnotis.length && <button className='w-fit h-fit py-[0.25rem] px-[1rem] rounded-[10rem] bg-[#8d84bb] hover:bg-[#4e438d] capitalize' onClick={MoveNotisPage}>next</button>}
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Notifications