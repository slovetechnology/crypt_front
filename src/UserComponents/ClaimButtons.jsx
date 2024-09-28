import React, { useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { IoWalletOutline } from 'react-icons/io5';
import { Apis, PostApi } from '../services/API';
import { NOTIFICATIONS, UNREADNOTIS } from '../store';
import { useAtom } from 'jotai';
import moment from 'moment';


const ClaimButtons = ({ item, refetchInvestments, refetchInvestmentsUnclaim }) => {
    const [, setNotifications] = useAtom(NOTIFICATIONS)
    const [, setUnreadNotis] = useAtom(UNREADNOTIS)
    
    const [claim, setClaim] = useState({
        id: null,
        status: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const ClaimingInvestment = async () => {

        setTimeout(() => {
            refetchInvestmentsUnclaim()
            setError('')
        }, 1500)

        if (item.status !== 'completed') {
            setTimeout(() => {
                setLoading(false)
                setError('')
            }, 1500)

            setLoading(true)
            return setError(`running till ${moment(new Date(item.endDate)).format('DD-MM-yyyy')} / ${moment(new Date(item.endDate)).format('h:mm')}`)
        }

        try {
            setLoading(true)

            const formbody = {
                invest_id: item.id
            }

            const response = await PostApi(Apis.investment.claim_investment, formbody)
            if (response.status === 200) {
                setClaim({
                    id: response.msg.id,
                    status: response.msg.claim
                })
                refetchInvestments()
                setNotifications(response.notis)
                setUnreadNotis(response.unread)
            } else {
                setError(response.msg)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='relative'>
            <div className='relative w-fit'>
                <button className='outline-none py-2 px-6 text-xs font-medium text-semi-white bg-[#241a49]  hover:bg-[#17112e] rounded-full flex items-center gap-1' onClick={ClaimingInvestment}>
                    <span>{claim.id === item.id && claim.status === 'true' ? 'Claimed' : 'Claim to wallet'}</span>
                    {claim.id === item.id && claim.status === 'true' ?
                        <IoMdCheckmarkCircleOutline className='text-[#52e652] text-sm' />
                        :
                        <IoWalletOutline className='text-sm' />
                    }
                </button>
                {loading && <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center bg-[#0c091aa4] rounded-full z-20">
                    <div className='load'></div>
                </div>}
            </div>
            <div className='absolute -bottom-6 left-0 text-[#c42e2e] text-xs flex items-center gap-1'>
                <span>{error}</span>
            </div>
        </div >
    )
}

export default ClaimButtons