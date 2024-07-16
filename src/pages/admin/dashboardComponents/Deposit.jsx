import React, { useState } from 'react'
import { IoCheckbox } from 'react-icons/io5';
import { MdContentCopy } from "react-icons/md";
import { RiHistoryFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoIosSearch, IoMdArrowBack } from "react-icons/io";
import { useAtom } from 'jotai';
import { DEPOSITS, PROFILE, WALLET } from '../../../store';
import LoadingAdmin from '../../../PageComponents/LoadingAdmin';
import { Apis, PostApi } from '../../../services/API';
import { Alert, MoveToTopDivs } from '../../../utils/utils';
import moment from 'moment';
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp, FaCheck, FaRegCopyright, FaRegRectangleXmark } from 'react-icons/fa6';
import { FiX } from "react-icons/fi";
import { supportedCoins, tradingPlans } from '../../../services/Miscellaneous';
import nothnyet from '../../../assets/images/nothn.png'
import Loading from '../../../PageComponents/Loading';


const Deposit = ({ setToggle, refetchDeposits, refetchInvestments, refetchNotifications, refetchUnreadNotis, urlState, refetchWallet, refetchInvestmentsUnclaim, purchaseState }) => {
    const [fromAtom] = useAtom(DEPOSITS)
    const [userDeposits, setUserDeposits] = useState(fromAtom)
    const [userwallet] = useAtom(WALLET)
    const [user] = useAtom(PROFILE)

    const [copy, setCopy] = useState(false)
    const [plan, setplan] = useState('')
    const [amount, setAmount] = useState('')
    const [check, setCheck] = useState('')
    const [checkError, setCheckError] = useState(false)
    const [amountError, setAmountError] = useState(false)
    const [selectState, setSelectState] = useState(false)
    const [selectValue, setSelectValue] = useState('')
    const [selectError, setSelectError] = useState(false)
    const [network, setNetwork] = useState('')
    const [address, setAddress] = useState('')
    const [screen, setScreen] = useState(urlState ? 2 : 1)
    const [depositScreen, setDepositScreen] = useState(purchaseState ? 2 : 1)
    const [deposit, setDeposit] = useState('deposit')
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [write, setWrite] = useState(false)
    const [buybal, setBuyBal] = useState({})
    const [modal, setModal] = useState(false)
    const [balanceError, setBalanceError] = useState(false)
    const [limitError, setLimitError] = useState(false)
    const [loadingtwo, setLoadingTwo] = useState(false)


    const handleAmount = () => {
        if (amount < 20) return setplan('amount too low')
        if (amount <= 99) return setplan('test run')
        if (amount <= 499) return setplan('starter plan')
        if (amount <= 999) return setplan('business plan')
        if (amount <= 1499) return setplan('premium plan')
        if (amount <= 2999) return setplan('pro plan')
        if (amount >= 3000) return setplan('diamond plan')
    }


    const createDeposit = async () => {
        setTimeout(() => {
            setAmountError(false)
            setCheckError(false)
            setSelectError(false)
        }, 1000)
        if (!amount) return setAmountError(true)
        if (amount < 20) return setAmountError(true)
        if (selectValue === '') return setSelectError(true)
        if (!check) return setCheckError(true)

        const formbody = {
            amount: parseFloat(amount),
            trading_plan: plan,
            crypto: selectValue,
            from: 'external source',
            deposituser: user.username
        }

        setLoading(true)

        try {
            const response = await PostApi(Apis.deposit.create_deposit, formbody)
            if (response.status === 200) {
                setUserDeposits(response.msg)
                Alert('Request Successful', `Deposit successful`, 'success')
                setScreen(2)
                setAmount('')
                setCheck(!check)
                setSelectValue('')
                setNetwork('')
                setAddress('')
                setDeposit('deposit history')
                refetchDeposits()
                refetchInvestments()
                refetchInvestmentsUnclaim()
                refetchNotifications()
                refetchWallet()
                refetchUnreadNotis()
                setPagelengthend(response.msg.length / 6)
                setPagelengthstart(1)
                setStart(0)
                setEnd(6)
            } else {
                Alert('Request Failed', `${response.msg}`, 'error')
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }

    }

    const BuyPlanWithBalance = async () => {
        setTimeout(() => {
            setLimitError(false)
            setBalanceError(false)
            setAmountError(false)
        }, 1000)


        if (!amount) return setAmountError(true)
        if (amount < buybal.price_start) return setLimitError(true)
        if (amount > buybal.price_limit) return setLimitError(true)
        if (amount > userwallet.balance) return setBalanceError(true)

        setLoadingTwo(true)

        const formbody = {
            amount: parseFloat(amount),
            trading_plan: buybal.title,
            crypto: 'usdt',
            from: 'wallet balance',
            deposituser: user.username
        }

        try {
            const response = await PostApi(Apis.deposit.create_deposit, formbody)
            if (response.status === 200) {
                Alert('Request Successful', `Investment successful`, 'success')
                setModal(false)
                setAmount('')
                refetchDeposits()
                refetchInvestments()
                refetchInvestmentsUnclaim()
                refetchNotifications()
                refetchUnreadNotis()
                refetchWallet()
                setToggle('my investment')
            } else {
                Alert('Request Failed', `${response.msg}`, 'error')
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoadingTwo(false)
        }

    }

    const copyFunction = () => {
        setTimeout(() => {
            setCopy(false)
        }, 2000)
        navigator.clipboard.writeText(address)
        setCopy(true)
    }

    const HandleSearch = () => {

        if (!search) {
            setWrite(false)
            setUserDeposits(fromAtom)
            setPagelengthend(fromAtom.length / 6)
            setPagelengthstart(1)
            setStart(0)
            setEnd(6)
        }
        else {
            setWrite(true)
            const showSearch = userDeposits.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.trading_plan.includes(search.toLowerCase()) || item.crypto.includes(search.toLowerCase()) || item.deposit_status.includes(search.toLowerCase()))
            setUserDeposits(showSearch)
            setPagelengthend(showSearch.length / 6)
            setPagelengthstart(1)
            setStart(0)
            setEnd(6)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setWrite(false)
        setUserDeposits(fromAtom)
        setPagelengthend(fromAtom.length / 6)
        setPagelengthstart(1)
        setStart(0)
        setEnd(6)
    }

    //
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [pagelengthstart, setPagelengthstart] = useState(1)
    const [pagelengthend, setPagelengthend] = useState(userDeposits.length / end)

    let MovePage = () => {

        if (end < userDeposits.length) {
            let altstart = start
            let altend = end
            let altlengthstart = pagelengthstart

            altend += 6
            setEnd(altend)

            altstart += 6
            setStart(altstart)

            altlengthstart += 1
            setPagelengthstart(altlengthstart)
        }
    }

    let BackPage = () => {

        if (end > 6) {
            let altstart = start
            let altend = end
            let altlengthstart = pagelengthstart

            altend -= 6
            setEnd(altend)

            altstart -= 6
            setStart(altstart)

            altlengthstart -= 1
            setPagelengthstart(altlengthstart)
        }
    }


    return (
        <div className={`pt-10 pb-20 lg:pb-10 ${screen === 2 ? ' h-screen' : 'h-fit'} `}>
            <div className='flex justify-between items-center'>
                <div className='uppercase font-bold md:text-2xl text-lg text-semi-white '>{deposit}</div>
                {screen === 1 &&
                    <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => { setScreen(2); setDeposit('deposit history') }}>
                        <span>history</span>
                        <RiHistoryFill />
                    </div>
                }
                {screen === 2 &&
                    <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => { setScreen(1); setDeposit('deposit') }}>
                        <span>new deposit</span>
                        <RiMoneyDollarCircleFill />
                    </div>
                }
            </div>
            {screen === 1 && <div className='w-[80%] mx-auto my-10 relative flex items-center justify-center bgdeposit'>
                <div className={`h-[32rem] w-[36rem] bg-semi-white md:px-3 px-2 rounded-xl shlz scroll thediv overflow-x-hidden ${modal ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
                    {loading && <LoadingAdmin />}
                    <div className='flex justify-between w-full py-3'>
                        <div>
                            <button className={`w-fit h-fit py-2 md:px-6 px-3 md:text-xs text-[0.65rem] bg-[#16122c] rounded-full  ${depositScreen === 1 ? 'bg-admin-btn text-semi-white' : 'bg-[#cac9c9] text-[grey]'}`} onClick={() => setDepositScreen(1)}>Deposit from an exchange</button>
                        </div>
                        <div>
                            <button className={`w-fit h-fit py-2 md:px-6 px-2 md:text-xs text-[0.65rem] bg-[#16122c] rounded-full ${depositScreen === 2 ? 'bg-admin-btn text-semi-white' : 'bg-[#cac9c9] text-[grey]'} `} onClick={() => { setDepositScreen(2); setAmount() }}>Buy plan with balance</button>
                        </div>
                    </div>
                    {depositScreen === 1 && <div className='py-4 flex  flex-col text-black font-medium items-center'>
                        <div className='flex flex-col gap-2'>
                            <div className='text-[0.85rem] capitalize text-center'>enter an amount</div>
                            <div className='relative'>
                                <input className={`outline-none border  bg-transparent lg:text-[0.85rem] w-full h-8 rounded-[5px] px-5 ${amountError ? 'border-[red]' : 'border-light'}`} value={amount} onChange={e => setAmount(e.target.value)} onKeyUp={handleAmount}></input>
                                <div className='absolute top-1.5 left-2 text-[0.85rem]'>$</div>
                            </div>
                        </div>
                        <div className='flex md:flex-row flex-col md:gap-2 gap-1 items-center mt-8'>
                            <div className='text-light text-[0.85rem] capitalize'>trading plan:</div>
                            {amount > 0 ?
                                <span className={`capitalize text-[0.85rem] ${amount < 20 ? 'text-[#ce4242]' : 'text-black'} font-bold `}>{plan}</span>
                                :
                                <span className='italic text-[0.85rem] text-admin-btn text-center'>enter an amount to show the plan it falls under</span>
                            }
                        </div>
                        <div className='h-fit w-fit rounded-[0.2rem] bg-white md:mt-10 mt-8 p-1'>
                            <div className={`flex flex-col gap-1 ${selectState ? 'h-[5.75rem] overflow-y-auto scroll' : 'h-[1.6rem]'}  w-[13rem] px-2 py-1  bg-white shantf rounded-[0.2rem]   text-black ${selectError && 'border border-[red]'} trans`}>
                                <div className={`${selectState && 'border-b border-[#c7c6c6]'}  cursor-pointer `} onClick={() => setSelectState(!selectState)} >
                                    <div className='flex justify-between items-center capitalize text-[0.8rem]  font-bold'>
                                        <span >choose cryptocurrency</span>
                                        {!selectState && <FaAngleDown className='text-[0.7rem]' />}
                                        {selectState && <FaAngleUp className='text-[0.7rem]' />}
                                    </div>
                                </div>
                                {selectState && <div>
                                    {supportedCoins.map((item, i) => (
                                        <div className='flex flex-col mt-1' key={i}>
                                            <div className='flex gap-2 items-center cursor-pointer hover:bg-[#a1a0a0]' onClick={() => { setSelectState(false); setSelectValue(item.coin); setNetwork(item.textnw); setAddress(item.address) }}>
                                                <img src={item.img} className='h-auto w-4'></img>
                                                <div className='text-[0.85rem] font-bold capitalize'>{item.coin}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>}
                            </div>
                        </div>
                        <div className='text-[0.85rem] text-center text-black md:mt-10 mt-8'>{network}</div>
                        <div className='flex md:flex-row flex-col gap-2 items-center mt-4'>
                            <div className='md:text-[0.9rem] text-[0.7rem] text-light text-ellipsis'>{address}</div>
                            {selectValue !== '' && <button className='outline-none w-fit h-fit py-1.5 px-2 text-[0.8rem] text-semi-white bg-admin-btn rounded-[5px] capitalize flex items-center justify-center' onClick={() => copyFunction()}>
                                {!copy && <MdContentCopy />}
                                {copy && <FaCheck />}
                            </button>}
                        </div>
                        <div className='flex flex-col gap-2 items-center md:mt-10 mt-5'>
                            <div className='flex gap-2 '>
                                <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className={`${checkError === true ? 'outline outline-1 outline-[red] ' : ''}`}></input>
                                <div className='text-admin-btn md:text-[0.8rem] text-xs'>I confirm to have made this deposit</div>
                            </div>
                            <div className='relative'>
                                <button className='outline-none w-fit h-fit py-2 px-8 text-semi-white  bg-admin-btn rounded-[5px] capitalize flex items-center gap-1 font-[550] md:text-base text-sm' onClick={createDeposit}>
                                    <span>confirm my deposit</span>
                                    <IoCheckbox className='text-[0.8rem]' />
                                </button>
                            </div>
                        </div>
                    </div>}
                    {depositScreen === 2 &&
                        <>
                            <div className='text-[2rem] text-center text-black font-medium capitalize mt-4'>trading plans</div>
                            <div className='w-full flex flex-col gap-8 mt-4 items-center'>
                                <div className='flex flex-wrap gap-4 justify-center'>
                                    {tradingPlans.map((item, i) => (
                                        <div key={i}>
                                            <div className='md:w-60 w-[9.3rem] h-fit rounded-lg flex flex-col text-white shantf bg-white'>
                                                <div className='plan_bg w-full md:h-20 h-16 rounded-t-lg'>
                                                    <div className='uppercase font-[800]  text-center md:text-[1.1rem] text-sm pt-4'>{item.title}</div>
                                                </div>
                                                <div className='-mt-6 flex flex-col gap-3 items-center justify-center'>
                                                    <div className='md:h-[5.1rem] md:w-[5.1rem] w-[4.5rem] h-[4.5rem] rounded-full bg-white flex items-center justify-center'>
                                                        <div className='md:h-[4.3rem] md:w-[4.3rem] w-[3.7rem] h-[3.7rem] rounded-full bg-[#252525] md:text-[0.65rem] text-[0.6rem] flex flex-col gap-1 items-center justify-center'>
                                                            <div className='italic'>from</div>
                                                            <div className='flex items-center gap-[0.1rem] font-bold text-[#5BB4FD]'>
                                                                <div className='mt-[-0.2rem]'>$</div>
                                                                <div className='md:text-base text-sm'>{item.price_start}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='md:text-xs text-[0.65rem] text-[#353434] font-[550] text-center w-11/12'>
                                                        60% profit return on investment plus bonus up to ${item.bonus}
                                                    </div>
                                                    <div className='mb-4 mt-2'>
                                                        <button className='w-fit h-fit md:py-2 py-1.5 md:px-6 px-4 rounded-full bg-[#5BB4FD] text-white uppercase font-bold md:text-[0.65rem] text-[0.6rem]' onClick={() => { setBuyBal(item); setModal(true); MoveToTopDivs() }}>
                                                            buy now
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='bg-white w-fit h-fit py-1 px-4 rounded-t-md flex gap-1 items-center justify-center font-bold text-xs '>
                                    <FaRegCopyright />
                                    <div>2024, Al Algo, All rights reserved.</div>
                                </div>
                            </div>
                        </>
                    }
                    {modal && <div className='w-full h-full absolute top-0 left-0  flex items-center justify-center bg-[#0c091aa4] z-20 '>
                        <div className='w-fit h-fit bg-white rounded-md md:px-8 px-4 py-4 flex flex-col gap-4 items-center relative'>
                            {loadingtwo && <Loading />}
                            <FaRegRectangleXmark className='absolute top-0 right-[0.2rem] cursor-pointer' onClick={() => { setModal(false); setAmount() }} />
                            <div className='flex items-center gap-2'>
                                <div className='text-[0.85rem] uppercase font-bold'>{buybal.title}</div>
                                <div className={`text-xs font-[550] bg-white py-1 px-2 rounded-full adsha ${limitError ? 'text-[red]' : 'text-black'} `}>${buybal.price_start} - ${buybal.price_limit}</div>
                            </div>
                            <div className='relative flex gap-2 items-center'>
                                <div className='relative'>
                                    <input className={`outline-none border lg:text-[0.85rem] md:w-40 w-36 h-8 rounded-[5px] px-5 bg-transparent ipt ${amountError ? 'border-[red]' : 'border-[#5BB4FD]'}`} value={amount} onChange={e => setAmount(e.target.value)} placeholder='enter amount'></input>
                                    <div className='absolute top-1.5 left-2 text-[0.85rem]'>$</div>
                                </div>
                                <div className={`h-fit w-fit text-nowrap py-2 px-4 ${balanceError ? 'border border-[red]' : ''} bg-[#5BB4FD] flex flex-col gap-1 items-center justify-center text-white text-[0.9rem] rounded-[0.25rem]`}>
                                    <div className='text-xs italic'>wallet balance:</div>
                                    <div> ${userwallet.balance}</div>
                                </div>
                            </div>
                            <div className='mb-4 w-fit h-fit relative'>
                                <button className='w-fit h-fit py-2 px-8 rounded-[5px] bg-[#252525] text-white capitalize font-medium text-xs flex items-center justify-center' onClick={BuyPlanWithBalance}>
                                    confirm purchase
                                </button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>}
            {screen === 2 && <div className='my-8 '>
                <div className='flex gap-1 items-center capitalize md:text-[0.85rem] text-xs cursor-pointer text-light hover:text-[grey] w-fit' onClick={() => { setScreen(1); setDeposit('deposit') }}>
                    <IoMdArrowBack />
                    <span>back</span>
                </div>
                <div className='mt-8 md:mt-4 lg:mt-8'>
                    <div className='relative w-fit mx-auto'>
                        <input className='border border-white bg-transparent md:w-80 w-60 h-10 outline-none px-4 lg:text-[0.9rem] rounded-[12rem] text-white ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch}></input>
                        <div className='text-[1.2rem] text-white absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center bg-light shlz'>
                            <IoIosSearch />
                            {write &&
                                <div className='absolute top-[1.2rem] md:right-12 right-11 text-xs cursor-pointer bg-[#414040] rounded-full w-4 h-4 flex items-center justify-center' onClick={CancelWrite}>
                                    <FiX />
                                </div>
                            }
                        </div>
                    </div>
                    <div className='relative overflow-x-auto shadow-md rounded-lg mt-4 scrollsdown'>
                        <table className='w-full'>
                            <thead >
                                <tr className='bg-light text-[0.8rem] font-bold text-white'>
                                    <td className='text-center truncate  capitalize p-2'>date</td>
                                    <td className='text-center truncate  capitalize p-2'>time</td>
                                    <td className='text-center truncate  capitalize p-2'>amount</td>
                                    <td className='text-center truncate  capitalize p-2'>trading plan</td>
                                    <td className='text-center truncate  capitalize p-2'>crypto</td>
                                    <td className='text-center truncate  capitalize p-2'>status </td>
                                </tr>
                            </thead>
                            {fromAtom.length > 0 && <tbody>
                                {userDeposits.slice(start, end).map((item, i) => (
                                    <tr className='text-[0.8rem] text-semi-white bg-[#272727] even:bg-[#313131]' key={i}>
                                        <td className='p-4 text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                                        <td className='p-4 text-center truncate'>{moment(item.createdAt).format('h:mm')}</td>
                                        <td className='p-4  flex items-center justify-center gap-[0.1rem]'><span className='text-[0.65rem]'>$</span> <span>{item.amount.toLocaleString()}</span></td>
                                        <td className='p-4 text-center truncate'>{item.trading_plan}</td>
                                        <td className='p-4 text-center truncate'> {item.crypto}</td>
                                        <td className={`p-4  text-center truncate italic ${item.deposit_status === 'confirmed' && 'text-[#adad40]'}  ${item.deposit_status === 'pending' && 'text-[#6f6ff5]'}   ${item.deposit_status === 'failed' && 'text-[#eb4242] '}  `}>{item.deposit_status}</td>
                                    </tr>
                                ))}
                            </tbody>
                            }
                        </table>
                        {fromAtom.length < 1 && <div className='flex gap-1 items-center text-white justify-center w-full h-fit bg-[#272727] px-4 py-2 text-[0.8rem] italic'>
                            <div>no deposits made yet...</div>
                            <img src={nothnyet} className='h-4 w-auto'></img>
                        </div>}
                    </div>
                    {fromAtom.length > 0 && <div className='flex gap-2 items-center md:text-xs mt-4 justify-end text-light '>
                        {pagelengthstart > 1 && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
                        {Math.ceil(pagelengthend) > 1 && <div className='font-bold text-[grey]'>{pagelengthstart} of {Math.ceil(pagelengthend)}</div>}
                        {end < userDeposits.length && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
                    </div>}
                </div>
            </div>}
        </div>
    )
}

export default Deposit