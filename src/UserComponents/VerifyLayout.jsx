import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Dashboard from '../pages/admin/userDashboardPages/Dashboard'


const VerifyLinks = [
    { path: 'verify email', url: '/dashboard/verify-account' },
    { path: 'verify kyc', url: '/dashboard/verify-account/kyc' },
]


const VerifyLayout = ({ children }) => {
    const location = useLocation()

    return (
        <Dashboard>
            <div>
                <div className='uppercase font-bold md:text-2xl text-lg text-semi-white'>verify</div>
                <div className="flex items-center gap-1 mt-4">
                    {VerifyLinks.map((item, index) => (
                        <Link key={index} to={item.url} className={`py-1.5 px-4 rounded-lg capitalize text-sm font-medium cursor-pointer text-semi-white ${location.pathname === item.url ? ' bg-zinc-600' : ''} `}>{item.path}</Link>
                    ))}
                </div>
                <div className=''>
                    {children}
                </div>
            </div>
        </Dashboard>
    )
}

export default VerifyLayout