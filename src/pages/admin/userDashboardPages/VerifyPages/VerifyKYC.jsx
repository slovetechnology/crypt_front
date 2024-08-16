import React, { useState } from 'react'
import VerifyLayout from '../../../../UserComponents/VerifyLayout'
import LoadingAdmin from '../../../../GeneralComponents/LoadingAdmin'
import { useAtom } from 'jotai'
import { PROFILE } from '../../../../store'
import { MdVerified } from 'react-icons/md'

const VerifyKYC = () => {
    const [, setUser] = useAtom(PROFILE)
    const [loading, setLoading] = useState(false)

    return (
        <VerifyLayout>
            <div className='relative'>
                {loading && <LoadingAdmin />}
                <div className='flex flex-col justify-center items-center gap-16 mt-16'>
                    <div className='flex gap-2 items-center md:text-4xl text-2xl text-semi-white capitalize font-bold'>
                        <span>verify kyc</span>
                        <MdVerified className='text-[#b19e34]' />
                    </div>
                </div>
            </div>
        </VerifyLayout>
    )
}

export default VerifyKYC