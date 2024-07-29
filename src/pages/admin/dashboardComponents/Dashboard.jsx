import React, { useCallback, useEffect, useState } from 'react'
import logo from '../../../assets/images/logobrand.png'
import { GrMoney } from "react-icons/gr";
import { IoWalletOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
import { BiMoneyWithdraw } from "react-icons/bi";
import { LuSend, LuArrowDownUp } from "react-icons/lu";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { LuX } from "react-icons/lu";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import Wallet from './Wallet'
import moment from 'moment'
import { DEPOSITS, INVESTMENTS, INVESTMENTUNCLAIM, NOTIFICATIONS, PROFILE, UNREADNOTIS, UPS, WALLET, WITHDRAWALS } from '../../../store';
import { Apis, UserGetApi, imageurl } from '../../../services/API';
import { useAtom } from 'jotai';
import Profile from './Profile';
import Cookies from 'js-cookie';
import { CookieName } from '../../../utils/utils';
import { TiCancel } from "react-icons/ti";
import { IoMdLogOut } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiMoneyCheck1 } from "react-icons/ci";
import Investment from './Investment';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Feedback from './Feedback';
import VerifyAcount from './VerifyAcount';
import Notifications from './Notifications';

const AllLinks = [
    { path: 'wallet', component: Wallet, icon: IoWalletOutline },
    { path: 'investment', component: Investment, icon: GrMoney },
    { path: 'deposit', component: Deposit, icon: CiMoneyCheck1 },
    { path: 'withdraw', component: Withdraw, icon: BiMoneyWithdraw },
    { path: 'profile', component: Profile, icon: RiAccountPinCircleLine },
    { path: 'send feedback', component: Feedback, icon: LuSend },
]

const MainLinks = [
    { path: 'wallet', component: Wallet, icon: IoWalletOutline },
    { path: 'investment', component: Investment, icon: GrMoney },
    { path: 'deposit', component: Deposit, icon: CiMoneyCheck1 },
    { path: 'withdraw', component: Withdraw, icon: BiMoneyWithdraw },
]

const OtherLinks = [
    { path: 'profile', component: Profile, icon: RiAccountPinCircleLine },
    { path: 'send feedback', component: Feedback, icon: LuSend },
]

const ExtraLinks = [
    { path: 'verify account', component: VerifyAcount, icon: RiAccountPinCircleLine },
]


const toggleArray = [
    "wallet",
    "investment",
    "deposit",
    "withdraw"
]


