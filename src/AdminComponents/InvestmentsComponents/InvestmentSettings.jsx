import React, { useRef, useState } from 'react'
import ModalLayout from '../../utils/ModalLayout'
import Loading from '../../GeneralComponents/Loading'
import { RiErrorWarningLine } from 'react-icons/ri'
import { useAtom } from 'jotai'
import { ADMINSTORE } from '../../store'
import { Apis, UserPutApi } from '../../services/API'
import { Alert } from '../../utils/utils'

const InvestingSettings = ({ closeView }) => {
    const [adminStore, setAdminStore] = useAtom(ADMINSTORE)
    const [error, setError] = useState('')
    const toggler = useRef()
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        profit_percentage: "",
        investment_duration: ""
    })

    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const UpdateInvestmentSettings = async () => {
        setTimeout(() => {
            setError('')
        }, 2000)

        if (!form.profit_percentage && !form.investment_duration) return setError('Enter a field')

        const formbody = {
            profit_percentage: parseFloat(form.profit_percentage),
            investment_duration: parseInt(form.investment_duration)
        }

        try {
            const response = await UserPutApi(Apis.admin.update_admin_store, formbody)
            if (response.status === 200) {
                setAdminStore(response.msg)
                Alert('Request Successful', 'Investment settings updated', 'success')
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

    return (
        <ModalLayout closeView={closeView} toggler={toggler}>
            <div className='xl:w-1/3 lg:w-2/5 md:w-1/2 w-11/12 h-fit bg-white rounded-lg overflow-hidden relative' ref={toggler}>
                {loading && <Loading />}
                <div className='relative'>
                    <div className='w-11/12 mx-auto flex flex-col gap-4 py-6'>
                        <div className='text-xl uppercase text-center font-bold border-b w-full mb-2'>investment settings</div>
                        <div className='w-full grid grid-cols-4 gap-4 items-center'>
                            <div className='flex flex-col gap-1.5 text-sm capitalize items-center col-span-3'>
                                <div className='text-center'>enter profit percentage for investments</div>
                                <div className='flex items-center gap-0.5'>
                                    <input className={`outline-none border border-[#9f7ae7] lg:text-[0.85rem] w-full h-8 rounded-[3px] px-2 bg-transparent ipt `} name='profit_percentage' value={form.profit_percentage} onChange={inputHandler}></input>
                                    <div>%</div>
                                </div>
                            </div>
                            <div className='text-xs py-1 px-3 h-fit w-fit bg-white sha flex flex-col gap-2 text-black items-center font-medium rounded-md'>
                                <div>current:</div>
                                {Object.values(adminStore).length !== 0 && <div>{adminStore.profit_percentage}%</div>}
                            </div>
                        </div>
                        <div className='w-full grid grid-cols-4 gap-4 items-center mt-4'>
                            <div className='flex flex-col gap-1.5 text-sm capitalize items-center col-span-3'>
                                <div className='text-center'>enter duration for investments</div>
                                <div className='flex items-center gap-0.5'>
                                    <input className={`outline-none border border-[#9f7ae7] lg:text-[0.85rem] w-full h-8 rounded-[3px] px-2 bg-transparent ipt`} name='investment_duration' value={form.investment_duration} onChange={inputHandler}></input>
                                    <div className='lowercase'>days</div>
                                </div>
                            </div>
                            <div className='text-xs py-1 px-3 h-fit w-fit bg-white sha flex flex-col gap-2 text-black items-center font-medium rounded-md'>
                                <div>current:</div>
                                {Object.values(adminStore).length !== 0 && <div>{adminStore.investment_duration} days</div>}
                            </div>
                        </div>
                        <div className='mx-auto mt-6'>
                            <button className='w-fit h-fit py-2.5 px-8 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={UpdateInvestmentSettings}>set</button>
                        </div>
                    </div>
                    {error !== '' &&
                        <div className='md:text-sm text-xs absolute bottom-6 left-2 text-[red] bg-white sha px-4 py-1 flex items-center gap-1 rounded-sm text-center z-50'>
                            <RiErrorWarningLine className='md:text-base text-sm' />
                            <span>{error}</span>
                            <div className='error-progress absolute -bottom-1 left-0 rounded-sm z-50'></div>
                        </div>
                    }
                </div>
            </div>
        </ModalLayout>
    )
}

export default InvestingSettings