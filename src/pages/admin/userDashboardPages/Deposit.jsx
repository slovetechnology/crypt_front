import React, { useCallback, useEffect, useState } from 'react'
import { RiHistoryFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { useAtom } from 'jotai';
import { DEPOSITS, TRADINGPLANS } from '../../../store';
import { MoveToTopDivs } from '../../../utils/utils';
import moment from 'moment';
import { FaAngleLeft, FaAngleRight, FaRegCopyright } from 'react-icons/fa6';
import { FiX } from "react-icons/fi";
import nothnyet from '../../../assets/images/nothn.png'
import { TbListDetails } from "react-icons/tb";
import { BsCurrencyDollar } from "react-icons/bs";
import { SiBitcoincash } from "react-icons/si";
import Dashboard from './Dashboard';
import { Apis, UserGetApi } from '../../../services/API';
import FundModal from '../../../UserComponents/DepositModals/FundModal';
import BuyPlanModal from '../../../UserComponents/DepositModals/BuyPlanModal';


const Deposit = () => {
    const [fromAtom, setFromAtom] = useAtom(DEPOSITS)
    const [deposits, setDeposits] = useState([])
    const [tradingPlans] = useAtom(TRADINGPLANS)

    const [depositTitle, setDepositTitle] = useState('deposit')
    const [screen, setScreen] = useState(1)
    const [search, setSearch] = useState('')
    const [write, setWrite] = useState(false)
    const [buybal, setBuyBal] = useState({})
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [pagestart, setpagestart] = useState(1)
    const [pageend, setpageend] = useState(0)


    const FetchDeposits = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.deposit.user_deposits)
            if (response.status === 200) {
                setDeposits(response.msg)
                setFromAtom(response.msg)
                setpageend(response.msg.length / end)
                setpagestart(1)
                setStart(0)
                setEnd(6)
            }

        } catch (error) {
            //
        }
    }, [])

    useEffect(() => {
        FetchDeposits()
    }, [FetchDeposits])

    const HandleSearch = () => {
        const altdeposits = fromAtom
        if (!search) {
            setWrite(false)
            setDeposits(fromAtom)
            setpageend(fromAtom.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
        else {
            setWrite(true)
            const showSearch = altdeposits.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.crypto.includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()))
            setDeposits(showSearch)
            setpageend(showSearch.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setWrite(false)
        setDeposits(fromAtom)
        setpageend(fromAtom.length / 6)
        setpagestart(1)
        setStart(0)
        setEnd(6)
    }

    let MovePage = () => {

        if (end < deposits.length) {
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
                {screen === 1 &&
                    <div className='my-10 h-fit w-fit mx-auto bg-semi-white rounded-xl relative shlz thediv'>
                        {modal2 && <FundModal closeView={() => setModal2(false)} setScreen={setScreen} setDepositTitle={setDepositTitle} refetchDeposits={FetchDeposits} />}
                        {modal &&
                            <BuyPlanModal setModal={setModal} buybal={buybal} />
                        }
                        <div className='md:text-2xl text-xl text-black font-bold uppercase bg-white w-full h-fit py-1 px-4 rounded-b-sm rounded-t-lg border-b border-[#5BB4FD] mx-auto flex flex-col gap-2'>
                            <button className='w-fit h-fit md:text-sm text-xs font-medium py-2 px-6 capitalize bg-[#252525] rounded-lg text-white flex items-center gap-1.5 justify-center ml-auto' onClick={() => { setModal2(true); MoveToTopDivs() }}>
                                <span>fund wallet</span>
                                <SiBitcoincash />
                            </button>
                            <div className='flex items-center justify-center gap-2 border-t pt-2'>
                                <span>buy trading plans</span>
                                <TbListDetails className='text-[#5BB4FD]' />
                            </div>
                        </div>
                        <div className={`w-full h-[26rem] flex flex-col gap-8 pt-6 items-center ${modal || modal2 ? 'overflow-y-hidden' : 'overflow-y-auto'} scrollDiv`}>
                            <div className='grid grid-cols-2 md:gap-4 gap-2 justify-center md:px-4 px-3'>
                                {tradingPlans.length > 0 &&
                                    <>
                                        {tradingPlans.map((item, i) => (
                                            <div key={i}>
                                                <div className='md:w-52 w-36 h-fit rounded-lg flex flex-col text-white shantf bg-white'>
                                                    <div className='plan_bg w-full md:h-20 h-16 rounded-t-lg'>
                                                        <div className='uppercase font-[800]  text-center md:text-[1.1rem] text-sm pt-4'>{item.title}</div>
                                                    </div>
                                                    <div className='-mt-6 flex flex-col gap-2 items-center justify-center'>
                                                        <div className='md:h-[5.1rem] md:w-[5.1rem] w-[4.5rem] h-[4.5rem] rounded-full bg-white flex items-center justify-center'>
                                                            <div className='md:h-[4.3rem] md:w-[4.3rem] w-[3.7rem] h-[3.7rem] rounded-full bg-[#252525] flex flex-col gap-1 items-center justify-center'>
                                                                <div className='italic md:text-[0.65rem] text-[0.6rem]'>from</div>
                                                                <div className='flex items-center font-bold gap-[0.1rem] text-[#5BB4FD] md:text-base text-sm'>
                                                                    <BsCurrencyDollar className='-mt-0.5' />
                                                                    <div className='md:text-base text-sm -ml-1'>{item.price_start}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='text-xs text-[#252525] font-medium text-center w-11/12 border py-1 rounded-md'>
                                                            {item.profit_percentage}% profit return on investment plus bonus up to ${item.plan_bonus}
                                                        </div>
                                                        <div className='text-[0.7rem] text-[#252525] font-medium w-11/12 flex gap-2 items-center justify-center italic'>
                                                            <span>Duration:</span>
                                                            <span className='text-[#5BB4FD]'>{item.duration + item.duration_type}</span>
                                                        </div>
                                                        <div className='mb-4 mt-2'>
                                                            <button className='w-fit h-fit py-1.5 md:px-6 px-4 rounded-full bg-[#5BB4FD] text-white uppercase font-bold md:text-[0.65rem] text-[0.6rem]' onClick={() => { setBuyBal(item); setModal(true); MoveToTopDivs() }}>
                                                                buy now
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>}
                            </div>
                            {tradingPlans.length > 0 && <div className='bg-white w-full h-fit py-1 rounded-t-sm rounded-b-lg border-t border-[#5BB4FD] flex gap-1 items-center justify-center font-bold text-xs'>
                                <FaRegCopyright className='text-[#5BB4FD]' />
                                <div>2024, Al Algo, All rights reserved.</div>
                            </div>}
                        </div>
                    </div>
                }
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
                                    <td className='text-center truncate  capitalize p-2'>crypto</td>
                                    <td className='text-center truncate  capitalize p-2'>address</td>
                                    <td className='text-center truncate  capitalize p-2'>status </td>
                                </tr>
                            </thead>
                            {deposits.length > 0 &&
                                <tbody>
                                    {deposits.slice(start, end).map((item, i) => (
                                        <tr className='text-[0.8rem] text-semi-white bg-[#272727] even:bg-[#313131]' key={i}>
                                            <td className='p-4 text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                                            <td className='p-4 text-center truncate'>{moment(item.createdAt).format('h:mm')}</td>
                                            <td className='p-4 text-center truncate'>${item.amount.toLocaleString()}</td>
                                            <td className='p-4 text-center truncate'> {item.crypto}</td>
                                            <td className='p-4  text-center truncate'>{item.deposit_address?.slice(0, 5)}.....{item.deposit_address?.slice(-10)} </td>
                                            <td className={`p-4  text-center truncate italic ${item.status === 'confirmed' && 'text-[#adad40]'}  ${item.status === 'pending' && 'text-[#6f6ff5]'}  ${item.status === 'failed' && 'text-[#eb4242] '} `}>{item.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            }
                            {deposits.length < 1 &&
                                <tbody>
                                    <tr className='text-semi-white text-[0.8rem] bg-[#272727] '>
                                        <td colSpan="6" className='py-2 italic text-center truncate'>
                                            <div className='flex gap-1 items-center justify-center'>
                                                <span>no deposits found...</span>
                                                <img src={nothnyet} className='h-4 w-auto'></img>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            }
                        </table>
                    </div>
                    {deposits.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-light '>
                        {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
                        {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
                        {end < deposits.length && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
                    </div>}
                </div>
                }
            </div >
        </Dashboard >
    )
}

export default Deposit