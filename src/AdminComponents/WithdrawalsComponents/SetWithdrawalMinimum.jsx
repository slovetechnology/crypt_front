import React, { useRef, useState } from 'react'
import ModalLayout from '../../utils/ModalLayout'
import Loading from '../../GeneralComponents/Loading'

const SetWithdrawalMinimum = ({ closeView }) => {
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(false)
    const toggler = useRef()
    const [loading, setLoading] = useState(false)

    const SetUsersWithdrawMininimum = async () => {
        setTimeout(() => {
            setError(false)
        }, 1000)

        if (!amount) return setError(true)
        if (isNaN(amount)) return setError(true)

        const formbody = {
            amount: parseFloat(amount)
        }
    }

    return (
        <ModalLayout closeView={closeView} toggler={toggler}>
            <div className='xl:w-1/3 lg:w-2/5 md:w-1/2 w-11/12 h-fit bg-white rounded-lg overflow-hidden relative' ref={toggler}>
                {loading && <Loading />}
                <div className='flex flex-col gap-4 py-6 md:px-6 px-4 relative'>
                    <div className='text-xl uppercase text-center font-bold border-b w-full mb-2'>set withdrawal minimum</div>
                    <div className='flex flex-col gap-1.5 text-sm capitalize items-center'>
                        <div className='text-center'>Enter withdrawal minimum amount for users</div>
                        <input className={`outline-none border lg:text-[0.85rem] w-44 h-8 rounded-[3px] px-2 bg-transparent ipt ${error ? 'border-[red]' : 'border-[#9f7ae7]'}`} value={amount} onChange={e => setAmount(e.target.value)}></input>
                    </div>
                    <div className='mx-auto mt-6'>
                        <button className='w-fit h-fit py-2.5 px-8 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={SetUsersWithdrawMininimum}>set</button>
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}

export default SetWithdrawalMinimum