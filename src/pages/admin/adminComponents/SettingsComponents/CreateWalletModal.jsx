import React, { useEffect, useRef, useState } from 'react'
import { FiUploadCloud } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";

const CreateWalletModal = ({ closeView }) => {
    const [error, setError] = useState('')
    const toggler = useRef()
    const coinimgref = useRef()
    const qrimgref = useRef()

    const [coinImg, setCoinImg] = useState({
        img: null,
        image: null
    })
    const [qrImg, setQrImg] = useState({
        img: null,
        image: null
    })

    const [form, setForm] = useState({
        coin: '',
        address: '',
        network: '',
    })

    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        if (toggler) {
            window.addEventListener('click', (event) => {
                if (toggler.current !== null) {
                    if (!toggler.current.contains(event.target)) {
                        closeView()
                    }
                }
            }, true)
        }
    }, [])

    const handleUpload = (event) => {
        setTimeout(() => {
            setError('')
        }, 2000)
        const file = event.target.files[0]
        if (file.size >= 1000000) {
            coinimgref.current.value = null
            return setError('File size too large')
        }
        if (!file.type.startsWith('image/')) {
            coinimgref.current.value = null
            return setError('File Error')
        }
        setCoinImg({
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

    const CreateWallet = () => {
        setTimeout(() => {
            setError('')
        }, 2000)

        if (!form.coin) return setError('field(s) cannot be empty')
        if (!form.network) return setError('field(s) cannot be empty')
        if (!form.address) return setError('field(s) cannot be empty')
        if (coinImg.img === null) return setError('upload all images')
        if (qrImg.img === null) return setError('upload all images')
    }




    return (
        <div className='w-full h-screen fixed  top-0 left-0 flex items-center justify-center bg-[#0000008a] z-20 '>
            <div className='xl:w-1/3 lg:w-2/5 md:w-1/2 w-11/12 h-fit bg-white rounded-lg overflow-hidden' ref={toggler}>
                <div className={`w-full h-full relative`}>
                    <div className='flex flex-col md:w-[90%] w-11/12 mx-auto py-4 md:text-[0.9rem] text-[0.8rem]'>
                        <div className='text-xl uppercase flex gap-1 items-center justify-center font-bold border-b'>
                            <span>create wallet</span>
                            <IoWalletOutline />
                        </div>
                        <div className='flex flex-col gap-4 mt-4 relative'>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>coin name:</div>
                                <input className='outline-none border border-[#c9b8eb] w-48 p-1' value={form.coin} name='coin' onChange={inputHandler}></input>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>network:</div>
                                <input className='outline-none border border-[#c9b8eb] w-48 p-1' value={form.network} name='network' onChange={inputHandler}></input>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>address:</div>
                                <input className='outline-none border border-[#c9b8eb] w-48 p-1' value={form.address} name='address' onChange={inputHandler}></input>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>coin image:</div>
                                <label className='cursor-pointer'>
                                    {coinImg.img ?
                                        <img src={coinImg.img} className='h-10 w-auto'></img>
                                        :
                                        <div className='border rounded-lg flex flex-col gap-2 items-center justify-center p-2'>
                                            <div className='bg-gray-100 rounded-full p-2'><FiUploadCloud /></div>
                                            <span className='text-xs'>click to add image</span>
                                        </div>
                                    }
                                    <input ref={coinimgref} type="file" onChange={handleUpload} hidden />
                                </label>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>qr code image:</div>
                                <label className='cursor-pointer'>
                                    {qrImg.img ?
                                        <img src={qrImg.img} className='h-20 w-auto'></img>
                                        :
                                        <div className='border rounded-lg flex flex-col gap-2 items-center justify-center p-2'>
                                            <div className='bg-gray-100 rounded-full p-2'><FiUploadCloud /></div>
                                            <span className='text-xs'>click to add image</span>
                                        </div>
                                    }
                                    <input ref={qrimgref} type="file" onChange={handleUpload2} hidden />
                                </label>
                            </div>
                            {error !== '' && <div className='md:text-sm text-xs absolute -bottom-6 left-0 text-[red] bg-white sha px-4 py-1 flex items-center gap-1'>
                                <RiErrorWarningLine className='md:text-base text-sm' />
                                <span>{error}</span>
                            </div>}
                        </div>
                        <div className='flex justify-center items-center mt-8'>
                            <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={CreateWallet}>create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateWalletModal