import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ADMINALLDEPOSITS, ADMINALLUSERS, ADMINALLWITHDRAWALS, NOTIFICATIONS, UNREADNOTIS } from '../../../store'
import { useAtom } from 'jotai'
import Cookies from 'js-cookie'
import { CookieName } from '../../../utils/utils'
import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/images/logobrand.png'
import { BiLogOutCircle, BiMoneyWithdraw } from 'react-icons/bi'
import { TiCancel } from 'react-icons/ti'
import { IoMdLogOut } from 'react-icons/io'
import { GrDocumentUpdate } from "react-icons/gr";
import { RiDeleteBin3Line } from "react-icons/ri";
import UpdateTransactions from './UpdateTransactions'
import DeleteAccounts from './DeleteAccounts'
import { Apis, UserGetApi } from '../../../services/API'
import { FaAngleRight } from 'react-icons/fa6'
import AdminNotis from './AdminNotis'
import Withdrawals from './Withdrawals'

const AllLinks = [
  { path: 'transactions', component: UpdateTransactions, icon: GrDocumentUpdate },
  { path: 'withdrawals', component: Withdrawals, icon: BiMoneyWithdraw },
  { path: 'delete users', component: DeleteAccounts, icon: RiDeleteBin3Line },
]

const MainLinks = [
  { path: 'transactions', component: UpdateTransactions, icon: GrDocumentUpdate },
]

const OtherLinks = [
  { path: 'withdrawals', component: Withdrawals, icon: BiMoneyWithdraw },
  { path: 'delete users', component: DeleteAccounts, icon: RiDeleteBin3Line },
]

