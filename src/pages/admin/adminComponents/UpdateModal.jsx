import React, { useEffect, useRef, useState } from 'react'
import { Apis, UserPutApi, imageurl } from '../../../services/API'
import moment from 'moment';
import { FaAngleDown } from 'react-icons/fa6';
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
    const [beforeshow, setBeforeshow] = useState(true)

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
        const move = document.querySelector('.move')
        move.scrollTo({
            top: move.scrollHeight,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        if (profitShow || depositShow) {
            MoveToBottom()
        }
    }, [MoveToBottom]
    )

    setTimeout(() => {
        setBeforeshow(false)
    }, 1500)

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
            const move = document.querySelector('.move')
            move.scrollTo({
                top: 0,
            })
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
            <div className={`bg-white rounded-lg lg:w-1/2 md:w-3/4 w-11/12 lg:h-[90vh] h-[80vh] ${loading ? 'overflow-hidden' : 'overflow-y-auto scroll'}  move`} ref={toggler}>
                <div className={`w-full h-full relative  ${beforeshow && 'flex items-center justify-center'}`}>
                    {loading && <Loading />}
                    {beforeshow && <div className='beforeshow'></div>}
                    {!beforeshow && 
                    <div className='md:w-[90%] w-11/12 mx-auto md:py-8 py-4 flex flex-col gap-8 md:text-[0.9rem] text-[0.8rem]'>
                        <div className='flex flex-col gap-4 border p-1'>
                            <div className=' uppercase font-bold border px-1 '>user details:</div>
                            <div className='flex items-center justify-center md:w-[5.8rem] md:h-[5.8rem] w-20 h-20 rounded-full bg-[#c9b8eb] mx-auto'>
                                <img src={`${imageurl}/profiles/${singleDeposit.deposituser.image}`} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                            </div>
                            <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-2'>
                                <div className='flex justify-between items-center'>
                                    <div className='italic '>username:</div>
                                    <div className='md:text-[0.95rem] text-sm'>{singleDeposit.deposituser.username}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic '>email:</div>
                                    <div className='md:text-[0.95rem] text-sm'>{singleDeposit.deposituser.email}</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 border p-1'>
                            <div className=' uppercase font-bold border px-1 '>deposit details:</div>
                            <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-4'>
                                <div className='flex justify-between items-center'>
                                    <div className='italic '>amount:</div>
                                    <div className='md:text-[0.95rem] text-sm'><span className='text-[0.85rem]'>$</span>{singleDeposit.amount.toLocaleString()}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic '>plan:</div>
                                    <div className='md:text-[0.95rem] text-sm capitalize'>{singleDeposit.trading_plan}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic '>crypto:</div>
                                    <div className='md:text-[0.95rem] text-sm'>{singleDeposit.crypto}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic '>date/time:</div>
                                    <div className='md:text-[0.95rem] text-sm'>{moment(singleDeposit.createdAt).format('DD-MM-yyyy')} / {moment(singleDeposit.createdAt).format('h:mm')}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic '>from:</div>
                                    <div className='md:text-[0.95rem] text-sm'>{singleDeposit.from}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='italic '>add profit:</div>
                                    <div className='flex gap-2 items-center'>
                                        <input className='border border-[#c9b8eb] md:w-40 w-28 h-7 outline-none px-1 lg:text-[0.8rem] text-base rounded-sm' name='profit' value={form.profit} onChange={inputHandler}></input>
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
                                    <div className='italic '>add bonus:</div>
                                    <div className='flex gap-2 items-center'>
                                        <input className='border border-[#c9b8eb] md:w-40 w-28 h-7 outline-none px-1 lg:text-[0.8rem] text-base rounded-sm' name='bonus' value={form.bonus} onChange={inputHandler}></input>
                                        <div className='text-[0.8rem] py-1 px-3 h-fit w-fit bg-white sha flex flex-col gap-2 text-black items-center'>
                                            <div>so far:</div>
                                            <div className='flex items-center font-bold'>
                                                <span className='text-[0.65rem]'>$</span>
                                                <span>{singleDeposit.bonus.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-6 my-6'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>deposit status:</div>
                                        <div className='flex flex-col'>
                                            <div className='px-2 py-1 h-fit md:w-48 w-36 bg-white adsha cursor-pointer' onClick={() => { setdepositShow(!depositShow); MoveToBottom() }} >
                                                <div className='flex justify-between items-center text-[0.8rem]'>
                                                    <span >{depositStatus}</span>
                                                    <FaAngleDown  className={`${depositShow ? 'rotate-180' : 'rotate-0'} trans`}/>
                                                </div>
                                            </div>
                                            {depositShow && <div className='px-2 py-1 h-fit md:w-48 w-36 bg-white adsha'>
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
                                        <div className='italic '>profit status:</div>
                                        <div className='flex flex-col'>
                                            <div className='px-2 py-1 h-fit md:w-48 w-36 bg-white adsha cursor-pointer' onClick={() => { setprofitShow(!profitShow); MoveToBottom() }} >
                                                <div className='flex justify-between items-center text-[0.8rem]'>
                                                    <span >{profitStatus}</span>
                                                    <FaAngleDown  className={`${profitShow ? 'rotate-180' : 'rotate-0'} trans`}/>
                                                </div>
                                            </div>
                                            {profitShow && <div className='px-2 py-1 h-fit md:w-48 w-36 bg-white adsha'>
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
                        {update && <div className='flex items-center justify-center -mt-4'>
                            <button className='w-fit h-fit py-2 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-lg text-white font-medium ' onClick={AdminUpdateDeposit}>update details</button>
                        </div>}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default UpdateModal