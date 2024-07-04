import React, { useState } from 'react'
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosSearch, IoIosSettings } from 'react-icons/io';
import { FiX } from 'react-icons/fi'
import UpdateModal from './UpdateModal';
import { useAtom } from 'jotai';
import { ADMINALLDEPOSITS } from '../../../store';

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
      const showSearch = altdeposits.filter(item => item.deposituser.username.includes(search.toLowerCase()) || item.deposituser.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.deposit_status.includes(search.toLowerCase()) || item.profit_status.includes(search.toLowerCase()))
      setAltDeposits(showSearch)
      setPagelengthend(showSearch.length / 6)
      setWrite(true)
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
    <div className=''>
      {modal && <UpdateModal closeView={() => setModal(false)} singleDeposit={singleDeposit} setAltDeposits={setAltDeposits} setStart={setStart} setEnd={setEnd} setPagelengthstart={setPagelengthstart} setPagelengthend={setPagelengthend} setSearch={setSearch} setWrite={setWrite} refetchAllDeposits={refetchAllDeposits} />}

      <div className='uppercase font-bold text-[1.5rem] text-[black] pt-[2.5rem]'>update transactions</div>
      <div className='mt-[2rem]'>
        <div className='relative w-fit mx-auto'>
          <input className='border border-[grey] bg-transparent w-[20rem] h-[2.5rem] outline-none pl-4 text-[0.9rem] rounded-[12rem] text-black ipa' value={search} type='text' onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
          <div className='text-[1.2rem] text-[white] absolute top-[-0.5rem] right-[-0.5rem] w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center bg-[#462c7c] shantf2'>
            <IoIosSearch />
            {write &&
              <div className='absolute top-[1.2rem] right-[3rem] text-[0.75rem] cursor-pointer bg-[#979797] rounded-[50%] w-[1rem] h-[1rem] flex items-center justify-center' onClick={CancelWrite}>
                <FiX />
              </div>
            }
          </div>
        </div>
        <div className='relative overflow-x-auto shadow-xl rounded-lg mt-[1rem] scrollsdown'>
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
            <tbody className=''>
              {altdeposits.slice(start, end).map((item, i) => (
                <tr className='text-[0.8rem]  text-[black] font-[550] bg-[white] even:bg-[#e2e0e0]' key={i}>
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
            </tbody>
          </table>
        </div>
        <div className='flex flex-col gap-1 text-[0.75rem] py-6'>
          {Math.ceil(pagelengthend) > 1 && <div className='flex justify-end font-bold text-[grey]'>{pagelengthstart} of {Math.ceil(pagelengthend)}</div>}
          <div className='flex items-center justify-end  gap-2 text-white '>
            {pagelengthstart > 1 && <button className='w-fit h-fit py-[0.25rem] px-[1rem] rounded-[10rem] bg-[#71628f] hover:bg-[#462c7c] capitalize' onClick={BackPage}>prev</button>}
            {end < altdeposits.length && <button className='w-fit h-fit py-[0.25rem] px-[1rem] rounded-[10rem] bg-[#71628f] hover:bg-[#462c7c]  capitalize' onClick={MovePage}>next</button>}
          </div>
        </div>
      </div>

    </div>
  )
}

export default UpdateTransactions