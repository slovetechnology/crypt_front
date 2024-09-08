import React, { useState } from 'react'
import Loading from '../../GeneralComponents/Loading'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import { MdContentCopy } from 'react-icons/md'
import { useAtom } from 'jotai'
import { Alert } from '../../utils/utils'
import { Apis, imageurl, PostApi } from '../../services/API'
import { ADMINSTORE, ADMINWALLETS, NOTIFICATIONS, UNREADNOTIS } from '../../store'
import { SiBitcoincash } from 'react-icons/si'


const FundModal = ({ closeView, setScreen, setDepositTitle, refetchDeposits }) => {
  const [adminWallets] = useAtom(ADMINWALLETS)
  const [, setNotifications] = useAtom(NOTIFICATIONS)
  const [, setUnreadNotis] = useAtom(UNREADNOTIS)
  const [adminStore] = useAtom(ADMINSTORE)

  const [amount, setAmount] = useState('')
  const [select, setSelect] = useState(false)
  const [mode, setMode] = useState(1)
  const [firstValues, setFirstValues] = useState({})
  const [secondValues, setSecondValues] = useState({})
  const [copy, setCopy] = useState(false)
  const [check, setCheck] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const copyFunction = () => {
    setTimeout(() => {
      setCopy(false)
    }, 2000)

    navigator.clipboard.writeText(secondValues.address)
    setCopy(true)
  }

  const CreateDeposit = async () => {
    setTimeout(() => {
      setError('')
    }, 1000)

    if (!amount) return setError('amount')
    if (isNaN(amount)) return setError('amount')
    if (amount < adminStore.deposit_minimum) return setError('minimum')
    if (Object.values(secondValues).length === 0) return setError('select')
    if (!check) return setError('check')

    const formbody = {
      amount: parseFloat(amount),
      crypto: secondValues.crypto_name,
      network: secondValues.network,
      deposit_address: secondValues.address,
    }

    setLoading(true)
    try {
      const response = await PostApi(Apis.deposit.create_deposit, formbody)
      if (response.status === 200) {
        refetchDeposits()
        setNotifications(response.notis)
        setUnreadNotis(response.unread)
        Alert('Request Successful', `${response.msg}`, 'success')
        setDepositTitle('deposit history')
        setScreen(2)
        closeView()
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
        <div className='font-bold uppercase border-b w-full text-center'>fund wallet</div>
        <div className='flex flex-col gap-5 items-center px-4 mt-5'>
          <div className='flex flex-col gap-1'>
            <div className='capitalize text-[0.8rem] font-medium'>deposit amount ($)</div>
            <div className='relative'>
              <input className={`outline-none border lg:text-[0.85rem] w-52 h-8 rounded-[4px] pl-2 pr-16 bg-semi-white ${error === 'amount' ? 'border-[red]' : 'border-[#5BB4FD]'}`} value={amount} onChange={e => setAmount(e.target.value)} ></input>
              <div className={`text-xs absolute top-2 right-2 ${error === 'minimum' ? 'text-[red]' : 'text-black'}`}>min: {adminStore.deposit_minimum}</div>
            </div>
          </div>
          <div className='h-fit w-fit rounded-[0.2rem] bg-semi-white p-1 relative'>
            <div className={`w-52 py-1 bg-white flex gap-1.5 justify-center items-center capitalize text-sm font-semibold rounded-[0.2rem] text-black cursor-pointer  ${error === 'select' && 'border border-[red]'} shantf`} onClick={() => setSelect(!select)}>
              <div className='text-[0.8rem]'>choose cryptocurrency</div>
              <SiBitcoincash className='text-[#5BB4FD] z-50' />
            </div>
            {select &&
              <div className={`absolute top-0 left-0 ${adminWallets.length > 4 ? 'h-[8.05rem] overflow-y-auto scroll ' : 'h-fit'} w-full bg-white border border-[lightgrey] rounded-md z-50`}>
                {mode === 1 ?
                  <>
                    {adminWallets.length > 0 &&
                      <>
                        {adminWallets.map((item, i) => (
                          <div className='flex flex-col px-2 py-0.5 hover:bg-[#e6e5e5] border-b border-[#ebeaea]' key={i}>
                            <div className='flex gap-2 items-center cursor-pointer' onClick={() => { setFirstValues(item); setMode(2) }}>
                              <img src={`${imageurl}/cryptocurrency/${item.crypto_img}`} className='h-auto w-4'></img>
                              <div className='text-[0.85rem] font-bold capitalize'>{item.crypto_name}</div>
                            </div>
                          </div>
                        ))}
                      </>
                    }
                  </>
                  :
                  <>
                   <div className='py-1 border-b flex justify-center'>
                    <div className='font-medium italic text-xs capitalize text-[#5BB4FD] border border-[lightgrey] border-dashed py-0.5 px-1'>choose network</div>
                   </div>
                    {firstValues.cryptoWallet.length > 0 &&
                      <>
                        {firstValues.cryptoWallet.map((item, i) => (
                          <div className='flex flex-col px-2 py-0.5 hover:bg-[#e6e5e5] border-b border-[#ebeaea]' key={i}>
                            <div className='text-[0.85rem] font-bold capitalize cursor-pointer' onClick={() => { setSelect(false); setSecondValues(item); setMode(1)}}>{item.network}</div>
                          </div>
                        ))}
                      </>
                    }
                  </>
                }
              </div>
            }
          </div>
          {Object.values(secondValues).length !== 0 &&
            <div className='flex flex-col gap-2 items-center'>
              <div className='text-[0.85rem] text-center'><span className='capitalize'>{secondValues.crypto_name}</span> deposit address for <span className='capitalize'>{secondValues.network} network:</span></div>
              <div className='flex gap-2 items-center'>
                <div className='text-xs text-[#5BB4FD] w-11/12 overflow-x-auto'>{secondValues.address?.slice(0, 35)}{secondValues.address.length > 35 && '....'}</div>
                <button className='outline-none w-fit h-fit py-2 px-2.5 text-[0.8rem] text-semi-white bg-[#252525] rounded-md capitalize flex items-center justify-center' onClick={() => copyFunction()}>
                  {!copy && <MdContentCopy />}
                  {copy && <FaCheck />}
                </button>
              </div>
            </div>
          }
          {Object.values(secondValues).length !== 0 &&
            <div>
              <div className='text-[0.85rem] text-center italic'>or scan qr code:</div>
              <div className='flex items-center justify-center'>
                <img src={`${imageurl}/adminWallets/${secondValues.qrcode_img}`} className='h-32 w-auto'></img>
              </div>
            </div>
          }
          <div className='flex flex-col gap-1 items-center mt-2'>
            <div className='flex gap-1.5 items-center'>
              <input type='checkbox' value={check} checked={check} onChange={event => { setCheck(event.target.checked) }} className={`${error === 'check' && 'outline outline-1 outline-[red]'}`}></input>
              <div className='text-[#252525] text-[0.8rem]'>Confirm you've made this deposit</div>
            </div>
            <div className='relative'>
              <button className='py-2 px-16 rounded-md bg-[#252525] text-white capitalize font-medium text-xs' onClick={CreateDeposit}>
                fund account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FundModal