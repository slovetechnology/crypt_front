import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { BiDollar, BiMoneyWithdraw } from 'react-icons/bi'
import { IoIosSearch, IoMdArrowBack } from 'react-icons/io'
import { IoCheckbox } from 'react-icons/io5'
import { RiHistoryFill } from 'react-icons/ri'
import { PROFILE, WALLET, WITHDRAWALS } from '../../../store'
import { MdSentimentVeryDissatisfied } from 'react-icons/md'
import moment from 'moment'
import LoadingAdmin from '../../../PageComponents/LoadingAdmin'
import { Alert } from '../../../utils/utils'
import { Apis, PostApi } from '../../../services/API'
import { FiX } from 'react-icons/fi'
import wthwallet from '../../../assets/images/wthwallet.png'
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from 'react-icons/fa6'
import { supportedCoins } from '../../../services/Miscellaneous'
import nothnyet from '../../../assets/images/nothn.png'

const Withdraw = ({ setToggle, refetchWithdrawals, refetchNotifications, refetchUnreadNotis, refetchWallet, urlState }) => {
    const [user] = useAtom(PROFILE)
    const [fromAtom] = useAtom(WITHDRAWALS)
    const [userwallet] = useAtom(WALLET)
    const [allwithdrawals, setAllWithdrawals] = useState(fromAtom)
    const [check, setCheck] = useState('')
    const [checkError, setCheckError] = useState(false)
    const [amount, setAmount] = useState('')
    const [amountError, setAmountError] = useState(false)
    const [walletAddress, setWalletAddress] = useState('')
    const [walletError, setWalletError] = useState(false)
    const [selectState, setSelectState] = useState(false)
    const [selectValue, setSelectValue] = useState({})
    const [selectError, setSelectError] = useState(false)
    const [withdraw, setWithdraw] = useState('withdraw')
    const [withdrawError, setWithdrawError] = useState('')
    const [limitError, setLimitError] = useState(false)
    const [screen, setScreen] = useState(urlState ? 2 : 1)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [write, setWrite] = useState(false)


    const makeWithdrawal = async () => {
        setTimeout(() => {
            setAmountError(false)
            setCheckError(false)
            setWalletError(false)
            setSelectError(false)
            setLimitError(false)
        }, 1000)
        if (!amount) return setAmountError(true)
        if (amount < 20) return setAmountError(true)
        if (amount > userwallet.balance) return setLimitError(true)
        if (Object.values(selectValue).length === 0) return setSelectError(true)
        if (!walletAddress) return setWalletError(true)
        if (!check) return setCheckError(true)
        if (user.email_verified === 'false') return setWithdrawError('Verify your account to complete withdrawal')

        const formbody = {
            amount: parseFloat(amount),
            wallet_address: walletAddress,
            crypto: selectValue.coin,
            network: selectValue.network,
            wthuser: user.username
        }

        setLoading(true)
        try {
            const response = await PostApi(Apis.withdrawal.make_withdrawal, formbody)
            if (response.status === 200) {
                setAllWithdrawals(response.msg)
                Alert('Request Successful', `Withdrawal successfully made`, 'success')
                setAmount('')
                setWalletAddress('')
                setCheck(!check)
                setSelectValue('')
                setWithdrawError('')
                setWithdraw('withdrawal history')
                refetchWithdrawals()
                refetchNotifications()
                refetchUnreadNotis()
                refetchWallet()
                setScreen(2)
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

    const HandleSearch = () => {

        if (!search) {
            setWrite(false)
            setAllWithdrawals(fromAtom)
            setPagelengthend(fromAtom.length / 6)
            setPagelengthstart(1)
            setStart(0)
            setEnd(6)
        }
        else {
            setWrite(true)
            const showSearch = allwithdrawals.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.crypto.includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()))
            setAllWithdrawals(showSearch)
            setPagelengthend(showSearch.length / 6)
            setPagelengthstart(1)
            setStart(0)
            setEnd(6)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setWrite(false)
        setAllWithdrawals(fromAtom)
        setPagelengthend(fromAtom.length / 6)
        setPagelengthstart(1)
        setStart(0)
        setEnd(6)
    }

    //
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [pagelengthstart, setPagelengthstart] = useState(1)
    const [pagelengthend, setPagelengthend] = useState(allwithdrawals.length / end)

    let MovePage = () => {

        if (end < allwithdrawals.length) {
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
        <div className={`py-10 h-screen`}>
            <div className='flex justify-between items-center'>
                <div className='uppercase font-bold md:text-2xl text-lg text-semi-white '>{withdraw}</div>
                {screen === 1 ? <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => { setScreen(2); setWithdraw('withdawal history') }}>
                    <span>history</span>
                    <RiHistoryFill />
                </div>
                    :
                    <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => { setScreen(1); setWithdraw('withdawal') }}>
                        <span>withdraw</span>
                        <BiMoneyWithdraw />
                    </div>}
            </div>
            {screen === 1 && <div className='w-[80%] mx-auto mt-10 relative flex items-center justify-center bgdeposit'>
                {loading && <LoadingAdmin />}
                <div className='text-black font-medium h-fit w-[30rem] bg-semi-white shlz rounded-xl overflow-hidden'>
                    <div className='flex flex-col items-center md:p-12 p-4'>
                        <div className='flex gap-3 items-center'>
                            <div className='flex flex-col gap-2'>
                                <div className='text-[0.85rem] capitalize text-center'>enter an amount</div>
                                <div className='relative'>
                                    <input className={`outline-none border  bg-transparent lg:text-[0.85rem] w-full px-5 h-8 rounded-[5px] ${amountError ? 'border-[red]' : 'border-light'}`} value={amount} onChange={e => setAmount(e.target.value)}></input>
                                    <div className='absolute top-1.5 left-2 text-[0.85rem]'>$</div>
                                </div>
                            </div>
                            <div className={`w-fit h-fit rounded-[5px] flex flex-col py-2 justify-center items-center px-4 text-semi-white gap-1 bg-[#252525] ${limitError ? 'border border-[red]' : ''}`}>
                                <div className='flex  justify-center items-center gap-1'>
                                    <div className='md:text-[0.85rem] text-xs font-[600]'>withdrawable</div>
                                    <img src={wthwallet} className='md:h-6 h-3 w-auto'></img>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <BiDollar className='md:text-base text-sm' />
                                    {Object.values(userwallet).length !== 0 && <div>{userwallet.balance.toLocaleString()}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='h-fit w-fit rounded-[0.2rem] bg-white mt-10 p-1'>
                            <div className={`flex flex-col gap-1 ${selectState ? 'h-[5.75rem] overflow-y-auto scroll' : 'h-[1.6rem]'}  w-[13rem] px-2 py-1  bg-white shantf rounded-[0.2rem] text-black  ${selectError && 'border border-[red]'} trans`}>
                                <div className={`${selectState && 'border-b border-[#c7c6c6]'}  cursor-pointer `} onClick={() => setSelectState(!selectState)} >
                                    <div className='flex justify-between items-center capitalize text-[0.8rem]  font-[550]'>
                                        <span >choose cryptocurrency</span>
                                        {!selectState && <FaAngleDown className='text-[0.7rem]' />}
                                        {selectState && <FaAngleUp className='text-[0.7rem]' />}
                                    </div>
                                </div>
                                {selectState && <div>
                                    {supportedCoins.map((item, i) => (
                                        <div className='flex flex-col mt-1' key={i}>
                                            <div className='flex gap-2 items-center cursor-pointer hover:bg-[#a1a0a0]' onClick={() => { setSelectState(false); setSelectValue(item) }}>
                                                <img src={item.img} className='h-auto w-[1rem]'></img>
                                                <div className='text-[0.85rem] font-bold capitalize'>{item.coin}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>}
                            </div>
                        </div>
                        {Object.values(selectValue).length !== 0 && <div className='flex flex-col gap-2 items-center mt-8'>
                            <div className='text-[0.85rem] text-center'>Enter your wallet address for <span className=' capitalize'>{selectValue.network}</span> below</div>
                            <input className={`outline-none border bg-transparent lg:text-[0.85rem] w-full h-8 rounded-[5px] px-2  ${walletError ? 'border-[red]' : 'border-light'}`} value={walletAddress} onChange={e => setWalletAddress(e.target.value)} type='text'></input>
                        </div>}
                        <div className='flex flex-col gap-2 items-center relative mt-10'>
                            <div className='flex gap-2 items-center'>
                                <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className={`${checkError === true ? 'outline outline-1 outline-[red]' : ''}`}></input>
                                <div className='text-admin-btn text-[0.8rem]'>I confirm; I provide my correct wallet address</div>
                            </div>
                            <button className='outline-none w-fit h-fit py-2 px-8 md:text-base text-sm text-semi-white bg-[#252525] rounded-md capitalize flex items-center gap-1 font-bold' onClick={makeWithdrawal}>
                                <span>make withdrawal</span>
                                <IoCheckbox />
                            </button>
                            <div className='absolute -bottom-8 left-0 text-[0.8rem] font-bold text-[#b64040] cursor-pointer flex gap-1 items-center' onClick={() => setToggle('verify account')}>
                                <span>{withdrawError}</span>
                                {withdrawError !== '' && <MdSentimentVeryDissatisfied />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {screen === 2 && <div className='my-8'>
                <div className='flex gap-1 items-center capitalize md:text-[0.85rem] text-xs cursor-pointer text-light w-fit hover:text-[grey]' onClick={() => { setScreen(1); setWithdraw('withdraw') }}>
                    <IoMdArrowBack />
                    <span>back</span>
                </div>
                <div className='mt-8 md:mt-4 lg:mt-8'>
                    <div className='relative w-fit mx-auto'>
                        <input className='border border-white bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 lg:text-[0.9rem] rounded-[12rem] text-white ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
                        <div className='text-[1.2rem] text-white absolute top-[-0.5rem] right-[-0.5rem] w-10 h-10 rounded-full flex items-center justify-center bg-light shlz'>
                            <IoIosSearch />
                            {write &&
                                <div className='absolute top-[1.2rem] md:right-12 right-11  text-xs cursor-pointer bg-[#414040] rounded-full w-fit h-fit p-0.5' onClick={CancelWrite}>
                                    <FiX />
                                </div>
                            }
                        </div>
                    </div>
                    <div className='relative overflow-x-auto shadow-md rounded-lg mt-4 scrollsdown'>
                        <table className='w-full'>
                            <thead>
                                <tr className='bg-light text-[0.8rem] font-bold text-white'>
                                    <td className='text-center truncate  capitalize p-2'>date</td>
                                    <td className='text-center truncate  capitalize p-2'>time</td>
                                    <td className='text-center truncate  capitalize p-2'>amount</td>
                                    <td className='text-center truncate  capitalize p-2'>crypto</td>
                                    <td className='text-center truncate  capitalize p-2'>wallet address</td>
                                    <td className='text-center truncate  capitalize p-2'>status </td>
                                </tr>
                            </thead>
                            {fromAtom.length > 0 && <tbody>
                                {allwithdrawals.slice(start, end).map((item, i) => (
                                    <tr className='text-[0.8rem]  text-semi-white bg-[#272727] even:bg-[#313131]' key={i}>
                                        <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                                        <td className='p-4  text-center truncate'>{moment(item.createdAt).format('h:mm')}</td>
                                        <td className='p-4  text-center truncate flex items-center justify-center gap-[0.1rem]'><span className='text-[0.65rem]'>$</span> <span>{item.amount.toLocaleString()}</span></td>
                                        <td className='p-4  text-center truncate'>{item.crypto}</td>
                                        <td className='p-4  text-center truncate'>{item.wallet_address?.slice(0, 5)}.....{item.wallet_address?.slice(-10)} </td>
                                        <td className={`p-4  text-center truncate italic ${item.status === 'confirmed' && 'text-[#adad40]'}  ${item.status === 'pending' && 'text-[#6f6ff5]'}   ${item.status === 'failed' && 'text-[#eb4242] '}`}>{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                            }
                        </table>
                        {fromAtom.length < 1 && <div className='flex gap-1 items-center text-white justify-center w-full h-fit bg-[#272727] py-2 text-[0.8rem] italic'>
                            <div>no withdrawals made yet...</div>
                            <img src={nothnyet} className='h-4 w-auto'></img>
                        </div>}
                    </div>
                    {fromAtom.length > 0 && <div className='flex gap-2 items-center text-xs mt-4 justify-end text-light '>
                        {pagelengthstart > 1 && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
                        {Math.ceil(pagelengthend) > 1 && <div className='font-bold text-[grey]'>{pagelengthstart} of {Math.ceil(pagelengthend)}</div>}
                        {end < allwithdrawals.length && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
                    </div>}
                </div>
            </div>}
        </div>
    )
}

export default Withdraw