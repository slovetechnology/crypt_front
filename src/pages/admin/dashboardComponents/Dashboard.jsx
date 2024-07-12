import React, { useCallback, useEffect, useState } from 'react'
import logo from '../../../assets/images/logobrand.png'
import { GrMoney } from "react-icons/gr";
import { IoWalletOutline } from "react-icons/io5";
import { GiPayMoney } from "react-icons/gi";
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
import { CookieName} from '../../../utils/utils';
import { TiCancel } from "react-icons/ti";
import { IoMdLogOut } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdPayment } from "react-icons/md";
import Investment from './Investment';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Feedback from './Feedback';
import VerifyAcount from './VerifyAcount';
import Notifications from './Notifications';



const Dashboard = () => {
    const [logout, setLogOut] = useState(false)
    const [toggle, setToggle] = useState('wallet')
    const [user] = useAtom(PROFILE)
    const [, setDeposits] = useAtom(DEPOSITS)
    const [, setInvestment] = useAtom(INVESTMENTS)
    const [, setInvestUnclaim] = useAtom(INVESTMENTUNCLAIM)
    const [notifications, setNotifications] = useAtom(NOTIFICATIONS)
    const [, setUnreadNotis] = useAtom(UNREADNOTIS)
    const [, setWithdrawals] = useAtom(WITHDRAWALS)
    const [wallet, setWallet] = useAtom(WALLET)
    const [, setUps] = useAtom(UPS)
    const [urlState, setUrlState] = useState(false)
    const [purchaseState, setPurchaseState] = useState(false)
    const [loading, setLoading] = useState(true)
    const [altnotis, setAltNotis] = useState([])
    const [pagelengthend, setPagelengthend] = useState(notifications.length / 4)
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
                setAltNotis(response.msg)
                setPagelengthend(response.msg.length / 4)
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
        <div className='flex'>
            <div className={`bg-[#27137eee] lg:bg-admin w-full xl:w-[20%] lg:w-[25%] lg:block lg:relative overflow-hidden ${slideShow ? 'block fixed top-0 left-0 h-full z-50' : 'hidden'} `}>
                <div className={`xl:w-[20%] lg:w-[25%] lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:bg-admin`}>
                    <div className='text-white text-3xl cursor-pointer lg:hidden absolute top-6 right-4' onClick={() => setSlideShow(!slideShow)}>
                        <LuX />
                    </div>
                    <div className='flex justify-center mt-14 items-center'>
                        <img src={logo} className='w-[3rem] h-auto'></img>
                        <div className=' capitalize font-bold text-sha2 lg:text-[1.3rem] text-[1.5rem]'>AialgoVault</div>
                    </div>
                    <div className='flex flex-col gap-8 mt-10 pl-12 '>
                        <div className='flex gap-4 flex-col lg:text-[grey] text-semi-white'>
                            <div className=' text-[0.65rem] uppercase lg:text-[#797878] text-[#c5c4c4]'>main</div>
                            <div className={`flex gap-3 lg:hover:text-white hover:text-admin items-center cursor-pointer w-fit lg:w-full ${toggle === 'wallet' ? 'lg:border-r-[3px] lg:rounded-sm lg:border-light' : ''}`} onClick={() => { setToggle('wallet'); setUrlState(false); setPurchaseState(false); setSlideShow(false) }}>
                                <IoWalletOutline className='text-[1.3rem] ' />
                                <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>wallet</div>
                            </div>
                        </div>
                        <div className='flex gap-4 flex-col lg:text-[grey] text-semi-white'>
                            <div className=' text-[0.65rem] uppercase lg:text-[#797878] text-[#c5c4c4]'>account</div>
                            <div className='flex flex-col gap-[2rem]'>
                                <div className={`flex gap-3 lg:hover:text-white hover:text-admin  items-center cursor-pointer w-fit lg:w-full ${toggle === 'my investment' ? 'lg:border-r-[3px] lg:rounded-sm lg:border-light' : ''}`} onClick={() => { setToggle('my investment'); setUrlState(false); setPurchaseState(false); setSlideShow(false) }}>
                                    <GrMoney className='text-[1.3rem] ' />
                                    <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>my investment</div>
                                </div>
                                <div className={`flex gap-3 lg:hover:text-white hover:text-admin items-center cursor-pointer w-fit lg:w-full relative ${toggle === 'deposit' ? 'lg:border-r-[3px] lg:rounded-sm lg:border-light' : ''}`} onClick={() => { setToggle('deposit'); setUrlState(false); setPurchaseState(false); setSlideShow(false) }}>
                                    <MdPayment className='text-[1.3rem] ' />
                                    <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>deposit</div>
                                </div>
                                <div className={`flex gap-3 lg:hover:text-white hover:text-admin items-center cursor-pointer w-fit lg:w-full ${toggle === 'withdrawal' ? 'lg:border-r-[3px] lg:rounded-sm lg:border-light' : ''}`} onClick={() => { setToggle('withdrawal'); setUrlState(false); setPurchaseState(false); setSlideShow(false) }}>
                                    <BiMoneyWithdraw className='text-[1.3rem] ' />
                                    <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>withdrawal</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 flex-col lg:text-[grey] text-semi-white'>
                            <div className=' text-[0.65rem] uppercase lg:text-[#797878] text-[#c5c4c4]'>others</div>
                            <div className='flex flex-col gap-[2rem]'>
                                <div className={`flex gap-3 lg:hover:text-white hover:text-admin items-center cursor-pointer w-fit lg:w-full ${toggle === 'update profile' ? 'lg:border-r-[3px] lg:rounded-sm lg:border-light' : ''}`} onClick={() => { setToggle('update profile'); setUrlState(false); setPurchaseState(false); setSlideShow(false) }}>
                                    <RiAccountPinCircleLine className='text-[1.3rem] ' />
                                    <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>update profile</div>
                                </div>
                                <div className={`flex gap-3 lg:hover:text-white hover:text-admin items-center cursor-pointer w-fit lg:w-full ${toggle === 'send feedback' ? 'lg:border-r-[3px] lg:rounded-sm lg:border-light' : ''}`} onClick={() => { setToggle('send feedback'); setUrlState(false); setPurchaseState(false); setSlideShow(false) }}>
                                    <LuSend className='text-[1.3rem] ' />
                                    <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>send feedback</div>
                                </div>
                                <div className='relative'>
                                    <div className='flex gap-3 lg:hover:text-white hover:text-admin items-center cursor-pointer w-fit lg:w-full' onClick={() => setLogOut(!logout)}>
                                        <BiLogOutCircle className='text-[1.3rem] ' />
                                        <div className='capitalize text-[0.85rem] lg:font-bold font-medium hover:font-bold'>logout</div>
                                    </div>
                                    {logout && <div className='absolute -top-5 -left-4 lg:right-0  lg:bg-admin bg-[#27137e] w-fit h-fit z-50 rounded-[10px] text-[#e0dfdf] font-medium p-4 lg:shadow-logout-sha shadow-logout-sha2'>
                                        <div className=' text-[0.8rem] mb-[1rem] text-center'>Logout of your account?</div>
                                        <div className='flex gap-[1rem] items-center'>
                                            <button className='outline-none py-[0.25rem] px-[1rem] w-fit h-fit border lg:border-[#1c1733] border-white rounded-lg capitalize text-[0.75rem] flex items-center gap-1 lg:hover:bg-[#1c1733] hover:bg-white lg:text-light text-white hover:text-[#27137e] lg:hover:text-white' onClick={() => setLogOut(!logout)}>
                                                <span>cancel</span>
                                                <TiCancel className='text-[0.8rem] ' />
                                            </button>
                                            <button className='outline-none py-[0.25rem] px-[1rem] w-fit h-fit border lg:border-[#1c1733] border-white  rounded-lg capitalize text-[0.75rem] flex items-center gap-1 lg:hover:bg-[#1c1733] hover:bg-white lg:text-light text-white hover:text-[#27137e] lg:hover:text-white' onClick={logoutAccount}>
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
            <div className='xl:w-[62%] lg:w-[75%] bg-[#0c091a] w-full'>
                <div className='md:w-[94%] w-11/12 mx-auto'>
                    <div className='flex flex-col gap-4'>
                        <div className='w-full h-fit rounded-md bg-[#131024] py-2 px-4 text-[#584f81] text-[0.85rem] flex items-center justify-between mt-4'>
                            <div className='flex gap-2 items-center'>
                                <div className='lg:hidden cursor-pointer' onClick={() => { setToggle('update profile'); setUrlState(false); setPurchaseState(false); setSlideShow(false) }}>
                                    <img src={`${imageurl}/profiles/${user.image}`} className='w-10 h-10 object-cover rounded-full border border-light'></img>
                                </div>
                                <div className='capitalize font-bold'>
                                    hi, <span> {user.username}!</span>
                                </div>
                            </div>
                            {loading ?
                                <div className='relative animate-pulse'>
                                    <div className='rounded-full bg-slate-300 w-[2.2rem] h-[2.2rem]'></div>
                                    <div className='rounded-full w-[1.25rem] h-[1.2rem] absolute top-[-0.5rem] right-[-0.3rem] bg-slate-300 border'></div>
                                </div>
                                :
                                <div>
                                    <Notifications
                                        altnotis={altnotis}
                                        setAltNotis={setAltNotis}
                                        refetchNotifications={() => FetchNotifications()}
                                        refetchUnreadNotis={() => FetchUnreadNotis()}
                                        setToggle={setToggle}
                                        setUrlState={setUrlState}
                                        pagelengthend={pagelengthend}
                                        setPagelengthend={setPagelengthend}
                                    />
                                </div>}
                        </div>
                        <div className='flex gap-2 capitalize items-center text-[grey] text-[0.85rem] font-bold'>
                            <div>dashboard</div>
                            <FaAngleRight className='text-[0.6rem]' />
                            <div>{toggle}</div>
                        </div>
                    </div>
                    {loading ?
                        <div className='py-10 h-fit z-10'>
                            <div className='font-bold text-[1.5rem] text-[grey] '>please wait...</div>
                            <div className='flex flex-wrap gap-4 mt-[2rem] items-center justify-center animate-pulse'>
                                <div className='w-[15.5rem] h-[10rem] rounded-[10px] bg-slate-300 '></div>
                                <div className='w-[15.5rem] h-[10rem] rounded-[10px] bg-slate-300 '></div>
                                <div className='w-[15.5rem] h-[10rem] rounded-[10px] bg-slate-300 '></div>
                                <div className='w-[15.5rem] h-[10rem] rounded-[10px] bg-slate-300 '></div>
                                <div className='w-[15.5rem] h-[10rem] rounded-[10px] bg-slate-300 '></div>
                                <div className='w-[15.5rem] h-[10rem] rounded-[10px] bg-slate-300 '></div>
                            </div>
                            <div className='mt-12 h-[4rem] w-[25rem] bg-slate-300 animate-pulse rounded-sm'></div>
                        </div>
                        :
                        <>
                            <div>
                                {toggle === 'wallet' && <Wallet
                                    setToggle={setToggle}
                                    setPurchaseState={setPurchaseState}
                                />}
                                {toggle === 'update profile' && <Profile
                                    setToggle={setToggle}
                                    slideShow={slideShow}
                                />}
                                {toggle === 'my investment' && <Investment
                                    setToggle={setToggle}
                                    refetchInvestments={() => FetchInvestment()}
                                    refetchInvestmentsUnclaim={() => FetchInvestmentUnclaim()}
                                    refetchNotifications={() => FetchNotifications()}
                                    refetchUnreadNotis={() => FetchUnreadNotis()}
                                    refetchWallet={() => FetchWallet()}
                                    refetchUps={() => FetchUps()}
                                />}
                                {toggle === 'deposit' && <Deposit
                                    setToggle={setToggle}
                                    refetchDeposits={() => FetchDeposits()}
                                    refetchInvestments={() => FetchInvestment()}
                                    refetchInvestmentsUnclaim={() => FetchInvestmentUnclaim()}
                                    refetchNotifications={() => FetchNotifications()}
                                    refetchUnreadNotis={() => FetchUnreadNotis()}
                                    refetchWallet={() => FetchWallet()}
                                    urlState={urlState}
                                    purchaseState={purchaseState}
                                />}
                                {toggle === 'withdrawal' && <Withdraw
                                    setToggle={setToggle}
                                    refetchWithdrawals={() => FetchWithdrawals()}
                                    refetchNotifications={() => FetchNotifications()}
                                    refetchUnreadNotis={() => FetchUnreadNotis()}
                                    refetchWallet={() => FetchWallet()}
                                    urlState={urlState}
                                />}
                                {toggle === 'send feedback' && <Feedback />}
                                {toggle === 'verify account' && <VerifyAcount
                                    setToggle={setToggle}
                                    slideShow={slideShow}
                                />}
                            </div>
                        </>
                    }
                </div>
                <div className='bg-[#131024] w-full h-14 fixed bottom-0 left-0 z-30 lg:hidden px-2'>
                    <div className='grid grid-cols-5 items-center h-full w-full'>
                        <div className={`flex flex-col gap-1 items-center cursor-pointer  ${toggle === 'wallet' ? 'text-light' : ' text-semi-white'}`} onClick={() => { setToggle('wallet'); setUrlState(false); setPurchaseState(false); setSlideShow(false) }}>
                            <IoWalletOutline className='md:text-xl text-lg ' />
                            <div className='capitalize md:text-xs text-[0.7rem] font-medium'>wallet</div>
                        </div>
                        <div className={`flex flex-col gap-1 items-center cursor-pointer  ${toggle === 'my investment' ? 'text-light' : ' text-semi-white'}`} onClick={() => { setToggle('my investment'); setUrlState(false); setPurchaseState(false); setSlideShow(false) }}>
                            <GrMoney className='md:text-xl text-lg ' />
                            <div className='capitalize md:text-xs text-[0.7rem] font-medium'>investment</div>
                        </div>
                        <div className={`flex flex-col gap-1 items-center cursor-pointer  ${toggle === 'deposit' ? 'text-light' : ' text-semi-white'}`} onClick={() => { setToggle('deposit'); setUrlState(false); setPurchaseState(false); setSlideShow(false) }}>
                            <MdPayment className='md:text-xl text-lg ' />
                            <div className='capitalize md:text-xs text-[0.7rem] font-medium'>deposit</div>
                        </div>
                        <div className={`flex flex-col gap-1 items-center cursor-pointer  ${toggle === 'withdrawal' ? 'text-light' : ' text-semi-white'}`} onClick={() => { setToggle('withdrawal'); setUrlState(false); setPurchaseState(false); setSlideShow(false) }}>
                            <BiMoneyWithdraw className='md:text-xl text-lg ' />
                            <div className='capitalize md:text-xs text-[0.7rem] font-medium'>withdrawal</div>
                        </div>
                        <div className={`flex flex-col gap-1 items-center justify-center rounded-full cursor-pointer text-white `} onClick={() => { setSlideShow(!slideShow) }}>
                            <HiOutlineDotsVertical className={`md:text-xl text-lg`} />
                            <div className='capitalize md:text-xs text-[0.7rem] font-medium'>more</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[18%] h-screen overflow-hidden bg-admin fixed top-0 right-0 hidden xl:block'>
                <div className='w-[80%] mx-auto flex flex-col gap-[3rem] justify-center mt-[5rem]'>
                    <div className=' text-[#e0dfdf] text-[1.1rem] text-center font-bold capitalize'>trader profile</div>
                    <div className='flex gap-4 flex-col items-center font-bold capitalize'>
                        <img src={`${imageurl}/profiles/${user.image}`} className='w-[4rem] h-[4rem] object-cover rounded-full border-2 border-light'></img>
                        <div className='flex gap-1'>
                            <div className='text-[#e0dfdf] '>{user.username}</div>
                            {user.email_verified === 'true' && <MdVerified className='text-[0.7rem] text-light border-light' />}

                        </div>
                        <div className='text-[grey] text-[0.8rem] font-[550] lowercase mt-[-0.5rem] '>{user.email}</div>
                        <div onClick={() => setToggle('update profile')} className=' cursor-pointer text-[0.85rem] text-light border-light mt-[0.5rem]'>edit profile</div>
                    </div>
                    <div className='flex flex-col text-[0.75rem] gap-4 capitalize font-bold text-[grey]'>
                        <div className='text-[#e0dfdf] text-[0.85rem]'>account</div>
                        <div className='flex justify-between'>
                            <div>joined</div>
                            <div>{moment(user.createdAt).format('DD/MM/yyyy')}</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>assets value</div>
                            <div>${wallet.balance}</div>
                        </div>
                    </div>
                    <div className='w-full h-14 rounded-[3px] bg-[#e0dfdf] mt-[2rem] capitalize font-bold flex items-center justify-center gap-2 cursor-pointer' onClick={() => setToggle('my investment')}>
                        <LuArrowDownUp />
                        <div>trade now</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard