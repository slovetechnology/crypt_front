import React, { useCallback, useEffect, useState } from 'react'
import { NOTIFICATIONS, UNREADNOTIS } from '../../../store'
import { useAtom } from 'jotai'
import Cookies from 'js-cookie'
import { CookieName } from '../../../utils/utils'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../../assets/images/logobrand.png'
import { RiLogoutCircleLine } from "react-icons/ri";
import { RiBankLine } from "react-icons/ri";
import { TiCancel } from 'react-icons/ti'
import { IoMdLogOut } from 'react-icons/io'
import { HiOutlineCreditCard } from "react-icons/hi2";
import { HiOutlineCollection } from "react-icons/hi";
import { TbUsers } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import AdminNotis from './AdminNotis'
import { Apis, UserGetApi } from '../../../services/API'
import { FaAngleRight } from 'react-icons/fa6'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { LuX } from 'react-icons/lu'


const MainLinks = [
  { path: 'deposits', url: '/admin-controls', icon: HiOutlineCreditCard },
  { path: 'investments', url: '/admin-controls/investments', icon: HiOutlineCollection },
  { path: 'withdrawals', url: '/admin-controls/withdrawals', icon: RiBankLine },
  { path: 'users', url: '/admin-controls/users', icon: TbUsers },
]

const OtherLinks = [
  { path: 'settings', url: '/admin-controls/settings', icon: IoSettingsOutline },
]

const toggleArray = [
  "/admin-controls",
  "/admin-controls/investments",
  "/admin-controls/withdrawals",
  "/admin-controls/users",
]

