import moment from 'moment'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Apis, PostApi } from '../../services/API'

const UserTableBody = ({ item, setUserFigures, setSingleUser, setModal }) => {

    const GetUserFigures = async () => {
        try {
            const formbody = {
                user_id: item.id
            }
            setSingleUser(item)
            setModal(true)

            const response = await PostApi(Apis.admin.get_user_figures, formbody)
            if (response.status === 200) {
                setUserFigures(response.msg)
            }

        } catch (error) {
            //
        }
    }

    return (
        <tr className='text-[0.8rem] font-[550]  text-black bg-white even:bg-semi-white'>
            <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
            <td className='p-4  text-center truncate'>{item.full_name}</td>
            <td className='p-4  text-center truncate'>{item.username}</td>
            <td className='p-4  text-center truncate'>{item.email}</td>
            <td className='p-4  truncate'><img src={item.country_flag} className='w-4 h-auto mx-auto'></img></td>
            <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onClick={GetUserFigures}> <BsThreeDots className="mx-auto text-base" /></td>
        </tr>
    )
}

export default UserTableBody