import React, { useState } from 'react'
import Pagelayout from '../../PageComponents/Pagelayout'
import contactimg from '../../assets/images/contactimg2.webp'
import { PiTelegramLogoLight } from "react-icons/pi";
import { TfiInstagram } from "react-icons/tfi";
import { TiSocialFacebook } from "react-icons/ti";
import { MdOutlineHearing, MdCancel, MdOutlineEdit } from "react-icons/md";
import { BiMailSend } from "react-icons/bi";
import { Alert } from '../../utils/utils';
import { Apis, UserPostApi } from '../../services/API';
import Loading from '../../PageComponents/Loading';
import { LuSearchCheck } from "react-icons/lu";
import { TfiUser } from "react-icons/tfi";
import { AItraders } from '../../services/Miscellaneous';



const ContactPage = () => {

  const [show, setShow] = useState(1)
  const [emailError, setEmailError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [messageError, setMessageError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState('')
  const [trader, setTrader] = useState([])

  const [form, setForm] = useState({
    username: '',
    email: '',
    message: ''
  })
  const inputHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }
  const submitForm = async event => {
    event.preventDefault()
    setTimeout(() => {
      setUsernameError(false)
      setEmailError(false)
      setMessageError(false)
    }, 1000)

    if (!form.username) {
      return setUsernameError(true)
    }
    if (!form.email) {
      return setEmailError(true)

    }
    if (!form.message) {
      return setMessageError(true)
    }
    const formbody = {
      email: form.email,
      message: form.message
    }
    setLoading(true)
    try {
      const response = await UserPostApi(Apis.user.contact, formbody)
      if (response.status === 200) {
        Alert('Request Succcessful', response.msg, 'success')
      } else {
        return Alert('Request Failed', response.msg, 'error')
      }
    } catch (error) {
      Alert('Request Unsuccessful', `${error.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const tradersCodeSearch = () => {
    setTimeout(() => {
      setCodeError('')
    }, 2000)
    if (!code) return setCodeError(`enter a trader's code`)
    const codeSearch = AItraders.filter(item => item.traderCode === code.toLowerCase())
    if (!codeSearch.length > 0) return setCodeError(`invalid trader's code`)
    setTrader(codeSearch)
    setShow(3)
    setCode('')
  }


  return (
    <Pagelayout>
      <div className="bg-[#1E2833] py-16">
        <div className='w-11/12 mx-auto '>
          <div className='flex flex-col shlct'>
            <div className='w-full lg:h-[70vh] h-fit grid grid-cols-1 lg:grid-cols-2'>
              <div className='col-span-1 lg:h-full h-[20vh] w-full'>
                <img src={contactimg} className='lg:h-[70vh] h-[20vh] w-full object-cover'></img>
              </div>
              <div className='col-span-1 lg:h-full h-fit bg-[#faf9f9] py-[1.5rem] overflow-hidden relative'>
                {loading && <Loading />}
                <div className='lg:w-10/12 w-11/12 mx-auto'>
                  <div className='text-[2rem] capitalize text-center font-bold text-[#636262] '>get in touch</div>
                  <div className='text-[0.85rem] capitalize font-bold text-[#636262] flex items-center justify-center gap-1'>
                    <span>-</span>
                    <div>
                      send us a message; we are listening
                    </div>
                    <MdOutlineHearing className='text-orange' />
                    <span>-</span>
                  </div>
                  <form onSubmit={submitForm}>
                    <div className='flex flex-col gap-4 mt-12'>
                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <div className='flex flex-col gap-2 w-full'>
                          <div className='text-xs uppercase font-bold text-[#636262] '>full name</div>
                          <input type='text' placeholder='Enter your full name' className={` outline-none border-b-2 lg:text-[0.8rem] text-base capitalize pl-2 p-1 focus:outline-none ${usernameError === true ? 'border-[red]' : ''} ipt`} name='username' value={form.username} onChange={inputHandler}></input>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                          <div className='text-xs uppercase font-bold text-[#636262] '>email address</div>
                          <input type='email' placeholder='Enter Your Email Address' className={` outline-none border-b-2 lg:text-[0.8rem] text-base  p-1 pl-2 focus:outline-none ${emailError === true ? 'border-[red]' : ''} ipt`} name='email' value={form.email} onChange={inputHandler}></input>
                        </div>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='text-xs uppercase font-bold text-[#636262]'>message</div>
                        <textarea placeholder='Type A Message' className={` p-2 h-36 lg:text-[0.9rem] text-base resize-none outline-orange  ${messageError === true ? ' border border-[red]' : ''} ipt`} name='message' value={form.message} onChange={inputHandler}></textarea>
                      </div>
                      <div className='flex justify-center mt-2'>
                        <button className='outline-none bg-orange text-[0.9rem] text-[white] flex gap-1 items-center justify-center w-fit h-fit px-8 py-1 rounded-[3px] capitalize font-bold'>
                          <div>send</div>
                          <BiMailSend />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className={`w-full h-fit ${show !== 1 ? 'py-8' : 'py-4'}  bg-[#9e5c36] overflow-hidden trans relative`}>
              <div className='w-11/12 mx-auto '>
                {show === 1 &&
                  <div className='grid grid-cols-1 gap-2 items-center lg:flex lg:justify-between h-full' >
                    <div className='text-[white] text-[0.9rem] capitalize font-[550] text-center'>follow account manager on:</div>
                    <div className='flex gap-4 justify-center' onClick={() => setShow(2)}>
                      <div className='h-[1.9rem] w-[1.9rem] border-2 bg-[white] rounded-[50%] flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer  transition-all text-orange text-[1.2rem] hover:text-[black]'>
                        <PiTelegramLogoLight />
                      </div>
                      <div className='h-[1.9rem] w-[1.9rem] border-2 bg-[white]  rounded-[50%] flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer transition-all text-orange text-[1.1rem] hover:text-[black]'>
                        <TfiInstagram />
                      </div>
                      <div className='h-[1.9rem] w-[1.9rem] border-2 bg-[white]  rounded-[50%] flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer transition-all text-orange text-[1.1rem] hover:text-[black]'>
                        <TiSocialFacebook />
                      </div>
                    </div>
                  </div>
                }
                {show !== 1 && <div className='text-2xl text-white cursor-pointer absolute top-0 left-0' onClick={() => setShow(1)}>
                  <MdCancel />
                </div>}
                {show !== 1 && <div className='border-t w-full absolute top-6 left-0 border-[#a0a0a0]'></div>}
                {show !== 1 && <div className='flex flex-col gap-2 relative items-center'>
                  <div className=' text-[0.85rem] text-white capitalize text-center w-full mt-6 font-medium'>
                    Enter trader's code to reveal account manager
                  </div>
                  <div className='flex gap-2 items-center'>
                    <div className='relative'>
                      <input className='outline-none border-b border-white bg-transparent lg:text-[0.85rem] text-base w-48 pl-4 text-white focus:outline-none' type='text' value={code} onChange={e => setCode(e.target.value)}></input>
                      <MdOutlineEdit className=' text-[0.8rem] text-orange absolute bottom-0 right-0 h-[1.2rem]' />
                      <div className='w-[0.3rem] h-[0.3rem] rounded-full bg-white absolute bottom-[-0.1rem] left-0'></div>
                      <div className='text-[0.85rem] absolute bottom-[-1.5rem] left-0 font-bold text-[#361e1e]'>{codeError}</div>
                    </div>
                    <button className='outline-none w-fit h-fit py-[0.4rem] px-[1rem] text-[0.85rem] text-[white]  bg-orange rounded-md capitalize flex items-center gap-1 font-bold ' onClick={tradersCodeSearch}>
                      <span>search</span>
                      <LuSearchCheck className='text-[0.8rem]' />
                    </button>
                  </div>
                </div>}
              </div>
              {show === 3 && <div className='mt-8 relative'>
                <div className='border-b w-full absolute top-0 left-0 border-[#a0a0a0]'></div>
                <div className='justify-center text-[white] text-[1.1rem] lg:text-[1.5rem] uppercase  flex gap-1 items-center font-bold pt-[4rem]'>
                  <span>your account manager is</span>
                  <TfiUser />
                </div>
                {
                  trader.map((item, i) => (
                    <div className='lg:w-3/4 w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[3rem] mt-[3rem] ' key={i}>
                      <div className='col-span-1'>
                        <div className='text-[1.5rem] text-black font-[800] pl-[1rem] capitalize
                    '>
                          {item.name}
                        </div>
                        <div className='text-xs text-[black]  
                    '>
                          - professional cryptocurrency trader -
                        </div>
                        <div className='text-[white] text-[0.85rem] mt-[1rem]'>
                          {item.detail}
                        </div>
                        <div className='flex flex-col gap-4 mt-[2rem]'>
                          <div className='text-[black] font-bold capitalize '>socials:</div>
                          <div className='flex gap-4 '>
                            <a href={item.tgram_link}>
                              <div className='h-[1.9rem] w-[1.9rem] border-2 bg-[white] rounded-[50%] flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer  transition-all text-orange text-[1.2rem] hover:text-[black]'>
                                <PiTelegramLogoLight />
                              </div>
                            </a>
                            <a href={item.ig_link}>
                              <div className='h-[1.9rem] w-[1.9rem] border-2 bg-[white]  rounded-[50%] flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer transition-all text-orange text-[1.1rem] hover:text-[black]'>
                                <TfiInstagram />
                              </div>
                            </a>
                            <a href={item.fb_link}>
                              <div className='h-[1.9rem] w-[1.9rem] border-2 bg-[white]  rounded-[50%] flex items-center justify-center hover:translate-y-[-0.1rem] cursor-pointer transition-all text-orange text-[1.1rem] hover:text-[black]'>
                                <TiSocialFacebook />
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <img src={item.img} className='w-full h-[20rem] object-cover'></img>
                      </div>
                    </div>
                  ))}
              </div>}
            </div>
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default ContactPage