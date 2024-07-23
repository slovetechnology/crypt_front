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



const DeleteAccounts = ({ refetchAllUsers, refetchAllDeposits }) => {
  const [fromAtom] = useAtom(ADMINALLUSERS)
  const [allusers, setAllUsers] = useState(fromAtom)


  const [modal, setModal] = useState(false)
  const [singleUser, setSingleUser] = useState({})
  const [write, setWrite] = useState(false)
  const [search, setSearch] = useState('')
  const [usertotal, setUserTotal] = useState()


  const SingleUserFunction = (item) => {
    setSingleUser(item)
  }

  const HandleSearch = () => {

    if (!search) {
      setAllUsers(fromAtom)
      setPagelengthend(fromAtom.length / 6)
      setWrite(false)
      setPagelengthstart(1)
      setStart(0)
      setEnd(6)
    }
    else {
      setWrite(true)
      const showSearch = allusers.filter(item => item.full_name.includes(search.toLowerCase()) || item.username.includes(search.toLowerCase()) || item.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()))
      setAllUsers(showSearch)
      setPagelengthend(showSearch.length / 6)
      setPagelengthstart(1)
      setStart(0)
      setEnd(6)
    }
  }

  const CancelWrite = () => {
    setSearch('')
    setAllUsers(fromAtom)
    setPagelengthend(fromAtom.length / 6)
    setWrite(false)
    setPagelengthstart(1)
    setStart(0)
    setEnd(6)
  }

  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(6)
  const [pagelengthstart, setPagelengthstart] = useState(1)
  const [pagelengthend, setPagelengthend] = useState(allusers.length / end)

  let MovePage = () => {

    if (end < allusers.length) {
      let altstart = start
      let altend = end
      let altlengthstart = pagelengthstart

      altend += 6
      setEnd(altend)

      altstart += 6
      setStart(altstart)

      altlengthstart += 1
      setPagelengthstart(altlengthstart)
    }
  }

  let BackPage = () => {

    if (end > 6) {
      let altstart = start
      let altend = end
      let altlengthstart = pagelengthstart

      altend -= 6
      setEnd(altend)

      altstart -= 6
      setStart(altstart)

      altlengthstart -= 1
      setPagelengthstart(altlengthstart)
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
      {modal && <DeleteModal closeView={() => setModal(false)} singleUser={singleUser} usertotal={usertotal} setAllUsers={setAllUsers} setStart={setStart} setEnd={setEnd} setPagelengthstart={setPagelengthstart} setPagelengthend={setPagelengthend} setSearch={setSearch} setWrite={setWrite} refetchAllUsers={refetchAllUsers} refetchAllDeposits={refetchAllDeposits} />}

      <div className='uppercase font-bold md:text-2xl text-lg text-black pt-10'>delete accounts</div>
      <div className='mt-8 md:mt-6 lg:mt-8'>
        <div className='relative w-fit mx-auto'>
          <input className='border border-[grey] bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 md:text-[0.9rem] text-base rounded-full text-black ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
          <div className='text-[1.2rem] text-white absolute -top-2 -right-2 w-10 h-10  rounded-full flex items-center justify-center bg-[#462c7c] shantf2' >
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
              <tr className='bg-[#462c7c] text-[0.8rem] font-bold text-white'>
                <td className='text-center truncate  capitalize p-2'>joined</td>
                <td className='text-center truncate  capitalize p-2'>full name</td>
                <td className='text-center truncate  capitalize p-2'>username</td>
                <td className='text-center truncate  capitalize p-2'>email</td>
                <td className='text-center truncate  capitalize p-2'>country</td>
                <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-[1rem]" /></td>
              </tr>
            </thead>
            {fromAtom.length > 0 && <tbody>
              {allusers.slice(start, end).map((item, i) => (
                <tr className='text-[0.8rem] font-[550]  text-black bg-white even:bg-[#e2e0e0] ' key={i}>
                  <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                  <td className='p-4  text-center truncate'>{item.full_name}</td>
                  <td className='p-4  text-center truncate'>{item.username}</td>
                  <td className='p-4  text-center truncate'>{item.email}</td>
                  <td className='p-4  text-center truncate'><img src={item.country_flag} className='w-4 h-auto mx-auto'></img></td>
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
        {fromAtom.length > 0 && <div className='flex gap-2 items-center text-xs mt-4 justify-end text-[#462c7c] '>
          {pagelengthstart > 1 && <div className='py-1 px-2 rounded-md border border-[#462c7c] hover:bg-[#462c7c] hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
          {Math.ceil(pagelengthend) > 1 && <div className='font-bold text-[grey]'>{pagelengthstart} of {Math.ceil(pagelengthend)}</div>}
          {end < allusers.length && <div className='py-1 px-2 rounded-md border border-[#462c7c] hover:bg-[#462c7c] hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
        </div>}
      </div>
    </div>
  )
}

export default DeleteAccounts