import React, { useEffect, useRef, useState } from 'react'
import { RiErrorWarningLine } from "react-icons/ri";
import Loading from '../../../../../GeneralComponents/Loading';
import { PiWarningCircleBold } from 'react-icons/pi';
import { Apis, PostApi, UserPutApi } from '../../../../../services/API';
import { Alert } from '../../../../../utils/utils';


const UpdatePackageModal = ({ closeView, singlePlan, refetchTradingPlans, setStart, setEnd, setpagestart, setpageend }) => {
    const [error, setError] = useState('')
    const [deleteState, setDeleteState] = useState(false)
    const [commit, setCommit] = useState(false)
    const [loading, setLoading] = useState(false)
    const toggler = useRef()

    const [form, setForm] = useState({
        title: singlePlan.title || '',
        price_start: singlePlan.price_start || '',
        price_limit: singlePlan.price_limit || '',
        plan_bonus: singlePlan.plan_bonus || ''
    })


    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const CommitHandler = () => {
        if (form.title === singlePlan.title && form.price_start === singlePlan.price_start && form.price_limit === singlePlan.price_limit && form.plan_bonus === singlePlan.plan_bonus) {
            setCommit(false)
        } else {
            setCommit(true)
        }
    }

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

    const UpdateTradingPlan = async () => {
        setTimeout(() => {
            setError('')
        }, 2000)

        if (!form.title || !form.price_limit || !form.price_start || !form.plan_bonus) return setError('Enter all fields')
        if (isNaN(form.price_start) || isNaN(form.price_limit) || isNaN(form.plan_bonus)) return setError('Number only for cash')

        const formbody = {
            plan_id: singlePlan.id,
            title: form.title,
            price_start: parseFloat(form.price_start),
            price_limit: parseFloat(form.price_limit),
            plan_bonus: parseFloat(form.plan_bonus)
        }

        setLoading(true)
        try {
            const response = await UserPutApi(Apis.admin.update_trading_plan, formbody)
            if (response.status === 200) {
                Alert('Request Successful', 'Trading plan updated successfully', 'success')
                refetchTradingPlans()
                setpageend(response.msg.length / 5)
                setpagestart(1)
                setStart(0)
                setEnd(5)
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
                Alert('Request Successful', 'Trading plan deleted successfully', 'success')
                setpageend(response.msg.length / 5)
                setpagestart(1)
                setStart(0)
                setEnd(5)
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
        <div className='w-full h-screen fixed  top-0 left-0 flex items-center justify-center bg-[#0000008a] z-20 '>
            <div className='xl:w-1/3 lg:w-2/5 md:w-1/2 w-11/12 h-fit bg-white rounded-lg overflow-hidden' ref={toggler}>
                <div className={`w-full h-full relative`}>
                    {loading && <Loading />}
                    <div className='flex flex-col md:w-[90%] w-11/12 mx-auto py-4 md:text-[0.9rem] text-[0.8rem]'>
                        <div className='text-xl uppercase text-center font-bold border-b'>update trading plan</div>
                        <div className='flex flex-col gap-4 mt-4 relative'>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>title:</div>
                                <input className='outline-none border border-[#c9b8eb] w-48 p-1 md:text-sm text-base' value={form.title} name='title' onChange={inputHandler} onKeyUp={CommitHandler}></input>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>price start:</div>
                                <div className='relative'>
                                    <input className='outline-none border border-[#c9b8eb] w-48 py-1 px-5 md:text-sm text-base' value={form.price_start} name='price_start' onChange={inputHandler} onKeyUp={CommitHandler}></input>
                                    <div className='absolute top-1.5 left-2 text-[0.8rem]'>$</div>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>price limit:</div>
                                <div className='relative'>
                                    <input className='outline-none border border-[#c9b8eb] w-48 py-1 px-5 md:text-sm text-base' value={form.price_limit} name='price_limit' onChange={inputHandler} onKeyUp={CommitHandler}></input>
                                    <div className='absolute top-1.5 left-2 text-[0.8rem]'>$</div>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>plan bonus:</div>
                                <div className='relative'>
                                    <input className='outline-none border border-[#c9b8eb] w-48 py-1 px-5 md:text-sm text-base' value={form.plan_bonus} name='plan_bonus' onChange={inputHandler} onKeyUp={CommitHandler}></input>
                                    <div className='absolute top-1.5 left-2 text-[0.8rem]'>$</div>
                                </div>
                            </div>

                            {error !== '' &&
                                <div className='md:text-sm text-xs absolute -bottom-6 left-0 text-[red] bg-white sha px-4 py-1 flex items-center gap-1 rounded-sm text-center z-50'>
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
        </div>
    )
}

export default UpdatePackageModal