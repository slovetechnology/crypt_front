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
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'
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
    const [wallet, setWallet] = useState('')
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
        if (selectValue === '') return setSelectError(true)
        if (!wallet) return setWalletError(true)
        if (!check) return setCheckError(true)
        if (user.email_verified === 'false') return setWithdrawError('Verify your account to complete withdrawal')

        const formbody = {
            amount: parseFloat(amount),
            wallet_address: wallet,
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
                setWallet('')
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
            const showSearch = allwithdrawals.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.crypto.includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()))
            setAllWithdrawals(showSearch)
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
        <div className={`pt-[2.5rem] h-screen z-10`}>
            <div className='flex justify-between items-center'>
                <div className='uppercase font-bold text-[1.5rem] text-[#e0dfdf] '>{withdraw}</div>
                {screen === 1 ? <div className='flex gap-1 capitalize font-bold text-[0.9rem] text-[#7665D5] items-center justify-center mt-[1rem] cursor-pointer' onClick={() => { setScreen(2); setWithdraw('withdawal history') }}>
                    <span>withdrawal history</span>
                    <RiHistoryFill />
                </div>
                    :
                    <div className='flex gap-1 capitalize font-bold text-[0.9rem] text-[#7665D5] items-center justify-center mt-[1rem] cursor-pointer' onClick={() => { setScreen(1); setWithdraw('withdawal') }}>
                        <span>make withdrawal</span>
                        <BiMoneyWithdraw />
                    </div>}
            </div>
            {screen === 1 && <div className='w-[80%] mx-auto mt-[2.5rem]  relative flex items-center justify-center bgdeposit'>
                {loading && <LoadingAdmin />}
                <div className='flex  flex-col  text-[#e0dfdf]  items-center h-fit w-fit bg-[#0E0B1C] shlz p-[3rem] rounded-xl'>
                    <div className='flex gap-3 '>
                        <div className='relative flex flex-col gap-2'>
                            <div className='text-[0.9rem] capitalize text-center'>enter an amount</div>
                            <input className={`outline-none border  bg-[#0C091A] text-[0.85rem] w-[15rem] h-[2rem] rounded-[5px] pl-[1.3rem] ${amountError ? 'border-[red]' : 'border-[#7665D5]'}`} value={amount} onChange={e => setAmount(e.target.value)}></input>
                            <div className='absolute top-[2.25rem] left-2 text-[0.85rem]'>$</div>
                        </div>
                        <div className={`w-full h-[fit] rounded-[5px] flex flex-col text-[1rem] py-[0.5rem]  px-[1rem] text-[#e0dfdf] gap-1 bg-[#312b57] ${limitError ? 'border border-[red]' : ''}`}>
                            <div className='flex justify-between items-center gap-1'>
                                <div className=' text-[0.85rem] font-[600]'>withdrawable</div>
                                <img src={wthwallet} className='h-[1.5rem] w-auto'></img>
                            </div>

                            <div className='flex items-center justify-center'>
                                <BiDollar className='text-[1rem]' />
                                <div>{userwallet.balance.toLocaleString()}</div>
                            </div>

                        </div>
                    </div>
                    <div className='h-fit w-fit rounded-[0.2rem] bg-[grey] mt-[2.5rem] p-1'>
                        <div className={`flex flex-col gap-1 ${selectState ? 'h-[5.75rem] overflow-y-auto scroll' : 'h-[1.6rem]'}  w-[13rem] px-[0.5rem] py-[0.25rem]  bg-[white] shlz rounded-[0.2rem] text-black  ${selectError && 'border border-[red]'} trans`}>
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
                                        <div className='flex gap-2 items-center cursor-pointer hover:bg-[#a1a0a0]' onClick={() => { setSelectState(false); setSelectValue(item) }}>
                                            <img src={item.img} className='h-auto w-[1rem]'></img>
                                            <div className='text-[0.85rem] font-bold capitalize'>{item.coin}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    </div>
                    {Object.values(selectValue).length !== 0 && <div className='flex flex-col gap-2 items-center mt-[2rem]'>
                        <div className='text-[0.9rem]  text-center'>Enter your wallet address for <span className=' capitalize'>{selectValue.network}</span> below</div>
                        <input className={`outline-none border bg-[#0C091A] text-[0.85rem] w-[24rem] h-[2rem] rounded-[5px] pl-[1rem]  ${walletError ? 'border-[red]' : 'border-[#7665D5]'}`} value={wallet} onChange={e => setWallet(e.target.value)} type='text'></input>
                    </div>}
                    <div className='flex flex-col gap-2 items-center relative mt-[2.5rem]'>
                        <div className='flex gap-2'>
                            <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className={`${checkError === true ? 'outline outline-1 outline-[red]' : ''}`}></input>
                            <div className='text-[#7665D5] text-[0.8rem]'>I confirm to have provide my correct wallet address</div>
                        </div>
                        <button className='outline-none w-fit h-fit py-[0.5rem] px-[2rem] text-[1rem] text-[#e0dfdf]  bg-[#7665D5] hover:bg-[#5d4faa] rounded-[5px] capitalize flex items-center gap-1 font-bold' onClick={makeWithdrawal}>
                            <span>make withdrawal</span>
                            <IoCheckbox className='text-[0.8rem]' />
                        </button>
                        <div className='absolute bottom-[-2rem] left-0 text-[0.8rem] font-bold text-[#b64040] cursor-pointer flex gap-1 items-center' onClick={() => setToggle('verify account')}>
                            <span>{withdrawError}</span>
                            {withdrawError !== '' && <MdSentimentVeryDissatisfied />}
                        </div>
                    </div>
                </div>
            </div>}
            {screen === 2 && <div className='w-[95%] mx-auto my-[2rem]'>
                <div className='flex gap-1 items-center capitalize text-[0.85rem] cursor-pointer text-[#7665D5] w-fit hover:text-[grey]' onClick={() => { setScreen(1); setWithdraw('withdraw') }}>
                    <IoMdArrowBack />
                    <span>back</span>
                </div>
                <div className='mt-[2rem]'>
                    <div className='relative w-fit mx-auto'>
                        <input className='border border-[white] bg-transparent w-[20rem] h-[2.5rem] outline-none pl-4 text-[0.9rem] rounded-[12rem] text-white ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
                        <div className='text-[1.2rem] text-[white] absolute top-[-0.5rem] right-[-0.5rem] w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center bg-[#7665D5] shlz'>
                            <IoIosSearch />
                            {write &&
                                <div className='absolute top-[1.2rem] right-[3rem] text-[0.75rem] cursor-pointer bg-[#414040] rounded-[50%] w-[1rem] h-[1rem] flex items-center justify-center' onClick={CancelWrite}>
                                    <FiX />
                                </div>
                            }
                        </div>
                    </div>
                    <div className='relative overflow-x-auto shadow-md rounded-lg mt-[1rem] scrollsdown'>
                        <table className='w-full'>
                            <thead>
                                <tr className='bg-[#7665D5] text-[0.8rem] font-bold text-[white]'>
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
                                    <tr className='text-[0.8rem]  text-[#e0dfdf] bg-[#272727] even:bg-[#313131]' key={i}>
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
                        {fromAtom.length < 1 && <div className='flex gap-1 items-center text-white justify-center w-full h-fit bg-[#272727] px-[1rem] py-[0.5rem] text-[0.8rem] italic'>
                            <div>no withdrawals made yet...</div>
                            <img src={nothnyet} className='h-[1rem] w-auto'></img>
                        </div>}
                    </div>
                    <div className='flex flex-col gap-1 text-[0.75rem] py-4'>
                        {Math.ceil(pagelengthend) > 1 && <div className='flex justify-end font-bold text-[grey]'>{pagelengthstart} of {Math.ceil(pagelengthend)}</div>}
                        <div className='flex items-center justify-end  gap-2 text-white '>
                            {pagelengthstart > 1 && <button className='w-fit h-fit py-[0.25rem] px-[1rem] rounded-[10rem] bg-[#7665D5] hover:bg-[#4e438d] capitalize' onClick={BackPage}>prev</button>}
                            {end < allwithdrawals.length && <button className='w-fit h-fit py-[0.25rem] px-[1rem] rounded-[10rem] bg-[#7665D5] hover:bg-[#4e438d] capitalize' onClick={MovePage}>next</button>}
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Withdraw