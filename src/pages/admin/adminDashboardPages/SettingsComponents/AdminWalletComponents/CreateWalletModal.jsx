import React, { useRef, useState } from 'react'
import { FiUploadCloud } from "react-icons/fi";
import { MdOutlineEdit } from 'react-icons/md';
import { RiErrorWarningLine } from "react-icons/ri";
import Loading from '../../../../../GeneralComponents/Loading';
import { Apis, PostApi } from '../../../../../services/API';
import { Alert } from '../../../../../utils/utils';
import ModalLayout from '../../../../../utils/ModalLayout';

const CreateWalletModal = ({ closeView, refetchAdminWallets, setStart, setEnd, setpagestart, setpageend }) => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const toggler = useRef()
    const cryptoimgref = useRef()
    const qrimgref = useRef()

    const [cryptoImg, setCryptoImg] = useState({
        img: null,
        image: null
    })
    const [qrImg, setQrImg] = useState({
        img: null,
        image: null
    })

    const [form, setForm] = useState({
        crypto: '',
        address: '',
        network: '',
    })

    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleUpload = (event) => {
        setTimeout(() => {
            setError('')
        }, 2000)
        const file = event.target.files[0]
        if (file.size >= 1000000) {
            cryptoimgref.current.value = null
            return setError('File size too large')
        }
        if (!file.type.startsWith('image/')) {
            cryptoimgref.current.value = null
            return setError('File Error')
        }
        setCryptoImg({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    const handleUpload2 = (event) => {
        setTimeout(() => {
            setError('')
        }, 2000)
        const file = event.target.files[0]
        if (file.size >= 1000000) {
            qrimgref.current.value = null
            return setError('File size too large')
        }
        if (!file.type.startsWith('image/')) {
            qrimgref.current.value = null
            return setError('File Error')
        }
        setQrImg({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    const CreateWallet = async () => {
        setTimeout(() => {
            setError('')
        }, 2000)

        if (!form.crypto || !form.network || !form.address) return setError('Enter all fields')
        if (cryptoImg.img === null || qrImg.img === null) return setError('Upload all images')

        const formbody = new FormData()
        formbody.append('crypto_img', cryptoImg.image)
        formbody.append('qrcode_img', qrImg.image)
        formbody.append('crypto', form.crypto)
        formbody.append('network', form.network)
        formbody.append('address', form.address)

        setLoading(true)
        try {
            const response = await PostApi(Apis.admin.create_admin_wallet, formbody)
            if (response.status === 200) {
                Alert('Request Successful', 'Wallet created successfully', 'success')
                refetchAdminWallets()
                setpageend(response.msg.length / 5)
                setpagestart(1)
                setStart(0)
                setEnd(5)
                closeView()
            } else {
                setError(response.msg)
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }



    return (
        <ModalLayout closeView={closeView} toggler={toggler}>
            <div className='xl:w-1/3 lg:w-2/5 md:w-1/2 w-11/12 h-fit bg-white rounded-lg overflow-hidden' ref={toggler}>
                <div className={`w-full h-full relative`}>
                    {loading && <Loading />}
                    <div className='flex flex-col md:w-[90%] w-11/12 mx-auto py-4 md:text-[0.9rem] text-[0.8rem]'>
                        <div className='text-xl uppercase text-center font-bold border-b'>create wallet</div>
                        <div className='flex flex-col gap-4 mt-4 relative'>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>crypto name:</div>
                                <input className='outline-none border border-[#c9b8eb] w-48 py-1 px-2 md:text-sm text-base' value={form.crypto} name='crypto' onChange={inputHandler}></input>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>network:</div>
                                <input className='outline-none border border-[#c9b8eb] w-48 py-1 px-2 md:text-sm text-base' value={form.network} name='network' onChange={inputHandler}></input>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>address:</div>
                                <input className='outline-none border border-[#c9b8eb] w-48 py-1 px-2 md:text-sm text-base' value={form.address} name='address' onChange={inputHandler}></input>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>crypto image:</div>
                                <label className='cursor-pointer'>
                                    {cryptoImg.img ?
                                        <div className='flex items-center gap-1'>
                                            <img src={cryptoImg.img} className='h-10 w-auto'></img>
                                            <div className='text-sm bg-white rounded-lg p-1 sha'>
                                                <MdOutlineEdit />
                                            </div>
                                        </div>
                                        :
                                        <div className='border rounded-lg flex flex-col gap-2 items-center justify-center p-2'>
                                            <div className='bg-gray-100 rounded-full p-2'><FiUploadCloud /></div>
                                            <span className='text-xs'>click to add image</span>
                                        </div>
                                    }
                                    <input ref={cryptoimgref} type="file" onChange={handleUpload} hidden />
                                </label>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>qr code image:</div>
                                <label className='cursor-pointer'>
                                    {qrImg.img ?
                                        <div className='flex items-center gap-1'>
                                            <img src={qrImg.img} className='h-20 w-auto'></img>
                                            <div className='text-sm bg-white rounded-lg p-1 sha'>
                                                <MdOutlineEdit />
                                            </div>
                                        </div>
                                        :
                                        <div className='border rounded-lg flex flex-col gap-2 items-center justify-center p-2'>
                                            <div className='bg-gray-100 rounded-full p-2'><FiUploadCloud /></div>
                                            <span className='text-xs'>click to add image</span>
                                        </div>
                                    }
                                    <input ref={qrimgref} type="file" onChange={handleUpload2} hidden />
                                </label>
                            </div>
                            {error !== '' &&
                                <div className='md:text-sm text-xs absolute -bottom-5 left-0 text-[red] bg-white sha px-4 py-1 flex items-center gap-1 rounded-sm text-center z-50'>
                                    <RiErrorWarningLine className='md:text-base text-sm' />
                                    <span>{error}</span>
                                    <div className='error-progress absolute -bottom-1 left-0 rounded-sm z-50'></div>
                                </div>
                            }
                        </div>
                        <div className='flex justify-center items-center mt-8'>
                            <button className='w-fit h-fit py-2 px-8 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={CreateWallet}>create</button>
                        </div>
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}

export default CreateWalletModal