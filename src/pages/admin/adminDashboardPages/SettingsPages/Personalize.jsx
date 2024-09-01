import React, { useRef, useState } from 'react'
import SettingsLayout from '../SettingsComponents/SettingsLayout'
import { useAtom } from 'jotai'
import { PROFILE } from '../../../../store'
import Loading from '../../../../GeneralComponents/Loading'
import { Apis, imageurl, UserPutApi } from '../../../../services/API'
import { MdOutlineEdit } from 'react-icons/md'
import { FaRegRectangleXmark } from 'react-icons/fa6'
import { IoCheckbox, IoEye } from 'react-icons/io5'
import { Alert } from '../../../../utils/utils'
import { IoMdEyeOff } from 'react-icons/io'
import avatar from '../../../../assets/images/avatar.png'

const Personalize = () => {
  const [user, setUser] = useAtom(PROFILE)

  const [imageError, setImageError] = useState('')
  const [commit, setCommit] = useState(false)
  const [eye, setEye] = useState(false)
  const [eye2, setEye2] = useState(false)
  const EyeIcon = eye === true ? IoEye : IoMdEyeOff
  const EyeIcon2 = eye2 === true ? IoEye : IoMdEyeOff
  const imgref = useRef()
  const [loading, setLoading] = useState(false)

  const [profile, setProfile] = useState({
    img: user.image ? `${imageurl}/profiles/${user.image}` : avatar,
    image: user.image
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
  }

  const CommitHandler = () => {
    if (form.full_name === user.full_name && form.username === user.username && form.email === user.email && form.old_password === '' && form.new_password === '' && profile.image === user.image) {
      setCommit(false)
    } else {
      setCommit(true)
    }
  }

  const handleProfileUpload = (event) => {
    setTimeout(() => {
      setImageError('')
    }, 2000)

    const file = event.target.files[0]
    if (file.size >= 1000000) {
      imgref.current.value = null
      return setImageError('File size too large')
    }
    if (!file.type.startsWith('image/')) {
      imgref.current.value = null
      return setImageError('File Error')
    }
    setCommit(true)
    setProfile({
      img: URL.createObjectURL(file),
      image: file
    })
  }

  const cancelChanges = () => {
    setCommit(false)
    imgref.current.value = null

    setProfile({
      img: user.image ? `${imageurl}/profiles/${user.image}` : avatar,
      image: null
    })

    setForm({
      full_name: user.full_name,
      email: user.email,
      username: user.username,
      old_password: '',
      new_password: '',
    })
  }

  const SubmitForm = async (event) => {
    event.preventDefault()

    const formbody = new FormData()
    formbody.append('image', profile.image)
    formbody.append('full_name', form.full_name)
    formbody.append('username', form.username)
    formbody.append('email', form.email)
    formbody.append('old_password', form.old_password)
    formbody.append('new_password', form.new_password)

    setLoading(true)
    try {
      const response = await UserPutApi(Apis.user.update, formbody)
      if (response.status === 200) {
        Alert('Request Successful', 'Profile updated successfully', 'success')
        setCommit(false)
        setUser(response.msg)
        setForm({
          full_name: response.msg.full_name,
          email: response.msg.email,
          username: response.msg.username,
          old_password: '',
          new_password: '',
        })

      } else {
        Alert('Request Failed', response.msg, 'error')
      }
    } catch (error) {
      Alert('Request Failed', `${error.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }


  return (
    <SettingsLayout>
      <div className='relative'>
        {loading && <Loading />}
        <div className='md:w-3/4 w-11/12 mx-auto py-10'>
          <div className='flex items-center justify-center gap-2 flex-col'>
            <div className='md:w-[12.5rem] md:h-[12.5rem] h-[8.5rem] w-[8.5rem] rounded-full bg-[#c9b8eb] flex items-center justify-center relative'>
              <div className='md:w-48 md:h-48 w-32 h-32'>
                <img className='w-full h-full rounded-full object-cover' src={profile.img}></img>
              </div>
              <label>
                <div className='absolute bottom-5 right-1 bg-white md:w-[2.2rem] md:h-[2.2rem] w-8 h-8 md:text-[1.2rem] text-base flex items-center justify-center rounded-full cursor-pointer shantf'>
                  <MdOutlineEdit />
                </div>
                <input ref={imgref} type="file" onChange={handleProfileUpload} hidden></input>
              </label>
              <div className='absolute -bottom-1.5 -right-10 text-xs text-[red]'>{imageError}</div>
            </div>
            <div>
              <div className='capitalize font-bold md:text-2xl text-lg text-center'>{user.full_name}</div>
              <div className='capitalize font-bold text-[#9f7ae7] text-center text-sm'>admin</div>
            </div>
          </div>
          <form className='flex flex-col gap-6 mt-10' onSubmit={SubmitForm}>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-6 items-center'>
              <div className='flex flex-col gap-1.5'>
                <div className='md:text-sm text-xs capitalize font-[550] '>full name:</div>
                <input className='outline-none border border-[#c9b8eb] w-full  px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.full_name} name='full_name' onChange={formHandler} onKeyUp={CommitHandler}></input>
              </div>
              <div className='flex flex-col gap-1.5'>
                <div className='md:text-sm text-xs capitalize font-[550] '>username:</div>
                <input className='outline-none border border-[#c9b8eb] w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.username} name='username' onChange={formHandler} onKeyUp={CommitHandler}></input>
              </div>
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-6 items-center'>
              <div className='flex flex-col gap-1.5'>
                <div className='md:text-sm text-xs capitalize font-[550] '>email:</div>
                <input className='outline-none border border-[#c9b8eb] w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.email} name='email' onChange={formHandler} onKeyUp={CommitHandler}></input>
              </div>
            </div>
            <div className='flex flex-col gap-1.5'>
              <div className='md:text-sm text-xs capitalize font-[550] '>change password:</div>
              <div className='grid md:grid-cols-2 grid-cols-1 gap-6 items-center'>
                <div className='relative'>
                  <input className='outline-none border border-[#c9b8eb] w-full pl-2 pr-7 md:py-2 py-1.5 lg:text-sm text-base rounded-sm ipt' type={`${eye ? 'text' : 'password'}`} value={form.old_password} name='old_password' placeholder='Enter old password' onChange={formHandler} onKeyUp={CommitHandler}></input>
                  <EyeIcon className='absolute top-3 right-2 text-lg text-[#9f7ae7] cursor-pointer' onClick={() => setEye(!eye)} />
                </div>
                <div className='relative'>
                  <input className='outline-none border border-[#c9b8eb] w-full pl-2 pr-7 md:py-2 py-1.5 lg:text-sm text-base rounded-sm ipt' type={`${eye2 ? 'text' : 'password'}`} value={form.new_password} name='new_password' placeholder='Create new password' onChange={formHandler} onKeyUp={CommitHandler}></input>
                  <EyeIcon2 className='absolute top-3 right-2 text-lg text-[#9f7ae7] cursor-pointer' onClick={() => setEye2(!eye2)} />
                </div>
              </div>
            </div>
            {commit &&
              <div className='flex md:gap-8 gap-4 items-center justify-center mt-4'>
                <button className='outline-none w-fit h-fit py-2 px-6 text-xs text-semi-white  bg-[#462c7c] rounded-md capitalize flex items-center gap-1 font-[550]' type='button' onClick={cancelChanges}>
                  <span>cancel</span>
                  <FaRegRectangleXmark />
                </button>
                <button className='outline-none w-fit h-fit py-2 px-6 text-xs text-semi-white  bg-[#462c7c] rounded-md capitalize flex items-center gap-1 font-[550]'>
                  <span>save</span>
                  <IoCheckbox />
                </button>
              </div>
            }
          </form>
        </div>
      </div>
    </SettingsLayout>
  )
}

export default Personalize