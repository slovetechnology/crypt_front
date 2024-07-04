import moment from 'moment';
import React, { useState } from 'react'
import WithdrawalsModal from './WithdrawalsModal';
import { IoIosSearch, IoIosSettings } from 'react-icons/io';
import { FiX } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import { useAtom } from 'jotai';
import { ADMINALLWITHDRAWALS } from '../../../store';

const Withdrawals = ({ refetchAllWithdrawals }) => {
    const [fromAtom] = useAtom(ADMINALLWITHDRAWALS)
    const [allWithdrawals, setAllWithdrawals] = useState(fromAtom)
    const [singleWithdrawal, setSingleWithdrawal] = useState({})
    const [modal, setModal] = useState(false)
    const [write, setWrite] = useState(false)
    const [search, setSearch] = useState('')

    const SingleWithdrawalFunction = (item) => {
        setSingleWithdrawal(item)
    }

    const HandleSearch = () => {

        if (!search) {
            setAllWithdrawals(fromAtom)
            setPagelengthend(fromAtom.length / 6)
            setWrite(false)
            setPagelengthstart(1)
            setStart(0)
            setEnd(6)
        }
        else {
            const showSearch = allWithdrawals.filter(item => item.wthuser.username.includes(search.toLowerCase()) || item.wthuser.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.status.includes(search.toLowerCase()))
            setAllWithdrawals(showSearch)
            setPagelengthend(showSearch.length / 6)
            setWrite(true)
            setPagelengthstart(1)
            setStart(0)
            setEnd(6)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setAllWithdrawals(fromAtom)
        setPagelengthend(fromAtom.length / 6)
        setWrite(false)
        setPagelengthstart(1)
        setStart(0)
        setEnd(6)
    }

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [pagelengthstart, setPagelengthstart] = useState(1)
    const [pagelengthend, setPagelengthend] = useState(allWithdrawals.length / end)

    let MovePage = () => {

        if (end < allWithdrawals.length) {
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
            {modal && <WithdrawalsModal closeView={() => setModal(false)} singleWithdrawal={singleWithdrawal} refetchAllWithdrawals={refetchAllWithdrawals} setStart={setStart} setEnd={setEnd} setPagelengthstart={setPagelengthstart} setPagelengthend={setPagelengthend} setSearch={setSearch} setWrite={setWrite} setAllWithdrawals={setAllWithdrawals} />}

            <div className='uppercase font-bold text-[1.5rem] text-[black] pt-[2.5rem]'>withdrawals</div>
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
                                <td className='text-center truncate  capitalize p-2 '>status </td>
                                <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-[1rem]" /></td>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {allWithdrawals.slice(start, end).map((item, i) => (
                                <tr className='text-[0.8rem]  text-[black] font-[550] bg-[white] even:bg-[#e2e0e0]' key={i}>
                                    <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                                    <td className='p-4  text-center truncate'>{item.wthuser.username}</td>
                                    <td className='p-4  text-center truncate'>{item.wthuser.email}</td>
                                    <td className='p-4  justify-center flex items-center gap-[0.1rem]'><span className='text-[0.65rem]'>$</span> <span>{item.amount.toLocaleString()}</span></td>
                                    <td className={`p-4  text-center truncate ${item.status === 'confirmed' ? 'text-[#459e45]' : 'text-black'}`}>{item.status}</td>
                                    <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onClick={() => { setModal(true); SingleWithdrawalFunction(item) }}> <BsThreeDots className="mx-auto text-[1rem]" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex flex-col gap-1 text-[0.75rem] py-6'>
                    {Math.ceil(pagelengthend) > 1 && <div className='flex justify-end font-bold text-[grey]'>{pagelengthstart} of {Math.ceil(pagelengthend)}</div>}
                    <div className='flex items-center justify-end  gap-2 text-white '>
                        {pagelengthstart > 1 && <button className='w-fit h-fit py-[0.25rem] px-[1rem] rounded-[10rem] bg-[#71628f] hover:bg-[#462c7c] capitalize' onClick={BackPage}>prev</button>}
                        {end < allWithdrawals.length && <button className='w-fit h-fit py-[0.25rem] px-[1rem] rounded-[10rem] bg-[#71628f] hover:bg-[#462c7c]  capitalize' onClick={MovePage}>next</button>}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Withdrawals