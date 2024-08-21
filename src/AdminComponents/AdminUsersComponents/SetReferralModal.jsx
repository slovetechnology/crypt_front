import React, { useRef, useState } from 'react'
import ModalLayout from '../../utils/ModalLayout'
import Loading from '../../GeneralComponents/Loading'
import { useAtom } from 'jotai'
import { ADMINSTORE } from '../../store'
import { Apis, UserPutApi } from '../../services/API'
import { Alert } from '../../utils/utils'

const SetReferralModal = ({ closeView }) => {
    const [adminStore, setAdminStore] = useAtom(ADMINSTORE)
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(false)
    const toggler = useRef()
    const [loading, setLoading] = useState(false)

    const SetReferalBonus = async () => {
        setTimeout(() => {
            setError(false)
        }, 1000)

        if (!amount) return setError(true)
        if (isNaN(amount)) return setError(true)

        const formbody = {
            referral_bonus: parseFloat(amount)
        }

        try {
            const response = await UserPutApi(Apis.admin.update_admin_store, formbody)
            if (response.status === 200) {
                setAdminStore(response.msg)
                Alert('Request Successful', 'Referral bonus updated', 'success')
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
            <div className='xl:w-1/3 lg:w-2/5 md:w-1/2 w-10/12 bg-white rounded-lg overflow-hidden relative' ref={toggler}>
                {loading && <Loading />}
                <div className='flex flex-col gap-2 py-6 px-4'>
                    <div className='md:text-xl text-lg uppercase text-center font-bold border-b w-full mb-2'>set referral bonus</div>
                    <div className='flex flex-col gap-2 items-center text-sm border px-2 py-4 rounded-md'>
                        <div className='text-center font-medium'>Enter bonus amount for referring ($)</div>
                        <div className='flex gap-4 items-center'>
                            <div>
                                <input className={`outline-none border lg:text-[0.85rem] text-base md:w-44 w-36 h-8 rounded-[3px] px-2 bg-transparent ipt ${error ? 'border-[red]' : 'border-[#9f7ae7]'}`} value={amount} onChange={e => setAmount(e.target.value)}></input>
                            </div>
                            <div className='text-xs py-1 px-3 h-fit w-fit bg-white sha flex flex-col gap-2 text-black items-center font-medium rounded-md'>
                                <div>current:</div>
                                {Object.values(adminStore).length !== 0 && <div>${adminStore.referral_bonus.toLocaleString()}</div>}
                            </div>
                        </div>
                    </div>
                    <div className='mx-auto mt-6'>
                        <button className='w-fit h-fit py-2.5 px-8 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={SetReferalBonus}>set</button>
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}

export default SetReferralModal