const AdminDashboard = ({ children }) => {
  const [, setNotifications] = useAtom(NOTIFICATIONS)
  const [, setUnreadNotis] = useAtom(UNREADNOTIS)
  const [logout, setLogOut] = useState(false)
  const [slideShow, setSlideShow] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const logoutAccount = () => {
    Cookies.remove(CookieName)
    navigate('/')
  }

  const FetchNotifications = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.notification.admin_notifications)
      if (response.status === 200) {
        setNotifications(response.msg)
      }

    } catch (error) {
      //
    } finally {
    }
  }, [])

  useEffect(() => {
    FetchNotifications()
  }, [FetchNotifications])

  const FetchUnreadNotis = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.notification.admin_unread_notis)
      if (response.status === 200) {
        setUnreadNotis(response.msg)
      }

    } catch (error) {
      //
    }
  }, [])

  useEffect(() => {
    FetchUnreadNotis()
  }, [FetchUnreadNotis])






  return (
    <div className='w-full flex relative'>
      <div className={`w-full xl:w-[20%] lg:w-[25%] lg:bg-admin-auth bg-[#27137eee] lg:block lg:relative overflow-hidden ${slideShow ? 'block fixed top-0 left-0 h-full z-50' : 'hidden'}`}>
        <div className={`xl:w-[20%] lg:w-[25%] lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:bg-admin-auth`}>
          <div className='text-white text-3xl cursor-pointer lg:hidden absolute top-4 right-4' onClick={() => setSlideShow(!slideShow)}>
            <LuX />
          </div>
          <div className='flex justify-center lg:mt-14 mt-12 items-center'>
            <img src={logo} className='w-12 h-auto'></img>
            <div className=' capitalize font-bold lg:text-[#7561a0] text-[#462eb3] drop-shadow-txt-sha2 text-2xl'>AialgoControls</div>
          </div>
          <div className='flex flex-col gap-8  mt-10 pl-12 lg:text-[#bbb9b9] text-semi-white '>
            <div className='flex gap-4 flex-col'>
              <div className=' text-[0.65rem] uppercase'>main</div>
              <div className='flex flex-col gap-8'>
                {MainLinks.map((item, i) => (
                  <Link key={i} onClick={() => setSlideShow(false)} to={item.url}>
                    <div className={`flex gap-3 lg:text-[#bbb9b9] text-semi-white  lg:hover:text-white hover:text-[green] items-center cursor-pointer w-fit lg:w-full ${location.pathname === item.url ? 'lg:border-r-[3px] lg:rounded-sm lg:border-white' : ''}`}>
                      <item.icon className='text-[1.3rem] ' />
                      <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>{item.path}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className='flex gap-4 flex-col'>
              <div className='text-[0.65rem] uppercase'>others</div>
              <div className='flex flex-col gap-8'>
                {OtherLinks.map((item, i) => (
                  <Link key={i} onClick={() => setSlideShow(false)} to={item.url}>
                    <div className={`flex gap-3 lg:text-[#bbb9b9] text-semi-white  lg:hover:text-white hover:text-[green] items-center cursor-pointer w-fit lg:w-full ${location.pathname === item.url ? 'lg:border-r-[3px] lg:rounded-sm lg:border-white' : ''}`}>
                      <item.icon className='text-[1.3rem] ' />
                      <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>{item.path}</div>
                    </div>
                  </Link>
                ))}
                <div className='relative'>
                  <div className='flex gap-3 lg:text-[#bbb9b9] text-semi-white lg:hover:text-white hover:text-[green] items-center cursor-pointer w-fit lg:w-full' onClick={() => setLogOut(!logout)}>
                    <RiLogoutCircleLine className='text-[1.3rem] ' />
                    <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>logout</div>
                  </div>
                  {logout && <div className='absolute top-0 -left-4 lg:right-4 lg:bg-admin-auth bg-[#27137e] w-fit  h-fit z-10 rounded-[10px] text-white p-4 lg:shadow-logout-sha3 shadow-logout-sha2'>
                    <div className=' text-[0.8rem] mb-4 text-center'>Logout of your account?</div>
                    <div className='flex gap-[1rem] items-center'>
                      <button className='outline-none py-1 px-4 w-fit h-fit border border-white rounded-lg capitalize text-xs flex items-center gap-1 hover:bg-white lg:hover:text-admin-auth hover:text-[#27137e] lg:bg-admin-auth bg-[#27137e] ' onClick={() => setLogOut(!logout)}>
                        <span>cancel</span>
                        <TiCancel className='text-[0.8rem]' />
                      </button>
                      <button className='outline-none py-1 px-4 w-fit h-fit border border-white  rounded-lg capitalize text-xs flex items-center gap-1 hover:bg-white lg:hover:text-admin-auth hover:text-[#27137e] lg:bg-admin-auth bg-[#27137e]' onClick={logoutAccount}>
                        <span>logout</span>
                        <IoMdLogOut className='text-[0.7rem]' />
                      </button>
                    </div>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`xl:w-[80%] lg:w-[75%] w-full bg-white`}>
        <div className='md:w-[94%] w-11/12 mx-auto'>
          <div className='flex flex-col gap-4'>
            <div className='w-full h-fit  rounded-md bg-admin-auth mt-4 px-4 py-2 text-white text-[0.85rem] flex items-center justify-between'>
              <div className='flex items-center gap-1 capitalize'>
                <div>hello,</div>
                <div>admin</div>
              </div>
              <div>
                <AdminNotis refetchNotifications={FetchNotifications} refetchUnreadNotis={FetchUnreadNotis} />
              </div>
            </div>
            <div className='flex gap-1.5 capitalize items-center text-[#292929] font-bold md:text-[0.85rem] text-xs '>
              <div>dashboard</div>
              <FaAngleRight className='text-[0.6rem]' />
              {location.pathname === '/admin-controls' && <span>deposits</span>}
              {location.pathname.includes('/admin-controls/settings') ?
               <span>{location.pathname.slice(16, 24)}</span>
               :
               <span>{location.pathname.slice(16)}</span>
              }
            </div>
          </div>
            <div>
              {children}
            </div>
          <div className='bg-admin-auth w-full h-14 fixed bottom-0 left-0 z-30 lg:hidden px-2'>
            <div className='grid grid-cols-5 items-center h-full w-full'>
              {MainLinks.map((item, i) => (
                <Link key={i} onClick={() => setSlideShow(false)} to={item.url}>
                  <div className={`flex flex-col gap-1 items-center cursor-pointer  ${location.pathname === item.url ? 'text-[green]' : ' text-semi-white'}`} >
                    <item.icon className='md:text-xl text-base' />
                    <div className='capitalize md:text-xs text-[0.6rem] font-medium'>{item.path}</div>
                  </div>
                </Link>
              ))}
              <div className={`flex flex-col gap-1 items-center justify-center rounded-full cursor-pointer  ${!toggleArray.includes(location.pathname) ? 'text-[green]' : 'text-semi-white'} `} onClick={() => setSlideShow(!slideShow)}>
                <HiOutlineDotsVertical className='md:text-xl text-base' />
                <div className='capitalize md:text-xs text-[0.6rem] font-medium'>more</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard