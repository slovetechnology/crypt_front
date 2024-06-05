import React, { useEffect, useRef, useState } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'
import { TbNotification } from 'react-icons/tb'
import { PiNotification } from 'react-icons/pi'
import { HiCheckCircle } from 'react-icons/hi2'
import { useAtom } from 'jotai'
import moment from 'moment'
import { FiX } from 'react-icons/fi'
import { Apis, UserPutApi } from '../../../services/API'
import { IoMdNotificationsOff, IoMdSearch } from 'react-icons/io'
import { NOTIFICATIONS, UNREADNOTIS } from '../../../store'

const AdminNotis = ({ altnotis, setAltNotis }) => {
    const [notifications] = useAtom(NOTIFICATIONS)
    const [unreadNotis, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [showNotis, setShowNotis] = useState(false)
    const [searchNoti, setSearchNoti] = useState(false)
    const [search, setSearch] = useState('')
    const [write, setWrite] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(3)
    const [pagestart, setPagestart] = useState(1)
    const [pageend, setPageend] = useState(altnotis.length / end)

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

    const MarkAllRead = async () => {
        try {
            const response = await UserPutApi(Apis.notification.update_admin_all)
            if (response.status === 200) {
                setUnreadNotis(0)
            }
        } catch (error) {
        }
    }


    let MoveNotisPage = () => {

        if (end < notifications.length) {
            let altstart = start
            let altend = end
            let altlengthstart = pagestart

            altend += 3
            setEnd(altend)

            altstart += 3
            setStart(altstart)

            altlengthstart += 1
            setPagestart(altlengthstart)
        }
    }

    let BackNotisPage = () => {

        if (end > 3) {
            let altstart = start
            let altend = end
            let altlengthstart = pagestart

            altend -= 3
            setEnd(altend)

            altstart -= 3
            setStart(altstart)

            altlengthstart -= 1
            setPagestart(altlengthstart)
        }
    }

    const handleSearch = () => {
        if (!search) {
            setAltNotis(notifications)
            setPageend(notifications.length / 3)
            setWrite(false)
            setPagestart(1)
            setStart(0)
            setEnd(3)
        }
        else {
            const showSearch = altnotis.filter(item => item.title.includes(search.toLowerCase()))
            setAltNotis(showSearch)
            setPageend(showSearch.length / 3)
            setWrite(true)
            setPagestart(1)
            setStart(0)
            setEnd(3)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setAltNotis(notifications)
        setPageend(notifications.length / 3)
        setWrite(false)
        setPagestart(1)
        setStart(0)
        setEnd(3)
    }

    return (
        <div className='relative'>
            <div className={`flex items-center justify-center border w-[2.3rem] h-[2.3rem] rounded-full text-[1.2rem] text-[white] border-[white] `}>
                <IoNotificationsOutline />
            </div>
            <div className='rounded-full w-[1.25rem] h-[1.2rem] absolute top-[-0.5rem] right-[-0.3rem] cursor-pointer text-[#462c7c] text-[0.65rem] font-[900] bg-white flex items-center justify-center notisha' onClick={MarkAllRead}>
                <div className=' rounded-full flex items-center justify-center w-full h-full' onClick={() => { setShowNotis(true) }} style={reverseShow}>
                    {unreadNotis.length > 0 ?
                        <span>{unreadNotis.length}</span>
                        :
                        <span ><TbNotification /></span>
                    }
                </div>
                <div className=' rounded-full flex justify-center items-center w-full h-full' style={styler}>
                    {unreadNotis.length > 0 ?
                        <span>{unreadNotis.length}</span>
                        :
                        <span><PiNotification
                        /></span>
                    }
                </div>
            </div>

            <div className='absolute top-11 right-[-1rem] w-[15rem] h-fit rounded-[2px] bg-[silver] z-20 ' style={styleShow} ref={closer}>
                {notifications.length > 0 ? <div className=' text-[0.75rem] text-black  flex flex-col relative py-3'>
                    <div className='flex justify-between px-2 items-center'>
                        <div className='capitalize text-[1rem] font-[800]'>notifications</div>
                        <div className='relative z-20'>
                            <div className='rounded-full w-[1.4rem] h-[1.4rem] flex items-center justify-center bg-[#8d8c8c] cursor-pointer text-white' onClick={() => setSearchNoti(!searchNoti)}>
                                <IoMdSearch className='text-[0.9rem]' />
                            </div>
                            {searchNoti && <div className='w-[10rem] h-[1.5rem] absolute top-7 right-0'>
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
                    {altnotis.slice(start, end).map((item, i) => (
                        <div key={i} className='flex flex-col items-center pt-2 px-2 text-black'>
                            <div className=' p-[0.5rem] rounded-md bg-white relative shantf w-full h-fit '>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex items-center'>
                                        <div className='flex gap-[0.2rem] items-center'>
                                            <div className='capitalize font-[800] border-b text-[0.8rem] border-[grey] w-fit'>{item.title}</div>
                                            <HiCheckCircle className='text-[#462c7c] ' />
                                        </div>
                                    </div>
                                    <div className='font-bold'>{item.content}</div>
                                    <div className=' text-[0.7rem] text-[#3d3d3d] font-bold mt-[0.5rem]'>{moment(item.createdAt).fromNow()}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                    :
                    <div className='text-[black] font-bold capitalize  text-[0.9rem] p-2'>
                        <div className='p-[0.3rem] flex gap-1 items-center justify-center bg-white shantf rounded-xl'>
                            <span>no notification</span>
                            <IoMdNotificationsOff className='text-[#462c7c] text-[1.1rem]' />
                        </div>
                    </div>
                }
                {notifications.length > 0 && <div className='flex flex-col gap-1 text-[0.75rem] px-2 py-2'>
                    {Math.ceil(pageend) > 1 && <div className='flex justify-end font-bold text-[#646464]'>{pagestart} of {Math.ceil(pageend)}</div>}
                    <div className='flex items-center justify-end  gap-2 text-white '>
                        {pagestart > 1 && <button className='w-fit h-fit py-[0.25rem] px-[1rem] rounded-[10rem] bg-[grey] hover:bg-[#747373] capitalize' onClick={BackNotisPage}>prev</button>}
                        {end < altnotis.length && <button className='w-fit h-fit py-[0.25rem] px-[1rem] rounded-[10rem] bg-[grey] hover:bg-[#747373] capitalize' onClick={MoveNotisPage}>next</button>}
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default AdminNotis