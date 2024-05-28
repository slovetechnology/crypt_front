import React, { useRef, useState } from 'react'
import { Apis, PostApi, UserPutApi, imageurl } from '../../../services/API'
import { PROFILE } from '../../../store'
import { useAtom } from 'jotai'
import { IoEye } from 'react-icons/io5';
import { MdVerified, MdOutlineDateRange, MdOutlineCancel, MdSentimentVeryDissatisfied, MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import moment from 'moment';
import { LuUserCircle } from "react-icons/lu";
import { SlLockOpen } from "react-icons/sl";
import { FaRegRectangleXmark } from "react-icons/fa6";
import { IoCheckbox, IoWarningOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { Alert, CookieName } from '../../../utils/utils';
import { IoMdEyeOff } from 'react-icons/io';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import LoadingAdmin from '../../../PageComponents/LoadingAdmin';
import membership from '../../../assets/images/membership.png'


const Profile = ({ setToggle }) => {
    const [user, setUser] = useAtom(PROFILE)
    
    const [nameEdit, setNameEdit] = useState(false)
    const [userEdit, setUserEdit] = useState(false)
    const [emailEdit, setEmailEdit] = useState(false)
    const [passEdit, setPassEdit] = useState(false)
    const [imageChange, setImageChange] = useState(false)
    const [imageError, setImageError] = useState('')
    const [loading, setLoading] = useState(false)
    const [commit, setCommit] = useState(false)
    const [deleteScreen, setDeleteScreen] = useState(0)
    const [deletePassword, setDeletePassword] = useState('')
    const [deleteError, setDeleteError] = useState('')
    const [deleteloading, setDeleteLoading] = useState(false)
    const [eye, setEye] = useState(false)
    const [eye2, setEye2] = useState(false)
    const EyeIcon = eye === true ? IoEye : IoMdEyeOff
    const EyeIcon2 = eye2 === true ? IoEye : IoMdEyeOff
    const imgref = useRef()
    const navigate = useNavigate()

    

    const [profile, setProfile] = useState({
        img: `${imageurl}/profiles/${user.image}`,
        image: ``
    })

    const [form, setForm] = useState({
        full_name: user.full_name,
        email: user.email,
        username: user.username,
        old_password: '',
        new_password: '',
    })
    const formHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        setCommit(true)
    }

    const handleProfileUpload = (event) => {
        setTimeout(() => {
            setImageError(false)
        }, 2000)
        const file = event.target.files[0]
        if (file.size >= 1000000) {
            imgref.current.value = null
            return setImageError('File size too large', 'image uploads must not exceed 1MB file size', 'info')
        }
        if (!file.type.startsWith('image/')) {
            imgref.current.value = null
            return setImageError('File Error', 'image uploaded must be a valid image format (jpg, jpeg, png, svg)', 'info')
        }
        setImageChange(true)
        setProfile({
            img: URL.createObjectURL(file),
            image: file
        })
        setCommit(true)
    }

    const cancelChanges = () => {
        setEmailEdit(false)
        setNameEdit(false)
        setPassEdit(false)
        setUserEdit(false)
        setImageChange(false)
        setCommit(false)
        imgref.current.value = null
        setProfile({
            img: `${imageurl}/profiles/${user.image}`,
            image: ''
        })
        setForm({
            full_name: user.full_name,
            email: user.email,
            username: user.username,
            old_password: '',
            new_password: '',
        })
    }



    const submitForm = async (event) => {
        event.preventDefault()
        setTimeout(() => {
            setPassError(false)
        }, 2000)

        const formbody = new FormData()
        formbody.append('image', profile.image)
        formbody.append('user_id', user.id)
        formbody.append('full_name', form.full_name)
        formbody.append('username', form.username)
        formbody.append('email', form.email)
        formbody.append('old_password', form.old_password)
        formbody.append('new_password', form.new_password)
        if (commit) {
            setLoading(true)
            try {
                const response = await UserPutApi(Apis.user.update, formbody)
                if (response.status === 200) {
                    Alert('Request Successful', 'Profile updated successfully', 'success')
                    setEmailEdit(false)
                    setNameEdit(false)
                    setPassEdit(false)
                    setUserEdit(false)
                    setImageChange(false)
                    setCommit(false)
                    setUser(response.msg)

                } else {
                    Alert('Request Failed', response.msg, 'error')
                }
            } catch (error) {
                Alert('Request Failed', `${error.message}`, 'error')
            } finally {
                setLoading(false)
            }
        }
    }

    const DeleteAccount = async () => {
        setTimeout(() => {
            setDeleteError('')
        }, 1000)

        if (!deletePassword) return setDeleteError(`enter your password`)

        const formbody = {
            password: deletePassword
        }
        setDeleteLoading(true)
        try {
            const response = await PostApi(Apis.user.delete, formbody)
            if (response.status === 200) {
                Alert('Request Successful', response.msg, 'success')
                Cookies.remove(CookieName)
                navigate('/')
            } else {
                setDeleteError(`${response.msg}`)
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setDeleteLoading(false)
        }
    }



   


    return (
        <div className='relative py-[2.5rem] h-fit '>
            {loading && <LoadingAdmin />}
            <div className='uppercase font-bold text-[1.5rem] text-[#e0dfdf] mb-[1.5rem] '>update profile</div>
            <div>
                <div className='flex items-center justify-center gap-2 flex-col'>
                    <div className='w-[12.5rem] h-[12.5rem] rounded-full bg-[#afa7df] flex items-center justify-center relative'>
                        <div className='w-[12rem] h-[12rem]'>
                            <img className='w-full h-full rounded-full object-cover' src={profile.img}></img>
                        </div>
                        <label>
                            <div className='absolute bottom-5 right-1 bg-[white] w-[2.2rem] h-[2.2rem] text-[1.2rem] flex items-center justify-center rounded-full cursor-pointer shlz'>
                                <MdOutlineEdit className='' />
                            </div>
                            <input ref={imgref} type="file" onChange={handleProfileUpload} hidden></input>
                        </label>
                    </div>
                    <div className='text-[0.75rem] text-center text-[red]'>{imageError}</div>
                </div>

                

                <div className=' justify-center  mt-[1rem]  text-[#e0dfdf] flex gap-2 items-center'>
                    <div className='capitalize font-bold text-[1.6rem]'>{user.full_name}</div>
                    <img className='w-[1rem] h-auto' src={user.country_flag}></img>
                </div>
                <div className='text-[#7665D5] text-[0.8rem] text-center capitalize font-bold'>account trader</div>
                <div className='mt-[2rem] '>
                    <div className='flex gap-[2rem] items-center w-fit overflow-hidden h-fit bg-[#0E0B1C] rounded-[8px] capitalize shlz px-[2rem] py-[1rem] mx-auto'>
                        <div className='flex items-center gap-5'>
                            <div className='flex flex-col gap-2'>
                                <div className='text-[1.4rem] text-[#e0dfdf] '>Status</div>
                                {user.email_verified === 'true' && <div className='flex gap-1 items-center'>
                                    <span className='text-[grey] text-[0.8rem]'>verified</span>
                                    <MdVerified className='text-[#7665D5] text-[0.8rem]' />
                                </div>}
                                {user.email_verified === 'false' && <div className='flex gap-1 items-center cursor-pointer' onClick={() => setToggle('verify account')}>
                                    <span className='text-[#e46b6b] text-[0.8rem]'>unverified</span>
                                    <MdSentimentVeryDissatisfied className='text-[#7665D5] text-[0.8rem]' />
                                </div>}
                            </div>
                            <div className='border-r-2 h-[3rem]'></div>
                            <div className='flex flex-col gap-2'>
                                <div className='text-[1.4rem] text-[#e0dfdf] '>joined</div>
                                <div className='flex gap-1 items-center'>
                                    <span className='text-[grey] text-[0.8rem]'>{moment(user.createdAt).format('DD-MM-yyyy')}</span>
                                    <MdOutlineDateRange className='text-[#7665D5] text-[0.8rem]' />
                                </div>
                            </div>
                        </div>
                        <img src={membership} className='h-[auto] w-[3.5rem]'></img>
                    </div>
                </div>
                <div className='text-[1.2rem] text-[#e0dfdf] capitalize pt-[2rem] flex items-center gap-1'>
                    <div>acount details</div>
                    <LuUserCircle className='text-[1.2rem] text-[#7665D5]' />
                </div>
                <form onSubmit={submitForm}>
                    <div className='w-[80%] mx-auto text-[0.85rem] mt-[2rem] text-[#e0dfdf] flex flex-col gap-[1.5rem]'>
                        <div className='flex justify-between items-center  capitalize'>
                            <div>full name:</div>
                            {!nameEdit && <div className='flex gap-4'>
                                <span>{user.full_name}</span>
                                <div className='text-[1.1rem] text-[#7665D5] cursor-pointer' onClick={() => { setNameEdit(!nameEdit) }}>
                                    <FaRegEdit />
                                </div>
                            </div>}
                            {nameEdit && <div className='flex gap-4 items-center'>
                                <input className='outline-none border border-[#7665D5] bg-[#0C091A] text-[0.85rem] w-[15rem] h-[2rem] rounded-[3px] pl-[1rem]' name='full_name' value={form.full_name} onChange={formHandler} type='text' ></input>
                                <div className='text-[1.2rem] text-[#7665D5] cursor-pointer' onClick={() => setNameEdit(!nameEdit)}>
                                    <MdOutlineCancel />
                                </div>
                            </div>}
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className=' capitalize'>username:</div>
                            {!userEdit && <div className='flex gap-4'>
                                <span>{user.username}</span>
                                <div className='text-[1.1rem] text-[#7665D5] cursor-pointer' onClick={() => setUserEdit(!userEdit)}>
                                    <FaRegEdit />
                                </div>
                            </div>}
                            {userEdit && <div className='flex gap-4 items-center'>
                                <input className='outline-none border border-[#7665D5] bg-[#0C091A] text-[0.85rem] w-[15rem] h-[2rem] rounded-[3px] pl-[1rem]' name='username' value={form.username} onChange={formHandler} type='text'></input>
                                <div className='text-[1.2rem] text-[#7665D5] cursor-pointer' onClick={() => { setUserEdit(!userEdit) }}>
                                    <MdOutlineCancel />
                                </div>
                            </div>}
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className=' capitalize'>email:</div>
                            {!emailEdit && <div className='flex gap-4 lowercase'>
                                <span>{user.email}</span>
                                <div className='text-[1.1rem] text-[#7665D5] cursor-pointer' onClick={() => setEmailEdit(!emailEdit)}>
                                    <FaRegEdit />
                                </div>
                            </div>}
                            {emailEdit && <div className='flex gap-4 items-center'>
                                <input className='outline-none border border-[#7665D5] bg-[#0C091A] text-[0.85rem] w-[15rem] h-[2rem] rounded-[3px] pl-[1rem]' name='email' value={form.email} onChange={formHandler} type='email'></input>
                                <div className='text-[1.2rem] text-[#7665D5] cursor-pointer' onClick={() => setEmailEdit(!emailEdit)}>
                                    <MdOutlineCancel />
                                </div>
                            </div>}
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className=' capitalize'>password:</div>
                            {!passEdit && <div className='flex gap-4'>
                                <span>*********</span>
                                <div className='text-[1.1rem] text-[#7665D5] cursor-pointer' onClick={() => setPassEdit(!passEdit)}>
                                    <FaRegEdit />
                                </div>
                            </div>}
                            {passEdit && <div className='flex gap-4 items-center'>
                                <div className='flex flex-col gap-[1.5rem]'>
                                    <div className='relative'>
                                        <input className='outline-none border border-[#7665D5] bg-[#0C091A] text-[0.8rem] w-[15rem] h-[2rem] rounded-[3px] pl-[1rem]' placeholder='Enter your old password' name='old_password' value={form.old_password} onChange={formHandler} type={`${eye === true ? 'text' : 'password'}`}></input>
                                        <EyeIcon className='absolute top-[0.6rem] right-2 text-[0.8rem] text-[#7665D5] cursor-pointer' onClick={() => setEye(!eye)} />
                                    </div>
                                    <div className='relative'>
                                        <input className='outline-none border border-[#7665D5] bg-[#0C091A] text-[0.8rem] w-[15rem] h-[2rem] rounded-[3px] pl-[1rem]' placeholder='Create a new password' name='new_password' value={form.new_password} onChange={formHandler} type={`${eye2 === true ? 'text' : 'password'}`}></input>
                                        <EyeIcon2 className='absolute top-[0.6rem] right-2 text-[0.8rem] text-[#7665D5] cursor-pointer' onClick={() => setEye2(!eye2)} />
                                    </div>
                                </div>
                                <div className='text-[1.2rem] text-[#7665D5] cursor-pointer' onClick={() => setPassEdit(!passEdit)}>
                                    <MdOutlineCancel />
                                </div>
                            </div>}
                        </div>
                        {nameEdit || userEdit || emailEdit || passEdit || imageChange ? <div className='flex gap-[2rem] items-center justify-center mt-[2rem]'>
                            <button className='outline-none w-fit h-fit py-[0.5rem] px-[1rem] text-[0.85rem] text-[#e0dfdf]  bg-[#7665D5] hover:bg-[#5d4faa] rounded-[5px] capitalize flex items-center gap-1 font-bold' type='button' onClick={cancelChanges}>
                                <span>cancel changes</span>
                                <FaRegRectangleXmark className='text-[0.8rem]' />
                            </button>
                            <button className='outline-none w-fit h-fit py-[0.5rem] px-[1rem] text-[0.85rem] text-[#e0dfdf]  bg-[#7665D5] hover:bg-[#5d4faa] rounded-[5px] capitalize flex items-center gap-1 font-bold'>
                                <span>commit changes</span>
                                <IoCheckbox className='text-[0.8rem]' />
                            </button>
                        </div>
                            :
                            <div></div>}

                    </div>
                </form>
                <div className='relative mx-auto mt-[2rem]'>
                    {deleteScreen === 0 && <div className='justify-center text-[0.85rem] text-[#7665D5] cursor-pointer  flex items-center gap-1' onClick={() => setDeleteScreen(1)}>
                        <span>Delete my account</span>
                        <MdOutlineDeleteForever className='text-[0.7rem]' />
                    </div>}
                    {deleteScreen !== 0 && <div className=' w-fit h-fit bg-[#0E0B1C] rounded-[8px] p-[2rem] mx-auto relative  shlz '>
                        {deleteloading && <LoadingAdmin />}
                        {deleteScreen === 1 && <div>
                            <div className='text-center text-[1.1rem] text-[#e0dfdf]'>Are you sure you want to delete your account?</div>
                            <div className='flex gap-1 items-center justify-center mt-[0.3rem] text-[0.75rem] text-[red]'>
                                <IoWarningOutline />
                                <span className='text-[#a1a0a0]'>Warning! This action is permanent, cannot be reversed and all your assets will be lost</span>
                                <IoWarningOutline />
                            </div>
                            <div className='flex gap-[3rem] items-center justify-center mt-[2rem] '>
                                <button className='outline-none w-fit h-fit py-[0.4rem] px-[1rem] text-[0.8rem] text-[#e0dfdf]  bg-[#2f2950] rounded-[5px] capitalize flex items-center gap-1 font-bold' type='button' onClick={() => setDeleteScreen(0)}>
                                    <span>cancel</span>
                                    <FaRegRectangleXmark className='text-[0.7rem]' />
                                </button>
                                <button className='outline-none w-fit h-fit py-[0.4rem] px-[1rem] text-[0.8rem] text-[#e0dfdf]  bg-[#642424] rounded-[5px] capitalize flex items-center gap-1 font-bold' onClick={() => setDeleteScreen(2)}>
                                    <span>proceed</span>
                                    <IoCheckbox className='text-[0.7rem]' />
                                </button>
                            </div>
                        </div>}
                        {deleteScreen === 2 && <div>
                            <div className='text-center text-[1.1rem] text-[#e0dfdf]'>One more step to permanently delete your account!</div>
                            <div className='flex gap-1 items-center justify-center mt-[0.3rem] text-[0.75rem] text-[red]'>
                                <span className='text-[#a1a0a0]'>Enter your password below to finalize action</span>
                                <SlLockOpen />
                            </div>
                            <div className='flex flex-col gap-[1.7rem] items-center justify-center mt-[1.5rem]'>
                                <div className='relative'>
                                    <input className='outline-none border border-[#2f2950] bg-[#0C091A] text-[0.8rem] w-[13rem] h-[1.9rem] rounded-[5px] pl-[1rem] text-[white] ipt' placeholder='Enter your password' value={deletePassword} onChange={e => setDeletePassword(e.target.value)} type={`${eye === true ? 'text' : 'password'}`}></input>
                                    <EyeIcon className='absolute top-[0.5rem] right-2 text-[0.8rem] text-[#7665D5] cursor-pointer' onClick={() => setEye(!eye)} />
                                    <div className='absolute bottom-[-1.2rem] left-2 text-[0.75rem]  text-[#ce5151]'>{deleteError}</div>
                                </div>
                                <div className='flex gap-[4rem] items-center'>
                                    <button className='outline-none w-fit h-fit py-[0.4rem] px-[1rem] text-[0.8rem] text-[#e0dfdf]  bg-[#2f2950] rounded-[5px] capitalize flex items-center gap-1 font-bold' type='button' onClick={() => setDeleteScreen(0)}>
                                        <span>cancel deletion</span>
                                        <FaRegRectangleXmark className='text-[0.7rem]' />
                                    </button>
                                    <button className='outline-none w-fit h-fit py-[0.4rem] px-[1rem] text-[0.8rem] text-[#e0dfdf]  bg-[#642424] rounded-[5px] capitalize flex items-center gap-1 font-bold' onClick={DeleteAccount}>
                                        <span>delete account</span>
                                        <MdOutlineDeleteForever className='text-[0.7rem]' />
                                    </button>
                                </div>
                            </div>
                        </div>}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Profile