const Dashboard = () => {
    const [logout, setLogOut] = useState(false)
    const [toggle, setToggle] = useState('wallet')
    const [toggleExtra, setToggleExtra] = useState('')
    const [user] = useAtom(PROFILE)
    const [, setDeposits] = useAtom(DEPOSITS)
    const [, setInvestment] = useAtom(INVESTMENTS)
    const [, setInvestUnclaim] = useAtom(INVESTMENTUNCLAIM)
    const [, setNotifications] = useAtom(NOTIFICATIONS)
    const [, setUnreadNotis] = useAtom(UNREADNOTIS)
    const [, setWithdrawals] = useAtom(WITHDRAWALS)
    const [wallet, setWallet] = useAtom(WALLET)
    const [, setUps] = useAtom(UPS)
    const [urlState, setUrlState] = useState(false)
    const [loading, setLoading] = useState(true)
    const [slideShow, setSlideShow] = useState(false)
    const navigate = useNavigate()



    const logoutAccount = () => {
        Cookies.remove(CookieName)
        navigate('/')
    }


    const FetchNotifications = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.notification.user_notifications)
            if (response.status === 200) {
                setNotifications(response.msg)
            }

        } catch (error) {
            //
        }
    }, [])

    useEffect(() => {
        FetchNotifications()
    }, [FetchNotifications])

    const FetchUnreadNotis = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.notification.unread_notis)
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

    const FetchWallet = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.user.wallet)
            if (response.status === 200) {
                setWallet(response.msg)
            }

        } catch (error) {
            //
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        FetchWallet()
    }, [FetchWallet])

    const FetchDeposits = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.deposit.user_deposits)
            if (response.status === 200) {
                setDeposits(response.msg)
            }

        } catch (error) {
            //
        }
    }, [])

    useEffect(() => {
        FetchDeposits()
    }, [FetchDeposits])

    const FetchInvestment = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.investment.user_investment)
            if (response.status === 200) {
                setInvestment(response.msg)
            }

        } catch (error) {
            //
        }
    }, [])

    useEffect(() => {
        FetchInvestment()
    }, [FetchInvestment])

    const FetchInvestmentUnclaim = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.investment.user_unclaim)
            if (response.status === 200) {
                setInvestUnclaim(response.msg)

            }

        } catch (error) {
            //
        }
    }, [])

    useEffect(() => {
        FetchInvestmentUnclaim()
    }, [FetchInvestmentUnclaim])


    const FetchWithdrawals = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.withdrawal.user_withdrawals)
            if (response.status === 200) {
                setWithdrawals(response.msg)
            }

        } catch (error) {
            //
        }
    }, [])

    useEffect(() => {
        FetchWithdrawals()
    }, [FetchWithdrawals])


    const FetchUps = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.user.ups)
            if (response.status === 200) {
                setUps(response.msg)
            }

        } catch (error) {
            //
        }
    }, [])

    useEffect(() => {
        FetchUps()
    }, [FetchUps])

    return (
        <div className='flex bg-[#0c091a]'>
            <div className={`bg-[#27137eee] lg:bg-admin w-full xl:w-[20%] lg:w-[25%] lg:block lg:relative overflow-hidden ${slideShow ? 'block fixed top-0 left-0 h-full z-50' : 'hidden'} `}>
                <div className={`xl:w-[20%] lg:w-[25%] lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:bg-admin`}>
                    <div className='text-white text-3xl cursor-pointer lg:hidden absolute top-4 right-4' onClick={() => setSlideShow(!slideShow)}>
                        <LuX />
                    </div>
                    <div className='flex justify-center lg:mt-14 mt-12 items-center'>
                        <img src={logo} className='w-12 h-auto'></img>
                        <div className='capitalize font-bold text-2xl lg:text-[#2b2255] text-[#462eb3] lg:drop-shadow-txt-sha1 drop-shadow-txt-sha2'>AialgoVault</div>
                    </div>
                    <div className='flex flex-col gap-10 lg:mt-10 mt-8 pl-12'>
                        <div className='flex gap-4 flex-col lg:text-[grey] text-semi-white'>
                            <div className=' text-[0.65rem] uppercase lg:text-[#797878] text-[#c5c4c4]'>main</div>
                            <div className='flex flex-col gap-8'>
                                {MainLinks.map((item, i) => (
                                    <div key={i} onClick={() => { setUrlState(false); setSlideShow(false); setToggle(item.path); setToggleExtra('') }}>
                                        <div className={`flex gap-3 lg:hover:text-white hover:text-[green] items-center cursor-pointer w-fit lg:w-full ${toggle === item.path ? 'lg:border-r-[3px] lg:rounded-sm lg:border-light' : ''}`} >
                                            <item.icon className='text-[1.3rem] ' />
                                            <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>{item.path}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex gap-4 flex-col lg:text-[grey] text-semi-white'>
                            <div className=' text-[0.65rem] uppercase lg:text-[#797878] text-[#c5c4c4]'>others</div>
                            <div className='flex flex-col gap-8'>
                                {OtherLinks.map((item, i) => (
                                    <div key={i} onClick={() => { setUrlState(false); setSlideShow(false); setToggle(item.path); setToggleExtra('') }}>
                                        <div className={`flex gap-3 lg:hover:text-white hover:text-[green] items-center cursor-pointer w-fit lg:w-full ${toggle === item.path ? 'lg:border-r-[3px] lg:rounded-sm lg:border-light' : ''}`} >
                                            <item.icon className='text-[1.3rem] ' />
                                            <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>{item.path}</div>
                                        </div>
                                    </div>
                                ))}
                                <div className='relative'>
                                    <div className='flex gap-3 lg:hover:text-white hover:text-[green] items-center cursor-pointer w-fit lg:w-full' onClick={() => setLogOut(!logout)}>
                                        <BiLogOutCircle className='text-[1.3rem] ' />
                                        <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>logout</div>
                                    </div>
                                    {logout && <div className='absolute -top-5 -left-4 lg:right-0  lg:bg-admin bg-[#27137e] w-fit h-fit z-50 rounded-[10px] text-semi-white font-medium p-4 lg:shadow-logout-sha shadow-logout-sha2'>
                                        <div className=' text-[0.8rem] mb-4 text-center'>Logout of your account?</div>
                                        <div className='flex gap-4 items-center'>
                                            <button className='outline-none py-1 px-4 w-fit h-fit border lg:border-[#1c1733] border-white rounded-lg capitalize text-xs flex items-center gap-1 lg:hover:bg-[#1c1733] hover:bg-white lg:text-light text-white hover:text-[#27137e] lg:hover:text-white' onClick={() => setLogOut(!logout)}>
                                                <span>cancel</span>
                                                <TiCancel className='text-[0.8rem] ' />
                                            </button>
                                            <button className='outline-none py-1 px-4 w-fit h-fit border lg:border-[#1c1733] border-white  rounded-lg capitalize text-xs flex items-center gap-1 lg:hover:bg-[#1c1733] hover:bg-white lg:text-light text-white hover:text-[#27137e] lg:hover:text-white' onClick={logoutAccount}>
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
            <div className='xl:w-[62%] lg:w-[75%] w-full'>
                <div className='md:w-[94%] w-11/12 mx-auto'>
                    <div className='flex flex-col gap-4'>
                        <div className='w-full h-fit rounded-md bg-[#131024] py-2 px-4 text-light text-[0.85rem] flex items-center justify-between mt-4'>
                            <div className='flex gap-2 xl:gap-0 items-center'>
                                <div className='xl:hidden cursor-pointer' onClick={() => { setToggle('profile'); setUrlState(false); setSlideShow(false); setToggleExtra('')}}>
                                    <img src={`${imageurl}/profiles/${user.image}`} className='w-10 h-10 object-cover rounded-full border border-light'></img>
                                </div>
                                <div className='capitalize font-medium'>
                                    hi, <span> {user.username}</span>
                                </div>
                            </div>
                            {loading ?
                                <div className='relative animate-pulse'>
                                    <div className='rounded-full bg-slate-300 w-9 h-9'></div>
                                    <div className='rounded-full w-5 h-[1.2rem] absolute -top-2 -right-1 bg-slate-300 border'></div>
                                </div>
                                :
                                <div>
                                    <Notifications
                                        refetchNotifications={() => FetchNotifications()}
                                        refetchUnreadNotis={() => FetchUnreadNotis()}
                                        setToggle={setToggle}
                                        setUrlState={setUrlState}
                                    />
                                </div>}
                        </div>
                        <div className='flex gap-1.5 capitalize items-center text-[grey] md:text-[0.85rem] text-xs font-bold'>
                            <span>dashboard</span>
                            {toggle !== '' && <FaAngleRight className='text-[0.6rem]' />}
                            <span>{toggle}</span>
                            {toggleExtra !== '' && <FaAngleRight className='text-[0.6rem]' />}
                            <span>{toggleExtra}</span>
                        </div>
                    </div>
                    {loading ?
                        <div className='pt-10 lg:pb-10 pb-20 h-fit z-10'>
                            <div className='font-bold md:text-2xl text-lg text-[grey] '>please wait...</div>
                            <div className='flex flex-wrap gap-4 mt-8 items-center justify-center animate-pulse'>
                                <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] bg-slate-300 '></div>
                                <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] bg-slate-300 '></div>
                                <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] bg-slate-300 '></div>
                                <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] bg-slate-300 '></div>
                                <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] bg-slate-300 '></div>
                                <div className='w-[9.8rem] md:w-[15.5rem] md:h-[10rem] h-[8.5rem] rounded-[10px] bg-slate-300 '></div>
                            </div>
                            <div className='mt-12 h-16 md:w-96 w-3/4 bg-slate-300 animate-pulse rounded-sm'></div>
                        </div>
                        :
                        <>
                            {AllLinks.map((item, i) => (
                                <div key={i}>
                                    {toggle === item.path && toggleExtra === '' && <item.component
                                        setToggle={setToggle}
                                        setToggleExtra={setToggleExtra}
                                        refetchDeposits={() => FetchDeposits()}
                                        refetchInvestments={() => FetchInvestment()}
                                        refetchWithdrawals={() => FetchWithdrawals()}
                                        refetchInvestmentsUnclaim={() => FetchInvestmentUnclaim()}
                                        refetchNotifications={() => FetchNotifications()}
                                        refetchUnreadNotis={() => FetchUnreadNotis()}
                                        refetchWallet={() => FetchWallet()}
                                        refetchUps={FetchUps}
                                        urlState={urlState}
                                    />}
                                </div>
                            ))}
                            {ExtraLinks.map((item, i) => (
                                <div key={i}>
                                    {toggleExtra === item.path && <item.component
                                        setToggleExtra={setToggleExtra}
                                    />}
                                </div>
                            ))}
                        </>
                    }
                </div>
                <div className='bg-[#131024] w-full h-14 fixed bottom-0 left-0 z-30 lg:hidden px-2'>
                    <div className='grid grid-cols-5 items-center h-full w-full'>
                        {MainLinks.map((item, i) => (
                            <div key={i} onClick={() => { setUrlState(false); setSlideShow(false); setToggle(item.path); setToggleExtra('') }}>
                                <div className={`flex flex-col gap-1 items-center cursor-pointer  ${toggle === item.path ? 'text-light' : ' text-semi-white'}`} >
                                    <item.icon className='md:text-xl text-lg ' />
                                    <div className='capitalize md:text-xs text-[0.7rem] font-medium'>{item.path}</div>
                                </div>
                            </div>
                        ))}
                        <div className={`flex flex-col gap-1 items-center justify-center rounded-full cursor-pointer  ${!toggleArray.includes(toggle) ? 'text-light' : 'text-white'} `} onClick={() => { setSlideShow(!slideShow) }}>
                            <HiOutlineDotsVertical className={`md:text-xl text-lg`} />
                            <div className='capitalize md:text-xs text-[0.7rem] font-medium'>more</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[18%] h-screen overflow-hidden bg-admin fixed top-0 right-0 hidden xl:block'>
                <div className='w-[80%] mx-auto flex flex-col gap-12 justify-center mt-20'>
                    <div className=' text-semi-white text-[1.1rem] text-center font-bold capitalize'>trader profile</div>
                    <div className='flex gap-4 flex-col items-center font-bold capitalize'>
                        <img src={`${imageurl}/profiles/${user.image}`} className='w-16 h-16 object-cover rounded-full border-2 border-light'></img>
                        <div className='flex gap-1'>
                            <div className='text-semi-white '>{user.username}</div>
                            {user.email_verified === 'true' && <MdVerified className='text-[0.7rem] text-light border-light' />}
                        </div>
                        <div className='text-[grey] text-[0.8rem] font-medium lowercase -mt-2 '>{user.email}</div>
                        <div onClick={() => setToggle('profile')} className=' cursor-pointer text-[0.85rem] text-light border-light mt-2'>edit profile</div>
                    </div>
                    <div className='flex flex-col text-xs gap-4 capitalize font-bold text-[grey]'>
                        <div className='text-semi-white text-[0.85rem]'>account</div>
                        <div className='flex justify-between'>
                            <div>joined</div>
                            <div>{moment(user.createdAt).format('DD/MM/yyyy')}</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>assets value</div>
                            <div>${wallet.balance}</div>
                        </div>
                    </div>
                    <div className='w-full h-14 rounded-[3px] bg-semi-white mt-8 capitalize font-bold flex items-center justify-center gap-2 cursor-pointer' onClick={() => setToggle('investment')}>
                        <LuArrowDownUp />
                        <div>trade now</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard