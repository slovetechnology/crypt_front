import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoIosSearch, IoIosSettings } from 'react-icons/io'
import { FiX } from 'react-icons/fi'
import { ADMINALLUSERS } from '../../../store'
import { useAtom } from 'jotai'
import moment from 'moment';
import DeleteModal from './DeleteModal'
import { Apis, PostApi } from '../../../services/API'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import nothnyet from '../../../assets/images/nothn.png'



const DeleteAccounts = ({ refetchAllUsers, refetchAllDeposits, refetchAllWithdrawals }) => {
  const [fromAtom] = useAtom(ADMINALLUSERS)
  const [allusers, setAllUsers] = useState(fromAtom)


  const [modal, setModal] = useState(false)
  const [singleUser, setSingleUser] = useState({})
  const [write, setWrite] = useState(false)
  const [search, setSearch] = useState('')
  const [usertotal, setUserTotal] = useState('')
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(6)
  const [pagestart, setpagestart] = useState(1)
  const [pageend, setpageend] = useState(allusers.length / end)


  const SingleUserFunction = (item) => {
    setSingleUser(item)
  }

  const HandleSearch = () => {

    if (!search) {
      setAllUsers(fromAtom)
      setpageend(fromAtom.length / 6)
      setWrite(false)
      setpagestart(1)
      setStart(0)
      setEnd(6)
    }
    else {
      setWrite(true)
      const showSearch = allusers.filter(item => item.full_name.includes(search.toLowerCase()) || item.username.includes(search.toLowerCase()) || item.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()))
      setAllUsers(showSearch)
      setpageend(showSearch.length / 6)
      setpagestart(1)
      setStart(0)
      setEnd(6)
    }
  }

  const CancelWrite = () => {
    setSearch('')
    setAllUsers(fromAtom)
    setpageend(fromAtom.length / 6)
    setWrite(false)
    setpagestart(1)
    setStart(0)
    setEnd(6)
  }


  let MovePage = () => {

    if (end < allusers.length) {
      let altstart = start
      let altend = end
      let altlengthstart = pagestart

      altend += 6
      setEnd(altend)

      altstart += 6
      setStart(altstart)

      altlengthstart += 1
      setpagestart(altlengthstart)
    }
  }

  let BackPage = () => {

    if (end > 6) {
      let altstart = start
      let altend = end
      let altlengthstart = pagestart

      altend -= 6
      setEnd(altend)

      altstart -= 6
      setStart(altstart)

      altlengthstart -= 1
      setpagestart(altlengthstart)
    }
  }

  const GetUserTotalInvestment = async () => {

    try {

      const formbody = {
        user_id: singleUser.id
      }

      const response = await PostApi(Apis.admin.get_user_total_investment, formbody)
      if (response.status === 200) {
        setUserTotal(response.msg)
        setModal(true)
      }

    } catch (error) {
      //
    }
  }



  document.documentElement.style.overflow = modal === true ? 'hidden' : 'auto'

  return (
    <div className='h-screen'>
      {modal && <DeleteModal closeView={() => setModal(false)} singleUser={singleUser} usertotal={usertotal} setAllUsers={setAllUsers} setStart={setStart} setEnd={setEnd} setpagestart={setpagestart} setpageend={setpageend} setSearch={setSearch} setWrite={setWrite} refetchAllUsers={refetchAllUsers} refetchAllDeposits={refetchAllDeposits} refetchAllWithdrawals={refetchAllWithdrawals} />}

      <div className='uppercase font-bold md:text-2xl text-lg text-black pt-10'>all users</div>
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

        <div className='relative overflow-x-auto shadow-xl rounded-lg mt-4 scrollsdown'>
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
            {allusers.length > 0 && <tbody>
              {allusers.slice(start, end).map((item, i) => (
                <tr className='text-[0.8rem] font-[550]  text-black bg-white even:bg-semi-white ' key={i}>
                  <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                  <td className='p-4  text-center truncate'>{item.full_name}</td>
                  <td className='p-4  text-center truncate'>{item.username}</td>
                  <td className='p-4  text-center truncate'>{item.email}</td>
                  <td className='p-4  truncate'><img src={item.country_flag} className='w-4 h-auto mx-auto'></img></td>
                  <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onMouseOver={() => SingleUserFunction(item)} onClick={GetUserTotalInvestment}> <BsThreeDots className="mx-auto text-base" /></td>
                </tr>
              ))}
            </tbody>}
          </table>
          {allusers.length < 1 && <div className='flex gap-1 items-center text-black justify-center w-full h-fit bg-white py-2 text-sm italic'>
            <div>no users found...</div>
            <img src={nothnyet} className='h-4 w-auto'></img>
          </div>}
        </div>
        {allusers.length > 0 && <div className='flex gap-2 items-center text-xs mt-4 justify-end text-admin-page '>
          {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
          {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
          {end < allusers.length && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
        </div>}
      </div>
    </div>
  )
}

export default DeleteAccounts