import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoIosSearch, IoIosSettings } from 'react-icons/io'
import { FiX } from 'react-icons/fi'
import { ADMINALLUSERS } from '../../../store'
import { useAtom } from 'jotai'
import moment from 'moment';
import DeleteModal from './DeleteModal'
import { Apis, PostApi } from '../../../services/API'



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
      const showSearch = allusers.filter(item => item.full_name.includes(search.toLowerCase()) || item.username.includes(search.toLowerCase()) || item.email.includes(search.toLowerCase())  || moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()))
      setAllUsers(showSearch)
      setPagelengthend(showSearch.length / 6)
      setWrite(true)
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
    <div className=''>
      {modal && <DeleteModal closeView={() => setModal(false)} singleUser={singleUser} usertotal={usertotal} setAllUsers={setAllUsers} setStart={setStart} setEnd={setEnd} setPagelengthstart={setPagelengthstart} setPagelengthend={setPagelengthend} setSearch={setSearch} setWrite={setWrite} refetchAllUsers={refetchAllUsers} refetchAllDeposits={refetchAllDeposits} />}

      <div className='uppercase font-bold text-[1.5rem] text-[black] pt-[2.5rem]'>delete accounts</div>
      <div className='mt-[2rem]'>
        <div className='relative w-fit mx-auto'>
          <input className='border border-[grey] bg-transparent w-[20rem] h-[2.5rem] outline-none pl-4 text-[0.9rem] rounded-[12rem] text-black ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
          <div className='text-[1.2rem] text-[white] absolute top-[-0.5rem] right-[-0.5rem] w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center bg-[#462c7c] shantf2' >
            <IoIosSearch />
            {write &&
              <div className='absolute top-[1.2rem] right-[3rem] text-[0.75rem] cursor-pointer bg-[#979797] rounded-[50%] w-[1rem] h-[1rem] flex items-center justify-center' onClick={CancelWrite}>
                <FiX />
              </div>
            }
          </div>
        </div>




        <div className='relative overflow-x-auto shadow-xl sm:rounded-lg mt-[1rem]'>
          <table className='w-full'>
            <thead >
              <tr className='bg-[#462c7c] text-[0.8rem] font-bold text-[white]'>
                <td className='text-center  capitalize p-2'>joined</td>
                <td className='text-center  capitalize p-2'>full name</td>
                <td className='text-center  capitalize p-2'>username</td>
                <td className='text-center  capitalize p-2'>email</td>
                <td className='text-center  capitalize p-2'>country</td>
                <td className='text-center  capitalize p-2'> <IoIosSettings className="mx-auto text-[1rem]" /></td>
              </tr>
            </thead>
            <tbody>
              {allusers.slice(start, end).map((item, i) => (
                <tr className='text-[0.8rem] font-[550]  text-black bg-[white] even:bg-[#e2e0e0] ' key={i}>
                  <td className='p-4  text-center'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                  <td className='p-4  text-center'>{item.full_name}</td>
                  <td className='p-4  text-center'>{item.username}</td>
                  <td className='p-4  text-center'>{item.email}</td>
                  <td className='p-4  text-center'><img src={item.country_flag} className='w-[1rem] h-auto mx-auto'></img></td>
                  <td className='text-center  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onMouseOver={() => SingleUserFunction(item)} onClick={GetUserTotalInvestment}> <BsThreeDots className="mx-auto text-[1rem]" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex flex-col gap-1 text-[0.75rem] py-4'>
          {Math.ceil(pagelengthend) > 1 && <div className='flex justify-end font-bold text-[grey]'>{pagelengthstart} of {Math.ceil(pagelengthend)}</div>}
          <div className='flex items-center justify-end  gap-2 text-white '>
            {pagelengthstart > 1 && <button className='w-fit h-fit py-[0.25rem] px-[1rem] rounded-[10rem] bg-[#71628f] hover:bg-[#462c7c] capitalize' onClick={BackPage}>prev</button>}
            {end < allusers.length && <button className='w-fit h-fit py-[0.25rem] px-[1rem] rounded-[10rem] bg-[#71628f] hover:bg-[#462c7c] capitalize' onClick={MovePage}>next</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccounts