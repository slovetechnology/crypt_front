import { useAtom } from 'jotai'
import React, { useRef, useState } from 'react'
import { ADMINWALLETS, NOTIFICATIONS, PROFILE, UNREADNOTIS } from '../store'
import { MdContentCopy } from 'react-icons/md'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import { SiBitcoincash } from 'react-icons/si'
import { IoCheckbox } from 'react-icons/io5'
import Loading from '../GeneralComponents/Loading'
import { Alert } from '../utils/utils'
import { Apis, imageurl, PostApi } from '../services/API'

const PayTaxModal = ({ closeView, setScreen, refetchTaxes, setTaxTitle }) => {
    const [user] = useAtom(PROFILE)
    const [adminWallets] = useAtom(ADMINWALLETS)
    const [, setNotifications] = useAtom(NOTIFICATIONS)
    const [, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [amount, setAmount] = useState('')
    const [selectState, setSelectState] = useState(false)
    const [selectValue, setSelectValue] = useState({})
    const [copy, setCopy] = useState(false)
    const [check, setCheck] = useState('')
    const [error, setError] = useState('')
    const [imageError, setImageError] = useState('')
    const [loading, setLoading] = useState(false)

    const proofref = useRef()
    const [proof, setProof] = useState(null)

    const copyFunction = () => {
        setTimeout(() => {
            setCopy(false)
        }, 2000)

        navigator.clipboard.writeText(selectValue.address)
        setCopy(true)
    }

    const handleUpload = (event) => {
        setTimeout(() => {
            setImageError('')
        }, 2000)
        const file = event.target.files[0]
        if (!file.type.startsWith('image/')) {
            proofref.current.value = null
            return setImageError('File Error')
        }
        setProof(file)
    }

    const ConfirmTaxPayment = async () => {
        setTimeout(() => {
            setError('')
        }, 1000)

        if (!amount) return setError('amount')
        if (isNaN(amount)) return setError('amount')
        if (Object.values(selectValue).length === 0) return setError('select')
        if (proof === null) return setError('proof')
        if (!check) return setError('check')

        const formbody = new FormData()
        formbody.append('payment_proof', proof)
        formbody.append('amount', amount)
        formbody.append('crypto', selectValue.crypto)
        formbody.append('deposit_address', selectValue.address)
        formbody.append('taxPayer', user.username)

        setLoading(true)
        try {
            const response = await PostApi(Apis.tax.pay_tax, formbody)
            if (response.status === 200) {
                refetchTaxes()
                setNotifications(response.notis)
                setUnreadNotis(response.unread)
                Alert('Request Successful', `${response.msg}`, 'success')
                setAmount('')
                setCheck(!check)
                setSelectValue({})
                setTaxTitle('tax history')
                setProof({
                    img: null,
                    image: null
                })
                setScreen(2)
            } else {
                Alert('Request Failed', `${response.msg}`, 'error')
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center bg-[#0c091aa4] z-20'>
            <div className='w-96 h-fit bg-white rounded-lg py-4 overflow-hidden relative'>
                {loading && <Loading />}
                <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
                <div className='font-bold uppercase border-b w-full text-center'>pay tax</div>
                <div className='flex flex-col items-center gap-5 mt-5 px-4'>
                    <div className='flex flex-col gap-1'>
                        <div className='text-[0.8rem] capitalize font-medium'>tax amount ($)</div>
                        <input className={`outline-none border bg-semi-white text-black lg:text-[0.85rem] md:w-48 w-40 px-2 h-8 rounded-[4px] ${error === 'amount' ? 'border-[red]' : 'border-[#3966FF]'}`} value={amount} onChange={e => setAmount(e.target.value)}></input>
                    </div>
                    <div className='h-fit w-fit rounded-[0.2rem] bg-semi-white p-1 relative'>
                        <div className={`w-52 py-1 bg-white flex gap-1.5 justify-center items-center capitalize text-sm font-semibold rounded-[0.2rem] text-black cursor-pointer  ${error === 'select' && 'border border-[red]'} shantf`} onClick={() => setSelectState(!selectState)}>
                            <div className='text-[0.8rem]'>choose cryptocurrency</div>
                            <SiBitcoincash className='text-[#3966FF]' />
                        </div>
                        {adminWallets.length > 0 &&
                            <>
                                {selectState && <div className='absolute top-0 left-0 h-fit w-full bg-white border border-[lightgrey] rounded-md z-50'>
                                    {adminWallets.map((item, i) => (
                                        <div className={`flex flex-col px-2 py-0.5 hover:bg-[#e6e5e5] ${i === adminWallets.length - 1 ? 'hover:rounded-b-md' : 'border-b border-[#f7f5f5]'}`} key={i}>
                                            <div className='flex gap-2 items-center cursor-pointer' onClick={() => { setSelectState(false); setSelectValue(item) }}>
                                                <img src={`${imageurl}/cryptocurrency/${item.crypto_img}`} className='h-auto w-4'></img>
                                                <div className='text-[0.85rem] font-bold capitalize'>{item.crypto}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>}
                            </>}
                    </div>
                    {Object.values(selectValue).length !== 0 &&
                        <div className='flex flex-col gap-2 items-center'>
                            <div className='text-[0.85rem] text-center'><span className='capitalize'>{selectValue.crypto}</span> deposit address for <span className='capitalize'>{selectValue.network}</span>:</div>
                            <div className='flex gap-2 items-center'>
                                <div className='text-xs text-[#3966FF] w-11/12 overflow-x-auto'>{selectValue.address?.slice(0, 35)}{selectValue.address.length > 35 && '....'}</div>
                                <button className='outline-none w-fit h-fit py-2 px-2.5 text-[0.8rem] text-semi-white bg-[#252525] rounded-md capitalize flex items-center justify-center' onClick={() => copyFunction()}>
                                    {!copy && <MdContentCopy />}
                                    {copy && <FaCheck />}
                                </button>
                            </div>
                        </div>
                    }
                    {Object.values(selectValue).length !== 0 &&
                        <div>
                            <div className='text-center italic text-sm'>or scan qr code:</div>
                            <div className='flex items-center justify-center'>
                                <img src={`${imageurl}/cryptocurrency/${selectValue.qrcode_img}`} className='h-32 w-auto'></img>
                            </div>
                        </div>
                    }
                    <div className='flex flex-col gap-2 items-center'>
                        <div className='italic text-sm'>attach proof of payment:</div>
                        <div className={`w-64 rounded-[3px] h-fit flex items-center gap-4 relative py-1 border ${error === 'proof' ? 'border-[red]' : 'border-[#3966FF]'}`}>
                            <label className='cursor-pointer'>
                                <div className='bg-semi-white h-fit w-fit px-2 py-1.5 text-sm rounded-sm'>choose file</div>
                                <input ref={proofref} type="file" onChange={handleUpload} hidden />
                            </label>
                            <div className='text-sm text-center'>{proof === null ? 'No file choosen' : proof.name}</div>
                            <div className='absolute -bottom-5 right-0 text-[0.8rem] text-[red]'>{imageError}</div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 items-center mt-2'>
                        <div className='flex gap-1.5 items-center'>
                            <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className={`${error === 'check' && 'outline outline-1 outline-[red]'}`}></input>
                            <div className='text-[#252525] text-[0.8rem]'>Confirm you've paid this tax</div>
                        </div>
                        <button className='outline-none w-fit h-fit py-2 px-10 text-xs text-semi-white bg-[#252525] rounded-md capitalize flex items-center gap-1 font-medium' onClick={ConfirmTaxPayment}>
                            <span>confirm payment</span>
                            <IoCheckbox />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayTaxModal