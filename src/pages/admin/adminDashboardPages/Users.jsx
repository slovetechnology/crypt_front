import React, { useCallback, useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoIosAddCircleOutline, IoIosSearch, IoIosSettings } from 'react-icons/io'
import { LiaGiftSolid } from "react-icons/lia"
import { FiX } from 'react-icons/fi'
import { ADMINALLUSERS } from '../../../store'
import { useAtom } from 'jotai'
import moment from 'moment';
import { Apis, PostApi, UserGetApi } from '../../../services/API'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { TbUsers } from "react-icons/tb";
import nothnyet from '../../../assets/images/nothn.png'
import AdminDashboard from './AdminDashboard'
import UsersModal from '../../../AdminComponents/AdminUsersComponents/UsersModal'
import CreateUsersModal from '../../../AdminComponents/AdminUsersComponents/CreateUsersModal'
import SetReferralModal from '../../../AdminComponents/AdminUsersComponents/SetReferralModal'



const Users = () => {
  const [fromAtom, setFromAtom] = useAtom(ADMINALLUSERS)
  const [allusers, setAllUsers] = useState([])

  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [modal3, setModal3] = useState(false)
  const [singleUser, setSingleUser] = useState({})
  const [write, setWrite] = useState(false)
  const [search, setSearch] = useState('')
  const [userFigures, setUserFigures] = useState({})
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(5)
  const [pagestart, setpagestart] = useState(1)
  const [pageend, setpageend] = useState(0)


  const FetchAllUsers = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.admin.all_users)
      if (response.status === 200) {
        setAllUsers(response.msg)
        setFromAtom(response.msg)
        setpageend(response.msg.length / end)
      }

    } catch (error) {
      //
    }
  }, [])

  useEffect(() => {
    FetchAllUsers()
  }, [FetchAllUsers])

  const SingleUserFunction = (item) => {
    setSingleUser(item)
  }

  const GetUserFigures = async () => {
    try {
      const formbody = {
        user_id: singleUser.id
      }

      setModal(true)

      const response = await PostApi(Apis.admin.get_user_figures, formbody)
      if (response.status === 200) {
        setUserFigures(response.msg)
      }

    } catch (error) {
      //
    }
  }

  const HandleSearch = () => {
    const altusers = fromAtom
    if (!search) {
      setAllUsers(fromAtom)
      setpageend(fromAtom.length / 5)
      setWrite(false)
      setpagestart(1)
      setStart(0)
      setEnd(5)
    }
    else {
      setWrite(true)
      const showSearch = altusers.filter(item => item.full_name.includes(search.toLowerCase()) || item.username.includes(search.toLowerCase()) || item.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()))
      setAllUsers(showSearch)
      setpageend(showSearch.length / 5)
      setpagestart(1)
      setStart(0)
      setEnd(5)
    }
  }

  const CancelWrite = () => {
    setSearch('')
    setAllUsers(fromAtom)
    setpageend(fromAtom.length / 5)
    setWrite(false)
    setpagestart(1)
    setStart(0)
    setEnd(5)
  }


  let MovePage = () => {

    if (end < allusers.length) {
      let altstart = start
      let altend = end
      let altlengthstart = pagestart

      altend += 5
      setEnd(altend)

      altstart += 5
      setStart(altstart)

      altlengthstart += 1
      setpagestart(altlengthstart)
    }
  }

  let BackPage = () => {

    if (end > 5) {
      let altstart = start
      let altend = end
      let altlengthstart = pagestart

      altend -= 5
      setEnd(altend)

      altstart -= 5
      setStart(altstart)

      altlengthstart -= 1
      setpagestart(altlengthstart)
    }
  }


  return (
    <AdminDashboard>
      <div className='h-screen'>
        {modal && <UsersModal closeView={() => setModal(false)} singleUser={singleUser} userFigures={userFigures} setStart={setStart} setEnd={setEnd} setpagestart={setpagestart} setpageend={setpageend} setSearch={setSearch} setWrite={setWrite} refetchAllUsers={FetchAllUsers} />}
        {modal2 && <CreateUsersModal closeView={() => setModal2(false)} setStart={setStart} setEnd={setEnd} setpagestart={setpagestart} setpageend={setpageend} setSearch={setSearch} setWrite={setWrite} refetchAllUsers={FetchAllUsers} />}
        {modal3 && <SetReferralModal closeView={() => setModal3(false)}/>}
        <div className='flex justify-between items-center pt-10'>
          <div className='uppercase font-bold md:text-2xl text-lg text-black'>all users</div>
          <div className='h-fit py-2.5 px-4 w-36 text-xs capitalize bg-[#9f7ae7] rounded-full text-black font-bold flex gap-2 justify-between items-center cursor-default'>
            <div className='flex items-center gap-1'>
              <TbUsers className='text-base' />
              <span>total users:</span>
            </div>
            <div>{allusers.length}</div>
          </div>
        </div>
        <div className='mt-12'>
          <div className='relative w-fit mx-auto'>
            <input className='border border-[grey] bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 md:text-[0.9rem] text-base rounded-full text-black ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
            <div className='text-[1.2rem] text-white absolute -top-2 -right-2 w-10 h-10  rounded-full flex items-center justify-center bg-admin-page shantf2' >
              <IoIosSearch />
              {write &&
                <div className='absolute top-[1.2rem] right-12 text-xs cursor-pointer bg-zinc-400 rounded-full w-fit h-fit p-0.5' onClick={CancelWrite}>
                  <FiX />
                </div>
              }
            </div>
          </div>
          <div className='flex justify-between items-center mb-2'>
            <button className='w-fit h-fit mt-4 py-2.5 px-4 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center' onClick={() => setModal3(true)}>
              <span>set referral bonus</span>
              <IoIosSettings className='text-base' />
            </button>
            <button className='w-fit h-fit mt-4 py-2.5 px-4 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center' onClick={() => setModal2(true)}>
              <span>create new user</span>
              <IoIosAddCircleOutline className='text-base' />
            </button>
          </div>

          <div className='relative overflow-x-auto shadow-xl rounded-lg scrollsdown'>
            <table className='w-full'>
              <thead >
                <tr className='bg-admin-page text-[0.8rem] font-bold text-white'>
                  <td className='text-center truncate  capitalize p-2'>joined</td>
                  <td className='text-center truncate  capitalize p-2'>full name</td>
                  <td className='text-center truncate  capitalize p-2'>username</td>
                  <td className='text-center truncate  capitalize p-2'>email</td>
                  <td className='text-center truncate  capitalize p-2'>country</td>
                  <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-base" /></td>
                </tr>
              </thead>
              {allusers.length > 0 &&
                <tbody>
                  {allusers.slice(start, end).map((item, i) => (
                    <tr className='text-[0.8rem] font-[550]  text-black bg-white even:bg-semi-white ' key={i}>
                      <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                      <td className='p-4  text-center truncate'>{item.full_name}</td>
                      <td className='p-4  text-center truncate'>{item.username}</td>
                      <td className='p-4  text-center truncate'>{item.email}</td>
                      <td className='p-4  truncate'><img src={item.country_flag} className='w-4 h-auto mx-auto'></img></td>
                      <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onMouseOver={() => SingleUserFunction(item)} onClick={GetUserFigures}> <BsThreeDots className="mx-auto text-base" /></td>
                    </tr>
                  ))}
                </tbody>
              }
              {allusers.length < 1 &&
                <tbody>
                  <tr className='text-black text-[0.8rem] bg-white font-[550]'>
                    <td colSpan="6" className='py-2 italic text-center truncate'>
                      <div className='flex gap-1 items-center justify-center'>
                        <span>no users found...</span>
                        <img src={nothnyet} className='h-4 w-auto'></img>
                      </div>
                    </td>
                  </tr>
                </tbody>
              }
            </table>
          </div>
          {allusers.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-admin-page '>
            {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
            {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
            {end < allusers.length && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
          </div>}
        </div>
      </div>
    </AdminDashboard>
  )
}

export default Users