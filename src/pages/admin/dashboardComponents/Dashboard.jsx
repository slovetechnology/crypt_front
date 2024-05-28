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
    const [, setNotifications] = useAtom(NOTIFICATIONS)
    const [, setUnreadNotis] = useAtom(UNREADNOTIS)
    const [, setWithdrawals] = useAtom(WITHDRAWALS)
    const [wallet, setWallet] = useAtom(WALLET)
    const [, setUps] = useAtom(UPS)
    const [urlState, setUrlState] = useState(false)
    const [purchaseState, setPurchaseState] = useState(false)
    const [loading, setLoading] = useState(true)
    const [altnotis, setAltNotis] = useState([])
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
        <div className=' w-full flex'>
            <div className='w-[20%] bg-[#0E0B1C]'>
                <div className='w-[20%] fixed top-0 left-0 h-screen overflow-hidden'>
                    <div className='flex justify-center mt-[3.5rem] items-center'>
                        <img src={logo} className='w-[3rem] h-auto'></img>
                        <div className=' capitalize font-bold text-sha2 text-[1.3rem]'>AialgoVault</div>
                    </div>
                    <div className='flex flex-col gap-[2rem]  mt-[2.5rem] pl-[3rem]'>
                        <div className='flex gap-4 flex-col'>
                            <div className='text-[grey] text-[0.65rem] uppercase'>main</div>
                            <div className={`flex gap-3 hover:text-[white] text-[grey] items-center cursor-pointer ${toggle === 'wallet' ? 'border-r-[3px] rounded-sm border-[#7665D5]' : ''}`} onClick={() => { setToggle('wallet'); setUrlState(false); setPurchaseState(false) }}>
                                <IoWalletOutline className='text-[1.3rem] ' />
                                <div className='capitalize text-[0.85rem] font-[800]'>wallet</div>
                            </div>
                        </div>
                        <div className='flex gap-4 flex-col'>
                            <div className='text-[grey] text-[0.65rem] uppercase'>account</div>
                            <div className='flex flex-col gap-[2rem]'>
                                <div className={`flex gap-3 hover:text-[white] text-[grey] items-center cursor-pointer ${toggle === 'my investment' ? 'border-r-[3px] rounded-sm border-[#7665D5]' : ''}`} onClick={() => { setToggle('my investment'); setUrlState(false); setPurchaseState(false) }}>
                                    <GrMoney className='text-[1.3rem] ' />
                                    <div className='capitalize text-[0.85rem] font-[800]'>my investment</div>
                                </div>
                                <div className={`flex gap-3 hover:text-[white] text-[grey] items-center cursor-pointer relative ${toggle === 'deposit' ? 'border-r-[3px] rounded-sm border-[#7665D5]' : ''}`} onClick={() => { setToggle('deposit'); setUrlState(false); setPurchaseState(false) }}>
                                    <GiPayMoney className='text-[1.3rem] ' />
                                    <div className='capitalize text-[0.85rem] font-[800]'>deposit</div>
                                </div>
                                <div className={`flex gap-3 hover:text-[white] text-[grey] items-center cursor-pointer ${toggle === 'withdrawal' ? 'border-r-[3px] rounded-sm border-[#7665D5]' : ''}`} onClick={() => { setToggle('withdrawal'); setUrlState(false); setPurchaseState(false) }}>
                                    <BiMoneyWithdraw className='text-[1.3rem] ' />
                                    <div className='capitalize text-[0.85rem] font-[800]'>withdrawal</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 flex-col'>
                            <div className='text-[grey] text-[0.65rem] uppercase'>others</div>
                            <div className='flex flex-col gap-[2rem]'>
                                <div className={`flex gap-3 hover:text-[white] text-[grey] items-center cursor-pointer ${toggle === 'update profile' ? 'border-r-[3px] rounded-sm border-[#7665D5]' : ''}`} onClick={() => { setToggle('update profile'); setUrlState(false); setPurchaseState(false) }}>
                                    <RiAccountPinCircleLine className='text-[1.3rem] ' />
                                    <div className='capitalize text-[0.85rem] font-[800]'>update profile</div>
                                </div>
                                <div className={`flex gap-3 hover:text-[white] text-[grey] items-center cursor-pointer ${toggle === 'send feedback' ? 'border-r-[3px] rounded-sm border-[#7665D5]' : ''}`} onClick={() => { setToggle('send feedback'); setUrlState(false); setPurchaseState(false) }}>
                                    <LuSend className='text-[1.3rem] ' />
                                    <div className='capitalize text-[0.85rem] font-[800]'>send feedback</div>
                                </div>
                                <div className='relative'>
                                    <div className='flex gap-3 hover:text-[white] text-[grey] items-center cursor-pointer' onClick={() => setLogOut(!logout)}>
                                        <BiLogOutCircle className='text-[1.3rem] ' />
                                        <div className='capitalize text-[0.85rem] font-[800]'>logout</div>
                                    </div>
                                    {logout && <div className='absolute top-[-1.8rem] right-4 bg-[#0E0B1C] w-fit   h-fit z-10 rounded-[10px] text-[#e0dfdf] font-bold p-[1rem] shlz'>
                                        <div className=' text-[0.8rem] mb-[1rem] text-center'>Logout of your account?</div>
                                        <div className='flex gap-[1rem] items-center'>
                                            <button className='outline-none py-[0.25rem] px-[1rem] w-fit h-fit border border-[#1c1733] rounded-lg capitalize text-[0.75rem] flex items-center gap-1 hover:bg-[#1c1733]' onClick={() => setLogOut(!logout)}>
                                                <span>cancel</span>
                                                <TiCancel className='text-[0.8rem] text-[#7665D5]' />
                                            </button>
                                            <button className='outline-none py-[0.25rem] px-[1rem] w-fit h-fit border border-[#1c1733]  rounded-lg capitalize text-[0.75rem] flex items-center gap-1 hover:bg-[#1c1733]' onClick={logoutAccount}>
                                                <span>logout</span>
                                                <IoMdLogOut className='text-[0.7rem] text-[#7665D5]' />
                                            </button>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[62%] bg-[#0C091A]'>
                <div className='w-[94%] mx-auto'>
                    <div className='flex flex-col gap-[1rem]'>
                        <div className='w-full h-[3rem] rounded-md bg-[#131024] mt-4 px-[1rem] text-[#584f81] text-[0.85rem] font-bold flex items-center justify-between'>
                            <div className='flex items-center gap-1 capitalize'>
                                <div>hello,</div>
                                <div>{user.username}!</div>
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
                                        setUrlState={setUrlState} />
                                </div>}
                        </div>
                        <div className='flex gap-2 capitalize items-center text-[grey] text-[0.85rem] font-bold'>
                            <div>dashboard</div>
                            <FaAngleRight className='text-[0.6rem]' />
                            <div>{toggle}</div>
                        </div>
                    </div>
                    {loading ? <div className='py-[2.5rem] h-fit z-10'>
                        <div className='font-bold text-[1.5rem] text-[grey] '>please wait...</div>
                        <div className='flex flex-wrap gap-4 mt-[2rem] items-center justify-center animate-pulse'>
                            <div className='w-[15.5rem] h-[10rem] rounded-[10px] bg-slate-300 '></div>
                            <div className='w-[15.5rem] h-[10rem] rounded-[10px] bg-slate-300 '></div>
                            <div className='w-[15.5rem] h-[10rem] rounded-[10px] bg-slate-300 '></div>
                            <div className='w-[15.5rem] h-[10rem] rounded-[10px] bg-slate-300 '></div>
                            <div className='w-[15.5rem] h-[10rem] rounded-[10px] bg-slate-300 '></div>
                            <div className='w-[15.5rem] h-[10rem] rounded-[10px] bg-slate-300 '></div>
                        </div>
                        <div className='mt-[3rem] h-[4rem] w-[25rem] bg-slate-300 animate-pulse rounded-sm'></div>
                    </div>
                        :
                        <div>
                            {toggle === 'wallet' && <Wallet
                                setToggle={setToggle}
                                setPurchaseState={setPurchaseState}
                            />
                            }
                            {toggle === 'update profile' && <Profile
                                setToggle={setToggle}
                            />
                            }
                            {toggle === 'my investment' && <Investment
                                setToggle={setToggle}
                                refetchInvestments={() => FetchInvestment()}
                                refetchInvestmentsUnclaim={() => FetchInvestmentUnclaim()}
                                refetchNotifications={() => FetchNotifications()}
                                refetchUnreadNotis={() => FetchUnreadNotis()}
                                refetchWallet={() => FetchWallet()}
                                refetchUps={() => FetchUps()}
                            />
                            }
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
                            />
                            }
                            {toggle === 'withdrawal' && <Withdraw
                                setToggle={setToggle}
                                refetchWithdrawals={() => FetchWithdrawals()}
                                refetchNotifications={() => FetchNotifications()}
                                refetchUnreadNotis={() => FetchUnreadNotis()}
                                refetchWallet={() => FetchWallet()}
                                urlState={urlState}
                            />
                            }
                            {toggle === 'send feedback' && <Feedback
                            />
                            }
                            {toggle === 'verify account' && <VerifyAcount
                                setToggle={setToggle}
                            />
                            }
                        </div>}
                </div>
            </div>
            <div className='w-[18%] h-screen overflow-hidden bg-[#0E0B1C] fixed top-0 right-0 '>
                <div className='w-[80%] mx-auto flex flex-col gap-[3rem] justify-center mt-[5rem]'>
                    <div className=' text-[#e0dfdf] text-[1.1rem] text-center font-bold capitalize'>trader profile</div>
                    <div className='flex gap-4 flex-col items-center font-bold capitalize'>
                        <img src={`${imageurl}/profiles/${user.image}`} className='w-[4rem] h-[4rem] object-cover rounded-[50%] border-2 border-[#7665D5]'></img>
                        <div className='flex gap-1'>
                            <div className='text-[#e0dfdf] '>{user.username}</div>
                            {user.email_verified === 'true' && <MdVerified className='text-[0.7rem] text-[#7665D5]' />}

                        </div>
                        <div className='text-[grey] text-[0.8rem] font-[550] lowercase mt-[-0.5rem] '>{user.email}</div>
                        <div onClick={() => setToggle('update profile')} className=' cursor-pointer text-[0.85rem] text-[#7665D5] mt-[0.5rem]'>edit profile</div>
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
                    <div className='w-full h-[3.5rem] rounded-[3px] bg-[#e0dfdf] mt-[2rem] capitalize font-bold flex items-center justify-center gap-2 cursor-pointer' onClick={() => setToggle('my investment')}>
                        <LuArrowDownUp />
                        <div>trade now</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard