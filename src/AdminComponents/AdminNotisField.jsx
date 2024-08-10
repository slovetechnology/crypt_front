import React from 'react'
import { HiCheckCircle } from 'react-icons/hi2'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Apis, UserPutApi } from '../services/API'

const AdminNotisField = ({item, refetchNotifications, refetchUnreadNotis, setShowNotis}) => {

    const MarkSingleRead = async () => {
        const formbody = {
            notification_id: item.id,
        }
        try {
            const response = await UserPutApi(Apis.notification.update_admin_single, formbody)
            if (response.status === 200) {
                refetchNotifications()
                refetchUnreadNotis()
            }
        } catch (error) {
        }
    }

    return (
        <Link to={item.URL} onClick={() => {MarkSingleRead(); setShowNotis(false)}} className='flex flex-col items-center md:pt-2 pt-3 md:text-xs text-[0.8rem] text-black'>
            <div className={`p-2 rounded-md relative shantf w-full h-fit ${item.read === 'true' ? 'bg-white' : 'bg-[#bfb1d4]'}`}>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center'>
                        <div className='flex gap-[0.2rem] items-center'>
                            <div className='capitalize font-[800] border-b  border-[grey] w-fit'>{item.title}</div>
                            <HiCheckCircle className='text-[#462c7c] ' />
                        </div>
                    </div>
                    <div className='font-[600]'>{item.content}</div>
                    <div className=' text-[0.7rem] text-[#3d3d3d] font-bold mt-2'>{moment(item.createdAt).fromNow()}</div>
                </div>
            </div>
        </Link>
    )
}

export default AdminNotisField