import React, { useEffect, useRef, useState } from 'react'
import { Apis, UserPutApi, imageurl } from '../../../services/API'
import moment from 'moment';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import Loading from '../../../PageComponents/Loading';
import { Alert } from '../../../utils/utils';

const UpdateModal = ({ closeView, singleDeposit, setAltDeposits, setStart, setEnd, setPagelengthstart, setPagelengthend, setSearch, setWrite, refetchAllDeposits }) => {
    const toggler = useRef()
    const [depositShow, setdepositShow] = useState(false)
    const [depositStatus, setDepositStatus] = useState(singleDeposit.deposit_status)
    const [profitShow, setprofitShow] = useState(false)
    const [profitStatus, setProfitStatus] = useState(singleDeposit.profit_status)
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)

    const [form, setForm] = useState({
        profit: "",
        bonus: ""
    })
    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        setUpdate(true)
    }

    const depositStatuses = [
        {
            status: 'pending'
        },
        {
            status: 'confirmed'
        },
        {
            status: 'failed'
        }
    ]
    const profitStatuses = [
        {
            status: 'running'
        },
        {
            status: 'completed'
        }
    ]

    useEffect(() => {
        if (toggler) {
            window.addEventListener('click', (event) => {
                if (toggler.current !== null) {
                    if (!toggler.current.contains(event.target)) {
                        closeView()
                    }
                }
            }, true)
        }
    }, [])

    const MoveToBottom = () => {
        const  move = document.querySelector('.move')
        move.scrollTo({
            top: move.scrollHeight,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        MoveToBottom()
    }, [MoveToBottom]
    )

    const AdminUpdateDeposit = async () => {

        const formbody = {
            deposit_id: singleDeposit.id,
            user: singleDeposit.user,
            profit: parseFloat(form.profit),
            bonus: parseFloat(form.bonus),
            deposit_status: depositStatus,
            profit_status: profitStatus,
        }

        if (update) {
            setLoading(true)
            try {
                const response = await UserPutApi(Apis.admin.update_deposits, formbody)
                if (response.status === 200) {
                    setAltDeposits(response.msg)
                    Alert('Request Successful', 'Deposit updated successfully', 'success')
                    refetchAllDeposits()
                    setWrite(false)
                    setSearch('')
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
                closeView()
            }
        }
    }

    return (
        <div className='w-full h-screen fixed  top-0 left-0 flex items-center justify-center bg-[#0000008a] z-20'>
            <div className='bg-white rounded-lg w-[50vw] h-[90vh] overflow-y-auto scroll move' ref={toggler}>
                <div className='w-full h-full relative'>
                    {loading && <Loading />}
                    <div className='w-[90%] mx-auto py-[2rem] flex flex-col gap-[2rem]'>
                        <div className='flex flex-col gap-[1rem] border p-1'>
                            <div className='text-[0.9rem] uppercase font-bold border px-1 '>user details:</div>
                            <div className='flex items-center justify-center w-[5.8rem] h-[5.8rem] rounded-full bg-[#c9b8eb] mx-auto'>
                                <img src={`${imageurl}/profiles/${singleDeposit.deposituser.image}`} className='w-[5.5rem] h-[5.5rem] rounded-full object-cover'></img>
                            </div>
                            <div className='w-[80%] mx-auto flex flex-col gap-2'>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>username:</div>
                                    <div className='text-[0.95rem]'>{singleDeposit.deposituser.username}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>email:</div>
                                    <div className='text-[0.95rem]'>{singleDeposit.deposituser.email}</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[1rem] border p-1'>
                            <div className='text-[0.9rem] uppercase font-bold border px-1 '>deposit details:</div>
                            <div className='w-[80%] mx-auto flex flex-col gap-4'>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>amount:</div>
                                    <div className='text-[0.95rem]'><span className='text-[0.85rem]'>$</span>{singleDeposit.amount.toLocaleString()}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>plan:</div>
                                    <div className='text-[0.95rem] capitalize'>{singleDeposit.trading_plan}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>crypto:</div>
                                    <div className='text-[0.95rem]'>{singleDeposit.crypto}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>date/time:</div>
                                    <div className='text-[0.95rem]'>{moment(singleDeposit.createdAt).format('DD-MM-yyyy')} / {moment(singleDeposit.createdAt).format('h:mm')}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>from:</div>
                                    <div className='text-[0.95rem]'>{singleDeposit.from}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>add profit:</div>
                                    <div className='flex gap-2 items-center'>
                                        <input className='border border-[grey] w-[10rem] h-[1.6rem] outline-none pl-1 text-[0.8rem] rounded-sm' name='profit' value={form.profit} onChange={inputHandler}></input>
                                        <div className='text-[0.8rem] py-1 px-3 h-fit w-fit bg-white sha flex flex-col gap-2 text-black items-center'>
                                            <div>so far:</div>
                                            <div className='flex items-center font-bold'>
                                                <span className='text-[0.65rem] '>$</span>
                                                <span>{singleDeposit.profit.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic text-[0.9rem]'>add bonus:</div>
                                    <div className='flex gap-2 items-center'>
                                        <input className='border border-[grey] w-[10rem] h-[1.6rem] outline-none pl-1 text-[0.8rem] rounded-sm' name='bonus' value={form.bonus} onChange={inputHandler}></input>
                                        <div className='text-[0.8rem] py-1 px-3 h-fit w-fit bg-white sha flex flex-col gap-2 text-black items-center'>
                                            <div>so far:</div>
                                            <div className='flex items-center font-bold'>
                                                <span className='text-[0.65rem]'>$</span>
                                                <span>{singleDeposit.bonus.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-[1.5rem] my-[1.5rem]'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic text-[0.9rem]'>deposit status:</div>
                                        <div className='flex flex-col'>
                                            <div className='px-[0.5rem] py-[0.25rem] h-fit w-[12rem] bg-[white] adsha cursor-pointer' onClick={() => {setdepositShow(!depositShow); MoveToBottom()}} >
                                                <div className='flex justify-between items-center text-[0.8rem]'>
                                                    <span >{depositStatus}</span>
                                                    {!depositShow && <FaAngleDown className='hover:bg-[#e6e5e5] rounded-full ' />}
                                                    {depositShow && <FaAngleUp className='hover:bg-[#e6e5e5] rounded-full ' />}
                                                </div>
                                            </div>
                                            {depositShow && <div className='px-[0.5rem] py-[0.25rem] h-fit w-[12rem] bg-[white] adsha'>
                                                {depositStatuses.map((item, i) => (
                                                    <div className='flex flex-col mt-2' key={i}>
                                                        <div className='flex items-center cursor-pointer hover:bg-[#e6e5e5]' onClick={() => { setDepositStatus(item.status); setdepositShow(false); setUpdate(true) }}>
                                                            <div className={`text-[0.85rem] font-bold ${item.status === 'failed' && 'text-[#c94545]'}`}>{item.status}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>}
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic text-[0.9rem]'>profit status:</div>
                                        <div className='flex flex-col'>
                                            <div className='px-[0.5rem] py-[0.25rem] h-fit w-[12rem] bg-[white] adsha cursor-pointer' onClick={() => {setprofitShow(!profitShow); MoveToBottom()}} >
                                                <div className='flex justify-between items-center text-[0.8rem]'>
                                                    <span >{profitStatus}</span>
                                                    {!profitShow && <FaAngleDown className='hover:bg-[#e6e5e5] rounded-full ' />}
                                                    {profitShow && <FaAngleUp className='hover:bg-[#e6e5e5] rounded-full ' />}
                                                </div>
                                            </div>
                                            {profitShow && <div className='px-[0.5rem] py-[0.25rem] h-fit w-[12rem] bg-[white] adsha'>
                                                {profitStatuses.map((item, i) => (
                                                    <div className='flex flex-col mt-2' key={i}>
                                                        <div className='flex items-center cursor-pointer hover:bg-[#e6e5e5]' onClick={() => { setProfitStatus(item.status); setprofitShow(false); setUpdate(true) }}>
                                                            <div className={`text-[0.85rem] font-bold ${item.status === 'completed' && 'text-[#b19e32]'}`}>{item.status}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {update && <div className='flex items-center justify-center mt-[-1rem]'>
                            <button className='w-fit h-fit py-[0.5rem] px-[1.5rem] text-[0.85rem] capitalize bg-[#462c7c] rounded-lg text-white font-[550] ' onClick={AdminUpdateDeposit}>update details</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateModal