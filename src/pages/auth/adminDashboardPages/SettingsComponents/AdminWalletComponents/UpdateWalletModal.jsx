import React, { useRef, useState } from 'react'
import { MdOutlineEdit } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { PiWarningCircleBold } from "react-icons/pi";
import { Apis, imageurl, PostApi, UserPutApi } from '../../../../../services/API';
import Loading from '../../../../../GeneralComponents/Loading';
import { Alert } from '../../../../../utils/utils';
import ModalLayout from '../../../../../utils/ModalLayout';
import { FaXmark } from 'react-icons/fa6';

const UpdateWalletModal = ({ closeView, singleWallet, refetchAdminWallets }) => {
  const [error, setError] = useState('')
  const [deleteState, setdeleteState] = useState(false)
  const [commit, setCommit] = useState(false)
  const [loading, setLoading] = useState(false)
  const toggler = useRef()
  const qrimgref = useRef()

  const [qrImg, setQrImg] = useState({
    img: `${imageurl}/adminWallets/${singleWallet?.qrcode_img}`,
    image: singleWallet?.qrcode_img
  })

  const [form, setForm] = useState({
    address: singleWallet?.address,
    network: singleWallet?.network,
  })

  const inputHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const CommitHandler = () => {
    if (form.network === singleWallet.network && form.address === singleWallet.address && qrImg.image === singleWallet.qrcode_img) {
      setCommit(false)
    } else {
      setCommit(true)
    }
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
    setCommit(true)
  }

  const UpdateWallet = async () => {
    setTimeout(() => {
      setError('')
    }, 2000)

    setdeleteState(false)

    if (!form.network || !form.address) return setError('Enter all fields')
    if (qrImg.img === null) return setError('Upload QR images')

    const formbody = new FormData()
    formbody.append('wallet_id', singleWallet.id)
    formbody.append('qrcode_img', qrImg.image)
    formbody.append('network', form.network)
    formbody.append('address', form.address)

    setLoading(true)
    try {
      const response = await UserPutApi(Apis.admin.update_admin_wallet, formbody)
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


  const DeleteWallet = async () => {

    const formbody = {
      wallet_id: singleWallet.id
    }

    setLoading(true)
    try {
      const response = await PostApi(Apis.admin.delete_admin_wallet, formbody)
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
            <div className='text-xl uppercase text-center font-bold border-b'>update wallet</div>
            <div className='flex flex-col gap-4 mt-4 relative'>
              <div className='flex justify-between items-center'>
                <div className='italic'>crypto / coin:</div>
                <div className='capitalize'>{singleWallet?.crypto_name}</div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='italic'>network:</div>
                <input className='outline-none border border-[#c9b8eb] w-48 py-1 px-2 lg:text-sm text-base' value={form.network} name='network' onChange={inputHandler} onKeyUp={CommitHandler}></input>
              </div>
              <div className='flex justify-between items-center'>
                <div className='italic'>address:</div>
                <input className='outline-none border border-[#c9b8eb] w-48 py-1 px-2 lg:text-sm text-base' value={form.address} name='address' onChange={inputHandler} onKeyUp={CommitHandler}></input>
              </div>
              <div className='flex justify-between items-center'>
                <div className='italic'>qr code image:</div>
                <label className='cursor-pointer'>
                  <div className='flex items-center gap-1'>
                    <img src={qrImg.img} className='h-20 w-auto'></img>
                    <div className='text-sm bg-white rounded-lg p-1 sha'>
                      <MdOutlineEdit />
                    </div>
                  </div>
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
            <div className='flex gap-4 items-center mt-8 relative'>
              {commit && <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={UpdateWallet}>update</button>}
              <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium ml-auto' onClick={() => setdeleteState(true)}>delete</button>
              {deleteState && <div className='bg-white adsha w-fit h-fit flex flex-col gap-4 items-center justify-center absolute bottom-0 right-0 p-3 rounded-md text-xs'>
                <div className='md:text-sm text-[0.8rem] flex items-center gap-1 justify-center text-center font-semibold'>
                  <span> Are you sure you want to Delete Wallet?</span>
                  <PiWarningCircleBold className='text-[red]' />
                </div>
                <div className='flex items-center gap-6'>
                  <button className='w-fit h-fit py-2 px-6 capitalize bg-zinc-500 text-white rounded-lg font-medium' onClick={() => setdeleteState(false)}>no</button>
                  <button className='w-fit h-fit py-2 px-6 capitalize bg-zinc-500 text-white rounded-lg font-medium' onClick={DeleteWallet}>yes</button>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}

export default UpdateWalletModal