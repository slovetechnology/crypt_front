import { useAtom } from 'jotai'
import React, { useCallback, useEffect, useState } from 'react'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { IoIosSearch } from 'react-icons/io'
import { IoCheckbox } from 'react-icons/io5'
import { RiHistoryFill } from 'react-icons/ri'
import { ADMINSTORE, ADMINWALLETS, PROFILE, WALLET, WITHDRAWALS } from '../../../store'
import { MdSentimentVeryDissatisfied } from 'react-icons/md'
import moment from 'moment'
import LoadingAdmin from '../../../GeneralComponents/LoadingAdmin'
import { Alert } from '../../../utils/utils'
import { Apis, imageurl, PostApi, UserGetApi } from '../../../services/API'
import { FiX } from 'react-icons/fi'
import wthwallet from '../../../assets/images/wthwallet.png'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { SiBitcoincash } from "react-icons/si";
import nothnyet from '../../../assets/images/nothn.png'
import Dashboard from './Dashboard'
import { Link } from 'react-router-dom'
import { TbTransferOut } from "react-icons/tb";

const Withdraw = () => {
    const [user] = useAtom(PROFILE)
    const [fromAtom, setFromAtom] = useAtom(WITHDRAWALS)
    const [withdrawals, setWithdrawals] = useState([])
    const [userwallet] = useAtom(WALLET)
    const [adminWallets] = useAtom(ADMINWALLETS)
    const [adminStore] = useAtom(ADMINSTORE)

    const [withdrawTitle, setWithdrawTitle] = useState('withdraw')
    const [screen, setScreen] = useState(1)
    const [amount, setAmount] = useState('')
    const [selectState, setSelectState] = useState(false)
    const [selectValue, setSelectValue] = useState({})
    const [walletAddress, setWalletAddress] = useState('')
    const [check, setCheck] = useState('')
    const [error, setError] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [search, setSearch] = useState('')
    const [write, setWrite] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [pagestart, setpagestart] = useState(1)
    const [pageend, setpageend] = useState(0)
    const [loading, setLoading] = useState(false)



    const FetchWithdrawals = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.withdrawal.user_withdrawals)
            if (response.status === 200) {
                setWithdrawals(response.msg)
                setFromAtom(response.msg)
                setpageend(response.msg.length / end)
            }

        } catch (error) {
            //
        }
    }, [])

    useEffect(() => {
        FetchWithdrawals()
    }, [FetchWithdrawals])

    const makeWithdrawal = async () => {
        setTimeout(() => {
            setError('')
        }, 1000)

        if (!amount) return setError('amount')
        if (isNaN(amount)) return setError('amount')
        if (amount < adminStore.withdrawal_minimum) return setError('amount')
        if (Object.values(userwallet).length === 0) return setError('limit')
        if (amount > userwallet.balance) return setError('limit')
        if (Object.values(selectValue).length === 0) return setError('select')
        if (!walletAddress) return setError('wallet')
        if (!check) return setError('check')
        if (user.email_verified === 'false') return setErrorMsg('Complete account verification to continue')

        const formbody = {
            amount: parseFloat(amount),
            wallet_address: walletAddress,
            crypto: selectValue.crypto,
            network: selectValue.network,
            wthuser: user.username
        }

        setLoading(true)
        try {
            const response = await PostApi(Apis.withdrawal.make_withdrawal, formbody)
            if (response.status === 200) {
                FetchWithdrawals()
                Alert('Request Successful', 'Withdrawal success', 'success')
                setAmount('')
                setWalletAddress('')
                setCheck(!check)
                setSelectValue({})
                setWithdrawTitle('withdrawal history')
                setScreen(2)
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
        const altwithdrawals = fromAtom
        if (!search) {
            setWrite(false)
            setWithdrawals(fromAtom)
            setpageend(fromAtom.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
        else {
            setWrite(true)
            const showSearch = altwithdrawals.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.crypto.includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()))
            setWithdrawals(showSearch)
            setpageend(showSearch.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setWrite(false)
        setWithdrawals(fromAtom)
        setpageend(fromAtom.length / 6)
        setpagestart(1)
        setStart(0)
        setEnd(6)
    }

    let MovePage = () => {

        if (end < withdrawals.length) {
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
        <Dashboard>
            <div className='pt-10 h-screen'>
                <div className='flex justify-between items-center'>
                    <div className='uppercase font-bold md:text-2xl text-lg text-semi-white '>{withdrawTitle}</div>
                    {screen === 1 ? <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => { setScreen(2); setWithdrawTitle('withdawal history') }}>
                        <span>history</span>
                        <RiHistoryFill />
                    </div>
                        :
                        <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => { setScreen(1); setWithdrawTitle('withdaw') }}>
                            <span>withdraw</span>
                            <BiMoneyWithdraw />
                        </div>}
                </div>
                {screen === 1 &&
                    <div className='mt-10 text-black font-medium h-fit w-fit mx-auto bg-semi-white shlz rounded-xl overflow-hidden relative'>
                        {loading && <LoadingAdmin />}
                        <div className='md:text-2xl text-xl text-black font-bold uppercase bg-white w-full h-fit py-1 px-4 rounded-b-sm rounded-t-lg border-b border-light mx-auto flex flex-col gap-2'>
                            <div className='w-fit h-fit text-xs font-medium py-2 px-6 capitalize bg-[#252525] rounded-lg text-white flex items-center gap-1.5 justify-between ml-auto'>
                                <span>minimum:</span>
                                <span>${adminStore.withdrawal_minimum}</span>
                            </div>
                            <div className='flex items-center justify-center gap-2 border-t pt-2'>
                                <span>Withdraw funds</span>
                                <TbTransferOut className='text-light' />
                            </div>
                        </div>
                        <div className='flex flex-col items-center py-6 md:px-16 px-4'>
                            <div className='flex gap-3 items-center'>
                                <div className='flex flex-col gap-2'>
                                    <div className='text-[0.85rem] capitalize text-center'>enter an amount</div>
                                    <div className='relative'>
                                        <input className={`outline-none border bg-transparent lg:text-[0.85rem] md:w-full w-40 px-2 h-8 rounded-[5px] ${error === 'amount' ? 'border-[red]' : 'border-light'}`} value={amount} onChange={e => setAmount(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className={`w-fit h-fit rounded-md flex flex-col py-2 justify-center items-center md:px-4 px-3 text-semi-white gap-1 bg-light ${error === 'limit' ? 'border border-[red]' : ''}`}>
                                    <div className='flex  justify-center items-center gap-1'>
                                        <div className='md:text-[0.85rem] text-xs font-[600]'>withdrawable</div>
                                        <img src={wthwallet} className='md:h-6 h-4 w-auto'></img>
                                    </div>
                                    <div className='flex items-center justify-center md:text-base text-sm'>
                                        {Object.values(userwallet).length !== 0 && <div>${userwallet.balance.toLocaleString()}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='h-fit w-fit rounded-[0.2rem] bg-white mt-10 p-1'>
                                <div className={`relative w-52 py-1  bg-white shantf rounded-[0.2rem] text-black  ${error === 'select' && 'border border-[red]'}`}>
                                    <div className='cursor-pointer' onClick={() => setSelectState(!selectState)} >
                                        <div className='flex gap-1.5 justify-center items-center capitalize text-[0.8rem] font-semibold'>
                                            <span >choose cryptocurrency</span>
                                            <SiBitcoincash className='text-light' />
                                        </div>
                                    </div>
                                    {selectState && <div className='absolute top-0 left-0 h-fit w-full bg-white border border-[lightgrey]  rounded-md z-50'>
                                        {adminWallets.length > 0 && <>
                                            {adminWallets.map((item, i) => (
                                                <div className={`flex flex-col px-2 py-0.5 hover:bg-[#e6e5e5] ${i === adminWallets.length - 1 ? 'hover:rounded-b-md' : 'border-b border-[#ebeaea]'}`} key={i}>
                                                    <div className='flex gap-2 items-center cursor-pointer' onClick={() => { setSelectState(false); setSelectValue(item) }}>
                                                        <img src={`${imageurl}/cryptocurrency/${item.crypto_img}`} className='h-auto w-4'></img>
                                                        <div className='text-[0.85rem] font-bold capitalize'>{item.crypto}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>}
                                    </div>}
                                </div>
                            </div>
                            {Object.values(selectValue).length !== 0 && <div className='flex flex-col gap-2 items-center mt-8'>
                                <div className='text-[0.85rem] text-center'>Enter your wallet address for <span className=' capitalize'>{selectValue.network}</span> below</div>
                                <input className={`outline-none border bg-transparent lg:text-[0.85rem] w-full h-8 rounded-md px-2  ${error === 'wallet' ? 'border-[red]' : 'border-light'}`} value={walletAddress} onChange={e => setWalletAddress(e.target.value)} type='text'></input>
                            </div>}
                            <div className='flex flex-col gap-1 items-center relative mt-10'>
                                <div className='flex gap-1.5 items-center'>
                                    <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className={`${error === 'check' ? 'outline outline-1 outline-[red]' : ''}`}></input>
                                    <div className='text-[#252525] text-[0.8rem]'>I provided my correct wallet address</div>
                                </div>
                                <button className='outline-none w-fit h-fit py-2 px-8 md:text-base text-sm text-semi-white bg-[#252525] rounded-md capitalize flex items-center gap-1 font-bold' onClick={makeWithdrawal}>
                                    <span>make withdrawal</span>
                                    <IoCheckbox />
                                </button>
                                <Link to='/dashboard/verify-account'>
                                    <div className='absolute -bottom-8 left-0 text-[0.8rem] font-[600] text-[red] cursor-pointer flex gap-1 items-center'>
                                        <span>{errorMsg}</span>
                                        {errorMsg !== '' && <MdSentimentVeryDissatisfied />}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
                {screen === 2 && <div className='mt-12'>
                    <div className='relative w-fit mx-auto'>
                        <input className='border border-white bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 lg:text-[0.9rem] rounded-full text-white ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
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
                            {withdrawals.length > 0 &&
                                <tbody>
                                    {withdrawals.slice(start, end).map((item, i) => (
                                        <tr className='text-[0.8rem]  text-semi-white bg-[#272727] even:bg-[#313131]' key={i}>
                                            <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                                            <td className='p-4  text-center truncate'>{moment(item.createdAt).format('h:mm')}</td>
                                            <td className='p-4  text-center truncate'>${item.amount.toLocaleString()}</td>
                                            <td className='p-4  text-center truncate'>{item.crypto}</td>
                                            <td className='p-4  text-center truncate'>{item.wallet_address?.slice(0, 5)}.....{item.wallet_address?.slice(-10)} </td>
                                            <td className={`p-4  text-center truncate italic ${item.status === 'confirmed' && 'text-[#adad40]'}  ${item.status === 'processing' && 'text-[#6f6ff5]'}  ${item.status === 'failed' && 'text-[#eb4242] '}`}>{item.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            }
                            {withdrawals.length < 1 &&
                                <tbody>
                                    <tr className='text-semi-white text-[0.8rem] bg-[#272727] '>
                                        <td colSpan="6" className='py-2 italic text-center truncate'>
                                            <div className='flex gap-1 items-center justify-center'>
                                                <span>no withdrawals found...</span>
                                                <img src={nothnyet} className='h-4 w-auto'></img>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            }
                        </table>
                    </div>
                    {withdrawals.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-light '>
                        {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
                        {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
                        {end < withdrawals.length && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
                    </div>}
                </div>}
            </div>
        </Dashboard>
    )
}

export default Withdraw