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
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [pagestart, setpagestart] = useState(1)
    const [pageend, setpageend] = useState(allWithdrawals.length / end)


    const SingleWithdrawalFunction = (item) => {
        setSingleWithdrawal(item)
    }

    const HandleSearch = () => {

        if (!search) {
            setAllWithdrawals(fromAtom)
            setpageend(fromAtom.length / 6)
            setWrite(false)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
        else {
            setWrite(true)
            const showSearch = allWithdrawals.filter(item => item.wthuser.username.includes(search.toLowerCase()) || item.wthuser.email.includes(search.toLowerCase()) || moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.status.includes(search.toLowerCase()))
            setAllWithdrawals(showSearch)
            setpageend(showSearch.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setAllWithdrawals(fromAtom)
        setpageend(fromAtom.length / 6)
        setWrite(false)
        setpagestart(1)
        setStart(0)
        setEnd(6)
    }

    let MovePage = () => {

        if (end < allWithdrawals.length) {
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
            {modal && <WithdrawalsModal closeView={() => setModal(false)} singleWithdrawal={singleWithdrawal} refetchAllWithdrawals={refetchAllWithdrawals} setStart={setStart} setEnd={setEnd} setpagestart={setpagestart} setpageend={setpageend} setSearch={setSearch} setWrite={setWrite} setAllWithdrawals={setAllWithdrawals} />}

            <div className='uppercase font-bold md:text-2xl text-lg text-black pt-10'>withdrawals</div>
            <div className='mt-12'>
                <div className='relative w-fit mx-auto'>
                    <input className='border border-[grey] bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 md:text-[0.9rem] text-base rounded-full text-black ipa' value={search} type='text' onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch} ></input>
                    <div className='text-[1.2rem] text-white absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center bg-admin-page shantf2'>
                        <IoIosSearch />
                        {write &&
                            <div className='absolute top-[1.2rem] right-12 text-xs cursor-pointer bg-zinc-400 rounded-full w-fit h-fit p-0.5' onClick={CancelWrite}>
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
                                <td className='text-center truncate  capitalize p-2 '>status </td>
                                <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-base" /></td>
                            </tr>
                        </thead>
                        {allWithdrawals.length > 0 && <tbody className=''>
                            {allWithdrawals.slice(start, end).map((item, i) => (
                                <tr className='text-[0.8rem]  text-black font-[550] bg-white even:bg-semi-white' key={i}>
                                    <td className='p-4  text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                                    <td className='p-4  text-center truncate'>{item.wthuser.username}</td>
                                    <td className='p-4  text-center truncate'>{item.wthuser.email}</td>
                                    <td className='p-4  text-center truncate'>${item.amount.toLocaleString()}</td>
                                    <td className={`p-4  text-center truncate ${item.status === 'confirmed' ? 'text-[#459e45]' : 'text-black'}`}>{item.status}</td>
                                    <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onClick={() => {SingleWithdrawalFunction(item); setModal(true); MoveToBottom() }}> <BsThreeDots className="mx-auto text-base" /></td>
                                </tr>
                            ))}
                        </tbody>}
                    </table>
                    {allWithdrawals.length < 1 && <div className='flex gap-1 items-center text-black justify-center w-full h-fit bg-white py-2 text-sm italic'>
                        <div>no withdrawals found...</div>
                        <img src={nothnyet} className='h-4 w-auto'></img>
                    </div>}
                </div>
                {allWithdrawals.length > 0 && <div className='flex gap-2 items-center text-xs mt-4 justify-end text-admin-page '>
                    {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
                    {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
                    {end < allWithdrawals.length && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
                </div>}
            </div>

        </div>
    )
}

export default Withdrawals