const AdminHome = () => {
  const navigate = useNavigate()
  const [logout, setLogOut] = useState(false)
  const [toggle, setToggle] = useState('transactions')
  const [, setAllDeposits] = useAtom(ADMINALLDEPOSITS)
  const [, setAllUsers] = useAtom(ADMINALLUSERS)
  const [, setNotifications] = useAtom(NOTIFICATIONS)
  const [, setUnreadNotis] = useAtom(UNREADNOTIS)
  const [, setAllWithdrawals] = useAtom(ADMINALLWITHDRAWALS)

  const [loading, setLoading] = useState(true)

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



  const FetchAllUsers = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.admin.all_users)
      if (response.status === 200) {
        setAllUsers(response.msg)
      }

    } catch (error) {
      //
    }
  }, [])

  useEffect(() => {
    FetchAllUsers()
  }, [FetchAllUsers])


  const FetchAllWithdrawals = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.admin.all_withdrawals)
      if (response.status === 200) {
        setAllWithdrawals(response.msg)
      }

    } catch (error) {
      //
    }
  }, [])

  useEffect(() => {
    FetchAllWithdrawals()
  }, [FetchAllWithdrawals])


  const FetchAllDeposits = useCallback(async () => {
    setLoading(true)
    try {
      const response = await UserGetApi(Apis.admin.all_deposits)
      if (response.status === 200) {
        setAllDeposits(response.msg)
      }

    } catch (error) {
      //
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    FetchAllDeposits()
  }, [FetchAllDeposits])





  return (
    <div className='w-full flex relative'>
      <div className={`xl:w-[20%] lg:w-[25%] hidden bg-admin-auth lg:block relative overflow-hidden`}>
        <div className={`xl:w-[20%] lg:w-[25%] fixed top-0 left-0 h-screen`}>
          <div className='flex justify-center mt-14 items-center'>
            <img src={logo} className='w-12 h-auto'></img>
            <div className=' capitalize font-bold text-[#7561a0] text-sha text-2xl'>AialgoControls</div>
          </div>
          <div className='flex flex-col gap-8  mt-10 pl-12 text-[#bbb9b9] '>
            <div className='flex gap-4 flex-col'>
              <div className=' text-[0.65rem] uppercase'>main</div>
              {MainLinks.map((item, i) => (
                <div key={i} onClick={() => setToggle(item.path)}>
                  <div className={`flex gap-3 text-[#d4d3d3] hover:text-white  items-center cursor-pointer ${toggle === item.path ? 'border-r-[3px] rounded-sm border-white' : ''}`}>
                    <item.icon className='text-[1.3rem] ' />
                    <div className='capitalize text-[0.85rem] font-bold'>{i === 0 && 'update'} {item.path}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex gap-4 flex-col'>
              <div className='text-[0.65rem] uppercase'>others</div>
              <div className='flex flex-col gap-8'>
                {OtherLinks.map((item, i) => (
                  <div key={i} onClick={() => setToggle(item.path)}>
                    <div className={`flex gap-3 text-[#d4d3d3] hover:text-white  items-center cursor-pointer ${toggle === item.path ? 'border-r-[3px] rounded-sm border-white' : ''}`}>
                      <item.icon className='text-[1.3rem] ' />
                      <div className='capitalize text-[0.85rem] font-bold'>{item.path}</div>
                    </div>
                  </div>
                ))}
                <div className='relative'>
                  <div className='flex gap-3 text-[#d4d3d3] hover:text-white items-center cursor-pointer' onClick={() => setLogOut(!logout)}>
                    <BiLogOutCircle className='text-[1.3rem] ' />
                    <div className='capitalize text-[0.85rem] font-bold'>logout</div>
                  </div>
                  {logout && <div className='absolute top-0 right-4 bg-admin-auth w-fit  h-fit z-10 rounded-[10px] text-white   p-4 shlztwo'>
                    <div className=' text-[0.8rem] mb-4 text-center'>Logout of your account?</div>
                    <div className='flex gap-[1rem] items-center'>
                      <button className='outline-none py-1 px-4 w-fit h-fit border border-white rounded-lg capitalize text-xs flex items-center gap-1 hover:bg-white hover:text-admin-auth bg-admin-auth ' onClick={() => setLogOut(!logout)}>
                        <span>cancel</span>
                        <TiCancel className='text-[0.8rem]' />
                      </button>
                      <button className='outline-none py-1 px-4 w-fit h-fit border border-white  rounded-lg capitalize text-xs flex items-center gap-1 hover:bg-white hover:text-admin-auth bg-admin-auth' onClick={logoutAccount}>
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
                <div>admin!</div>
              </div>
              {loading ?
                <div className='relative animate-pulse'>
                  <div className='rounded-full bg-slate-300 w-9 h-9'></div>
                  <div className='rounded-full w-5 h-[1.2rem] absolute -top-2 -right-1 bg-slate-300 border'></div>
                </div>
                :
                <div>
                  <AdminNotis />
                </div>}
            </div>
            <div className='flex gap-2 capitalize items-center text-[#292929] font-bold md:text-[0.85rem] text-xs '>
              <div>dashboard</div>
              <FaAngleRight className='text-[0.6rem]' />
              <div>{toggle}</div>
            </div>
          </div>
          {loading &&
            <div className='flex flex-col gap-10 pt-10 h-screen'>
              <div className='font-bold md:text-2xl text-lg text-[#c0bfbf]'>please wait...</div>
              <div className=" animate-pulse h-40">
                <div className="w-1/2 mb-1 h-8 bg-slate-300 mx-auto"></div>
                <div className="w-full mb-1 h-8 bg-slate-300"></div>
                <div className="w-full h-60 mb-3 bg-slate-300"></div>
              </div>
            </div>
          }
          {!loading &&
            <>
              {AllLinks.map((item, i) => (
                <div key={i}>
                  {toggle === item.path && <item.component
                    refetchAllUsers={() => FetchAllUsers()}
                    refetchAllDeposits={() => FetchAllDeposits()}
                    refetchAllWithdrawals={() => FetchAllWithdrawals()}
                  />}
                </div>
              ))}
            </>
          }
          <div className='bg-admin-auth w-full h-14 fixed bottom-0 left-0 z-30 lg:hidden px-2'>
            <div className='grid grid-cols-4 items-center h-full w-full'>
              {AllLinks.map((item, i) => (
                <div key={i} onClick={() => setToggle(item.path)}>
                  <div className={`flex flex-col gap-1 items-center cursor-pointer  ${toggle === item.path ? 'text-[green]' : ' text-semi-white'}`} >
                    <item.icon className='md:text-xl text-lg' />
                    <div className='capitalize md:text-xs text-[0.7rem] font-medium'>{item.path}</div>
                  </div>
                </div>
              ))}
              <div className={`flex flex-col gap-1 items-center cursor-pointer text-semi-white hover:text-[green]`} onClick={logoutAccount}>
                <GrDocumentUpdate className='md:text-xl text-lg' />
                <div className='capitalize md:text-xs text-[0.7rem] font-medium'>logout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome