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
            const showSearch = userDeposits.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.trading_plan.includes(search.toLowerCase()) || item.crypto.includes(search.toLowerCase()) || item.deposit_status.includes(search.toLowerCase()))
            setUserDeposits(showSearch)
            setWrite(true)
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
                <div className='uppercase font-bold md:text-[1.5rem] text-[#e0dfdf] '>{deposit}</div>
                {screen === 1 &&
                    <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-sm text-[#7665D5] items-center justify-center cursor-pointer' onClick={() => { setScreen(2); setDeposit('deposit history') }}>
                        <span>deposit history</span>
                        <RiHistoryFill />
                    </div>
                }
                {screen === 2 &&
                    <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-sm text-[#7665D5] items-center justify-center cursor-pointer' onClick={() => { setScreen(1); setDeposit('deposit') }}>
                        <span>new deposit</span>
                        <RiMoneyDollarCircleFill />
                    </div>
                }
            </div>
            {screen === 1 && <div className='w-[80%] mx-auto my-[2.5rem] flex items-center justify-center bgdeposit'>
                <div className={`h-[32rem] w-[36rem] bg-[#0E0B1C] shlz rounded-xl  scroll relative thediv ${modal ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
                    {loading && <LoadingAdmin />}
                    <div className='flex justify-between w-full py-3 px-3'>
                        <div className=''>
                            <button className={`w-fit h-fit py-[0.5rem] px-[1.5rem] text-[0.75rem] bg-[#16122c] rounded-[10rem]  ${depositScreen === 1 ? 'bg-[#31276e] text-white' : 'bg-[#16122c] text-[#9b9a9a]'}`} onClick={() => setDepositScreen(1)}>Deposit from a wallet, exchange</button>
                        </div>
                        <div className=''>
                            <button className={`w-fit h-fit py-[0.5rem] px-[1.5rem] text-[0.75rem] bg-[#16122c] rounded-[10rem] ${depositScreen === 2 ? 'bg-[#31276e] text-white' : 'bg-[#16122c] text-[#9b9a9a]'} `} onClick={() => { setDepositScreen(2); setAmount() }}>Buy plan with balance</button>
                        </div>
                    </div>
                    {depositScreen === 1 && <div className='px-[3rem] py-[1rem] flex  flex-col text-[#e0dfdf]  items-center'>
                        <div className='relative flex flex-col gap-2'>
                            <div className='text-[0.9rem] capitalize text-center'>enter an amount</div>
                            <input className={`outline-none border  bg-[#0C091A] lg:text-[0.85rem] w-[15rem] h-[2rem] rounded-[5px] pl-[1.3rem] ${amountError ? 'border-[red]' : 'border-[#7665D5]'}`} value={amount} onChange={e => setAmount(e.target.value)} onKeyUp={handleAmount}></input>
                            <div className='absolute top-[2.25rem] left-2 text-[0.85rem]'>$</div>
                        </div>
                        <div className='flex gap-2 items-center mt-[2rem]'>
                            <div className='text-[#e0dfdf] text-[0.9rem] capitalize'>trading plan:</div>
                            {amount > 0 ?
                                <div className={`capitalize text-[0.85rem] ${amount < 20 ? 'text-[#ce4242]' : 'text-[#e0dfdf]'}  font-bold `}>{plan}</div>
                                :
                                <div className='italic text-[0.85rem] text-[#7665D5]'>enter an amount to show the trading plan it falls under</div>
                            }
                        </div>
                        <div className='h-fit w-fit rounded-[0.2rem] bg-[grey] mt-[2.5rem] p-1'>
                            <div className={`flex flex-col gap-1 ${selectState ? 'h-[5.75rem] overflow-y-auto scroll' : 'h-[1.6rem]'}  w-[13rem] px-[0.5rem] py-[0.25rem]  bg-[white] shlz rounded-[0.2rem]   text-black ${selectError && 'border border-[red]'} trans`}>
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
                                                <img src={item.img} className='h-auto w-[1rem]'></img>
                                                <div className='text-[0.85rem] font-bold capitalize'>{item.coin}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>}
                            </div>
                        </div>

                        <div className='flex flex-col gap-4 items-center text-[#e0dfdf] mt-[2.5rem]' >
                            <div className='text-[0.8rem]'>{network}</div>
                            <div className='flex gap-2 items-center relative'>
                                <div className='text-[0.9rem] text-[grey]'>{address}</div>
                                {selectValue !== '' && <button className='outline-none w-fit h-fit py-[0.4rem] px-[0.5rem] text-[1.2rem] text-[#e0dfdf] hover:bg-[#5d4faa]  bg-[#7665D5] rounded-[5px] capitalize flex items-center gap-1 font-bold' onClick={() => copyFunction()}>
                                    {!copy && <MdContentCopy className='text-[0.8rem]' />}
                                    {copy && <FaCheck className='text-[0.8rem]' />}
                                </button>}
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 items-center mt-[2.5rem]'>
                            <div className='flex gap-2 '>
                                <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className={`${checkError === true ? 'outline outline-1 outline-[red] ' : ''}`}></input>
                                <div className='text-[#7665D5] text-[0.8rem]'>I confirm to have made this deposit</div>
                            </div>
                            <div className='relative'>
                                <button className='outline-none w-fit h-fit py-[0.5rem] px-[2rem] text-[1rem] text-[#e0dfdf]  bg-[#7665D5] hover:bg-[#5d4faa] rounded-[5px] capitalize flex items-center gap-1 font-[550]' onClick={createDeposit}>
                                    <span>confirm my deposit</span>
                                    <IoCheckbox className='text-[0.8rem]' />
                                </button>
                            </div>
                        </div>
                    </div>}
                    {depositScreen === 2 &&
                        <div className='w-[90%] mx-auto'>
                            <div className='text-[2rem] text-center text-[#e0dfdf] capitalize mt-[1rem]'>trading plans</div>
                            <div className='flex flex-col gap-4 mt-[1rem] items-center'>
                                <div className='flex flex-wrap gap-4 '>
                                    {tradingPlans.map((item, i) => (
                                        <div key={i} className=''>
                                            <div className='w-[15rem] h-[fit] rounded-[10px] flex flex-col text-[white] shlz bg-[white]'>
                                                <div className='plan_bg w-full h-[5rem] rounded-t-md'>
                                                    <div className='uppercase font-[800]  text-center text-[1.1rem] pt-[1rem]'>{item.title}</div>
                                                </div>
                                                <div className='mt-[-1.5rem] flex flex-col gap-3 items-center justify-center'>
                                                    <div className='h-[5.1rem] w-[5.1rem] rounded-[50%] bg-[white] flex items-center justify-center'>
                                                        <div className='h-[4.3rem] w-[4.3rem] rounded-[50%] bg-[#252525] text-[0.65rem] flex flex-col gap-1 items-center justify-center'>
                                                            <div className='italic'>from</div>
                                                            <div className='flex items-center gap-[0.1rem] font-bold text-[#5BB4FD]'>
                                                                <div className='mt-[-0.2rem]'>$</div>
                                                                <div className='text-[1rem]  '>{item.price_start}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=' w-[88%] mx-auto'>
                                                        <div className='w-full flex gap-3 items-center'>
                                                            <div className='w-[5%]'>
                                                                <div className='w-[1rem] h-[1rem] rounded-full flex items-center justify-center  bg-[#252525]'>
                                                                    <FaCheck className='text-[0.5rem]' />
                                                                </div>
                                                            </div>
                                                            <div className='w-[95%]'>
                                                                <div className='text-[0.75rem] text-[#353434] font-bold'>
                                                                    60% profit return on investment + additional bonus up to ${item.bonus}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mb-[1rem] mt-[0.5rem]'>
                                                        <button className='w-fit h-fit py-[0.5rem] px-[1.5rem] rounded-[10rem] bg-[#5BB4FD] text-white uppercase font-bold text-[0.65rem] flex items-center justify-center' onClick={() => { setBuyBal(item); setModal(true); MoveToTopDivs() }}>
                                                            buy now
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='bg-white w-[15rem] h-[1.3rem] rounded-t-md flex gap-[0.3rem] justify-center items-center font-[800] text-[0.65rem]'>
                                    <FaRegCopyright />
                                    <div>2024, Al Algo, All rights reserved.</div>
                                </div>
                            </div>
                        </div>
                    }
                    {modal && <div className='w-full h-full absolute top-0 left-0  flex items-center justify-center bg-[#0c091aa4] z-20 '>
                        <div className='w-fit h-fit bg-white rounded-md px-[2rem] py-[1rem] flex flex-col gap-4 items-center relative'>
                            {loadingtwo && <Loading />}
                            <FaRegRectangleXmark className='absolute top-0 right-[0.2rem] cursor-pointer' onClick={() => { setModal(false); setAmount() }} />
                            <div className='flex items-center gap-2'>
                                <div className='text-[0.9rem] capitalize font-bold'>{buybal.title}</div>
                                <div className={`text-[0.8rem]  ${limitError ? 'text-[red] font-bold' : 'text-black font-[550]'} `}>${buybal.price_start} - ${buybal.price_limit}</div>
                            </div>
                            <div className='relative flex gap-2 items-center'>
                                <input className={`outline-none border lg:text-[0.85rem] w-[10rem] h-[2rem] rounded-[5px] pl-[1.2rem] bg-transparent ${amountError ? 'border-[red]' : 'border-[#5BB4FD]'}`} value={amount} onChange={e => setAmount(e.target.value)} placeholder='enter amount'></input>
                                <div className={`h-fit w-fit px-[1rem] py-[0.5rem] ${balanceError ? 'border border-[red]' : ''} bg-[#5BB4FD] flex flex-col gap-1 items-center justify-center text-white text-[0.9rem] rounded-[0.25rem]`}>
                                    <div className='text-[0.7rem] italic'>wallet balance:</div>
                                    <div> ${userwallet.balance}</div>
                                </div>
                                <div className='absolute top-[1.2rem] left-2 text-[0.85rem]'>$</div>
                            </div>
                            <div className='mb-[1rem] w-fit h-fit relative'>
                                <button className='w-fit h-fit py-[0.5rem] px-[2rem] rounded-[5px] bg-[#252525] text-white capitalize font-[550] text-[0.75rem] flex items-center justify-center' onClick={BuyPlanWithBalance}>
                                    confirm purchase
                                </button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>}
            {screen === 2 && <div className='my-8 '>
                <div className='flex gap-1 items-center capitalize md:text-[0.85rem] text-xs cursor-pointer text-[#7665D5] hover:text-[grey] w-fit' onClick={() => { setScreen(1); setDeposit('deposit') }}>
                    <IoMdArrowBack />
                    <span>back</span>
                </div>
                <div className='mt-4'>
                    <div className='relative w-fit mx-auto'>
                        <input className='border border-[white] bg-transparent md:w-80 w-60 h-10 outline-none pl-4 lg:text-[0.9rem] rounded-[12rem] text-white ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch}></input>
                        <div className='text-[1.2rem] text-[white] absolute top-[-0.5rem] right-[-0.5rem] w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center bg-[#7665D5] shlz'>
                            <IoIosSearch />
                            {write &&
                                <div className='absolute top-[1.2rem] right-[3rem] text-[0.75rem] cursor-pointer bg-[#414040] rounded-[50%] w-[1rem] h-[1rem] flex items-center justify-center' onClick={CancelWrite}>
                                    <FiX />
                                </div>
                            }
                        </div>
                    </div>
                    <div className='relative overflow-x-auto shadow-md rounded-lg mt-4 scrollsdown'>
                        <table className='w-full'>
                            <thead >
                                <tr className='bg-[#7665D5] text-[0.8rem] font-bold text-[white]'>
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
                                    <tr className='text-[0.8rem] text-[#e0dfdf] bg-[#272727] even:bg-[#313131]' key={i}>
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
                        {fromAtom.length < 1 && <div className='flex gap-1 items-center text-white justify-center w-full h-fit bg-[#272727] px-[1rem] py-[0.5rem] text-[0.8rem] italic'>
                            <div>no deposits made yet...</div>
                            <img src={nothnyet} className='h-[1rem] w-auto'></img>
                        </div>}
                    </div>
                    {fromAtom.length > 0 && <div className='flex gap-2 items-center md:text-xs mt-4 justify-end text-[#7665D5] '>
                        {pagelengthstart > 1 && <div className='py-1 px-2 rounded-md border border-[#7665D5] hover:bg-[#7665D5] hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
                        {Math.ceil(pagelengthend) > 1 && <div className='font-bold text-[grey]'>{pagelengthstart} of {Math.ceil(pagelengthend)}</div>}
                        {end < userDeposits.length && <div className='py-1 px-2 rounded-md border border-[#7665D5] hover:bg-[#7665D5] hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
                    </div>}
                </div>
            </div>}
        </div>
    )
}

export default Deposit