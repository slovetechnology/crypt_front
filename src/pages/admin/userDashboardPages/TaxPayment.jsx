import React, { useCallback, useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { RiHistoryFill, RiMoneyDollarCircleFill } from 'react-icons/ri'
import { Apis, UserGetApi } from '../../../services/API'
import moment from 'moment'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import nothnyet from '../../../assets/images/nothn.png'
import { IoIosSearch } from 'react-icons/io'
import { FiX } from "react-icons/fi";


const TaxPayment = () => {
    const [original, setOriginal] = useState([])
    const [taxes, setTaxes] = useState([])
    const [taxTitle, setTaxTitle] = useState('pay tax')
    const [screen, setScreen] = useState(1)
    const [search, setSearch] = useState('')
    const [write, setWrite] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)
    const [pagestart, setpagestart] = useState(1)
    const [pageend, setpageend] = useState(0)

    const FetchTaxes = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.tax.user_taxes)
            if (response.status === 200) {
                setTaxes(response.msg)
                setOriginal(response.msg)
                setpageend(response.msg.length / end)
                setpagestart(1)
                setStart(0)
                setEnd(6)
                console.log(response.msg)
            }

        } catch (error) {
            //
        }
    }, [])

    useEffect(() => {
        FetchTaxes()
    }, [FetchTaxes])


    const HandleSearch = () => {
        const altTaxes = original
        if (!search) {
            setWrite(false)
            setTaxes(original)
            setpageend(original.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
        else {
            setWrite(true)
            const showSearch = altTaxes.filter(item => moment(item.createdAt).format('DD-MM-yyyy').includes(search.toString()) || item.amount.toString().includes(search) || item.crypto.includes(search.toLowerCase()) || item.status.includes(search.toLowerCase()))
            setTaxes(showSearch)
            setpageend(showSearch.length / 6)
            setpagestart(1)
            setStart(0)
            setEnd(6)
        }
    }

    const CancelWrite = () => {
        setSearch('')
        setWrite(false)
        setTaxes(original)
        setpageend(original.length / 6)
        setpagestart(1)
        setStart(0)
        setEnd(6)
    }

    let MovePage = () => {

        if (end < taxes.length) {
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
        <Dashboard>
            <div>
                <div className='flex justify-between items-center'>
                    <div className='uppercase font-bold md:text-2xl text-lg text-semi-white '>{taxTitle}</div>
                    {screen === 1 &&
                        <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => { setScreen(2); setTaxTitle('tax history') }}>
                            <span>history</span>
                            <RiHistoryFill />
                        </div>
                    }
                    {screen === 2 &&
                        <div className='flex gap-1 capitalize font-bold md:text-[0.9rem] text-xs text-light items-center justify-center cursor-pointer' onClick={() => { setScreen(1); setTaxTitle('pay tax') }}>
                            <span>pay tax</span>
                            <RiMoneyDollarCircleFill />
                        </div>
                    }
                </div>
                {screen === 1 &&
                    <div>
                    </div>
                }
                {screen === 2 &&
                    <div className='pt-10 pb-10 lg:pb-0'>
                        <div className='relative w-fit mx-auto'>
                            <input className='border border-white bg-transparent md:w-80 w-60 h-10 outline-none pl-4 pr-16 lg:text-[0.9rem] rounded-full text-white ipa' type='text' value={search} onChange={e => setSearch(e.target.value)} onKeyUp={HandleSearch}></input>
                            <div className='text-[1.2rem] text-white absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center bg-light shlz'>
                                <IoIosSearch />
                                {write &&
                                    <div className='absolute top-[1.2rem] md:right-12 right-11 text-xs cursor-pointer bg-[#414040] rounded-full w-fit h-fit p-0.5' onClick={CancelWrite}>
                                        <FiX />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='relative overflow-x-auto shadow-md rounded-lg mt-4 scrollsdown'>
                            <table className='w-full'>
                                <thead >
                                    <tr className='bg-light text-[0.8rem] font-bold text-white'>
                                        <td className='text-center truncate  capitalize p-2'>date</td>
                                        <td className='text-center truncate  capitalize p-2'>time</td>
                                        <td className='text-center truncate  capitalize p-2'>amount</td>
                                        <td className='text-center truncate  capitalize p-2'>crypto</td>
                                        <td className='text-center truncate  capitalize p-2'>deposit address</td>
                                        <td className='text-center truncate  capitalize p-2'>status </td>
                                    </tr>
                                </thead>
                                {taxes.length > 0 &&
                                    <tbody>
                                        {taxes.slice(start, end).map((item, i) => (
                                            <tr className='text-[0.8rem] text-semi-white bg-[#272727] even:bg-[#313131]' key={i}>
                                                <td className='p-4 text-center truncate'>{moment(item.createdAt).format('DD-MM-yyyy')}</td>
                                                <td className='p-4 text-center truncate'>{moment(item.createdAt).format('h:mm')}</td>
                                                <td className='p-4 text-center truncate'>${item.amount.toLocaleString()}</td>
                                                <td className='p-4 text-center truncate'> {item.crypto}</td>
                                                <td className='p-4  text-center truncate'>{item.deposit_address?.slice(0, 5)}.....{item.deposit_address?.slice(-10)} </td>
                                                <td className={`p-4  text-center truncate italic ${item.status === 'received' && 'text-[#adad40]'}  ${item.status === 'pending' && 'text-[#6f6ff5]'}  ${item.status === 'failed' && 'text-[#eb4242] '} `}>{item.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                }
                                {taxes.length < 1 &&
                                    <tbody>
                                        <tr className='text-semi-white text-[0.8rem] bg-[#272727] '>
                                            <td colSpan="6" className='py-2 italic text-center truncate'>
                                                <div className='flex gap-1 items-center justify-center'>
                                                    <span>no taxes found...</span>
                                                    <img src={nothnyet} className='h-4 w-auto'></img>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                }
                            </table>
                        </div>
                        {taxes.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-light '>
                            {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
                            {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
                            {end < taxes.length && <div className='py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
                        </div>}
                    </div>
                }
            </div>
        </Dashboard>
    )
}

export default TaxPayment