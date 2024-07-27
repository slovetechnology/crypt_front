import React, { useEffect, useRef, useState } from 'react'
import { MdContentCopy } from "react-icons/md";
import { RiHistoryFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { useAtom } from 'jotai';
import { DEPOSITS, PROFILE, WALLET } from '../../../store';
import { Apis, PostApi } from '../../../services/API';
import { Alert, MoveToTopDivs } from '../../../utils/utils';
import moment from 'moment';
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp, FaCheck, FaRegCopyright } from 'react-icons/fa6';
import { FiX } from "react-icons/fi";
import { supportedCoins, tradingPlans } from '../../../services/Miscellaneous';
import nothnyet from '../../../assets/images/nothn.png'
import { TbListDetails } from "react-icons/tb";
import { FaXmark } from "react-icons/fa6";
import Loading from '../../../PageComponents/Loading';


const Deposit = ({ setToggle, refetchDeposits, refetchInvestments, refetchNotifications, refetchUnreadNotis, urlState, refetchWallet, refetchInvestmentsUnclaim }) => {
    const [fromAtom] = useAtom(DEPOSITS)
    const [userDeposits, setUserDeposits] = useState(fromAtom)
    const [userwallet] = useAtom(WALLET)
    const [user] = useAtom(PROFILE)

    const [copy, setCopy] = useState(false)
    const [amount, setAmount] = useState('')
    const [check, setCheck] = useState('')
    const [checkError, setCheckError] = useState(false)
    const [amountError, setAmountError] = useState(false)
    const [selectState, setSelectState] = useState(false)
    const [selectValue, setSelectValue] = useState({})
    const [selectError, setSelectError] = useState(false)
    const [network, setNetwork] = useState('')
    const [address, setAddress] = useState('')
    const [screen, setScreen] = useState(urlState ? 2 : 1)
    const [modalScreen, setmodalScreen] = useState(1)
    const [depositTitle, setDepositTitle] = useState(urlState ? 'deposit history' : 'deposit')
    const [search, setSearch] = useState('')
    const [write, setWrite] = useState(false)
    const [buybal, setBuyBal] = useState({})
    const [modal, setModal] = useState(false)
    const [balanceError, setBalanceError] = useState(false)
    const [limitError, setLimitError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [balCheck, setBalCheck] = useState(false)
    const [extCheck, setExtCheck] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [pagestart, setpagestart] = useState(1)
    const [pageend, setpageend] = useState(userDeposits.length / end)
    const depositbox = useRef()

    useEffect(() => {
        if (depositbox) {
            window.addEventListener('click', (event) => {
                if (depositbox.current !== null) {
                    if (!depositbox.current.contains(event.target)) {
                        setModal(false)
                    }
                }
            }, true)
        }
    }, [])

    const BuyPlanWithBalance = async () => {
        setTimeout(() => {
            setLimitError(false)
            setBalanceError(false)
            setAmountError(false)
            setCheckError(false)
        }, 1000)

        if (!amount) return setAmountError(true)
        if (isNaN(amount)) return setAmountError(true)
        if (amount < buybal.price_start) return setLimitError(true)
        if (amount > buybal.price_limit) return setLimitError(true)
        if (amount > userwallet.balance) return setBalanceError(true)
        if (Object.values(userwallet).length === 0) return setBalanceError(true)
        if (!balCheck) return setCheckError(true)

        setLoading(true)

        const formbody = {
            amount: parseFloat(amount),
            trading_plan: buybal.title,
            crypto: 'usdt',
            from: 'wallet balance',
            deposituser: user.username
        }

        if (balCheck) {
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
                    setToggle('investment')
                } else {
                    Alert('Request Failed', `${response.msg}`, 'error')
                }
            } catch (error) {
                Alert('Request Failed', `${error.message}`, 'error')
            } finally {
                setLoading(false)
            }
        }
    }

    const copyFunction = () => {
        setTimeout(() => {
            setCopy(false)
        }, 2000)
        navigator.clipboard.writeText(address)
        setCopy(true)
    }

    const ProceedButton = async () => {
        setTimeout(() => {
            setLimitError(false)
            setAmountError(false)
        }, 1000)

        if (!amount) return setAmountError(true)
        if (amount < buybal.price_start) return setLimitError(true)
        if (amount > buybal.price_limit) return setLimitError(true)
        setSelectValue({})
        setAddress('')
        setNetwork('')
        setmodalScreen(2)
    }

    const CreateDeposit = async () => {
        setTimeout(() => {
            setAmountError(false)
            setCheckError(false)
            setSelectError(false)
        }, 1000)

        if (Object.values(selectValue).length === 0) return setSelectError(true)
        if (!check) return setCheckError(true)

        const formbody = {
            amount: parseFloat(amount),
            trading_plan: buybal.title,
            crypto: selectValue.coin,
            from: 'external source',
            deposituser: user.username
        }

        setLoading(true)

        try {
            const response = await PostApi(Apis.deposit.create_deposit, formbody)
            if (response.status === 200) {
                setUserDeposits(response.msg)
                Alert('Request Successful', `Deposit successful`, 'success')
                setModal(false)
                setmodalScreen(1)
                setScreen(2)
                setAmount('')
                setExtCheck(false)
                setBalCheck(false)
                setCheck(false)
                setSelectValue({})
                setNetwork('')
                setAddress('')
                setDepositTitle('deposit history')
                refetchDeposits()
                refetchInvestments()
                refetchInvestmentsUnclaim()
                refetchNotifications()
                refetchWallet()
                refetchUnreadNotis()
                setpageend(response.msg.length / 6)
                setpagestart(1)
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


    const HandleSearch = () => {

        if (!search) {
            setWrite(false)
            setUserDeposits(fromAtom)
            setpageend(fromAtom.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
        else {
            setWrite(true)
            const showSearch = userDeposits.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.trading_plan.includes(search.toLowerCase()) || item.crypto.includes(search.toLowerCase()) || item.deposit_status.includes(search.toLowerCase()))
            setUserDeposits(showSearch)
            setpageend(showSearch.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setWrite(false)
        setUserDeposits(fromAtom)
        setpageend(fromAtom.length / 6)
        setpagestart(1)
        setStart(0)
        setEnd(6)
    }

    let MovePage = () => {

        if (end < userDeposits.length) {
            let altstart = start
            let altend = end
            let altlengthstart = pagestart

            altend += 6
            setEnd(altend)

            altstart += 6
            setStart(altstart)

            altlengthstart += 1
            setpagestart(altlengthstart)
        }
    }

    let BackPage = () => {

        if (end > 6) {
            let altstart = start
            let altend = end
            let altlengthstart = pagestart

            altend -= 6
            setEnd(altend)

            altstart -= 6
            setStart(altstart)

            altlengthstart -= 1
            setpagestart(altlengthstart)
        }
    }


    return (
        <div className={`pt-10 pb-24 lg:pb-10 ${screen === 2 ? 'h-screen' : 'h-fit'}`}>
            <div className='flex justify-between items-center'>
                <div className='uppercase font-bold md:text-2xl text-lg text-semi-white '>{depositTitle}</div>
                {screen === 1 &&
                    <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => { setScreen(2); setDepositTitle('deposit history') }}>
                        <span>history</span>
                        <RiHistoryFill />
                    </div>
                }
                {screen === 2 &&
                    <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => { setScreen(1); setDepositTitle('deposit') }}>
                        <span>new deposit</span>
                        <RiMoneyDollarCircleFill />
                    </div>
                }
            </div>
            {screen === 1 && <div className='w-[80%] mx-auto my-10 relative flex items-center justify-center bgdeposit'>
                <div className={`h-[32rem] w-[32rem] bg-semi-white md:px-3 px-2 rounded-xl relative shlz scroll thediv overflow-x-hidden ${modal ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
                    <div className='md:text-2xl text-xl text-black font-bold uppercase bg-white w-fit h-fit py-1 px-6 rounded-b-md mx-auto flex items-center justify-center gap-2'>
                        <span>trading plans</span>
                        <TbListDetails className='text-[#5BB4FD]' />
                    </div>
                    <div className='w-full flex flex-col gap-8 mt-6 items-center'>
                        <div className='flex flex-wrap md:gap-4 gap-2 justify-center'>
                            {tradingPlans.map((item, i) => (
                                <div key={i}>
                                    <div className='md:w-56 w-[9.5rem] h-fit rounded-lg flex flex-col text-white shantf bg-white'>
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
                                            <div className='text-xs text-[#353434] font-[600] text-center w-11/12'>
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
                            <FaRegCopyright className='text-[#5BB4FD]' />
                            <div>2024, Al Algo, All rights reserved.</div>
                        </div>
                    </div>
                    {modal && <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center bg-[#0c091aa4] z-20'>
                        <div className='w-96 h-fit bg-white rounded-lg px-4 py-4 flex flex-col gap-4 relative' ref={depositbox}>
                            {loading && <Loading />}
                            <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => { setModal(false); setAmount(''); setmodalScreen(1); setBalCheck(false); setExtCheck(false) }} />
                            {modalScreen === 1 && <>
                                <div className='flex items-center gap-2 justify-center'>
                                    <div className='text-[0.85rem] uppercase font-bold'>{buybal.title}</div>
                                    <div className={`text-xs font-[550] bg-white py-1 px-2 rounded-full adsha ${limitError ? 'text-[red]' : 'text-black'} `}>${buybal.price_start} - ${buybal.price_limit}</div>
                                </div>
                                <div className='relative flex gap-3 items-center mx-auto'>
                                    <div className='relative'>
                                        <input className={`outline-none border lg:text-[0.85rem] w-full h-8 rounded-md px-5 bg-transparent ipt ${amountError ? 'border-[red]' : 'border-[#5BB4FD]'}`} value={amount} onChange={e => setAmount(e.target.value)} placeholder='enter amount'></input>
                                        <div className='absolute top-1.5 left-2 text-[0.85rem]'>$</div>
                                    </div>
                                    <div className={`h-fit w-fit text-nowrap py-2 md:px-4 px-2 ${balanceError ? 'border border-[red]' : ''} bg-[#5BB4FD] flex flex-col gap-1 items-center justify-center text-white text-[0.85rem] rounded-md`}>
                                        <div className='text-xs italic text-center'>wallet balance:</div>
                                        {Object.values(userwallet).length !== 0 && <div> ${userwallet.balance.toLocaleString()}</div>}
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 text-xs text-[#252525]'>
                                    <div className='flex gap-1 items-center'>
                                        <input type='checkbox' value={balCheck} checked={balCheck} onChange={event => { setBalCheck(event.target.checked); setExtCheck(false) }} className={`${checkError === true ? 'outline outline-1 outline-[red] ' : ''}`}></input>
                                        <div>buy plan with balance</div>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <input type='checkbox' value={extCheck} checked={extCheck} onChange={event => { setExtCheck(event.target.checked); setBalCheck(false) }} className={`${checkError === true ? 'outline outline-1 outline-[red] ' : ''}`}></input>
                                        <div>deposit from a exchange or wallet</div>
                                    </div>
                                </div>
                                <div className='my-2 relative mx-auto'>
                                    {!extCheck ?
                                        <button className='py-2 px-16 rounded-md bg-[#252525] text-white capitalize font-medium text-xs' onClick={BuyPlanWithBalance}>purchase</button>
                                        :
                                        <button className='py-2 px-16 rounded-md bg-[#252525] text-white capitalize font-medium text-xs' onClick={ProceedButton}>proceed</button>
                                    }
                                </div>
                            </>}
                            {modalScreen === 2 && <div className='flex flex-col gap-4 items-center'>
                                <div className='flex gap-1.5 items-center pb-1 border-b' onClick={() => console.log(buybal)}>
                                    <span className='text-xs italic'>for</span>
                                    <span className='text-sm capitalize font-medium'>{buybal.title}</span>
                                    <span className='text-sm capitalize font-medium'>${amount}</span>
                                </div>
                                <div className='h-fit w-fit rounded-[0.2rem] bg-[#eeeded] p-1'>
                                    <div className={`flex flex-col gap-1 ${selectState ? 'h-[5.75rem] overflow-y-auto scroll' : 'h-[1.6rem]'}  w-[13rem] px-2 py-1  bg-white shantf rounded-[0.2rem]   text-black ${selectError && 'border border-[red]'} trans`}>
                                        <div className={`${selectState && 'border-b border-[#c7c6c6]'}  cursor-pointer `} onClick={() => setSelectState(!selectState)} >
                                            <div className='flex justify-between items-center capitalize text-[0.8rem] font-[550]'>
                                                <span >choose cryptocurrency</span>
                                                {!selectState && <FaAngleDown className='text-[0.7rem]' />}
                                                {selectState && <FaAngleUp className='text-[0.7rem]' />}
                                            </div>
                                        </div>
                                        {selectState && <div>
                                            {supportedCoins.map((item, i) => (
                                                <div className='flex flex-col mt-1' key={i}>
                                                    <div className='flex gap-2 items-center cursor-pointer hover:bg-semi-white' onClick={() => { setSelectState(false); setSelectValue(item); setNetwork(item.textnw); setAddress(item.address) }}>
                                                        <img src={item.img} className='h-auto w-4'></img>
                                                        <div className='text-[0.85rem] font-bold capitalize'>{item.coin}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>}
                                    </div>
                                </div>
                                <div className='text-[0.8rem] text-center'>{network}</div>
                                {Object.values(selectValue).length !== 0 && <div className='flex gap-2 items-center'>
                                    <div className='text-xs text-[#5BB4FD]'>{address}</div>
                                    <button className='outline-none w-fit h-fit py-2 px-2.5 text-[0.8rem] text-semi-white bg-[#252525] rounded-md capitalize flex items-center justify-center' onClick={() => copyFunction()}>
                                        {!copy && <MdContentCopy />}
                                        {copy && <FaCheck />}
                                    </button>
                                </div>}
                                {Object.values(selectValue).length !== 0 && <div>
                                    <div className='text-[0.8rem] text-center'>or scan qr code:</div>
                                    <div className='flex items-center justify-center'>
                                        <img src={selectValue.qr} className='h-32 w-auto'></img>
                                    </div>
                                </div>}
                                <div className='flex flex-col gap-2 items-center'>
                                    <div className='flex gap-2 items-center'>
                                        <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className={`${checkError === true ? 'outline outline-1 outline-[red] ' : ''}`}></input>
                                        <div className='text-[#252525] text-[0.8rem]'>I confirm to have made this deposit</div>
                                    </div>
                                    <div className='relative'>
                                        <button className='py-2 px-10 rounded-md bg-[#252525] text-white capitalize font-medium text-xs' onClick={CreateDeposit}>
                                            confirm my deposit
                                        </button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>}
                </div>
            </div>}
            {screen === 2 && <div className='mt-12'>
                <div className='relative w-fit mx-auto'>
                    <input className='border border-white bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 lg:text-[0.9rem] rounded-full text-white ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch}></input>
                    <div className='text-[1.2rem] text-white absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center bg-light shlz'>
                        <IoIosSearch />
                        {write &&
                            <div className='absolute top-[1.2rem] md:right-12 right-11 text-xs cursor-pointer bg-[#414040] rounded-full w-fit h-fit p-0.5' onClick={CancelWrite}>
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
                        {userDeposits.length > 0 && <tbody>
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
                    {userDeposits.length < 1 && <div className='flex gap-1 items-center text-white justify-center w-full h-fit bg-[#272727] py-2 text-[0.8rem] italic'>
                        <div>no deposits found...</div>
                        <img src={nothnyet} className='h-4 w-auto'></img>
                    </div>}
                </div>
                {userDeposits.length > 0 && <div className='flex gap-2 items-center text-xs mt-4 justify-end text-light '>
                    {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
                    {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
                    {end < userDeposits.length && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
                </div>}
            </div>
            }
        </div >
    )
}

export default Deposit