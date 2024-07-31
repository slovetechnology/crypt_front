import React, { useState } from 'react'
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosSearch, IoIosSettings } from 'react-icons/io';
import { FiX } from 'react-icons/fi'
import UpdateModal from './UpdateModal';
import { useAtom } from 'jotai';
import { ADMINALLDEPOSITS } from '../../../store';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import nothnyet from '../../../assets/images/nothn.png'


const UpdateTransactions = ({ refetchAllDeposits }) => {
  const [fromAtom] = useAtom(ADMINALLDEPOSITS)
  const [alldeposits, setAllDeposits] = useState(fromAtom)
  const [singleDeposit, setSingleDeposit] = useState({})
  const [modal, setModal] = useState(false)
  const [write, setWrite] = useState(false)
  const [search, setSearch] = useState('')
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(6)
  const [pagestart, setpagestart] = useState(1)
  const [pageend, setpageend] = useState(alldeposits.length / end)


  const SingleDepositFunction = (item) => {
    setSingleDeposit(item)
    setModal(true)
  }


  const HandleSearch = () => {

    if (!search) {
      setAllDeposits(fromAtom)
      setpageend(fromAtom.length / 6)
      setWrite(false)
      setpagestart(1)
      setStart(0)
      setEnd(6)
    }
    else {
      setWrite(true)
      const showSearch = alldeposits.filter(item => item.deposituser.username.includes(search.toLowerCase()) || item.deposituser.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.deposit_status.includes(search.toLowerCase()) || item.profit_status.includes(search.toLowerCase()))
      setAllDeposits(showSearch)
      setpageend(showSearch.length / 6)
      setpagestart(1)
      setStart(0)
      setEnd(6)
    }
  }

  const CancelWrite = () => {
    setSearch('')
    setAllDeposits(fromAtom)
    setpageend(fromAtom.length / 6)
    setWrite(false)
    setpagestart(1)
    setStart(0)
    setEnd(6)
  }

  let MovePage = () => {

    if (end < alldeposits.length) {
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


  return (
    <div className='h-screen'>
      {modal && <UpdateModal closeView={() => setModal(false)} singleDeposit={singleDeposit} setAllDeposits={setAllDeposits} setStart={setStart} setEnd={setEnd} setpagestart={setpagestart} setpageend={setpageend} setSearch={setSearch} setWrite={setWrite} refetchAllDeposits={refetchAllDeposits} />}

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
              <tr className='bg-admin-page text-[0.8rem] font-bold text-white' onClick={() => setModal(true)}>
                <td className='text-center truncate  capitalize p-2 '>date</td>
                <td className='text-center truncate  capitalize p-2 '>username</td>
                <td className='text-center truncate  capitalize p-2 '>email</td>
                <td className='text-center truncate  capitalize p-2 '>amount</td>
                <td className='text-center truncate  capitalize p-2 '>deposit status</td>
                <td className='text-center truncate  capitalize p-2 '>profit</td>
                <td className='text-center truncate  capitalize p-2 '>profit status </td>
                <td className='text-center truncate  capitalize p-2 '>bonus </td>
                <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-base" /></td>
              </tr>
            </thead>
            {alldeposits.length > 0 && <tbody>
              {alldeposits.slice(start, end).map((item, i) => (
                <tr className='text-[0.8rem]  text-black font-[550] bg-white even:bg-semi-white' key={i}>
                  <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                  <td className='p-4  text-center truncate'>{item.deposituser.username}</td>
                  <td className='p-4  text-center truncate'>{item.deposituser.email}</td>
                  <td className='p-4  text-center truncate'>${item.amount.toLocaleString()}</td>
                  <td className={`p-4  text-center truncate ${item.deposit_status === 'failed' && 'text-[red]'}  ${item.deposit_status === 'confirmed' && 'text-[#459e45]'}`}>{item.deposit_status}</td>
                  <td className='p-4  text-center truncate'>${item.profit.toLocaleString()}</td>
                  <td className={`p-4  text-center truncate ${item.profit_status === 'completed' ? 'text-[#459e45]' : 'text-black'}`}>{item.profit_status}</td>
                  <td className='p-4  text-center truncate'>${item.bonus.toLocaleString()}</td>
                  <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onClick={() => SingleDepositFunction(item)}> <BsThreeDots className="mx-auto text-base" /></td>
                </tr>
              ))}
            </tbody>}
          </table>
          {alldeposits.length < 1 && <div className='flex gap-1 items-center text-black justify-center w-full h-fit bg-white py-2 text-sm italic'>
            <div>no transactions found...</div>
            <img src={nothnyet} className='h-4 w-auto'></img>
          </div>}
        </div>
        {alldeposits.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-admin-page '>
          {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
          {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
          {end < alldeposits.length && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
        </div>}
      </div>

    </div>
  )
}

export default UpdateTransactions