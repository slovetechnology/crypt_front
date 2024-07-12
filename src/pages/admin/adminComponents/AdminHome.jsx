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

const AdminHome = () => {
  const navigate = useNavigate()
  const [logout, setLogOut] = useState(false)
  const [toggle, setToggle] = useState('update transactions')
  const [, setAllDeposits] = useAtom(ADMINALLDEPOSITS)
  const [, setAllUsers] = useAtom(ADMINALLUSERS)
  const [, setNotifications] = useAtom(NOTIFICATIONS)
  const [, setUnreadNotis] = useAtom(UNREADNOTIS)
  const [, setAllWithdrawals] = useAtom(ADMINALLWITHDRAWALS)

  const [loading, setLoading] = useState(true)
  const [altnotis, setAltNotis] = useState([])
  const [altdeposits, setAltDeposits] = useState([])

  const logoutAccount = () => {
    Cookies.remove(CookieName)
    navigate('/')
  }

  const FetchNotifications = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.notification.admin_notifications)
      if (response.status === 200) {
        setNotifications(response.msg)
        setAltNotis(response.msg)
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
        setAltDeposits(response.msg)
        console.log(response.msg)
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
      <div className='w-[20%] bg-[#36225e] '>
        <div className='w-[20%] h-screen fixed top-0 left-0'>
          <div className='flex justify-center mt-[3.5rem] items-center'>
            <img src={logo} className='w-[3rem] h-auto'></img>
            <div className=' capitalize font-[550] text-sha text-[1.3rem]'>AialgoControls</div>
          </div>
          <div className='flex flex-col gap-[2rem]  mt-[2.5rem] pl-[3rem] text-[#bbb9b9] '>
            <div className='flex gap-4 flex-col'>
              <div className=' text-[0.65rem] uppercase'>main</div>
              <div className={`flex gap-3 text-[#d4d3d3] hover:text-[white]  items-center cursor-pointer ${toggle === 'update transactions' ? 'border-r-[3px] rounded-sm border-[white]' : ''}`} onClick={() => setToggle('update transactions')}>
                <GrDocumentUpdate className='text-[1.3rem] ' />
                <div className='capitalize text-[0.85rem] font-bold'>update transactions</div>
              </div>
            </div>
            <div className='flex gap-4 flex-col'>
              <div className='text-[0.65rem] uppercase'>others</div>
              <div className='flex flex-col gap-[2rem]'>
                <div className={`flex gap-3 text-[#d4d3d3] hover:text-[white] items-center cursor-pointer ${toggle === 'withdrawals' ? 'border-r-[3px] rounded-sm border-[white]' : ''}`} onClick={() => setToggle('withdrawals')}>
                  <BiMoneyWithdraw className='text-[1.3rem] ' />
                  <div className='capitalize text-[0.85rem] font-bold'>withdrawals</div>
                </div>
                <div className={`flex gap-3 text-[#d4d3d3] hover:text-[white] items-center cursor-pointer ${toggle === 'delete accounts' ? 'border-r-[3px] rounded-sm border-[white]' : ''}`} onClick={() => setToggle('delete accounts')}>
                  <RiDeleteBin3Line className='text-[1.3rem] ' />
                  <div className='capitalize text-[0.85rem] font-bold'>delete accounts</div>
                </div>
                <div className='relative'>
                  <div className='flex gap-3 text-[#d4d3d3] hover:text-[white] items-center cursor-pointer' onClick={() => setLogOut(!logout)}>
                    <BiLogOutCircle className='text-[1.3rem] ' />
                    <div className='capitalize text-[0.85rem] font-bold'>logout</div>
                  </div>
                  {logout && <div className='absolute top-0 right-4 bg-[#36225e] w-fit  h-fit z-10 rounded-[10px] text-white   p-4 shlztwo'>
                    <div className=' text-[0.8rem] mb-[1rem] text-center'>Logout of your account?</div>
                    <div className='flex gap-[1rem] items-center'>
                      <button className='outline-none py-[0.25rem] px-[1rem] w-fit h-fit border border-[white] rounded-lg capitalize text-[0.75rem] flex items-center gap-1 hover:bg-[white] hover:text-[#36225e] ' onClick={() => setLogOut(!logout)}>
                        <span>cancel</span>
                        <TiCancel className='text-[0.8rem]' />
                      </button>
                      <button className='outline-none py-[0.25rem] px-[1rem] w-fit h-fit border border-[white]  rounded-lg capitalize text-[0.75rem] flex items-center gap-1 hover:bg-[white] hover:text-[#36225e]' onClick={logoutAccount}>
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


      <div className={`w-[80%]  h-[110vh] bg-[white]`}>
        <div className='w-[94%] mx-auto'>
          <div className='flex flex-col gap-[1rem]'>
            <div className='w-full h-fit  rounded-md bg-[#36225e] mt-4 px-4 py-1 text-white text-[0.85rem] flex items-center justify-between'>
              <div className='flex items-center gap-1 capitalize'>
                <div>hello,</div>
                <div>admin!</div>
              </div>
              {loading ?
                <div className='relative animate-pulse'>
                  <div className='rounded-full bg-slate-300 w-[2.2rem] h-[2.2rem]'></div>
                  <div className='rounded-full w-[1.25rem] h-[1.2rem] absolute top-[-0.5rem] right-[-0.3rem] bg-slate-300 border'></div>
                </div>
                :
                <div>
                  <AdminNotis altnotis={altnotis} setAltNotis={setAltNotis} />
                </div>}
            </div>
            <div className='flex gap-2 capitalize items-center text-[#292929] font-bold text-[0.8rem] '>
              <div>dashboard</div>
              <FaAngleRight className='text-[0.6rem]' />
              <div>{toggle}</div>
            </div>
          </div>
          {loading &&
            <div className='flex flex-col gap-[2.5rem]'>
              <div className='font-bold text-[1.5rem] text-[#c0bfbf] pt-[2.5rem]'>please wait...</div>
              <div className=" animate-pulse h-[10rem] pt-2">
                <div className="w-[20rem] mb-1 h-[2rem] bg-slate-300 mx-auto"></div>
                <div className="w-full mb-1 h-[2rem] bg-slate-300"></div>
                <div className="w-full h-[15rem] mb-3 bg-slate-300"></div>
              </div>
            </div>
          }
          {!loading && <div>
            {toggle === 'update transactions' && <UpdateTransactions
              altdeposits={altdeposits} setAltDeposits={setAltDeposits}
              refetchAllDeposits={() => FetchAllDeposits()}
            />}

            {toggle === 'delete accounts' && <DeleteAccounts
              refetchAllUsers={() => FetchAllUsers()}
              refetchAllDeposits={() => FetchAllDeposits()}
            />}

            {toggle === 'withdrawals' && <Withdrawals
              refetchAllWithdrawals={() => FetchAllWithdrawals()}
            />}
          </div>}
        </div>
      </div>
    </div>
  )
}

export default AdminHome