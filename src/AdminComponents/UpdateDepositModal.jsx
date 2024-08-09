import React, { useEffect, useRef, useState } from 'react'
import { Apis, UserPutApi, imageurl } from '../services/API'
import moment from 'moment';
import { FaAngleDown } from 'react-icons/fa6';
import Loading from '../GeneralComponents/Loading';
import { Alert } from '../utils/utils';
import avatar from '../assets/images/avatar.png'

const UpdateDepositModal = ({ closeView, refetchAllDeposits, singleDeposit, setStart, setEnd, setpagestart, setpageend, setSearch, setWrite }) => {
  const toggler = useRef()
  const [status, setStatus] = useState(singleDeposit.status)
  const [statusShow, setStatusShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [beforeshow, setBeforeshow] = useState(true)

  const statuses = [
    { status: 'pending' },
    { status: 'confirmed' },
    { status: 'failed' }
  ]

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

  const MoveToBottom = () => {
    const move = document.querySelector('.move')
    move.scrollTo({
      top: move.scrollHeight,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    if (statusShow) {
      MoveToBottom()
    }
  }, [MoveToBottom]
  )

  setTimeout(() => {
    setBeforeshow(false)
  }, 1500)

  const AdminUpdateDeposit = async () => {

    const formbody = {
      deposit_id: singleDeposit.id,
      user_id: singleDeposit.user,
      status: status,
    }

    if (update) {
      setLoading(true)
      const move = document.querySelector('.move')
      move.scrollTo({
        top: 0,
      })

      try {
        const response = await UserPutApi(Apis.admin.update_deposits, formbody)
        if (response.status === 200) {
          refetchAllDeposits()
          Alert('Request Successful', 'Deposit updated successfully', 'success')
          setWrite(false)
          setSearch('')
          setpageend(response.msg.length / 6)
          setpagestart(1)
          setStart(0)
          setEnd(6)
        } else {
          Alert('Request Failed', `${response.msg}`, 'error')
        }
      } catch (error) {
        Alert('Request Failed', `${error.message}`, 'error')
      } finally {
        setLoading(false)
        closeView()
      }
    }
  }

  return (
    <div className='w-full h-screen fixed  top-0 left-0 flex items-center justify-center bg-[#0000008a] z-20'>
      <div className={`bg-white rounded-lg lg:w-1/2 md:w-4/6 w-11/12 lg:h-[90vh] md:h-[80vh] h-[70vh] ${loading ? 'overflow-hidden' : 'overflow-y-auto scroll'}  move`} ref={toggler}>
        <div className={`w-full h-full relative  ${beforeshow && 'flex items-center justify-center'}`}>
          {loading && <Loading />}
          {beforeshow && <div className='beforeshow'></div>}
          {!beforeshow &&
            <div className='md:w-[90%] w-11/12 mx-auto md:py-8 py-4 flex flex-col gap-8 md:text-[0.9rem] text-[0.8rem]'>
              <div className='flex flex-col gap-4 border p-1'>
                <div className=' uppercase font-bold border px-1 '>user details:</div>
                <div className='flex items-center justify-center md:w-[5.8rem] md:h-[5.8rem] w-20 h-20 rounded-full bg-[#c9b8eb] mx-auto'>
                  {Object.values(singleDeposit).length !== 0 &&
                    <>
                      {singleDeposit.depositUser.image ? <img src={`${imageurl}/profiles/${singleDeposit.depositUser.image}`} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                        :
                        <img src={avatar} className='md:w-[5.5rem] md:h-[5.5rem] w-[4.7rem] h-[4.7rem] rounded-full object-cover'></img>
                      }
                    </>
                  }
                </div>
                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-2'>
                  <div className='flex justify-between items-center'>
                    <div className='italic'>username:</div>
                    {Object.values(singleDeposit).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleDeposit.depositUser.username}</div>}
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='italic'>email:</div>
                    {Object.values(singleDeposit).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleDeposit.depositUser.email}</div>}
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4 border p-1'>
                <div className=' uppercase font-bold border px-1 '>deposit details:</div>
                <div className='md:w-5/6 w-11/12 mx-auto flex flex-col gap-4'>
                  <div className='flex justify-between items-center'>
                    <div className='italic'>amount:</div>
                    {Object.values(singleDeposit).length !== 0 && <div className='md:text-[0.95rem] text-sm'>${singleDeposit.amount.toLocaleString()}</div>}
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='italic'>crypto:</div>
                    {Object.values(singleDeposit).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{singleDeposit.crypto}</div>}
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='italic'>date/time:</div>
                    {Object.values(singleDeposit).length !== 0 && <div className='md:text-[0.95rem] text-sm'>{moment(singleDeposit.createdAt).format('DD-MM-yyyy')} / {moment(singleDeposit.createdAt).format('h:mm')}</div>}
                  </div>
                  <div className='flex flex-col gap-6 my-6'>
                    <div className='flex justify-between items-center'>
                      <div className='italic'>status:</div>
                      {singleDeposit.status === 'pending' ? <div className='flex flex-col'>
                        <div className='px-2 py-1 h-fit md:w-48 w-36 bg-white adsha cursor-pointer' onClick={() => { setStatusShow(!statusShow); MoveToBottom() }} >
                          <div className='flex justify-between items-center text-[0.8rem]'>
                            <span >{status}</span>
                            <FaAngleDown className={`${statusShow ? 'rotate-180' : 'rotate-0'} trans`} />
                          </div>
                        </div>
                        {statusShow && <div className='px-2 py-1 h-fit md:w-48 w-36 bg-white adsha'>
                          {statuses.map((item, i) => (
                            <div className='flex flex-col mt-2' key={i}>
                              <div className='flex items-center cursor-pointer hover:bg-[#e6e5e5]' onClick={() => { setStatus(item.status); setStatusShow(false); setUpdate(true) }}>
                                <div className={`text-[0.85rem] font-bold ${item.status === 'confirmed' && 'text-[green]'} ${item.status === 'failed' && 'text-[red]'}`}>{item.status}</div>
                              </div>
                            </div>
                          ))}
                        </div>}
                      </div>
                        :
                        <>
                          {Object.values(singleDeposit).length !== 0 && <div className={`md:text-base text-sm capitalize ${singleDeposit.status === 'confirmed' && 'text-[green]'} ${singleDeposit.status === 'failed' && 'text-[red]'}`}>{singleDeposit.status}</div>}
                        </>
                      }
                    </div>
                  </div>
                </div>
              </div>
              {update && <div className='flex items-center justify-center -mt-4'>
                <button className='w-fit h-fit py-2.5 px-6 md:text-[0.85rem] text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium ' onClick={AdminUpdateDeposit}>update details</button>
              </div>}
            </div>}
        </div>
      </div>
    </div>
  )
}

export default UpdateDepositModal