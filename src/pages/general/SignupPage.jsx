import React, { useRef, useState } from 'react'
import Pagelayout from '../../GeneralComponents/Pagelayout'
import logo from '../../assets/images/logobrand.png'
import { Link, useNavigate } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { SlCamera, SlUser } from 'react-icons/sl'
import { MdVerified } from "react-icons/md";
import Loading from '../../GeneralComponents/Loading'
import { Alert, CookieName, MoveToTop, UserRole } from '../../utils/utils'
import { Apis, UserPostApi } from '../../services/API'
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt'
import { countryApi } from '../../services/CountryAPI'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';


const SignupPage = () => {
  const navigate = useNavigate()
  const [screen, setScreen] = useState(1)
  const [eye, setEye] = useState(false)
  const [eye2, setEye2] = useState(false)
  const [check, setCheck] = useState(false)
  const EyeIcon = eye === true ? IoEye : IoMdEyeOff
  const EyeIcon2 = eye2 === true ? IoEye : IoMdEyeOff
  const [error, setError] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [verifycode, setVerifyCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [countries, setCountries] = useState(countryApi)
  const [countryshow, setCountryShow] = useState(false)
  const [usercountry, setUserCountry] = useState({
    name: 'select',
    flag: null
  })
  const [search, setSearch] = useState('')
  const imgref = useRef()

  const [profile, setProfile] = useState({
    img: null,
    image: null
  })

  const [form, setForm] = useState({
    full_name: '',
    username: '',
    email: '',
    referral_code: '',
    password: '',
    confirm_password: ''
  })

  const inputHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleProfileUpload = (event) => {
    setTimeout(() => {
      setError('')
      setErrorMsg('')
    }, 2000)

    const file = event.target.files[0]
    if (file.size >= 1000000) {
      imgref.current.value = null
      setErrorMsg('File size too large')
      return setError('image')
    }
    if (!file.type.startsWith('image/')) {
      imgref.current.value = null
      setErrorMsg('File Error')
      return setError('image')
    }

    setProfile({
      img: URL.createObjectURL(file),
      image: file
    })
  }

  const submitForm = async (event) => {
    event.preventDefault()
    setTimeout(() => {
      setError('')
      setErrorMsg('')
    }, 1500)

    if (!form.full_name) return setError('name')
    if (!form.username) return setError('user')
    if (!form.email) return setError('email')
    if (usercountry.name === 'select') return setError('country')
    if (!form.password) return setError('password')
    if (form.password.length < 6) {
      setErrorMsg('length too short')
      return setError('password')
    }
    if (!form.confirm_password) return setError('confirm_p')
    if (form.confirm_password !== form.password) {
      setErrorMsg('passwords mismatch')
      return setError('confirm_p')
    }
    if (!check) return setError('check')

    const formbody = new FormData()
    formbody.append('image', profile.image)
    formbody.append('country_flag', usercountry.flag)
    formbody.append('full_name', form.full_name)
    formbody.append('username', form.username)
    formbody.append('email', form.email)
    formbody.append('country', usercountry.name)
    formbody.append('referral_code', form.referral_code)
    formbody.append('password', form.password)
    formbody.append('confirm_password', form.confirm_password)
    setLoading(true)
    try {
      const response = await UserPostApi(Apis.user.signup, formbody)
      if (response.status === 200) {
        setScreen(2)
      } else {
        Alert('Request Failed', response.msg, 'error')
      }
    } catch (error) {
      Alert('Request Unsuccessful', `${error.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const ValidateEmail = async e => {
    e.preventDefault()

    setTimeout(() => {
      setError('')
      setErrorMsg('')
    }, 1000)

    if (!verifycode) return setError('verify')

    const formbody = {
      code: verifycode,
      email: form.email
    }

    setLoading(true)
    try {
      const response = await UserPostApi(Apis.user.validate_email, formbody)
      if (response.status === 200) {
        Cookies.set(CookieName, response.token)
        const decoded = decodeToken(response.token)
        const findRole = UserRole.find(item => item.role === decoded.role)
        if (findRole) return navigate(`${findRole.url}`)
      } else {
        setError('verify')
        return setErrorMsg(response.msg)
      }
    } catch (error) {
      Alert('Request Failed', `${error.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const ResendsCode = async () => {
    setLoading(true)
    try {
      const response = await UserPostApi(Apis.user.resend_otp, { email: form.email })
      if (response.status === 200) return Alert('Code sent', 'Check your email for the new verification code just sent', 'success')
    } catch (error) {
      Alert('Request Failed', `${error.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const FilterCountry = () => {
    const altCountries = countryApi
    if (!search) {
      setCountries(countryApi)
    }
    else {
      let searchResult = altCountries.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      setCountries(searchResult)
    }
  }




  return (
    <Pagelayout>
      <div className='py-16 bg-[whitesmoke] '>
        <div className="md:w-[85%] bg-white mx-auto py-4 rounded-xl relative shb">
          <div className='absolute top-4 left-4'>
            <img src={logo} className='w-auto h-20'></img>
          </div>
          <div className='w-[95%] lg:w-[97%] mx-auto grid grid-cols-1 lg:grid-cols-2'>
            <div className='col-span-1'>
              <div className='bgs rounded-xl flex items-center lg:h-[100vh] h-fit py-16'>
                <div className='w-11/12 mx-auto'>
                  <div className={`w-full h-fit lg:w-[39vw] lg:absolute bg-white ${screen === 1 ? 'top-[2.85rem]' : 'top-[3.7rem]'}  lg:right-16 rounded-[20px] py-8 lg:shadow-sign-sha`}>
                    <div className='relative w-full h-full'>
                      {loading && <Loading />}
                      {screen === 1 && <div className='w-11/12 md:w-[85%] mx-auto '>
                        <div className='text-center text-[1.7rem] capitalize font-[550]'>create an account</div>
                        <div className='text-[0.8rem] mt-[0.1rem] text-[#6b6a6a]  text-center font-[550]'>Start your trading journey today with the first step</div>
                        <form onSubmit={submitForm}>
                          <div className='flex flex-col gap-[0.7rem] mt-4'>
                            <div className='relative mx-auto'>
                              <label className='cursor-pointer'>
                                {profile.img ?
                                  <div className='relative'>
                                    <img src={profile.img} alt="" className="w-[3.8rem] object-cover h-[3.8rem] rounded-full" />
                                    <SlCamera className='absolute top-6 -right-1.5 text-base text-orange' />
                                  </div>
                                  :
                                  <div className="w-fit mx-auto text-3xl bg-slate-200 p-4 rounded-full relative"> <SlUser />
                                    <SlCamera className='absolute top-6 -right-1.5 text-base' />
                                  </div>
                                }
                                <input ref={imgref} type="file" onChange={handleProfileUpload} hidden />
                              </label>
                              {error === 'image' && <div className='absolute -bottom-4 -right-10 text-xs text-[red]'>{errorMsg}</div>}
                            </div>
                            <div className='flex flex-col gap-[0.3rem]'>
                              <div className='text-sm capitalize font-[550] '>full name:</div>
                              <input className={`outline-none w-full  border-b  ${error === 'name' ? 'border-[red]' : 'border-[#4d4c4c]'} lg:text-sm text-base  ipt input-off`} placeholder='Enter your full name' type='text' name='full_name' value={form.full_name} onChange={inputHandler} ></input>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 w-full md:gap-8 gap-[0.7rem]'>
                              <div className='flex flex-col gap-[0.3rem] relative '>
                                <div className='text-sm capitalize font-[550] '>username:</div>
                                <input className={`outline-none w-full  border-b  ${error === 'user' ? 'border-[red]' : 'border-[#4d4c4c]'} lg:text-sm text-base ipt input-off`} placeholder='Enter a username' type='text' name='username' value={form.username} onChange={inputHandler} ></input>
                              </div>
                              <div className='flex flex-col gap-[0.3rem] relative '>
                                <div className='text-sm capitalize font-[550] '>e-mail address:</div>
                                <input className={`outline-none w-full   border-b   ${error === 'email' ? 'border-[red]' : 'border-[#4d4c4c]'} lg:text-sm text-base ipt input-off`} placeholder='Enter your mail' type='email' name='email' value={form.email} onChange={inputHandler}></input>
                              </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-[0.7rem] w-full'>
                              <div className='relative'>
                                <div className='flex flex-col gap-[0.1rem]'>
                                  <div className='text-sm capitalize font-[550]'>country:</div>
                                  <div className='flex gap-1 items-center'>
                                    {usercountry.flag !== null && <img className='h-5 w-auto' src={usercountry.flag}></img>}
                                    <div className={`px-2 py-1 h-fit w-full bg-white sha cursor-pointer rounded-sm ${error === 'country' && 'border border-[red]'}`} onClick={() => { setCountryShow(!countryshow); setSearch(''); setCountries(countryApi) }}>
                                      <div className='flex justify-between items-center text-[0.8rem]'>
                                        <span >{usercountry.name}</span>
                                        {!countryshow ? <TiArrowSortedDown />
                                          :
                                          <TiArrowSortedUp />
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {countryshow && <div className='h-fit w-full bg-white sha absolute top-[3.4rem] left-0 z-10 py-2 rounded-sm '>
                                  <div className='px-4'>
                                    <input className='ipt border border-semi-white bg-transparent text-black px-2 py-1 w-full outline-none md:text-[0.85rem] text-base md:h-6 h-7 rounded-sm mb-1' type='text' placeholder='search' value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={FilterCountry}></input>
                                  </div>
                                  <div className='overflow-y-auto scroll h-[8.5rem] px-4'>
                                    {countries.map((item, i) => (
                                      <div className='flex flex-col mt-2' key={i}>
                                        <div className='flex gap-2 items-center cursor-pointer hover:bg-semi-white' onClick={() => { setUserCountry(item); setCountryShow(false) }}>
                                          <img src={item.flag} className='w-4 h-auto object-cover'></img>
                                          <div className='text-[0.85rem] font-bold'>{item.name}</div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                }
                              </div>
                              <div className='flex flex-col gap-[0.3rem] relative'>
                                <div className='text-sm capitalize font-[550] '>referral code:</div>
                                <input className='outline-none w-full   border-b border-[#4d4c4c] lg:text-sm text-base  ipt input-off' placeholder='Optional' code type='text' name='referral_code' value={form.referral_code} onChange={inputHandler}></input>
                              </div>
                            </div>
                            <div className='grid grid-cols-2 gap-8 w-full'>
                              <div className='flex flex-col gap-[0.3rem] relative'>
                                <div className='text-sm capitalize font-[550]'>password:</div>
                                <input className={`outline-none w-full border-b  ${error === 'password' ? 'border-[red]' : 'border-[#4d4c4c]'}  lg:text-sm text-base pr-6 ipt input-off`} placeholder='Create a password' type={eye === true ? 'text' : 'password'} name='password' value={form.password} onChange={inputHandler}></input>
                                <EyeIcon className='absolute bottom-0 right-0 text-base text-orange cursor-pointer' onClick={() => setEye(!eye)} />
                                {error === 'password' && <div className='absolute -bottom-4 left-0 text-xs text-[red]'>{errorMsg}</div>}
                              </div>
                              <div className='flex flex-col gap-[0.3rem] relative'>
                                <div className='text-sm capitalize font-[550] '>confirm password:</div>
                                <input className={`outline-none w-full border-b  ${error === 'confirm_p' ? 'border-[red]' : 'border-[#4d4c4c]'} lg:text-sm text-base pr-6 ipt input-off`} placeholder='Re-type password' type={eye2 === true ? 'text' : 'password'} name='confirm_password' value={form.confirm_password} onChange={inputHandler}></input>
                                <EyeIcon2 className='absolute bottom-0 right-0 text-base text-orange cursor-pointer' onClick={() => setEye2(!eye2)} />
                                {error === 'confirm_p' && <div className='absolute -bottom-4 left-0 text-xs text-[red]'>{errorMsg}</div>}
                              </div>
                            </div>
                            <div className='flex gap-1 mt-4'>
                              <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className={`${error === 'check' ? 'outline outline-1 outline-[red]' : ''}`}></input>
                              <div className='text-xs capitalize'>by signing up, i agree with <Link to='/terms' className='text-orange font-[550]' onClick={MoveToTop}>terms and conditions</Link></div>
                            </div>
                            <div className='flex flex-col gap-2 items-center'>
                              <button className='outline-none bg-orange py-2 w-full md:px-32 h-fit md:w-fit rounded-md capitalize text-sm text-white cursor-pointer font-[550]' type='submit'>create account</button>
                              <div className='text-[#6b6a6a] text-sm font-[550]'>Already have an account?
                                <Link to='/login' onClick={MoveToTop} className='cursor-pointer text-orange font-[550]' > Login</Link>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>}
                      {screen === 2 &&
                        <div className='w-11/12 md:w-[85%] mx-auto py-14'>
                          <div className='flex items-center justify-center text-[3rem] text-orange'>
                            <MdVerified />
                          </div>
                          <div className='text-center text-2xl capitalize font-[550] mt-4'>Verify Your Email</div>
                          <div className='text-center mt-[0.5rem]'>A six digits code was sent to your email address <span className='text-orange'>{form.email?.slice(0, 3)}*******{form.email?.slice(-10)}</span>, copy and paste code below to verify your email.</div>
                          <form onSubmit={ValidateEmail}>
                            <div className='flex flex-col gap-1 mt-12 relative'>
                              <div className='capitalize text-[0.85rem]'>enter six digits code</div>
                              <input className={`outline-none w-full h-10 border  ${error === 'verify' ? 'border-[red]' : 'border-[grey]'} text-sm px-2 ipt`} placeholder='Enter code here' value={verifycode} onChange={(e) => setVerifyCode(e.target.value)}></input>
                              {error === 'verify' && <div className='absolute -bottom-5 left-0 text-xs text-[red]'>{errorMsg}</div>}
                            </div>
                            <div className='text-[0.85rem] text-right mt-2'>Didn't get code? <span className='text-orange cursor-pointer' onClick={ResendsCode}>Resend code</span></div>
                            <div className='flex items-center justify-center mt-12'>
                              <button className='outline-none bg-orange py-2 md:px-12 h-fit w-full md:w-fit rounded-md capitalize text-sm text-white cursor-pointer font-[550]'>verify</button>
                            </div>
                          </form>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default SignupPage