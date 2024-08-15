import React, { useRef, useState } from 'react'
import { RiErrorWarningLine } from "react-icons/ri";
import Loading from '../../../../../GeneralComponents/Loading';
import { PiWarningCircleBold } from 'react-icons/pi';
import { Apis, PostApi, UserPutApi } from '../../../../../services/API';
import { Alert } from '../../../../../utils/utils';
import ModalLayout from '../../../../../utils/ModalLayout';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';


const UpdatePackageModal = ({ closeView, singlePlan, refetchTradingPlans }) => {
    const [type, setType] = useState(singlePlan.duration_type)
    const [typeShow, setTypeShow] = useState(false)
    const [error, setError] = useState('')
    const [deleteState, setDeleteState] = useState(false)
    const [commit, setCommit] = useState(false)
    const [loading, setLoading] = useState(false)
    const toggler = useRef()

    const DurationTypes = [
        "minutes",
        "hours",
        "days",
        "weeks",
        "months",
    ]

    const [form, setForm] = useState({
        title: singlePlan.title || '',
        price_start: singlePlan.price_start || '',
        price_limit: singlePlan.price_limit || '',
        profit_percentage: singlePlan.profit_percentage || '',
        plan_bonus: singlePlan.plan_bonus || '',
        duration: singlePlan.duration || '',
    })

    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const CommitHandler = () => {
        if (form.title === singlePlan.title && form.price_start === singlePlan.price_start && form.price_limit === singlePlan.price_limit && form.profit_percentage === singlePlan.profit_percentage && form.plan_bonus === singlePlan.plan_bonus && form.duration === singlePlan.duration) {
            setCommit(false)
        } else {
            setCommit(true)
        }
    }

    const UpdateTradingPlan = async () => {
        setTimeout(() => {
            setError('')
        }, 2000)

        if (!form.title || !form.price_limit || !form.price_start || !form.profit_percentage || !form.plan_bonus || !form.duration) return setError('Enter all fields')
        if (isNaN(form.price_start) || isNaN(form.price_limit) || isNaN(form.profit_percentage) || isNaN(form.plan_bonus) || isNaN(form.duration)) return setError('Enter valid numbers')

        const formbody = {
            plan_id: singlePlan.id,
            title: form.title,
            price_start: parseFloat(form.price_start),
            price_limit: parseFloat(form.price_limit),
            profit_percentage: parseFloat(form.profit_percentage),
            plan_bonus: parseFloat(form.plan_bonus),
            duration: parseFloat(form.duration),
            duration_type: type
        }

        setLoading(true)
        try {
            const response = await UserPutApi(Apis.admin.update_trading_plan, formbody)
            if (response.status === 200) {
                Alert('Request Successful', `${response.msg}`, 'success')
                refetchTradingPlans()
                closeView()
            } else {
                setError(response.msg)
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }

    const DeletePackage = async () => {
        setTimeout(() => {
            setError('')
        }, 2000)

        const formbody = {
            plan_id: singlePlan.id
        }

        setLoading(true)
        try {
            const response = await PostApi(Apis.admin.delete_trading_plan, formbody)
            if (response.status === 200) {
                refetchTradingPlans()
                Alert('Request Successful', `${response.msg}`, 'success')
                closeView()
            } else {
                setError(response.msg)
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }




    return (
        <ModalLayout closeView={closeView} toggler={toggler}>
            <div className='xl:w-1/3 lg:w-2/5 md:w-1/2 w-11/12 h-fit bg-white rounded-lg overflow-hidden' ref={toggler}>
                <div className={`w-full h-full relative`}>
                    {loading && <Loading />}
                    <div className='flex flex-col md:w-[90%] w-11/12 mx-auto py-4 md:text-[0.9rem] text-[0.8rem]'>
                        <div className='text-xl uppercase text-center font-bold border-b'>update trading plan</div>
                        <div className='flex flex-col gap-4 mt-4 relative'>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>title:</div>
                                <input className='outline-none border border-[#c9b8eb] md:w-48 w-40 py-1 px-1.5 md:text-sm text-base' value={form.title} name='title' onChange={inputHandler} onKeyUp={CommitHandler}></input>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>price start:</div>
                                <div className='flex gap-0.5 items-center'>
                                    <div className='text-xs'>$</div>
                                    <input className='outline-none border border-[#c9b8eb] md:w-48 w-40 py-1 px-1.5 md:text-sm text-base' value={form.price_start} name='price_start' onChange={inputHandler} onKeyUp={CommitHandler}></input>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>price limit:</div>
                                <div className='flex gap-0.5 items-center'>
                                    <div className='text-xs'>$</div>
                                    <input className='outline-none border border-[#c9b8eb] md:w-48 w-40 py-1 px-1.5 md:text-sm text-base' value={form.price_limit} name='price_limit' onChange={inputHandler} onKeyUp={CommitHandler}></input>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>profit percentage:</div>
                                <div className='flex gap-0.5 items-center'>
                                    <div className='text-xs'>%</div>
                                    <input className='outline-none border border-[#c9b8eb] md:w-48 w-40 py-1 px-1.5 md:text-sm text-base' value={form.profit_percentage} name='profit_percentage' onChange={inputHandler} onKeyUp={CommitHandler}></input>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>plan bonus:</div>
                                <div className='flex gap-0.5 items-center'>
                                    <div className='text-xs'>$</div>
                                    <input className='outline-none border border-[#c9b8eb] md:w-48 w-40 py-1 px-1.5 md:text-sm text-base' value={form.plan_bonus} name='plan_bonus' onChange={inputHandler} onKeyUp={CommitHandler}></input>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>duration:</div>
                                <input className='outline-none border border-[#c9b8eb] md:w-48 w-40 py-1 px-2 md:text-sm text-base' value={form.duration} name='duration' onChange={inputHandler} onKeyUp={CommitHandler}></input>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>duration type:</div>
                                <div className='relative'>
                                    <div className='px-2 py-1 h-fit md:w-48 w-40 bg-white sha cursor-pointer rounded-[3px]' onClick={() => setTypeShow(!typeShow)} >
                                        <div className='flex justify-between items-center text-[0.8rem]'>
                                            <span >{type}</span>
                                            <div className={`flex flex-col items-center text-xs trans ${typeShow ? 'rotate-90' : 'rotate-0'} `}>
                                                <FaAngleUp />
                                                <FaAngleDown className='-mt-1' />
                                            </div>
                                        </div>
                                    </div>
                                    {typeShow && <div className='h-16 overflow-y-auto w-full absolute top-[1.9rem] left-0 bg-white border border-[lightgrey] rounded-md z-50 scrollDiv'>
                                        {DurationTypes.map((item, i) => (
                                            <div key={i} className={`flex flex-col px-2 py-0.5 hover:bg-[#e6e5e5] ${i === DurationTypes.length - 1 ? 'hover:rounded-b-md' : 'border-b border-[#ebeaea]'}`}>
                                                <div className='flex items-center cursor-pointer' onClick={() => { setType(item); setTypeShow(false) }}>
                                                    <div className='text-[0.85rem] font-bold'>{item}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>}
                                </div>

                            </div>

                            {error !== '' &&
                                <div className='md:text-sm text-xs absolute -bottom-6 left-0 text-[#eb2e2e] bg-white sha px-4 py-1 flex items-center gap-1 rounded-sm text-center z-50'>
                                    <RiErrorWarningLine className='md:text-base text-sm' />
                                    <span>{error}</span>
                                    <div className='error-progress absolute -bottom-1 left-0 rounded-sm z-50'></div>
                                </div>
                            }
                        </div>
                        <div className='flex gap-4 items-center mt-8 relative'>
                            {commit && <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={UpdateTradingPlan}>update</button>}
                            <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium ml-auto' onClick={() => setDeleteState(true)}>delete</button>
                            {deleteState && <div className='bg-white adsha w-fit h-fit flex flex-col gap-4 items-center justify-center absolute bottom-0 right-0 p-3 rounded-md text-xs'>
                                <div className='md:text-[0.85rem] text-xs flex items-center gap-1 justify-center text-center font-medium'>
                                    <span> Are you sure you want to Delete package</span>
                                    <PiWarningCircleBold className='text-[red] md:text-base text-sm' />
                                </div>
                                <div className='flex items-center gap-6'>
                                    <button className='w-fit h-fit py-2 px-6 capitalize bg-zinc-500 text-white rounded-lg font-medium' onClick={() => setDeleteState(false)}>no</button>
                                    <button className='w-fit h-fit py-2 px-6 capitalize bg-zinc-500 text-white rounded-lg font-medium' onClick={DeletePackage}>yes</button>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}

export default UpdatePackageModal