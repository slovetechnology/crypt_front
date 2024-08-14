import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosSearch, IoIosSettings } from 'react-icons/io';
import { FiX } from 'react-icons/fi'
import { useAtom } from 'jotai';
import { ADMINALLDEPOSITS } from '../../../store';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import nothnyet from '../../../assets/images/nothn.png'
import AdminDashboard from './AdminDashboard';
import { Apis, UserGetApi } from '../../../services/API';
import UpdateDepositModal from '../../../AdminComponents/UpdateDepositModal';


const UpdateDeposits = () => {
  const [fromAtom, setFromAtom] = useAtom(ADMINALLDEPOSITS)
  const [allDeposits, setAllDeposits] = useState([])
  const [singleDeposit, setSingleDeposit] = useState({})
  const [modal, setModal] = useState(false)
  const [write, setWrite] = useState(false)
  const [search, setSearch] = useState('')
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(5)
  const [pagestart, setpagestart] = useState(1)
  const [pageend, setpageend] = useState(0)


  const FetchAllDeposits = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.admin.all_deposits)
      if (response.status === 200) {
        setAllDeposits(response.msg)
        setFromAtom(response.msg)
        setpageend(response.msg.length / end)
        setStart(0)
        setEnd(5)
        setpagestart(1)
        setSearch('')
        setWrite(false)
      }

    } catch (error) {
      //
    } finally {
    }
  }, [])

  useEffect(() => {
    FetchAllDeposits()
  }, [FetchAllDeposits])

  const singleDepositFunction = (item) => {
    setSingleDeposit(item)
    setModal(true)
  }

  const HandleSearch = () => {
    const altDeposits = fromAtom
    if (!search) {
      setAllDeposits(fromAtom)
      setpageend(fromAtom.length / 5)
      setWrite(false)
      setpagestart(1)
      setStart(0)
      setEnd(5)
    }
    else {
      setWrite(true)
      const showSearch = altDeposits.filter(item => item.depositUser.username.includes(search.toLowerCase()) || item.depositUser.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.crypto.includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()))
      setAllDeposits(showSearch)
      setpageend(showSearch.length / 5)
      setpagestart(1)
      setStart(0)
      setEnd(5)
    }
  }

  const CancelWrite = () => {
    setSearch('')
    setAllDeposits(fromAtom)
    setpageend(fromAtom.length / 5)
    setWrite(false)
    setpagestart(1)
    setStart(0)
    setEnd(5)
  }

  let MovePage = () => {

    if (end < allDeposits.length) {
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
        {modal && <UpdateDepositModal closeView={() => setModal(false)} singleDeposit={singleDeposit} refetchAllDeposits={FetchAllDeposits}/>}

        <div className='uppercase font-bold md:text-2xl text-lg text-black pt-10'>all deposits</div>
        <div className='mt-12'>
          <div className='relative w-fit mx-auto'>
            <input className='border border-[grey] bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 md:text-[0.9rem] text-base rounded-full text-black ipa' value={search} type='text' onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
            <div className='text-[1.2rem] text-white absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center bg-admin-page shantf2'>
              <IoIosSearch />
              {write &&
                <div className='absolute top-[1.2rem] md:right-12 right-11 text-xs cursor-pointer bg-zinc-400 rounded-full w-fit h-fit p-0.5' onClick={CancelWrite}>
                  <FiX />
                </div>
              }
            </div>
          </div>
          <div className='relative overflow-x-auto shadow-xl rounded-lg mt-4 scrollsdown'>
            <table className='w-full '>
              <thead >
                <tr className='bg-admin-page text-[0.8rem] font-bold text-white'>
                  <td className='text-center truncate  capitalize p-2 '>date</td>
                  <td className='text-center truncate  capitalize p-2 '>username</td>
                  <td className='text-center truncate  capitalize p-2 '>email</td>
                  <td className='text-center truncate  capitalize p-2 '>amount</td>
                  <td className='text-center truncate  capitalize p-2 '>crypto </td>
                  <td className='text-center truncate  capitalize p-2 '>status </td>
                  <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-base" /></td>
                </tr>
              </thead>
              {allDeposits.length > 0 &&
                <tbody>
                  {allDeposits.slice(start, end).map((item, i) => (
                    <tr className='text-[0.8rem]  text-black font-[550] bg-white even:bg-semi-white' key={i}>
                      <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                      <td className='p-4  text-center truncate'>{item.depositUser.username}</td>
                      <td className='p-4  text-center truncate'>{item.depositUser.email}</td>
                      <td className='p-4  text-center truncate'>${item.amount.toLocaleString()}</td>
                      <td className='p-4  text-center truncate capitalize'>{item.crypto}</td>
                      <td className={`p-4  text-center truncate ${item.status === 'failed' && 'text-[red]'}  ${item.status === 'confirmed' && 'text-[#459e45]'}`}>{item.status}</td>
                      <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onClick={() => singleDepositFunction(item)}> <BsThreeDots className="mx-auto text-base" /></td>
                    </tr>
                  ))}
                </tbody>
              }
              {allDeposits.length < 1 &&
                <tbody>
                  <tr className='text-black text-[0.8rem] bg-white font-[550]'>
                    <td colSpan="7" className='py-2 italic text-center truncate'>
                      <div className='flex gap-1 items-center justify-center'>
                        <span>no deposits found...</span>
                        <img src={nothnyet} className='h-4 w-auto'></img>
                      </div>
                    </td>
                  </tr>
                </tbody>
              }
            </table>
          </div>
          {allDeposits.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-admin-page '>
            {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
            {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
            {end < allDeposits.length && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
          </div>}
        </div>

      </div>
    </AdminDashboard>
  )
}

export default UpdateDeposits