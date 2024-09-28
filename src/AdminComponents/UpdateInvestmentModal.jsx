import React, { useEffect, useRef, useState } from 'react'
import { Apis, UserPutApi, imageurl } from '../services/API'
import moment from 'moment';
import { FaXmark } from 'react-icons/fa6';
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import Loading from '../GeneralComponents/Loading';
import { Alert, MoveToTopDiv } from '../utils/utils';
import avatar from '../assets/images/avatar.png'
import ModalLayout from '../utils/ModalLayout';

const UpdateInvestmentModal = ({ closeView, singleInvestment, refetchAllInvestments }) => {
    const toggler = useRef()
    const [status, setStatus] = useState(singleInvestment?.status)
    const [statusShow, setStatusShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    const [beforeshow, setBeforeshow] = useState(true)
    const [profitError, setProfitError] = useState(false)
    const [bonusError, setBonusError] = useState(false)
    const [form, setForm] = useState({
        profit: "",
        bonus: ""
    })

    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    setTimeout(() => {
        setBeforeshow(false)
    }, 1500)

    const Statuses = [
        "running",
        "completed"
    ]

    const MoveToBottom = () => {
        const move = document.querySelector('.move')
        move.scrollTo({
            top: move.scrollHeight,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        if (!loading) {
            if (statusShow || status !== singleInvestment.status || form.profit !== '' || form.bonus !== '') {
                MoveToBottom()
            }
        }
    }, [MoveToBottom]
    )

    const UpdateHandlerForText = () => {
        if (form.profit === '' && form.bonus === '' && status === singleInvestment.status) {
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    const UpdateHandlerForStatus = (item) => {
        setStatus(item)
        setStatusShow(false)
        if (item === singleInvestment.status && form.bonus === '' && form.profit === '') {
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    const AdminUpdateInvestment = async () => {
        setTimeout(() => {
            setProfitError(false)
            setBonusError(false)
        }, 1000)

        if (isNaN(form.profit)) return setProfitError(true)
        if (isNaN(form.bonus)) return setBonusError(true)

        const formbody = {
            investment_id: singleInvestment.id,
            profit: parseFloat(form.profit),
            bonus: parseFloat(form.bonus),
            status: status,
        }

        if (update) {
            setLoading(true)
            MoveToTopDiv()

            try {
                const response = await UserPutApi(Apis.admin.update_investments, formbody)
                if (response.status === 200) {
                    refetchAllInvestments()
                    Alert('Request Successful', `${response.msg}`, 'success')
                    closeView()
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

    return (
        <ModalLayout closeView={closeView} toggler={toggler}>
            <div className={`bg-white rounded-lg lg:w-1/2 md:w-4/6 w-11/12 lg:h-[90vh] md:h-[80vh] h-[70vh] ${loading ? 'overflow-hidden' : 'overflow-y-auto scroll'}  move`} ref={toggler}>
                <div className={`w-full h-full relative  ${beforeshow && 'flex items-center justify-center'}`}>
                    {loading && <Loading />}
                    <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
                    {beforeshow && <div className='beforeshow'></div>}
                    {!beforeshow &&
                        <div className='md:w-[90%] w-11/12 mx-auto md:py-8 py-4 flex flex-col gap-8 md:text-[0.9rem] text-[0.8rem]'>
                            <div className='flex flex-col gap-4 border p-1'>
                                <div className=' uppercase font-bold border px-1 '>user details:</div>
                                <div className='flex items-center justify-center md:w-[5.8rem] md:h-[5.8rem] w-20 h-20 rounded-full bg-[#c9b8eb] mx-auto'>
                                    {Object.values(singleInvestment).length !== 0 &&
                                        <>
                                            {singleInvestment.investmentUser.image ? <img src={`${imageurl}/profiles/${singleInvestment.investmentUser.image}`} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                                                :
                                                <img src={avatar} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                                            }
                                        </>
                                    }
                                </div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-2'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>username:</div>
                                        {Object.values(singleInvestment).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleInvestment.investmentUser.username}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>email:</div>
                                        {Object.values(singleInvestment).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleInvestment.investmentUser.email}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 border p-1'>
                                <div className=' uppercase font-bold border px-1 '>investment details:</div>
                                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>amount:</div>
                                        {Object.values(singleInvestment).length !== 0 && <div className='md:text-[0.95rem] text-sm'>${singleInvestment.amount.toLocaleString()}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>plan:</div>
                                        {Object.values(singleInvestment).length !== 0 && <div className='md:text-[0.95rem] text-sm capitalize'>{singleInvestment.trading_plan}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>date / time:</div>
                                        {Object.values(singleInvestment).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{moment(singleInvestment.createdAt).format('DD-MM-yyyy')} / {moment(singleInvestment.createdAt).format('h:mm')}</div>}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>add profit:</div>
                                        <div className='flex gap-2 items-center'>
                                            <div>
                                                <input className={`border ${profitError ? 'border-[red]' : 'border-[#c9b8eb]'}  md:w-40 w-28 h-8 outline-none px-2 lg:text-[0.8rem] text-base rounded-sm`} name='profit' value={form.profit} onChange={inputHandler} onKeyUp={UpdateHandlerForText}></input>
                                            </div>
                                            <div className='text-xs py-1 px-3 h-fit w-fit bg-white sha flex flex-col gap-2 text-black items-center font-medium rounded-md'>
                                                <div>so far:</div>
                                                {Object.values(singleInvestment).length !== 0 && <div>${singleInvestment.profit.toLocaleString()}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='italic '>add bonus:</div>
                                        <div className='flex gap-2 items-center'>
                                            <div>
                                                <input className={`border ${bonusError ? 'border-[red]' : 'border-[#c9b8eb]'} md:w-40 w-28 h-8 outline-none px-2 lg:text-[0.8rem] text-base rounded-sm`} name='bonus' value={form.bonus} onChange={inputHandler} onKeyUp={UpdateHandlerForText}></input>
                                            </div>
                                            <div className='text-xs py-1 px-3 h-fit w-fit bg-white sha flex flex-col gap-2 text-black items-center font-medium rounded-md'>
                                                <div>so far:</div>
                                                {Object.values(singleInvestment).length !== 0 && <div>${singleInvestment.bonus.toLocaleString()}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-6 my-6'>
                                        <div className='flex justify-between items-center'>
                                            <div className='italic '>status:</div>
                                            {singleInvestment?.status === 'running' ?
                                                <div className='relative'>
                                                    <div className='px-2 py-1 h-fit md:w-44 w-36 rounded-[3px] bg-white sha cursor-pointer' onClick={() => { setStatusShow(!statusShow); MoveToBottom() }} >
                                                        <div className='flex justify-between items-center text-[0.8rem]'>
                                                            <span >{status}</span>
                                                            <div className='text-sm'>
                                                                {!statusShow ? <TiArrowSortedDown />
                                                                    :
                                                                    <TiArrowSortedUp />
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {statusShow && <div className='h-fit w-full absolute top-[1.8rem] left-0 bg-white border border-[lightgrey] rounded-md z-10 text-[0.85rem] font-bold'>
                                                        {Statuses.map((item, i) => (
                                                            <div key={i} className={`flex flex-col px-2 py-0.5 cursor-pointer hover:bg-[#ececec] ${i !== Statuses.length - 1 && 'border-b border-[#ebeaea]'}`} onClick={() => UpdateHandlerForStatus(item)}>
                                                                <div className='flex items-center'>
                                                                    <div className={`${item === 'completed' && 'text-[green]'}`}>{item}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>}
                                                </div>
                                                :
                                                <>
                                                    {Object.values(singleInvestment).length !== 0 && <div className='md:text-base text-sm capitalize text-[green]'>{singleInvestment.status}</div>}
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {update && <div className='flex items-center justify-center -mt-4'>
                                <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium ' onClick={AdminUpdateInvestment}>update details</button>
                            </div>}
                        </div>}
                </div>
            </div>
        </ModalLayout>
    )
}

export default UpdateInvestmentModal