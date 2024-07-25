import React, { useEffect, useRef, useState } from 'react'
import Loading from '../../../PageComponents/Loading';
import { Apis, PostApi, imageurl } from '../../../services/API';
import moment from 'moment';
import { FaRegRectangleXmark } from "react-icons/fa6";
import { MdOutlineDeleteForever } from 'react-icons/md';
import { Alert } from '../../../utils/utils';
import { IoEye } from 'react-icons/io5';
import { IoMdEyeOff } from 'react-icons/io';
import { SlLockOpen } from 'react-icons/sl';
import { PiWarningCircleBold } from 'react-icons/pi';
import { LuX } from 'react-icons/lu';

const DeleteModal = ({ closeView, singleUser, usertotal, setAllUsers, setStart, setEnd, setPagelengthstart, setPagelengthend, setSearch, setWrite, refetchAllUsers, refetchAllDeposits }) => {
    const toggler = useRef()
    const [deleted, setDeleted] = useState(1)
    const [loading, setLoading] = useState(false)
    const [eye, setEye] = useState(false)
    const EyeIcon = eye === true ? IoEye : IoMdEyeOff
    const [deletePassword, setDeletePassword] = useState('')
    const [deleteError, setDeleteError] = useState('')
    const [beforeshow, setBeforeshow] = useState(true)

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

    setTimeout(() => {
        setBeforeshow(false)
    }, 1500)

    const DeleteUserAccount = async () => {
        setTimeout(() => {
            setDeleteError('')
        }, 1500)

        if (!deletePassword) return setDeleteError('field cannot be void')

        const formbody = {
            user_id: singleUser.id,
            password: deletePassword
        }

        setLoading(true)

        try {
            const response = await PostApi(Apis.admin.delete_users, formbody)
            if (response.status === 200) {
                setAllUsers(response.msg)
                Alert('Request Successful', 'User deleted successfully', 'success')
                refetchAllUsers()
                refetchAllDeposits()
                setWrite(false)
                setSearch('')
                setPagelengthend(response.msg.length / 6)
                setPagelengthstart(1)
                setStart(0)
                setEnd(6)
                setDeleted(1)
                closeView()

            } else {
                setDeleteError(`${response.msg}`)
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='w-full h-screen fixed  top-0 left-0 flex items-center justify-center bg-[#0000008a] z-20 '>
            <div className={`bg-white rounded-lg lg:w-1/2 md:w-3/4 w-11/12 lg:h-[90vh] h-[80vh] ${loading ? 'overflow-hidden' : 'overflow-y-auto scroll'}  move`} ref={toggler}>
                <div className={`w-full h-full relative  ${beforeshow && 'flex items-center justify-center'}`}>
                    <div className='text-3xl absolute top-0 right-2 cursor-pointer' onClick={closeView}><LuX /></div>
                    {beforeshow && <div className='beforeshow'></div>}
                    {!beforeshow &&
                        <div className='md:w-[90%] w-11/12 mx-auto md:py-8 py-4 flex flex-col gap-8 md:text-[0.9rem] text-[0.8rem]'>
                            <div className='flex flex-col gap-4 border p-1'>
                                <div className=' uppercase font-bold border px-1 '>user details:</div>
                                <div className='flex items-center justify-center md:w-[5.8rem] md:h-[5.8rem] w-20 h-20 rounded-full bg-[#c9b8eb] mx-auto' >
                                    <img src={`${imageurl}/profiles/${singleUser.image}`} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                                </div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-2'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>full name:</div>
                                        <div className='md:text-[0.95rem] text-sm'>{singleUser.full_name}</div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>username:</div>
                                        <div className='md:text-[0.95rem] text-sm'>{singleUser.username}</div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>email:</div>
                                        <div className='md:text-[0.95rem] text-sm'>{singleUser.email}</div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>country:</div>
                                        <div className='md:text-[0.95rem] text-sm'>{singleUser.country}</div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>joined:</div>
                                        <div className='md:text-[0.95rem] text-sm'>{moment(singleUser.createdAt).format('DD-MM-yyyy')}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 border p-1'>
                                <div className=' uppercase font-bold border px-1 '>investment records:</div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>total amount invested:</div>
                                        <div className='md:text-[0.95rem] text-sm'>${usertotal}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4'>
                                {deleted === 1 && <div className='flex items-center justify-center'>
                                    <button className='w-fit h-fit py-2 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-lg text-white font-medium' onClick={() => { setDeleted(2); MoveToBottom() }}>delete user</button>
                                </div>}
                                {deleted !== 1 && <div className='w-fit h-fit md:p-8 px-2 py-4 rounded-md bg-white adsha mx-auto  text-black relative'>
                                    {loading && <Loading />}
                                    {deleted === 2 && <div className='flex flex-col gap-8 items-center justify-center'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='text-center md:text-[1.1rem] text-sm text-black font-medium'>Are you sure you want to delete this user?</div>
                                            <div className='flex justify-center items-center gap-0.5  text-xs font-medium'>
                                                <span className='text-center'>Action is permanent and cannot be reversed</span>
                                                <PiWarningCircleBold className='text-[red]' />
                                            </div>
                                        </div>
                                        <div className='flex md:flex-row flex-col md:gap-16 gap-4 items-center'>
                                            <button className='outline-none w-fit h-fit py-2 px-4 md:text-[0.8rem] text-xs text-white bg-[#5e5d5d] rounded-md capitalize flex items-center gap-1 font-bold' type='button' onClick={() => setDeleted(1)}>
                                                <span>cancel action</span>
                                                <FaRegRectangleXmark />
                                            </button>
                                            <button className='outline-none w-fit h-fit py-2 px-4 md:text-[0.8rem] text-xs text-white bg-[#7e3232] rounded-md capitalize flex items-center gap-1 font-bold' onClick={() => setDeleted(3)}>
                                                <span>proceed action</span>
                                                <MdOutlineDeleteForever />
                                            </button>
                                        </div>
                                    </div>}
                                    {deleted === 3 && <div className='flex flex-col gap-2 items-center justify-center'>
                                        <div className='md:text-[1.1rem] text-sm font-medium text-center'>Last step to permanently delete {singleUser.username}'s account!</div>
                                        <div className='flex gap-1 items-center justify-center text-xs text-[red]'>
                                            <span className='text-black font-medium text-center'>Admin, enter your password to finalize action</span>
                                            <SlLockOpen />
                                        </div>
                                        <div className='flex flex-col gap-8 items-center justify-center mt-4'>
                                            <div className='relative'>
                                                <input className='outline-none border border-[#c9b8eb] bg-transparent lg:text-[0.85rem] text-base w-52 h-8 rounded-md pl-2 pr-7 py-1 text-black ipt' placeholder='Enter your password' value={deletePassword} onChange={e => setDeletePassword(e.target.value)} type={`${eye === true ? 'text' : 'password'}`}></input>
                                                <EyeIcon className='absolute top-2 right-2 text-base text-[red] cursor-pointer' onClick={() => setEye(!eye)} />
                                                <div className='absolute -bottom-5 left-0 text-xs text-[red]'>{deleteError}</div>
                                            </div>
                                            <div className='flex md:flex-row flex-col md:gap-16 gap-4 items-center'>
                                                <button className='outline-none w-fit h-fit py-2 px-4 md:text-[0.8rem] text-xs text-white  bg-[#5e5d5d] rounded-md capitalize flex items-center gap-1 font-bold' type='button' onClick={() => setDeleted(1)}>
                                                    <span>cancel deletion</span>
                                                    <FaRegRectangleXmark />
                                                </button>
                                                <button className='outline-none w-fit h-fit py-2 px-4 md:text-[0.8rem] text-xs text-white  bg-[#7e3232] rounded-md capitalize flex items-center gap-1 font-bold' onClick={DeleteUserAccount}>
                                                    <span>delete account</span>
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
        </div>
    )
}

export default DeleteModal