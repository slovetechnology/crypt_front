import moment from 'moment';
import React, { useState } from 'react'
import WithdrawalsModal from './WithdrawalsModal';
import { IoIosSearch, IoIosSettings } from 'react-icons/io';
import { FiX } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import { useAtom } from 'jotai';
import { ADMINALLWITHDRAWALS } from '../../../store';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import nothnyet from '../../../assets/images/nothn.png'

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
            setWrite(true)
            const showSearch = allWithdrawals.filter(item => item.wthuser.username.includes(search.toLowerCase()) || item.wthuser.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.status.includes(search.toLowerCase()))
            setAllWithdrawals(showSearch)
            setPagelengthend(showSearch.length / 6)
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
        <div className='h-screen'>
            {modal && <WithdrawalsModal closeView={() => setModal(false)} singleWithdrawal={singleWithdrawal} refetchAllWithdrawals={refetchAllWithdrawals} setStart={setStart} setEnd={setEnd} setPagelengthstart={setPagelengthstart} setPagelengthend={setPagelengthend} setSearch={setSearch} setWrite={setWrite} setAllWithdrawals={setAllWithdrawals} />}

            <div className='uppercase font-bold md:text-2xl text-lg text-black pt-10'>withdrawals</div>
            <div className='mt-8 md:mt-6 lg:mt-8'>
                <div className='relative w-fit mx-auto'>
                    <input className='border border-[grey] bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 md:text-[0.9rem] text-base rounded-full text-black ipa' value={search} type='text' onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
                    <div className='text-[1.2rem] text-white absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center bg-[#462c7c] shantf2'>
                        <IoIosSearch />
                        {write &&
                            <div className='absolute top-[1.2rem] right-12 text-xs cursor-pointer bg-zinc-400 rounded-full w-fit h-fit p-0.5' onClick={CancelWrite}>
                                <FiX />
                            </div>
                        }
                    </div>
                </div>
                <div className='relative overflow-x-auto shadow-xl rounded-lg mt-[1rem] scrollsdown'>
                    <table className='w-full '>
                        <thead >
                            <tr className='bg-[#462c7c] text-[0.8rem] font-bold text-white'>
                                <td className='text-center truncate  capitalize p-2 '>date</td>
                                <td className='text-center truncate  capitalize p-2 '>username</td>
                                <td className='text-center truncate  capitalize p-2 '>email</td>
                                <td className='text-center truncate  capitalize p-2 '>amount</td>
                                <td className='text-center truncate  capitalize p-2 '>status </td>
                                <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-[1rem]" /></td>
                            </tr>
                        </thead>
                        {fromAtom.length > 0 && <tbody className=''>
                            {allWithdrawals.slice(start, end).map((item, i) => (
                                <tr className='text-[0.8rem]  text-black font-[550] bg-white even:bg-[#e2e0e0]' key={i}>
                                    <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                                    <td className='p-4  text-center truncate'>{item.wthuser.username}</td>
                                    <td className='p-4  text-center truncate'>{item.wthuser.email}</td>
                                    <td className='p-4  justify-center flex items-center gap-[0.1rem]'><span className='text-[0.65rem]'>$</span> <span>{item.amount.toLocaleString()}</span></td>
                                    <td className={`p-4  text-center truncate ${item.status === 'confirmed' ? 'text-[#459e45]' : 'text-black'}`}>{item.status}</td>
                                    <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onClick={() => { setModal(true); SingleWithdrawalFunction(item) }}> <BsThreeDots className="mx-auto text-[1rem]" /></td>
                                </tr>
                            ))}
                        </tbody>}
                    </table>
                    {allWithdrawals.length === 0 && <div className='flex gap-1 items-center text-black justify-center w-full h-fit bg-white py-2 text-sm italic'>
                        <div>no withdrawals found...</div>
                        <img src={nothnyet} className='h-4 w-auto'></img>
                    </div>}
                </div>
                {fromAtom.length > 0 && <div className='flex gap-2 items-center text-xs mt-4 justify-end text-[#462c7c] '>
                    {pagelengthstart > 1 && <div className='py-1 px-2 rounded-md border border-[#462c7c] hover:bg-[#462c7c] hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
                    {Math.ceil(pagelengthend) > 1 && <div className='font-bold text-[grey]'>{pagelengthstart} of {Math.ceil(pagelengthend)}</div>}
                    {end < allWithdrawals.length && <div className='py-1 px-2 rounded-md border border-[#462c7c] hover:bg-[#462c7c] hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
                </div>}
            </div>

        </div>
    )
}

export default Withdrawals