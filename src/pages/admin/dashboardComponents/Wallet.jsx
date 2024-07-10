import React from 'react'
import { BiDollar } from "react-icons/bi";
import { useAtom } from 'jotai';
import { INVESTMENTUNCLAIM, UPS, WALLET } from '../../../store';
import wallet3d from '../../../assets/images/wallet3d.png'
import deposit3d from '../../../assets/images/deposit3d.png'
import withdraw3d from '../../../assets/images/withdraw3d.png'
import profit3d from '../../../assets/images/profit3d.png'
import bonus3d from '../../../assets/images/bonus3d.png'
import tradingPic from '../../../assets/images/tradingpic.png'


const Home = ({ setToggle, setPurchaseState }) => {

    const [wallet] = useAtom(WALLET)
    const [investments] = useAtom(INVESTMENTUNCLAIM)
    const [ups] = useAtom(UPS)

    let profitUp = ups.new_profit / wallet.total_profit * 100
    let bonusUp = ups.new_bonus / wallet.total_bonus * 100


    return (
        <div className='pt-10 pb-24 lg:pb-10 h-fit'>
            <div className='uppercase font-bold text-[1.5rem] text-[#e0dfdf] '>wallet</div>
            <div className='flex flex-wrap gap-4 mt-8 items-center justify-center'>
                <div className='w-[15.5rem] h-[10rem] rounded-[10px] flex flex-col text-[2rem] py-[0.5rem]  px-[1rem] text-[#e0dfdf] gap-2 bg-[#6859bb]  overflow-hidden'>
                    <div className='capitalize text-[0.9rem] font-[600] flex justify-between items-center'>
                        <span>deposits</span>
                        <span className='text-[0.75rem] italic lowercase'>external</span>
                    </div>
                    <div className='flex flex-col items-center font-bold'>
                        <div className='flex items-center'>
                            <BiDollar />
                            <div>20,000</div>
                        </div>
                        <img src={deposit3d} className='h-[4rem] w-auto'></img>
                    </div>
                </div>
                <div className='w-[15.5rem] h-[10rem] rounded-[10px] flex flex-col text-[2rem] py-[0.5rem]  px-[1rem] text-[#e0dfdf] gap-2 border border-[grey] bg-[#130e27] overflow-hidden'>
                    <div className='capitalize text-[0.9rem] font-[600] flex justify-between items-center'>
                        <span>total profits</span>
                        <span className='text-[0.75rem] italic lowercase'>claimed</span>
                    </div>
                    <div className='flex justify-between font-bold'>
                        <div className='flex items-center'>
                            <BiDollar />
                            <div>{wallet.total_profit}</div>
                        </div>
                        <img src={profit3d} className='h-[3rem] w-[auto]'></img>
                    </div>
                    <div className='flex justify-center text-[0.7rem] capitalize font-[600] mt-[0.7rem]'>
                        <div className='flex flex-col gap-1 items-center'>
                            <div>up</div>
                            {wallet.total_profit !== 0 ? <div className='text-[green]'>+{profitUp.toFixed(2)}%</div>
                                :
                                <div className='text-[green]'>+0.00%</div>
                            }
                        </div>
                    </div>
                </div>
                <div className='w-[15.5rem] h-[10rem] rounded-[10px] flex flex-col text-[2rem] py-[0.5rem]  px-[1rem] text-[#e0dfdf] gap-2 border border-[grey] bg-[#130e27] overflow-hidden'>
                    <div className='capitalize text-[0.9rem] font-[600] flex justify-between items-center'>
                        <span>total bonuses</span>
                        <span className='text-[0.75rem] italic lowercase'>claimed</span>
                    </div>
                    <div className='flex justify-between font-bold'>
                        <div className='flex items-center'>
                            <BiDollar />
                            <div>{wallet.total_bonus}</div>
                        </div>
                        <img src={bonus3d} className='h-[3rem] w-[auto]'></img>
                    </div>
                    <div className='flex justify-center text-[0.7rem] capitalize font-[600] mt-[0.7rem]'>
                        <div className='flex flex-col gap-1 items-center'>
                            <div>up</div>
                            {wallet.total_bonus !== 0 ? <div className='text-[green]'>+{bonusUp.toFixed(2)}%</div>
                                :
                                <div className='text-[green]'>+0.00%</div>
                            }
                        </div>
                    </div>
                </div>
                <div className='w-[15.5rem] h-[10rem] rounded-[10px] flex flex-col text-[2rem] py-[0.5rem]  px-[1rem] text-[#e0dfdf] gap-2 border border-[grey] bg-[#130e27] overflow-hidden' >
                    <div className='capitalize text-[0.9rem] font-[600]'>withdrawals</div>
                    <div className='flex flex-col items-center font-bold'>
                        <div className='flex items-center' >
                            <BiDollar />
                            <div>{wallet.total_withdrawal}</div>
                        </div>
                        <img src={withdraw3d} className='h-[3.5rem] w-auto'></img>
                    </div>
                </div>
                <div className='w-[15.5rem] h-[10rem] rounded-[10px] flex flex-col text-[2rem] py-[0.5rem]  px-[1rem] text-[#e0dfdf] gap-4 font-bold capitalize bg-[#6859bb] overflow-hidden'>
                    <div className=' text-[0.9rem] font-[600]'>trading activity</div>
                    <div className='flex flex-col gap-1 items-center'>
                        {investments.length > 0 ?
                            <div className='flex gap-[0.2rem] items-center'>
                                <div className='text-lg italic text-[#eeee6c] lowercase '>{investments.length > 1 ? 'active investments' : 'active investment'}</div>
                            </div>

                            :
                            <div className='text-[1.2rem] italic text-[#eeee6c] lowercase text-center'>no active investment</div>
                        }
                        <img src={tradingPic} className='h-[4.5rem] w-auto'></img>
                    </div>
                </div>
                <div className='w-[15.5rem] h-[10rem] rounded-[10px] flex flex-col text-[2rem] py-[0.5rem]  px-[1rem] text-[#e0dfdf] gap-2 border border-[grey] bg-[#130e27]'>
                    <div className='capitalize text-[0.9rem] font-[600]'>current balance</div>
                    <div className='flex flex-col gap-1 items-center font-bold'>
                        <div className='flex items-center'>
                            <BiDollar />
                            <div>{wallet.balance}</div>
                        </div>
                        <img src={wallet3d} className='h-[3.3rem] w-auto'></img>
                    </div>
                </div>
            </div>
            <div className='mt-[3rem] flex flex-col gap-1'>
                <div className='text-[#e0dfdf]  text-[0.75rem] capitalize'>Try our test run package</div>
                <div className='w-fit h-fit py-[0.25rem] bg-[#130e27]'>
                    <div className='w-full h-fit flex gap-10 md:gap-20  pl-10 pr-[0.5rem] py-1 text-[0.55rem] items-center text-[white] uppercase relative bg-[#25203d]'>
                        <div className='flex flex-col gap-1 items-center'>
                            <div>price</div>
                            <div className='flex items-center gap-1'>
                                <div className='italic lowercase'>from</div>
                                <div className='text-[green] text-[0.85rem] font-bold'>$20</div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div>profit</div>
                            <div className='text-[green] text-[0.85rem] font-bold'>60%</div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <button className='outline-none px-[1rem] py-[0.22rem] bg-[#130e27] w-fit h-fit rounded-[3px]  text-[0.7rem] text-[#c5c4c4] hover:bg-[#1a162b]' onClick={() => {setToggle('deposit'); setPurchaseState(true)}}>purchase</button>
                            <button className='outline-none px-[1.1rem] py-[0.22rem] bg-[#130e27] w-fit h-fit rounded-[3px]  text-[0.7rem] text-[#c5c4c4] hover:bg-[#1a162b]' onClick={() => setToggle('deposit')}>upgrade</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home