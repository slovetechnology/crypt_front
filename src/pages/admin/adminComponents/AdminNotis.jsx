import React, { useEffect, useRef, useState } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'
import { TbNotification } from 'react-icons/tb'
import { PiNotification } from 'react-icons/pi'
import { HiCheckCircle } from 'react-icons/hi2'
import { useAtom } from 'jotai'
import moment from 'moment'
import { FiX } from 'react-icons/fi'
import { Apis, UserPutApi } from '../../../services/API'
import { IoMdArrowBack, IoMdSearch } from 'react-icons/io'
import { NOTIFICATIONS, UNREADNOTIS } from '../../../store'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import nothnyet from '../../../assets/images/nothn.png'


const AdminNotis = ({ altnotis, setAltNotis }) => {
    const [notifications] = useAtom(NOTIFICATIONS)
    const [unreadNotis, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [showNotis, setShowNotis] = useState(false)
    const [searchNoti, setSearchNoti] = useState(false)
    const [search, setSearch] = useState('')
    const [write, setWrite] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(4)
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

            altend += 4
            setEnd(altend)

            altstart += 4
            setStart(altstart)

            altlengthstart += 1
            setPagestart(altlengthstart)
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
            setPagestart(altlengthstart)
        }
    }

    const handleSearch = () => {
        if (!search) {
            setAltNotis(notifications)
            setPageend(notifications.length / 4)
            setWrite(false)
            setPagestart(1)
            setStart(0)
            setEnd(4)
        }
        else {
            const showSearch = altnotis.filter(item => item.title.includes(search.toLowerCase()))
            setAltNotis(showSearch)
            setPageend(showSearch.length / 4)
            setWrite(true)
            setPagestart(1)
            setStart(0)
            setEnd(4)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setAltNotis(notifications)
        setPageend(notifications.length / 4)
        setWrite(false)
        setPagestart(1)
        setStart(0)
        setEnd(4)
    }

    return (
        <div className='relative'>
            <div className={`flex items-center justify-center border w-9 h-9 rounded-full text-xl text-white  border-white `}>
                <IoNotificationsOutline />
            </div>
            <div className='rounded-full w-5 h-[1.2rem] absolute -top-2 -right-1 cursor-pointer text-[#462c7c] text-[0.65rem] font-extrabold bg-white notisha' onClick={MarkAllRead}>
                <div className='w-full h-full flex items-center justify-center' onClick={() => { setShowNotis(true) }} style={reverseShow}>
                    {unreadNotis.length > 0 ?
                        <span>{unreadNotis.length}</span>
                        :
                        <span ><TbNotification /></span>
                    }
                </div>
                <div className='w-full h-full flex items-center justify-center' style={styler}>
                    {unreadNotis.length > 0 ?
                        <span>{unreadNotis.length}</span>
                        :
                        <span><PiNotification
                        /></span>
                    }
                </div>
            </div>

            <div className='md:absolute md:top-12 md:-right-4 md:left-auto md:w-60 md:h-fit md:rounded-sm fixed top-0 left-0 h-screen w-full md:bg-[silver] bg-white z-50 py-3 px-2 text-black' style={styleShow} ref={closer}>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-1 items-center mt-2'>
                        <div className='text-xl cursor-pointer md:hidden' onClick={() => setShowNotis(false)}><FaAngleLeft /></div>
                        <div className='capitalize md:text-base text-xl font-[800]'>notifications</div>
                    </div>
                    <div className='relative z-20'>
                        <div className='rounded-full w-fit h-fit p-1 md:bg-[#8d8c8c] bg-[#b4b3b3] cursor-pointer md:text-white text-black md:text-[0.85rem] text-lg' onClick={() => setSearchNoti(!searchNoti)}>
                            <IoMdSearch/>
                        </div>
                        {searchNoti && <div className='md:w-40 w-48 md:h-6 h-7 absolute md:top-6 top-7 right-0'>
                            <div className='w-full h-full relative'>
                                <input className='outline-none pl-2 shantf2 rounded-[5px] w-full h-full bg-white md:text-sm text-base ipt' type='text' value={search} onChange={e => setSearch(e.target.value)} placeholder='search by title' onKeyUp={handleSearch}></input>
                                {write &&
                                    <div className='absolute top-[0.35rem] right-2 text-[0.5rem] cursor-pointer bg-[#585858] rounded-full w-3 h-3 flex items-center text-white  justify-center' onClick={CancelWrite}>
                                        <FiX />
                                    </div>
                                }
                            </div>
                        </div>}
                    </div>
                </div>
                {altnotis.length > 0 ? <div className='mt-2 md:mt-0'>
                    {altnotis.slice(start, end).map((item, i) => (
                        <div key={i} className='flex flex-col items-center md:pt-2 pt-3 md:text-xs text-[0.8rem] text-black'>
                            <div className='p-2 rounded-md bg-white relative shantf w-full h-fit '>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex items-center'>
                                        <div className='flex gap-[0.2rem] items-center'>
                                            <div className='capitalize font-[800] border-b  border-[grey] w-fit'>{item.title}</div>
                                            <HiCheckCircle className='text-[#462c7c] ' />
                                        </div>
                                    </div>
                                    <div className='font-[600]'>{item.content}</div>
                                    <div className=' text-[0.7rem] text-[#3d3d3d] font-bold mt-[0.5rem]'>{moment(item.createdAt).fromNow()}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                    :
                    <div className='mt-32 md:mt-20 flex justify-center'>
                        <img src={nothnyet} className='md:h-20 h-48 w-auto'></img>
                    </div>
                }
                {notifications.length > 0 && <div className='flex gap-2 items-center text-xs mt-4 justify-end'>
                    {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-zinc-500 text-zinc-500 hover:bg-white cursor-pointer' onClick={BackNotisPage}><FaAngleLeft /></div>}
                    {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
                    {end < altnotis.length && <div className='py-1 px-2 rounded-md border border-zinc-500 text-zinc-500 hover:bg-white cursor-pointer' onClick={MoveNotisPage}><FaAngleRight /></div>}
                </div>}
            </div>
        </div>
    )
}

export default AdminNotis