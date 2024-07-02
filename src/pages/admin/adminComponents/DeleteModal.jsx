import React, { useEffect, useRef, useState } from 'react'
import Loading from '../../../PageComponents/Loading';
import { Apis, PostApi, imageurl } from '../../../services/API';
import moment from 'moment';
import { FaRegRectangleXmark } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from 'react-icons/md';
import { Alert } from '../../../utils/utils';
import { IoEye } from 'react-icons/io5';
import { IoMdEyeOff } from 'react-icons/io';
import { SlLockOpen } from 'react-icons/sl';

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

        setDeleted(1)
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


    return (
        <div className='w-full h-screen fixed  top-0 left-0 flex items-center justify-center bg-[#0000008a] z-20 '>
            <div className={`bg-white rounded-lg w-[50vw] h-[90vh] ${loading ? 'overflow-hidden' : 'overflow-y-auto scroll'}  move`} ref={toggler}>
                <div className={`w-full h-full relative  ${beforeshow && 'flex items-center justify-center'}`}>
                    {loading && <Loading />}
                    {beforeshow && <div className='beforeshow'></div>}
                    {!beforeshow && <div className='w-[90%] mx-auto py-[2rem] flex flex-col gap-[2rem]'>
                        <div className='flex flex-col gap-[1rem] border p-1'>
                            <div className='text-[0.9rem] uppercase font-bold border px-1 '>user details:</div>
                            <div className='flex items-center justify-center w-[5.8rem] h-[5.8rem] rounded-full bg-[#c9b8eb] mx-auto' >
                                <img src={`${imageurl}/profiles/${singleUser.image}`} className='w-[5.5rem] h-[5.5rem] rounded-full object-cover'></img>
                            </div>
                            <div className='w-[80%] mx-auto flex flex-col gap-2'>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>full name:</div>
                                    <div className='text-[0.95rem]'>{singleUser.full_name}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>username:</div>
                                    <div className='text-[0.95rem]'>{singleUser.username}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>email:</div>
                                    <div className='text-[0.95rem]'>{singleUser.email}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>country:</div>
                                    <div className='text-[0.95rem]'>{singleUser.country}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>joined:</div>
                                    <div className='text-[0.95rem]'>{moment(singleUser.createdAt).format('DD-MM-yyyy')}</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[1rem] border p-1'>
                            <div className='text-[0.9rem] uppercase font-bold border px-1 '>investment records:</div>
                            <div className='w-[80%] mx-auto flex flex-col gap-4'>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>total amount invested:</div>
                                    <div className='text-[0.95rem]'>${usertotal}</div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-[1rem]'>
                            {deleted === 1 && <div className='flex items-center justify-center'>
                                <button className='w-fit h-fit py-[0.5rem] px-[1.5rem] text-[0.85rem] capitalize bg-[#462c7c] rounded-lg text-white font-[550]' onClick={() => { setDeleted(2); MoveToBottom() }}>delete user</button>
                            </div>}
                            {deleted !== 1 && <div className='w-fit h-fit py-[1rem] px-[1.5rem] rounded-md bg-white adsha mx-auto  text-black'>
                                {deleted === 2 && <div className='flex flex-col gap-[1rem] items-center justify-center'>
                                    <div className='flex flex-col gap-1'>
                                        <div className='text-[0.95rem] font-[550] text-center'>Are you sure you want to delete this user?</div>
                                        <div className='flex gap-1 items-center justify-center  text-[0.75rem] text-[red]'>
                                            <IoWarningOutline />
                                            <span className='text-black font-[550]'>Warning! This action is permanent, cannot be reversed and all user assets will be lost</span>
                                            <IoWarningOutline />
                                        </div>
                                    </div>
                                    <div className='flex gap-[3rem] items-center'>
                                        <button className='outline-none w-fit h-fit py-[0.4rem] px-[1rem] text-[0.8rem] text-[white]  bg-[grey] hover:bg-[#5e5d5d] rounded-[5px] capitalize flex items-center gap-1 font-bold' type='button' onClick={() => setDeleted(1)}>
                                            <span>cancel</span>
                                            <FaRegRectangleXmark className='text-[0.7rem]' />
                                        </button>
                                        <button className='outline-none w-fit h-fit py-[0.4rem] px-[1rem] text-[0.8rem] text-[white]  bg-[#bd4b4b] hover:bg-[#7e3232] rounded-[5px] capitalize flex items-center gap-1 font-bold' onClick={() => setDeleted(3)}>
                                            <span>proceed</span>
                                            <MdOutlineDeleteForever className='text-[0.7rem]' />
                                        </button>
                                    </div>
                                </div>}
                                {deleted === 3 && <div className='flex flex-col gap-[1rem] items-center justify-center'>
                                    <div className='text-[0.95rem] font-[550]'>One more step to permanently delete {singleUser.username}'s account!</div>
                                    <div className='flex gap-1 items-center justify-center text-[0.75rem] text-[#d64747]'>
                                        <span className='text-black font-[550]'>Admin, enter your password below to finalize action</span>
                                        <SlLockOpen />
                                    </div>
                                    <div className='flex flex-col gap-[1.7rem] items-center justify-center'>
                                        <div className='relative'>
                                            <input className='outline-none border border-[grey] bg-transparent text-[0.8rem] w-[13rem] h-[1.9rem] rounded-[5px] pl-[0.5rem] text-[black] ipt' placeholder='Enter your password' value={deletePassword} onChange={e => setDeletePassword(e.target.value)} type={`${eye === true ? 'text' : 'password'}`}></input>
                                            <EyeIcon className='absolute top-[0.5rem] right-2 text-[0.8rem] text-[#d64747] cursor-pointer' onClick={() => setEye(!eye)} />
                                            <div className='absolute bottom-[-1.2rem] left-0 text-[0.75rem]  text-[#d64747]'>{deleteError}</div>
                                        </div>
                                        <div className='flex gap-[3rem] items-center'>
                                            <button className='outline-none w-fit h-fit py-[0.4rem] px-[1rem] text-[0.8rem] text-[white]  bg-[grey] hover:bg-[#5e5d5d] rounded-[5px] capitalize flex items-center gap-1 font-bold' type='button' onClick={() => setDeleted(1)}>
                                                <span>cancel deletion</span>
                                                <FaRegRectangleXmark className='text-[0.7rem]' />
                                            </button>
                                            <button className='outline-none w-fit h-fit py-[0.4rem] px-[1rem] text-[0.8rem] text-[white]  bg-[#bd4b4b] hover:bg-[#7e3232] rounded-[5px] capitalize flex items-center gap-1 font-bold' onClick={DeleteUserAccount}>
                                                <span>delete account</span>
                                                <MdOutlineDeleteForever className='text-[0.7rem]' />
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