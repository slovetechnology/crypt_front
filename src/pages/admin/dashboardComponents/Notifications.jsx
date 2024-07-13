import React, { useEffect, useRef, useState } from 'react'
import { NOTIFICATIONS, PROFILE, UNREADNOTIS } from '../../../store'
import { useAtom } from 'jotai'
import { IoMdSettings, IoMdSearch, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { HiCheckCircle } from "react-icons/hi2";
import { TbNotification } from "react-icons/tb";
import { PiNotification } from "react-icons/pi"
import { FaXmark } from "react-icons/fa6";
import { FiX } from 'react-icons/fi';
import { MdError } from 'react-icons/md';
import { IoNotificationsOutline } from 'react-icons/io5';
import { Apis, PostApi, UserPutApi } from '../../../services/API';
import moment from 'moment';
import { IoMdArrowBack } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import nothnyet from '../../../assets/images/nothn.png'



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
    const [end, setEnd] = useState(4)
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
            setPagelengthend(notis.length / 4)
            setWrite(false)
            setPagelengthstart(1)
            setStart(0)
            setEnd(3)
        }
        else {
            const showSearch = altnotis.filter(item => item.title.includes(search.toLowerCase()))
            setAltNotis(showSearch)
            setPagelengthend(showSearch.length / 4)
            setWrite(true)
            setPagelengthstart(1)
            setStart(0)
            setEnd(4)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setAltNotis(notis)
        setPagelengthend(notis.length / 4)
        setWrite(false)
        setPagelengthstart(1)
        setStart(0)
        setEnd(4)
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
                setSearch('')
                setWrite(false)
                setPagelengthend(response.msg.length / 4)
                if (pagelengthstart > Math.ceil(response.msg.length / 4)) {
                    let altstart = start
                    let altend = end
                    let altlengthstart = pagelengthstart

                    altend -= 4
                    setEnd(altend)

                    altstart -= 4
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

        if (end < altnotis.length) {
            let altstart = start
            let altend = end
            let altlengthstart = pagelengthstart

            altend += 4
            setEnd(altend)

            altstart += 4
            setStart(altstart)

            altlengthstart += 1
            setPagelengthstart(altlengthstart)
        }
    }

    let BackNotisPage = () => {

        if (end > 4) {
            let altstart = start
            let altend = end
            let altlengthstart = pagelengthstart

            altend -= 4
            setEnd(altend)

            altstart -= 4
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
                <div className=' rounded-full flex justify-center items-center w-full h-full' onClick={() => setShowNotis(true)} style={reverseShow}>
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

            <div className='md:absolute md:top-12 md:right-[-1rem] md:left-auto md:w-[15rem] md:h-fit md:rounded-[2px] fixed top-0 left-0 h-screen w-full bg-white z-50 md:py-3 py-5 px-2' style={styleShow} ref={closer}>
                <div className='text-black flex flex-col relative '>
                    <div className='mb-2 text-xl cursor-pointer md:hidden' onClick={() => setShowNotis(false)}><IoMdArrowBack /></div>
                    <div className='flex justify-between items-center'>
                        <div className='capitalize md:text-[1rem] text-xl font-[800]'>notifications</div>
                        <div className='flex gap-2 items-center'>
                            <div className='relative'>
                                <div className='rounded-full md:w-[1.2rem] md:h-[1.2rem] w-6 h-6 flex items-center justify-center bg-[#b4b3b3] cursor-pointer md:text-[0.85rem] text-lg' onClick={() => { setMark(!mark); setSearchNoti(false) }}>
                                    <IoMdSettings />
                                </div>
                                {mark && <div className='md:w-36 w-40 h-fit py-1 px-2 flex items-center justify-center gap-1 bg-white shantf2 font-bold absolute md:top-6 top-7 right-0 rounded-md cursor-pointer z-20 hover:bg-[#f1f1f1] md:text-xs text-sm' onClick={MarkAllRead}>
                                    <span>Mark all as read?</span>
                                    <IoMdCheckmarkCircleOutline className='text-[0.9rem]' />
                                </div>}
                            </div>
                            <div className='relative z-20'>
                                <div className='rounded-full md:w-[1.2rem] md:h-[1.2rem] w-6 h-6 flex items-center justify-center bg-[#b4b3b3] cursor-pointer text-black md:text-[0.85rem] text-lg' onClick={() => { setSearchNoti(!searchNoti); setMark(false) }}>
                                    <IoMdSearch />
                                </div>
                                {searchNoti && <div className='md:w-40 w-48 md:h-6 h-7 absolute md:top-6 top-7 right-0'>
                                    <div className='w-full h-full relative'>
                                        <input className='outline-none pl-2 shantf2 rounded-[5px]  w-full h-full bg-white' type='text' value={search} onChange={e => setSearch(e.target.value)} placeholder='search by title' onKeyUp={handleSearch}></input>
                                        {write &&
                                            <div className='absolute top-[0.35rem] right-2 text-[0.5rem] cursor-pointer bg-[#585858] rounded-[50%] w-[0.75rem] h-[0.75rem] flex items-center text-white justify-center' onClick={CancelWrite}>
                                                <FiX />
                                            </div>
                                        }
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                    {altnotis.length > 1 ? <div className='mt-5 md:mt-0'>
                        {altnotis.slice(start, end).map((item, i) => (
                            <div key={i} className='flex flex-col items-center md:pt-2 pt-3 md:text-xs'>
                                <div className={` p-2 rounded-md ${item.read === 'true' ? '' : 'bg-[#c0b9e4]'} relative shantf  w-full h-fit cursor-pointer overflow-hidden`} onMouseOver={() => singleUpdateNotification(item)} >
                                    <div onClick={() => { setToggle(item.URL); setUrlState(item.URL_state); MarkSingleRead(); setShowNotis(false) }} className='flex flex-col gap-1'>
                                        <div className='flex items-center'>
                                            <div className='flex gap-[0.2rem] items-center'>
                                                <div className='capitalize font-[800] border-b text-[0.8rem] border-[grey] w-fit'>{item.title}</div>
                                                {item.status !== 'failed' ? <HiCheckCircle className='text-[#7665D5] ' />
                                                    :
                                                    <MdError className='text-[#c94747]' />}
                                            </div>
                                        </div>
                                        <div className='font-[600] md:font-[650]'>{item.content}</div>
                                        <div className=' text-[0.7rem] text-[#3d3d3d] font-bold mt-[0.5rem]'>{moment(item.createdAt).fromNow()}</div>
                                    </div>
                                    <FaXmark className='text-[#5f5f5f] text-[0.85rem] cursor-pointer hover:bg-[grey] hover:text-[#272727] absolute top-0 right-0 rounded-full' onMouseOver={() => singleDeleteNotification(item)} onClick={DeleteNotification} />
                                </div>
                            </div>
                        ))}
                    </div>
                        :
                        <div className='mt-32 md:mt-20 flex justify-center'>
                            <img src={nothnyet} className='md:h-20 h-64 w-auto'></img>
                        </div>
                    }
                </div>
                {notis.length > 0 && <div className='flex gap-2 items-center md:text-xs mt-4 justify-end'>
                    {pagelengthstart > 1 && <div className='py-1 px-2 rounded-md border border-gray-300 hover:bg-semi-white cursor-pointer' onClick={BackNotisPage}><FaAngleLeft /></div>}
                    {Math.ceil(pagelengthend) > 1 && <div className='font-bold text-[grey]'>{pagelengthstart} of {Math.ceil(pagelengthend)}</div>}
                    {end < altnotis.length && <div className='py-1 px-2 rounded-md border border-gray-300 hover:bg-semi-white cursor-pointer' onClick={MoveNotisPage}><FaAngleRight /></div>}
                </div>}
            </div>
        </div>
    )
}

export default Notifications