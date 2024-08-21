import React, { useState } from 'react'
import VerifyLayout from '../../../../UserComponents/VerifyLayout'
import LoadingAdmin from '../../../../GeneralComponents/LoadingAdmin'
import { useAtom } from 'jotai'
import { PROFILE } from '../../../../store'
import { MdVerified } from 'react-icons/md'

const VerifyKYC = () => {
    const [user, setUser] = useAtom(PROFILE)
    const [loading, setLoading] = useState(false)

    return (
        <VerifyLayout>
            <div className='relative'>
                {loading && <LoadingAdmin />}
                <div className='flex flex-col justify-center items-center gap-14 my-16'>
                    <div className='flex flex-col gap-2 items-center text-semi-white'>
                        <div className='flex gap-2 items-center md:text-4xl text-2xl capitalize font-bold'>
                            <span>verify kyc</span>
                            <MdVerified className='text-[#b19e34]' />
                        </div>
                        <div className='italic text-sm flex items-center gap-2'><span>Status:</span> <span className={`${user.kyc_verified === 'true' ? 'text-light' : 'text-[#c42e2e]' }`}>{user.kyc_verified === 'true' ? 'verified' : 'unverified'}</span></div>
                    </div>
                </div>
            </div>
        </VerifyLayout>
    )
}

export default VerifyKYC