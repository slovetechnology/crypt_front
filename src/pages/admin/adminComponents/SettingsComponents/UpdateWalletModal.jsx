import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineEdit } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
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
  const coinimgref = useRef()
  const qrimgref = useRef()

  const [coinImg, setCoinImg] = useState({
    img: `${imageurl}/coins/${singleWallet.coin_img}`,
    image: null
  })
  const [qrImg, setQrImg] = useState({
    img: `${imageurl}/coins/${singleWallet.qrcode_img}`,
    image: null
  })

  const [form, setForm] = useState({
    coin: singleWallet.coin,
    address: singleWallet.address,
    network: singleWallet.network,
  })

  const inputHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
    setCommit(true)
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
    }, 1500)
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
    setCommit(true)
  }

  const handleUpload2 = (event) => {
    setTimeout(() => {
      setError('')
    }, 1500)
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
    }, 1500)

    setDeleted(false)

    if (!form.coin || !form.network || !form.address) return setError('field(s) cannot be empty')

    const formbody = new FormData()
    formbody.append('wallet_id', singleWallet.id)
    formbody.append('coin_img', coinImg.image)
    formbody.append('qrcode_img', qrImg.image)
    formbody.append('coin', form.coin)
    formbody.append('network', form.network)
    formbody.append('address', form.address)

    if (commit) {
      setLoading(true)
      try {
        const response = await UserPutApi(Apis.admin.update_admin_wallet, formbody)
        if (response.status === 200) {
          Alert('Request Successful', 'Wallet updated successfully', 'success')
          setAdminWallets(response.msg)
          setpageend(response.msg.length / 3)
          setpagestart(1)
          setStart(0)
          setEnd(3)
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
        setpageend(response.msg.length / 3)
        setpagestart(1)
        setStart(0)
        setEnd(3)
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
            <div className='text-xl uppercase flex gap-1 items-center justify-center font-bold border-b'>
              <span>update wallet</span>
              <IoWalletOutline />
            </div>
            <div className='flex flex-col gap-4 mt-4 relative'>
              <div className='flex justify-between items-center'>
                <div className='italic'>coin name:</div>
                <input className='outline-none border border-[#c9b8eb] w-48 p-1 md:text-sm text-base' value={form.coin} name='coin' onChange={inputHandler}></input>
              </div>
              <div className='flex justify-between items-center'>
                <div className='italic'>network:</div>
                <input className='outline-none border border-[#c9b8eb] w-48 p-1 md:text-sm text-base' value={form.network} name='network' onChange={inputHandler}></input>
              </div>
              <div className='flex justify-between items-center'>
                <div className='italic'>address:</div>
                <input className='outline-none border border-[#c9b8eb] w-48 p-1 md:text-sm text-base' value={form.address} name='address' onChange={inputHandler}></input>
              </div>
              <div className='flex justify-between items-center'>
                <div className='italic'>coin image:</div>
                <label className='cursor-pointer'>
                  <div className='flex items-center gap-1'>
                    <img src={coinImg.img} className='h-10 w-auto'></img>
                    <div className='text-sm bg-white rounded-lg p-1 sha'>
                      <MdOutlineEdit />
                    </div>
                  </div>
                  <input ref={coinimgref} type="file" onChange={handleUpload} hidden />
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
              {error !== '' && <div className='md:text-sm text-xs absolute -bottom-6 left-0 text-[red] bg-white sha px-4 py-1 flex items-center gap-1 rounded-sm text-center'>
                <RiErrorWarningLine className='md:text-base text-sm' />
                <span>{error}</span>
              </div>}
            </div>
            <div className='flex gap-4 items-center justify-between mt-8 relative'>
              <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={UpdateWallet}>update</button>
              <button className='w-fit h-fit py-2 px-6 text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium' onClick={() => setDeleted(true)}>delete</button>
              {deleted && <div className='bg-white adsha w-fit h-fit flex flex-col gap-4 items-center justify-center absolute bottom-0 right-0 p-3 rounded-md text-xs'>
                <div className='md:text-[0.85rem] text-xs flex items-center gap-1 justify-center text-center font-medium'>
                  <span> Are you sure you want to Delete Wallet</span>
                  <PiWarningCircleBold className='text-[red] md:text-base text-sm' />
                </div>
                <div className='flex items-center gap-6'>
                  <button className='w-fit h-fit py-2 px-4 capitalize bg-zinc-500 text-white rounded-[3px] font-medium' onClick={() => setDeleted(false)}>no</button>
                  <button className='w-fit h-fit py-2 px-4 capitalize bg-zinc-500 text-white rounded-[3px] font-medium' onClick={DeleteWallet}>yes</button>
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