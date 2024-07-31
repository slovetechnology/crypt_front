import React, { useState } from 'react'
import { Apis, imageurl, PostApi } from '../../../services/API'
import { MdContentCopy } from 'react-icons/md'
import Loading from '../../../PageComponents/Loading'
import { FaAngleDown, FaAngleUp, FaCheck, FaXmark } from 'react-icons/fa6'
import { ADMINWALLETS, PROFILE, WALLET } from '../../../store'
import { Alert } from '../../../utils/utils'
import { useAtom } from 'jotai'

const DepositModal = ({ setModal, buybal, setToggle, setScreen, userDeposits, setUserDeposits, setDepositTitle, setStart, setEnd, setpagestart, setpageend, refetchDeposits, refetchWallet, refetchInvestments, refetchInvestmentsUnclaim, refetchNotifications, refetchUnreadNotis }) => {
    const [userwallet] = useAtom(WALLET)
    const [user] = useAtom(PROFILE)
    const [adminWallets] = useAtom(ADMINWALLETS)

    const [copy, setCopy] = useState(false)
    const [amount, setAmount] = useState('')
    const [check, setCheck] = useState('')
    const [checkError, setCheckError] = useState(false)
    const [amountError, setAmountError] = useState(false)
    const [selectState, setSelectState] = useState(false)
    const [selectValue, setSelectValue] = useState({})
    const [selectError, setSelectError] = useState(false)
    const [modalScreen, setmodalScreen] = useState(1)
    const [balanceError, setBalanceError] = useState(false)
    const [limitError, setLimitError] = useState(false)
    const [balCheck, setBalCheck] = useState(false)
    const [extCheck, setExtCheck] = useState(false)
    const [loading, setLoading] = useState(false)

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
        if (!balCheck) return setCheckError(true)
        if (Object.values(userwallet).length === 0) return setBalanceError(true)
        if (amount > userwallet.balance) return setBalanceError(true)

        if (buybal.title === 'test run') {
            const TestRunTrial = userDeposits.filter(item => item.trading_plan === 'test run')
            if (TestRunTrial.length > 0) return Alert('Request Failed', `Test Run plan is one trial only`, 'error')
        }
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

    const ProceedButton = async () => {
        setTimeout(() => {
            setLimitError(false)
            setAmountError(false)
        }, 1000)

        if (!amount) return setAmountError(true)
        if (isNaN(amount)) return setAmountError(true)
        if (amount < buybal.price_start) return setLimitError(true)
        if (amount > buybal.price_limit) return setLimitError(true)
        setmodalScreen(2)
    }

    const copyFunction = () => {
        setTimeout(() => {
            setCopy(false)
        }, 2000)
        navigator.clipboard.writeText(selectValue.address)
        setCopy(true)
    }


    const CreateDeposit = async () => {
        setTimeout(() => {
            setAmountError(false)
            setCheckError(false)
            setSelectError(false)
        }, 1000)

        if (Object.values(selectValue).length === 0) return setSelectError(true)
        if (!check) return setCheckError(true)

        if (buybal.title === 'test run') {
            const TestRunTrial = userDeposits.filter(item => item.trading_plan === 'test run')
            if (TestRunTrial.length > 0) return Alert('Request Failed', `Test Run plan is one trial only`, 'error')
        }

        const formbody = {
            amount: parseFloat(amount),
            trading_plan: buybal.title,
            crypto: selectValue.crypto,
            from: 'external source',
            deposituser: user.username
        }

        setLoading(true)

        try {
            const response = await PostApi(Apis.deposit.create_deposit, formbody)
            if (response.status === 200) {
                setUserDeposits(response.msg)
                Alert('Request Successful', `Deposit successful`, 'success')
                setDepositTitle('deposit history')
                refetchDeposits()
                refetchInvestments()
                refetchInvestmentsUnclaim()
                refetchNotifications()
                refetchWallet()
                refetchUnreadNotis()
                setScreen(2)
                setpageend(response.msg.length / 6)
                setpagestart(1)
                setStart(0)
                setEnd(6)
                setModal(false)
            } else {
                Alert('Request Failed', `${response.msg}`, 'error')
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }

    }


    return (
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center bg-[#0c091aa4] z-20'>
            <div className='w-96 h-fit bg-white rounded-lg px-4 py-4 flex flex-col gap-4 relative'>
                {loading && <Loading />}
                <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => setModal(false)} />
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
                            {Object.values(userwallet).length !== 0 && <div>${userwallet.balance.toLocaleString()}</div>}
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
                    <div className='flex gap-1.5 items-center pb-1 border-b'>
                        <span className='text-xs italic'>for</span>
                        <span className='text-sm capitalize font-medium'>{buybal.title}</span>
                        <span className='text-sm capitalize font-medium'>${amount}</span>
                    </div>
                    <div className='h-fit w-fit rounded-[0.2rem] bg-[#eeeded] p-1'>
                        <div className={`flex flex-col gap-1 ${selectState ? 'h-[5.75rem] overflow-y-auto scroll' : 'h-[1.6rem]'}  w-52 px-2 py-1  bg-white shantf rounded-[0.2rem]   text-black ${selectError && 'border border-[red]'} trans`}>
                            <div className={`${selectState && 'border-b border-[#c7c6c6]'}  cursor-pointer `} onClick={() => setSelectState(!selectState)} >
                                <div className='flex justify-between items-center capitalize text-[0.8rem] font-[550]'>
                                    <span >choose cryptocurrency</span>
                                    {!selectState && <FaAngleDown className='text-[0.7rem]' />}
                                    {selectState && <FaAngleUp className='text-[0.7rem]' />}
                                </div>
                            </div>
                            {selectState && <div>
                                {adminWallets.length > 0 && <>
                                    {adminWallets.map((item, i) => (
                                        <div className='flex flex-col mt-1' key={i}>
                                            <div className='flex gap-2 items-center cursor-pointer hover:bg-semi-white' onClick={() => { setSelectState(false); setSelectValue(item) }}>
                                                <img src={`${imageurl}/cryptocurrency/${item.crypto_img}`} className='h-auto w-4'></img>
                                                <div className='text-[0.85rem] font-bold capitalize'>{item.crypto}</div>
                                            </div>
                                        </div>
                                    ))}
                                </>}
                            </div>}
                        </div>
                    </div>
                    {Object.values(selectValue).length !== 0 && <div className='text-[0.8rem] text-center'>Your <span className='capitalize'>{selectValue.crypto}</span> deposit address for <span className='capitalize'>{selectValue.network}</span>, copy below:</div>}
                    {Object.values(selectValue).length !== 0 && <div className='flex gap-2 items-center'>
                        <div className='text-xs text-[#5BB4FD]'>{selectValue.address}</div>
                        <button className='outline-none w-fit h-fit py-2 px-2.5 text-[0.8rem] text-semi-white bg-[#252525] rounded-md capitalize flex items-center justify-center' onClick={() => copyFunction()}>
                            {!copy && <MdContentCopy />}
                            {copy && <FaCheck />}

                        </button>
                    </div>}
                    {Object.values(selectValue).length !== 0 && <div>
                        <div className='text-[0.8rem] text-center' onClick={() => console.log(selectValue)}>or scan qr code:</div>
                        <div className='flex items-center justify-center'>
                            <img src={`${imageurl}/cryptocurrency/${selectValue.qrcode_img}`} className='h-32 w-auto'></img>
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
        </div>
    )
}

export default DepositModal