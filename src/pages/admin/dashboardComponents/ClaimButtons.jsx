import React, { useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdError } from 'react-icons/md'
import { Apis, PostApi } from '../../../services/API'
import { SlWallet } from "react-icons/sl";
import { IoWalletOutline } from 'react-icons/io5';

const ClaimButtons = ({ item, refetchWallet, refetchNotifications, refetchInvestments, refetchUps, refetchUnreadNotis, refetchInvestmentsUnclaim, setInvestment }) => {
    const [claim, setClaim] = useState(false)
    const [claimError, setClaimError] = useState('')
    const [singleInvest, setSingleInvest] = useState({})
    const [loading, setLoading] = useState(false)

    const ClaimingInvestment = async () => {

        setTimeout(() => {
            refetchInvestmentsUnclaim()
            setClaim(false)
        }, 1500)

        if (singleInvest.profit_status !== 'completed') {
            setTimeout(() => {
                setLoading(false)
                setClaimError('')
            }, 1000)
            setLoading(true)
            return setClaimError(`profit still running`)
        }

        if (singleInvest.claim !== 'true') {

            try {
                setLoading(true)

                const formbody = {
                    invest_id: singleInvest.id
                }

                const response = await PostApi(Apis.investment.claim_investment, formbody)
                if (response.status === 200) {
                    setInvestment(response.msg)
                    refetchNotifications()
                    refetchUnreadNotis()
                    refetchInvestments()
                    refetchWallet()
                    refetchUps()
                }
            } catch (error) {
                //
            } finally {
                setLoading(false)
                setClaim(true)
            }
        }
    }


    return (
        <div className='relative w-fit'>
            <button className='outline-none py-2 px-6 text-xs font-medium text-semi-white bg-[#241a49]  hover:bg-[#17112e] rounded-full flex items-center gap-1' onClick={ClaimingInvestment} onMouseOver={() => setSingleInvest(item)} onMouseOut={() => setSingleInvest({})}>
                <span>{claim ? 'Claimed' : 'Claim to wallet'}</span>
                {!claim ?
                    <div>
                        <IoWalletOutline className='text-sm'/>
                    </div>
                    :
                    <div>
                        <IoMdCheckmarkCircleOutline className='text-[#52e652] text-sm' />
                    </div>
                }
            </button>
            <div className='absolute -bottom-6 left-0 text-[#c42e2e] text-xs flex items-center gap-1'><div>{claimError}</div>
                {claimError !== '' && <MdError />}
            </div>
            {loading && <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center bg-[#0c091aa4] z-20">
                <div className='load'></div>
            </div>}
        </div>
    )
}

export default ClaimButtons