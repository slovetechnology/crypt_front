import React, { useRef, useState } from 'react'
import { FiUploadCloud } from "react-icons/fi";
import { MdOutlineEdit } from 'react-icons/md';
import { RiErrorWarningLine } from "react-icons/ri";
import Loading from '../../../../../GeneralComponents/Loading';
import { Apis, imageurl, PostApi } from '../../../../../services/API';
import { Alert } from '../../../../../utils/utils';
import ModalLayout from '../../../../../utils/ModalLayout';
import { FaXmark } from 'react-icons/fa6';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import nothnyet from '../../../../../assets/images/nothn.png'

const CreateWalletModal = ({ closeView, refetchAdminWallets, cryptocurrency }) => {
    const [select, setSelect] = useState(false)
    const [crypto, setCrypto] = useState({
        name: 'select',
        id: null
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const toggler = useRef()
    const qrimgref = useRef()

    const [qrImg, setQrImg] = useState({
        img: null,
        image: null
    })

    const [form, setForm] = useState({
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
            qrimgref.current.value = null
            return setError('File size too large')
        }

        if (!file.type.startsWith('image/')) {
            qrimgref.current.value = null
            return setError('File error, invalid image format')
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

        if (crypto.name === 'select') return setError('Choose cryptocurrency')
        if (!form.network || !form.address) return setError('Enter all fields')
        if (qrImg.img === null) return setError('Upload qr code image')

        const formbody = new FormData()
        formbody.append('crypto_id', crypto.id)
        formbody.append('qrcode_img', qrImg.image)
        formbody.append('crypto_name', crypto.name)
        formbody.append('network', form.network)
        formbody.append('address', form.address)

        setLoading(true)
        try {
            const response = await PostApi(Apis.admin.create_admin_wallet, formbody)
            if (response.status === 200) {
                Alert('Request Successful', `${response.msg}`, 'success')
                refetchAdminWallets()
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
            <div className='xl:w-1/3 lg:w-2/5 md:w-1/2 w-11/12 h-fit bg-white rounded-lg overflow-hidden relative' ref={toggler}>
                <div className='w-full h-full relative'>
                    {loading && <Loading />}
                    <FaXmark className='absolute top-0 right-1 cursor-pointer text-2xl' onClick={() => closeView()} />
                    <div className='flex flex-col md:w-[90%] w-11/12 mx-auto py-4 md:text-[0.9rem] text-[0.8rem]'>
                        <div className='text-xl uppercase text-center font-bold border-b'>create wallet</div>
                        <div className='flex flex-col gap-4 mt-4 relative'>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>crypto / coin:</div>
                                <div className='relative'>
                                    <div className='px-2 py-1 h-fit md:w-48 w-40 bg-white sha cursor-pointer rounded-[3px]' onClick={() => setSelect(!select)} >
                                        <div className='flex justify-between items-center text-[0.8rem]'>
                                            <span>{crypto.name}</span>
                                            <div className='text-sm'>
                                                {!select ? <TiArrowSortedDown />
                                                    :
                                                    <TiArrowSortedUp />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {select && <div className={`${cryptocurrency.length > 4 ? 'h-24' : 'h-fit'} overflow-y-auto scroll w-full absolute top-[1.9rem] left-0 bg-white border border-[lightgrey] rounded-md z-10 text-[0.85rem] font-bold capitalize`}>
                                        {cryptocurrency.length > 0 ?
                                            <>
                                                {cryptocurrency.map((item, i) => (
                                                    <div key={i} className={`flex flex-col px-2 py-0.5  cursor-pointer hover:bg-[#ececec] ${i !== cryptocurrency.length - 1 && 'border-b border-[#ebeaea]'}`} onClick={() => { setCrypto({name: item.crypto_name, id: item.id}); setSelect(false) }}>
                                                        <div className='flex gap-2 items-center'>
                                                            <img src={`${imageurl}/cryptocurrency/${item.crypto_img}`} className='h-auto w-4'></img>
                                                            <div>{item.crypto_name}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                            :
                                            <div className='p-2 font-medium flex items-center justify-center lowercase'>
                                               <div>no crypto added...</div>
                                               <img src={nothnyet} className='h-3 w-auto'></img>
                                            </div>
                                        }
                                    </div>}
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>network:</div>
                                <input className='outline-none border border-[#c9b8eb] w-48 py-1 px-2 lg:text-sm text-base' value={form.network} name='network' onChange={inputHandler}></input>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='italic'>address:</div>
                                <input className='outline-none border border-[#c9b8eb] w-48 py-1 px-2 lg:text-sm text-base' value={form.address} name='address' onChange={inputHandler}></input>
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
                                    <input ref={qrimgref} type="file" onChange={handleUpload} hidden />
                                </label>
                            </div>
                            {error !== '' &&
                                <div className='md:text-sm text-xs absolute -bottom-5 left-0 text-[#eb2e2e] bg-white sha px-4 py-1 flex items-center gap-1 rounded-sm text-center z-10'>
                                    <RiErrorWarningLine />
                                    <span>{error}</span>
                                    <div className='error-progress absolute -bottom-1 left-0 rounded-sm z-10'></div>
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