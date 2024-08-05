import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineEdit } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { PiWarningCircleBold } from "react-icons/pi";
import { Apis, imageurl, PostApi, UserPutApi } from '../../../../services/API';
import Loading from '../../../../PageComponents/Loading';
import { Alert } from '../../../../utils/utils';

const UpdateWalletModal = ({ closeView, singleWallet, setAdminWallets, setStart, setEnd, setpagestart, setpageend }) => {
  const [error, setError] = useState('')
  const [deleted, setDeleted] = useState(false)
  const [commit, setCommit] = useState(false)
  const [loading, setLoading] = useState(false)
  const toggler = useRef()
  const cryptoimgref = useRef()
  const qrimgref = useRef()

  const [cryptoImg, setCryptoImg] = useState({
    img: `${imageurl}/cryptocurrency/${singleWallet.crypto_img}`,
    image: singleWallet.crypto_img
  })
  const [qrImg, setQrImg] = useState({
    img: `${imageurl}/cryptocurrency/${singleWallet.qrcode_img}`,
    image: singleWallet.qrcode_img
  })

  const [form, setForm] = useState({
    crypto: singleWallet.crypto,
    address: singleWallet.address,
    network: singleWallet.network,
  })

  const inputHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const CommitHandler = () => {
    if (form.crypto === singleWallet.crypto && form.network === singleWallet.network && form.address === singleWallet.address && cryptoImg.image === singleWallet.crypto_img && qrImg.image === singleWallet.qrcode_img) {
      setCommit(false)
    } else {
      setCommit(true)
    }
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
    setCommit(true)
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
    setCommit(true)
  }

  const UpdateWallet = async () => {
    setTimeout(() => {
      setError('')
    }, 2000)

    setDeleted(false)

    if (!form.crypto || !form.network || !form.address) return setError('Fill all fields')
    if (cryptoImg.img === null || qrImg.img === null) return setError('Upload all images')

    const formbody = new FormData()
    formbody.append('wallet_id', singleWallet.id)
    formbody.append('crypto_img', cryptoImg.image)
    formbody.append('qrcode_img', qrImg.image)
    formbody.append('crypto', form.crypto)
    formbody.append('network', form.network)
    formbody.append('address', form.address)

    setLoading(true)
    try {
      const response = await UserPutApi(Apis.admin.update_admin_wallet, formbody)
      if (response.status === 200) {
        Alert('Request Successful', 'Wallet updated successfully', 'success')
        setAdminWallets(response.msg)
        setpageend(response.msg.length / 3)
        setpagestart(1)
        setStart(0)
        setEnd(5)
        closeView()
      } else {
        Alert('Request Failed', response.msg, 'error')
      }
    } catch (error) {
      Alert('Request Failed', `${error.message}`, 'error')
    } finally {
      setLoading(false)
    }

  }


  const DeleteWallet = async () => {

    const formbody = new FormData()
    formbody.append('wallet_id', singleWallet.id)


    setLoading(true)
    try {
      const response = await PostApi(Apis.admin.delete_admin_wallet, formbody)
      if (response.status === 200) {
        Alert('Request Successful', 'Wallet deleted successfully', 'success')
        setDeleted(false)
        setAdminWallets(response.msg)
        setpageend(response.msg.length / 5)
        setpagestart(1)
        setStart(0)
        setEnd(5)
        closeView()
      } else {
        Alert('Request Failed', response.msg, 'error')
      }
    } catch (error) {
      Alert('Request Failed', `${error.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }




  return (
    <div className='w-full h-screen fixed  top-0 left-0 flex items-center justify-center bg-[#0000008a] z-20 '>
      <div className='xl:w-1/3 lg:w-2/5 md:w-1/2 w-11/12 h-fit bg-white rounded-lg overflow-hidden' ref={toggler}>
        <div className={`w-full h-full relative`}>
          {loading && <Loading />}
          <div className='flex flex-col md:w-[90%] w-11/12 mx-auto py-4 md:text-[0.9rem] text-[0.8rem]'>
            <div className='text-xl uppercase text-center font-bold border-b'>update wallet</div>
            <div className='flex flex-col gap-4 mt-4 relative'>
              <div className='flex justify-between items-center'>
                <div className='italic'>crypto name:</div>
                <input className='outline-none border border-[#c9b8eb] w-48 p-1 md:text-sm text-base' value={form.crypto} name='crypto' onChange={inputHandler} onKeyUp={CommitHandler}></input>
              </div>
              <div className='flex justify-between items-center'>
                <div className='italic'>network:</div>
                <input className='outline-none border border-[#c9b8eb] w-48 p-1 md:text-sm text-base' value={form.network} name='network' onChange={inputHandler} onKeyUp={CommitHandler}></input>
              </div>
              <div className='flex justify-between items-center'>
                <div className='italic'>address:</div>
                <input className='outline-none border border-[#c9b8eb] w-48 p-1 md:text-sm text-base' value={form.address} name='address' onChange={inputHandler} onKeyUp={CommitHandler}></input>
              </div>
              <div className='flex justify-between items-center'>
                <div className='italic'>crypto image:</div>
                <label className='cursor-pointer'>
                  <div className='flex items-center gap-1'>
                    <img src={cryptoImg.img} className='h-10 w-auto'></img>
                    <div className='text-sm bg-white rounded-lg p-1 sha'>
                      <MdOutlineEdit />
                    </div>
                  </div>
                  <input ref={cryptoimgref} type="file" onChange={handleUpload} hidden />
                </label>
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
                  <input ref={qrimgref} type="file" onChange={handleUpload2} hidden />
                </label>
              </div>
              {error !== '' &&
                  <div className='md:text-sm text-xs absolute -bottom-5 left-0 text-[red] bg-white sha px-4 py-1 flex items-center gap-1 rounded-sm text-center'>
                    <RiErrorWarningLine className='md:text-base text-sm' />
                    <span>{error}</span>
                    <div className='error-progress absolute -bottom-1 left-0 rounded-sm'></div>
                  </div>
              }
            </div>
            <div className='flex gap-4 items-center mt-8 relative'>
              {commit && <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={UpdateWallet}>update</button>}
              <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium ml-auto' onClick={() => setDeleted(true)}>delete</button>
              {deleted && <div className='bg-white adsha w-fit h-fit flex flex-col gap-4 items-center justify-center absolute bottom-0 right-0 p-3 rounded-md text-xs'>
                <div className='md:text-[0.85rem] text-xs flex items-center gap-1 justify-center text-center font-medium'>
                  <span> Are you sure you want to Delete Wallet</span>
                  <PiWarningCircleBold className='text-[red] md:text-base text-sm' />
                </div>
                <div className='flex items-center gap-6'>
                  <button className='w-fit h-fit py-2 px-6 capitalize bg-zinc-500 text-white rounded-lg font-medium' onClick={() => setDeleted(false)}>no</button>
                  <button className='w-fit h-fit py-2 px-6 capitalize bg-zinc-500 text-white rounded-lg font-medium' onClick={DeleteWallet}>yes</button>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateWalletModal