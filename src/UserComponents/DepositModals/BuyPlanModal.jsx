import React, { useState } from 'react'
import Loading from '../../GeneralComponents/Loading'
import { FaXmark } from 'react-icons/fa6'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { Apis, PostApi } from '../../services/API'
import { WALLET } from '../../store'
import { Alert } from '../../utils/utils'

const BuyPlanModal = ({ setModal, buybal, setModal2 }) => {
    const [userwallet] = useAtom(WALLET)

    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const BuyPlanWithBalance = async () => {
        setTimeout(() => {
            setError('')
        }, 1000)

        if (!amount) return setError('amount')
        if (isNaN(amount)) return setError('amount')
        if (amount < buybal.price_start) return setError('limit')
        if (amount > buybal.price_limit) return setError('limit')
        if (Object.values(userwallet).length === 0) return setError('balance')
        if (amount > userwallet.balance) return setError('balance')

        const formbody = {
            amount: parseFloat(amount),
            plan_id: buybal.id,
        }

        setLoading(true)
        try {
            const response = await PostApi(Apis.investment.create_investment, formbody)
            if (response.status === 200) {
                Alert('Request Successful', `${response.msg}`, 'success')
                setModal(false)
                navigate('/dashboard/investment')
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
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center bg-[#0c091aa4] z-20'>
            <div className='w-96 h-fit bg-white rounded-lg p-4 flex flex-col gap-4 relative overflow-hidden'>
                {loading && <Loading />}
                <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => setModal(false)} />
                <div className='flex items-center gap-2 justify-center'>
                    <div className='text-[0.85rem] uppercase font-bold'>{buybal.title} plan</div>
                    <div className={`text-xs font-[550] bg-white py-1 px-2 rounded-full adsha ${error === 'limit' ? 'text-[red]' : 'text-black'} `}>${buybal.price_start.toLocaleString()} - ${buybal.price_limit.toLocaleString()}</div>
                </div>
                <div className='relative flex gap-3 items-center mx-auto'>
                    <div className='flex flex-col gap-1'>
                        <div className='capitalize text-[0.8rem] font-medium'>enter an amount ($)</div>
                        <input className={`outline-none border lg:text-[0.85rem] w-full h-8 rounded-[4px] px-2 bg-semi-white ${error === 'amount' ? 'border-[red]' : 'border-[#5BB4FD]'}`} value={amount} onChange={e => setAmount(e.target.value)} ></input>
                    </div>
                    <div className={`h-fit w-fit text-nowrap py-2 px-4 ${error === 'balance' && 'border border-[red]'} bg-[#5BB4FD] flex flex-col gap-1 items-center justify-center text-white text-[0.85rem] rounded-md`}>
                        <div className='text-xs italic text-center'>wallet balance:</div>
                        {Object.values(userwallet).length !== 0 && <div>${userwallet.balance.toLocaleString()}</div>}
                    </div>
                </div>
                <div className='text-xs text-center font-medium'>low wallet balance? <span className='underline text-[#5BB4FD] cursor-pointer' onClick={() => {setModal(false); setModal2(true)}}>Deposit</span></div>
                <div className='my-2 mx-auto'>
                    <button className='py-2 px-16 rounded-md bg-[#252525] text-white capitalize font-medium text-xs' onClick={BuyPlanWithBalance}>confirm purchase</button>
                </div>
            </div>
        </div>
    )
}

export default BuyPlanModal