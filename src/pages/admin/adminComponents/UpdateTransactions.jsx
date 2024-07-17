import React, { useState } from 'react'
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosSearch, IoIosSettings } from 'react-icons/io';
import { FiX } from 'react-icons/fi'
import UpdateModal from './UpdateModal';
import { useAtom } from 'jotai';
import { ADMINALLDEPOSITS } from '../../../store';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const UpdateTransactions = ({ refetchAllDeposits, altdeposits, setAltDeposits }) => {
  const [fromAtom] = useAtom(ADMINALLDEPOSITS)
  const [singleDeposit, setSingleDeposit] = useState({})
  const [modal, setModal] = useState(false)
  const [write, setWrite] = useState(false)
  const [search, setSearch] = useState('')

  const SingleDepositFunction = (item) => {
    setSingleDeposit(item)
  }

  const HandleSearch = () => {

    if (!search) {
      setAltDeposits(fromAtom)
      setPagelengthend(fromAtom.length / 6)
      setWrite(false)
      setPagelengthstart(1)
      setStart(0)
      setEnd(6)
    }
    else {
      setWrite(true)
      const showSearch = altdeposits.filter(item => item.deposituser.username.includes(search.toLowerCase()) || item.deposituser.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.deposit_status.includes(search.toLowerCase()) || item.profit_status.includes(search.toLowerCase()))
      setAltDeposits(showSearch)
      setPagelengthend(showSearch.length / 6)
      setPagelengthstart(1)
      setStart(0)
      setEnd(6)
    }
  }

  const CancelWrite = () => {
    setSearch('')
    setAltDeposits(fromAtom)
    setPagelengthend(fromAtom.length / 6)
    setWrite(false)
    setPagelengthstart(1)
    setStart(0)
    setEnd(6)
  }

  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(6)
  const [pagelengthstart, setPagelengthstart] = useState(1)
  const [pagelengthend, setPagelengthend] = useState(altdeposits.length / end)

  let MovePage = () => {

    if (end < altdeposits.length) {
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

  document.documentElement.style.overflow = modal === true ? 'hidden' : 'auto'

  return (
    <div className='h-screen'>
      {modal && <UpdateModal closeView={() => setModal(false)} singleDeposit={singleDeposit} setAltDeposits={setAltDeposits} setStart={setStart} setEnd={setEnd} setPagelengthstart={setPagelengthstart} setPagelengthend={setPagelengthend} setSearch={setSearch} setWrite={setWrite} refetchAllDeposits={refetchAllDeposits} />}

      <div className='uppercase font-bold md:text-2xl text-lg text-black pt-10'>update transactions</div>
      <div className='mt-8 md:mt-6 lg:mt-8'>
        <div className='relative w-fit mx-auto'>
          <input className='border border-[grey] bg-transparent md:w-80 w-60 h-10 outline-none px-4 md:text-[0.9rem] text-base rounded-full text-black ipa' value={search} type='text' onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
          <div className='text-[1.2rem] text-[white] absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center bg-[#462c7c] shantf2'>
            <IoIosSearch />
            {write &&
              <div className='absolute top-[1.2rem] md:right-12 right-11 text-xs cursor-pointer bg-[#979797] rounded-[50%] w-fit h-fit p-0.5' onClick={CancelWrite}>
                <FiX />
              </div>
            }
          </div>
        </div>
        <div className='relative overflow-x-auto shadow-xl rounded-lg mt-4 scrollsdown'>
          <table className='w-full '>
            <thead >
              <tr className='bg-[#462c7c] text-[0.8rem] font-bold text-[white]'>
                <td className='text-center truncate  capitalize p-2 '>date</td>
                <td className='text-center truncate  capitalize p-2 '>username</td>
                <td className='text-center truncate  capitalize p-2 '>email</td>
                <td className='text-center truncate  capitalize p-2 '>amount</td>
                <td className='text-center truncate  capitalize p-2 '>deposit status</td>
                <td className='text-center truncate  capitalize p-2 '>profit</td>
                <td className='text-center truncate  capitalize p-2 '>profit status </td>
                <td className='text-center truncate  capitalize p-2 '>bonus </td>
                <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-[1rem]" /></td>
              </tr>
            </thead>
            {fromAtom.length > 0 &&<tbody>
              {altdeposits.slice(start, end).map((item, i) => (
                <tr className='text-[0.8rem]  text-black font-[550] bg-[white] even:bg-[#e2e0e0]' key={i}>
                  <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                  <td className='p-4  text-center truncate'>{item.deposituser.username}</td>
                  <td className='p-4  text-center truncate'>{item.deposituser.email}</td>
                  <td className='p-4  justify-center flex items-center gap-[0.1rem]'><span className='text-[0.65rem]'>$</span> <span>{item.amount.toLocaleString()}</span></td>
                  <td className={`p-4  text-center truncate ${item.deposit_status === 'failed' && 'text-[red]'}  ${item.deposit_status === 'confirmed' && 'text-[#459e45]'}`}>{item.deposit_status}</td>
                  <td className='p-4  justify-center flex items-center gap-[0.1rem]'><span className='text-[0.65rem]'>$</span> <span>{item.profit.toLocaleString()}</span></td>
                  <td className={`p-4  text-center truncate ${item.profit_status === 'completed' ? 'text-[#459e45]' : 'text-black'}`}>{item.profit_status}</td>
                  <td className='p-4  justify-center flex items-center gap-[0.1rem]'><span className='text-[0.65rem]'>$</span> <span>{item.bonus.toLocaleString()}</span></td>
                  <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onClick={() => { setModal(true); SingleDepositFunction(item) }}> <BsThreeDots className="mx-auto text-[1rem]" /></td>
                </tr>
              ))}
            </tbody>}
          </table>
        </div>
        {fromAtom.length > 0 && <div className='flex gap-2 items-center text-xs mt-4 justify-end text-[#462c7c] '>
          {pagelengthstart > 1 && <div className='py-1 px-2 rounded-md border border-[#462c7c] hover:bg-[#462c7c] hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
          {Math.ceil(pagelengthend) > 1 && <div className='font-bold text-[grey]'>{pagelengthstart} of {Math.ceil(pagelengthend)}</div>}
          {end < altdeposits.length && <div className='py-1 px-2 rounded-md border border-[#462c7c] hover:bg-[#462c7c] hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
        </div>}
      </div>

    </div>
  )
}

export default UpdateTransactions