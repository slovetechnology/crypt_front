import React, { useState } from 'react'
import { BiDollar } from 'react-icons/bi'
import { RiHistoryFill } from "react-icons/ri";
import { IoListOutline } from "react-icons/io5";
import { useAtom } from 'jotai';
import { INVESTMENTS, INVESTMENTUNCLAIM } from '../../../store';
import deposit3d from '../../../assets/images/deposit3d.png'
import profit3d from '../../../assets/images/profit3d.png'
import bonus3d from '../../../assets/images/bonus3d.png'
import trading3d from '../../../assets/images/trading3d.png'
import { IoIosSearch, IoMdArrowBack } from "react-icons/io";
import moment from 'moment';
import { FiX } from 'react-icons/fi';
import investbg from '../../../assets/images/investbg.png'
import ClaimButtons from './ClaimButtons';
import nothnyet from '../../../assets/images/nothn.png'





const Investment = ({ setToggle, refetchInvestments, refetchNotifications, refetchUnreadNotis, refetchWallet, refetchUps, refetchInvestmentsUnclaim }) => {
    const [fromAtom] = useAtom(INVESTMENTS)
    const [investment, setInvestment] = useState(fromAtom)
    const [investmentUnclaim] = useAtom(INVESTMENTUNCLAIM)
    const [screen, setScreen] = useState(1)
    const [search, setSearch] = useState('')
    const [write, setWrite] = useState(false)
    const [investtitle, setInvestTitle] = useState('my investment')



    const HandleSearch = () => {
        if (!search) {
            setWrite(false)
            setInvestment(fromAtom)
            setPagelengthend(fromAtom.length / 6)
            setPagelengthstart(1)
            setStart(0)
            setEnd(6)

        } else {
            const showSearch = investment.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.trading_plan.includes(search.toLowerCase()) || item.profit_status.includes(search.toLowerCase()) || item.claim.includes(search.toLowerCase()))
            setInvestment(showSearch)
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
        setInvestment(fromAtom)
        setPagelengthend(fromAtom.length / 6)
        setPagelengthstart(1)
        setStart(0)
        setEnd(6)
    }

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [pagelengthstart, setPagelengthstart] = useState(1)
    const [pagelengthend, setPagelengthend] = useState(investment.length / end)

    let MoveNotisPage = () => {

        if (end < investment.length) {
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

    let BackNotisPage = () => {

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
        <div className={`py-[2.5rem] ${screen === 2 && 'h-screen'} ${investmentUnclaim.length > 2 ? 'h-fit' : 'h-screen'} z-10 `}>
            <div className='flex justify-between items-center'>
                <div className='uppercase font-bold text-[1.5rem] text-[#e0dfdf] '>{investtitle}</div>
                {screen === 1 && <div className='flex gap-1 capitalize font-bold text-[0.9rem] text-[#7665D5] items-center justify-center cursor-pointer' onClick={() => { setScreen(2); setInvestTitle('investment history') }}>
                    <span>investment history</span>
                    <RiHistoryFill className='text-[1.1rem]' />
                </div>}
                {screen === 2 && <div className='flex gap-1 capitalize font-bold text-[0.9rem] text-[#7665D5] items-center justify-center cursor-pointer' onClick={() => { setScreen(1); setInvestTitle('my investment') }}>
                    <span>investments</span>
                    <IoListOutline className='text-[1.1rem]' />
                </div>}
            </div>

            {screen === 1 && <div>
                {investmentUnclaim.length > 0 ? <div>
                    {investmentUnclaim.map((item, i) => (
                        <div className='flex flex-col gap-[1rem] my-[3rem] ' key={i}>
                            <div className='flex gap-2 items-center'>
                                <div className='text-[grey] text-[0.8rem]'>{moment(item.createdAt).format('DD-MM-yyyy')}</div>
                                <div className='text-[grey] text-[0.8rem]'>{moment(item.createdAt).format('h:mm')}</div>
                            </div>
                            <div className='flex flex-wrap gap-4 items-center justify-center'>
                                <div className='w-[11rem] h-[fit] rounded-[10px] flex flex-col text-[1.2rem] py-[0.5rem]  px-[0.5rem] text-[#e0dfdf] gap-2 bg-[#6859bb]'>
                                    <div className='capitalize text-[0.9rem] font-[600]'>amount</div>
                                    <div className='flex justify-between items-center font-bold'>
                                        <div>
                                            <div className='flex items-center'>
                                                {item.investment_status === 'confirmed' && <BiDollar />}
                                                {item.investment_status === 'confirmed' && <div>{item.amount.toLocaleString()}</div>}
                                                {item.investment_status === 'pending' &&
                                                    <div className='flex gap-2 items-center'>
                                                        <div className='text-[0.8rem] italic'>verifying</div>
                                                        <div className='verifyload '></div>
                                                    </div>
                                                }
                                                {item.investment_status === 'failed' && <div className='text-[0.8rem] italic text-[red]'>failed...</div>}
                                            </div>
                                        </div>
                                        <img src={deposit3d} className='h-[2.5rem] w-[auto]'></img>
                                    </div>
                                </div>
                                <div className='w-[11rem] h-[fit] rounded-[10px] flex flex-col text-[1.2rem] py-[0.5rem]  px-[0.5rem] text-[#e0dfdf] gap-2 border border-[grey] bg-[#130e27]'>
                                    <div className='flex justify-between'>
                                        <div className='capitalize text-[0.9rem] font-[600]'>profit/ROI</div>
                                        {item.investment_status === 'confirmed' && <div>
                                            {item.profit_status === 'running' ? <div className='italic text-[0.8rem] text-[#6f6ff5]'>running</div>
                                                :
                                                <div className='italic text-[0.8rem] text-[#adad40] font-bold'>completed</div>
                                            }
                                        </div>
                                        }
                                    </div>
                                    <div className='flex justify-between items-center font-bold'>
                                        <div>
                                            <div className='flex items-center'>
                                                {item.investment_status === 'confirmed' && <BiDollar />}
                                                {item.investment_status === 'confirmed' && <div>{item.profit.toLocaleString()}</div>}
                                                {item.investment_status === 'pending' &&
                                                    <div className='flex gap-2 items-center'>
                                                        <div className='text-[0.8rem] italic'>verifying</div>
                                                        <div className='verifyload '></div>
                                                    </div>
                                                }
                                                {item.investment_status === 'failed' && <div className='text-[0.8rem] italic text-[red]'>failed...</div>}

                                            </div>
                                        </div>
                                        <img src={profit3d} className='h-[2.5rem] w-[auto]'></img>
                                    </div>
                                </div>
                                <div className='w-[11rem] h-[fit] rounded-[10px] flex flex-col text-[1.2rem] py-[0.5rem]  px-[0.5rem] text-[#e0dfdf] gap-2 border border-[grey] bg-[#130e27]'>
                                    <div className='flex justify-between'>
                                        <div className='capitalize text-[0.9rem] font-[600]'>bonus</div>
                                        {item.investment_status === 'confirmed' && <div>
                                            {item.profit_status === 'running' ? <div className='italic text-[0.8rem] text-[#6f6ff5]'>running</div>
                                                :
                                                <div className='italic text-[0.8rem] text-[#adad40]'>completed</div>
                                            }
                                        </div>}
                                    </div>
                                    <div className='flex justify-between items-center font-bold'>
                                        <div>
                                            <div className='flex items-center'>
                                                {item.investment_status === 'confirmed' && <BiDollar />}
                                                {item.investment_status === 'confirmed' && <div>{item.bonus.toLocaleString()}</div>}
                                                {item.investment_status === 'pending' &&
                                                    <div className='flex gap-2 items-center'>
                                                        <div className='text-[0.8rem] italic'>verifying</div>
                                                        <div className='verifyload '></div>
                                                    </div>
                                                }
                                                {item.investment_status === 'failed' && <div className='text-[0.8rem] italic text-[red]'>failed...</div>}
                                            </div>
                                        </div>
                                        <img src={bonus3d} className='h-[2.5rem] w-[auto]'></img>
                                    </div>
                                </div>
                                <div className='w-[11rem] h-[fit] rounded-[10px] flex flex-col text-[0.9rem] py-[0.5rem]  px-[0.5rem] text-[#e0dfdf] gap-2 font-bold bg-[#6859bb]'>
                                    <div className='font-[600] capitalize'>investment plan</div>
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <div className='flex gap-1 items-center'>
                                                {item.investment_status === 'confirmed' && <div className='capitalize'>{item.trading_plan}</div>}
                                                {item.investment_status === 'pending' &&
                                                    <div className='flex gap-2 items-center'>
                                                        <div className='text-[0.8rem] italic'>verifying</div>
                                                        <div className='verifyload '></div>
                                                    </div>
                                                }
                                                {item.investment_status === 'failed' && <div className='text-[0.8rem] italic text-[red]'>failed...</div>}
                                            </div>
                                        </div>
                                        <img src={trading3d} className='h-[2.5rem] w-[auto]'></img>
                                    </div>
                                </div>
                            </div>
                            {item.investment_status === 'confirmed' &&
                                <ClaimButtons item={item} refetchWallet={refetchWallet} refetchInvestments={refetchInvestments} refetchNotifications={refetchNotifications} refetchUnreadNotis={refetchUnreadNotis} refetchUps={refetchUps} refetchInvestmentsUnclaim={refetchInvestmentsUnclaim} setInvestment={setInvestment} />
                            }
                        </div>
                    ))}
                </div>
                    :
                    <div className='pt-[5rem]'>
                        <div className='w-[28rem] h-[fit] rounded-[10px] flex flex-col items-center justify-center text-[1.2rem] py-[1rem] px-[2rem]  text-[#e0dfdf] gap-4 border border-[grey] bg-[#130e27] mx-auto'>
                            <div className='text-[1.2rem]  italic'>No new investment made</div>
                            <img src={investbg} className='w-[20rem] h-auto'></img>
                            <button className='outline-none w-fit h-fit py-[0.4rem] px-[1.5rem] text-[0.85rem] text-white font-[550] bg-[#A16534] rounded-[10rem] flex items-center gap-3 mt-[1rem]' onClick={() => setToggle('deposit')}>
                                <span>Make new</span>
                                <div className='makenew'></div>
                            </button>
                        </div>
                    </div>
                }
            </div>}
            {screen === 2 &&
                <div className='w-[95%] mx-auto my-[2rem]'>
                    <div className='flex gap-1 items-center capitalize text-[0.85rem] cursor-pointer text-[#7665D5] hover:text-[grey] w-fit' onClick={() => { setScreen(1); setInvestTitle('my investment') }}>
                        <IoMdArrowBack />
                        <span>back</span>
                    </div>
                    <div className='relative w-fit mx-auto mt-[2rem]'>
                        <input className='border border-[white] bg-transparent w-[20rem] h-[2.5rem] outline-none pl-4 text-[0.9rem] rounded-[12rem] text-white ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch}></input>
                        <div className='text-[1.2rem] text-[white] absolute top-[-0.5rem] right-[-0.5rem] w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center bg-[#7665D5] shlz'>
                            <IoIosSearch />
                            {write &&
                                <div className='absolute top-[1.2rem] right-[3rem] text-[0.75rem] cursor-pointer bg-[#414040] rounded-[50%] w-[1rem] h-[1rem] flex items-center justify-center' onClick={CancelWrite}>
                                    <FiX />
                                </div>
                            }
                        </div>
                    </div>
                    <div className='relative overflow-x-auto shadow-md rounded-lg mt-[1rem] '>
                        <table className='w-full'>
                            <thead >
                                <tr className='bg-[#7665D5] text-[0.8rem] font-bold text-[white]'>
                                    <td className='text-center  capitalize p-2 truncate'>date</td>
                                    <td className='text-center  capitalize p-2 truncate'>time</td>
                                    <td className='text-center  capitalize p-2 truncate'>amount</td>
                                    <td className='text-center  capitalize p-2 truncate'>trading plan</td>
                                    <td className='text-center  capitalize p-2 truncate'>profit</td>
                                    <td className='text-center  capitalize p-2 truncate'>profit status</td>
                                    <td className='text-center  capitalize p-2 truncate'>bonus</td>
                                    <td className='text-center  capitalize p-2 truncate'>claimed</td>
                                </tr>
                            </thead>
                            {fromAtom.length > 0 && <tbody>
                                {investment.slice(start, end).map((item, i) => (
                                    <tr className='text-[0.8rem]  text-[#e0dfdf] bg-[#272727] even:bg-[#313131]' key={i}>
                                        <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                                        <td className='p-4  text-center truncate'>{moment(item.createdAt).format('h:mm')}</td>
                                        <td className='p-4  text-center truncate flex items-center justify-center gap-[0.1rem]'><span className='text-[0.65rem]'>$</span> <span>{item.amount.toLocaleString()}</span></td>
                                        <td className='p-4  text-center truncate'>{item.trading_plan}</td>
                                        <td className='p-4  text-center truncate flex items-center justify-center gap-[0.1rem]'><span className='text-[0.65rem]'>$</span> <span>{item.profit.toLocaleString()}</span></td>
                                        <td className={`p-4  text-center truncate italic ${item.profit_status === 'completed' ? 'text-[#adad40]' : 'text-[#6f6ff5]'}`}>{item.profit_status}</td>
                                        <td className='p-4  text-center truncate flex items-center justify-center gap-[0.1rem]'><span className='text-[0.65rem]'>$</span> <span>{item.bonus.toLocaleString()}</span></td>
                                        <td className={`p-4  text-center truncate italic ${item.claim === 'true' ? 'text-[#adad40]' : 'text-[#e0dfdf]'}`}>{item.claim} </td>
                                    </tr>
                                ))}
                            </tbody>
                            }
                        </table>
                        {fromAtom.length < 1 && <div className='flex gap-1 items-center text-white justify-center w-full h-fit bg-[#272727] px-[1rem] py-[0.5rem] text-[0.8rem] italic'>
                            <div>no investment made yet...</div>
                            <img src={nothnyet} className='h-[1rem] w-auto'></img>
                        </div>}
                    </div>
                    <div className='flex flex-col gap-1 text-[0.75rem] py-4'>
                        {Math.ceil(pagelengthend) > 1 && <div className='flex justify-end font-bold text-[grey]'>{pagelengthstart} of {Math.ceil(pagelengthend)}</div>}
                        <div className='flex items-center justify-end  gap-2 text-white '>
                            {pagelengthstart > 1 && <button className='w-fit h-fit py-[0.25rem] px-[1rem] rounded-[10rem] bg-[#7665D5] hover:bg-[#4e438d] capitalize' onClick={BackNotisPage}>prev</button>}
                            {end < investment.length && <button className='w-fit h-fit py-[0.25rem] px-[1rem] rounded-[10rem] bg-[#7665D5] hover:bg-[#4e438d] capitalize' onClick={MoveNotisPage}>next</button>}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Investment