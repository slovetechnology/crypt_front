import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosSearch, IoIosSettings } from 'react-icons/io';
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { FiX } from 'react-icons/fi'
import { useAtom } from 'jotai';
import { ADMINALLINVESTMENTS } from '../../../store';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import nothnyet from '../../../assets/images/nothn.png'
import AdminDashboard from './AdminDashboard';
import { Apis, UserGetApi } from '../../../services/API';
import UpdateInvestmentModal from '../../../AdminComponents/InvestmentsComponents/UpdateInvestmentModal';
import InvestingSettings from '../../../AdminComponents/InvestmentsComponents/InvestmentSettings';


const UpdateInvestment = () => {
  const [fromAtom, setFromAtom] = useAtom(ADMINALLINVESTMENTS)
  const [allInvestments, setAllInvestments] = useState([])
  const [singleInvestment, setSingleInvestment] = useState({})
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [write, setWrite] = useState(false)
  const [search, setSearch] = useState('')
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(5)
  const [pagestart, setpagestart] = useState(1)
  const [pageend, setpageend] = useState(0)
  const [system, setSystem] = useState(false)


  const FetchAllInvestments = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.admin.all_investments)
      if (response.status === 200) {
        setAllInvestments(response.msg)
        setFromAtom(response.msg)
        setpageend(response.msg.length / end)
      }

    } catch (error) {
      //
    } finally {
    }
  }, [])

  useEffect(() => {
    FetchAllInvestments()
  }, [FetchAllInvestments])

  const SingleInvestmentFunction = (item) => {
    setSingleInvestment(item)
    setModal(true)
  }

  const HandleSearch = () => {
    const altinvestments = fromAtom
    if (!search) {
      setAllInvestments(fromAtom)
      setpageend(fromAtom.length / 5)
      setWrite(false)
      setpagestart(1)
      setStart(0)
      setEnd(5)
    }
    else {
      setWrite(true)
      const showSearch = altinvestments.filter(item => item.investmentUser.username.includes(search.toLowerCase()) || item.investmentUser.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.status.includes(search.toLowerCase()))
      setAllInvestments(showSearch)
      setpageend(showSearch.length / 5)
      setpagestart(1)
      setStart(0)
      setEnd(5)
    }
  }

  const CancelWrite = () => {
    setSearch('')
    setAllInvestments(fromAtom)
    setpageend(fromAtom.length / 5)
    setWrite(false)
    setpagestart(1)
    setStart(0)
    setEnd(5)
  }

  let MovePage = () => {

    if (end < allInvestments.length) {
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
        {modal && <UpdateInvestmentModal closeView={() => setModal(false)} singleInvestment={singleInvestment} setStart={setStart} setEnd={setEnd} setpagestart={setpagestart} setpageend={setpageend} setSearch={setSearch} setWrite={setWrite} refetchAllInvestments={FetchAllInvestments} />}
        {modal2 && <InvestingSettings closeView={() => setModal2(false)} />}

        <div className='flex justify-between items-center pt-10'>
          <div className='uppercase font-bold md:text-2xl text-lg text-black'>all investments</div>
          <div className='h-fit py-1 px-4 w-fit text-xs capitalize bg-[#c9b8eb] rounded-full text-black font-bold flex justify-center gap-2 items-center cursor-default'>
            <div className='md:text-3xl text-2xl cursor-pointer' onClick={() => setSystem(!system)}>
              {system ?
                <BsToggle2On />
                :
                <BsToggle2Off />
              }
            </div>
            <div>{system ? 'automatic' : 'manual'}</div>
          </div>
        </div>
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
          <button className='w-fit h-fit mt-4 mb-2 py-2.5 px-4 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center' onClick={() => setModal2(true)}>
            <span>investment settings</span>
            <IoIosSettings className='text-base' />
          </button>
          <div className='relative overflow-x-auto shadow-xl rounded-lg scrollsdown'>
            <table className='w-full '>
              <thead >
                <tr className='bg-admin-page text-[0.8rem] font-bold text-white'>
                  <td className='text-center truncate  capitalize p-2 '>date</td>
                  <td className='text-center truncate  capitalize p-2 '>username</td>
                  <td className='text-center truncate  capitalize p-2 '>email</td>
                  <td className='text-center truncate  capitalize p-2 '>amount</td>
                  <td className='text-center truncate  capitalize p-2 '>trading plan</td>
                  <td className='text-center truncate  capitalize p-2 '>profit</td>
                  <td className='text-center truncate  capitalize p-2 '>bonus </td>
                  <td className='text-center truncate  capitalize p-2 '>status </td>
                  <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-base" /></td>
                </tr>
              </thead>
              {allInvestments.length > 0 &&
                <tbody>
                  {allInvestments.slice(start, end).map((item, i) => (
                    <tr className='text-[0.8rem]  text-black font-[550] bg-white even:bg-semi-white' key={i}>
                      <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                      <td className='p-4  text-center truncate'>{item.investmentUser.username}</td>
                      <td className='p-4  text-center truncate'>{item.investmentUser.email}</td>
                      <td className='p-4  text-center truncate'>${item.amount.toLocaleString()}</td>
                      <td className='p-4  text-center truncate capitalize'>{item.trading_plan}</td>
                      <td className='p-4  text-center truncate'>${item.profit.toLocaleString()}</td>
                      <td className='p-4  text-center truncate'>${item.bonus.toLocaleString()}</td>
                      <td className={`p-4  text-center truncate ${item.status === 'completed' && 'text-[#459e45]'}`}>{item.status}</td>
                      <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onClick={() => SingleInvestmentFunction(item)}> <BsThreeDots className="mx-auto text-base" /></td>
                    </tr>
                  ))}
                </tbody>
              }
              {allInvestments.length < 1 &&
                <tbody>
                  <tr className='text-black text-[0.8rem] bg-white font-[550]'>
                    <td colSpan="9" className='py-2 italic text-center truncate'>
                      <div className='flex gap-1 items-center justify-center'>
                        <span>no investments found...</span>
                        <img src={nothnyet} className='h-4 w-auto'></img>
                      </div>
                    </td>
                  </tr>
                </tbody>
              }
            </table>
          </div>
          {allInvestments.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-admin-page '>
            {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
            {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
            {end < allInvestments.length && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
          </div>}
        </div>

      </div>
    </AdminDashboard>
  )
}

export default UpdateInvestment