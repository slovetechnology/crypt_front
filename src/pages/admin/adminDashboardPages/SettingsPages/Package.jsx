import React, { useCallback, useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import nothnyet from '../../../../assets/images/nothn.png'
import { IoIosSettings } from 'react-icons/io';
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsThreeDots } from 'react-icons/bs';
import { useAtom } from 'jotai';
import SettingsLayout from '../SettingsComponents/SettingsLayout';
import UpdatePackageModal from '../SettingsComponents/PackagesComponents/UpdatePackageModal';
import CreatePackageModal from '../SettingsComponents/PackagesComponents/CreatePackageModal';
import { TRADINGPLANS } from '../../../../store';
import { Apis, UserGetApi } from '../../../../services/API';

const Package = () => {
  const [tradingPlans, setTradingPlans] = useAtom(TRADINGPLANS)

  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [singlePlan, setSinglePlan] = useState({})
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(5)
  const [pagestart, setpagestart] = useState(1)
  const [pageend, setpageend] = useState(tradingPlans.length / end)

  const FetchTradingPlans = useCallback(async () => {
    try {
      const response = await UserGetApi(Apis.admin.get_trading_plans)
      if (response.status === 200) {
        setTradingPlans(response.msg)
      }

    } catch (error) {
      //
    }
  }, [])

  useEffect(() => {
    FetchTradingPlans()
  }, [FetchTradingPlans])

  const SinglePlanFunction = (item) => {
    setSinglePlan(item)
    setModal(true)
  }

  let MovePage = () => {

    if (end < tradingPlans.length) {
      let altstart = start
      let altend = end
      let altlengthstart = pagestart

      altend += 5
      setEnd(altend)

      altstart += 5
      setStart(altstart)

      altlengthstart += 1
      setpagestart(altlengthstart)
    }
  }

  let BackPage = () => {

    if (end > 5) {
      let altstart = start
      let altend = end
      let altlengthstart = pagestart

      altend -= 5
      setEnd(altend)

      altstart -= 5
      setStart(altstart)

      altlengthstart -= 1
      setpagestart(altlengthstart)
    }
  }


  return (
    <SettingsLayout>
      <div className='mt-4'>
        {modal && <UpdatePackageModal closeView={() => setModal(false)} singlePlan={singlePlan} refetchTradingPlans={FetchTradingPlans} setStart={setStart} setEnd={setEnd} setpagestart={setpagestart} setpageend={setpageend} />}
        {modal2 && <CreatePackageModal closeView={() => setModal2(false)} refetchTradingPlans={FetchTradingPlans} setStart={setStart} setEnd={setEnd} setpagestart={setpagestart} setpageend={setpageend} />}

        <button className='w-fit h-fit py-2.5 px-4 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center ml-auto mb-2' onClick={() => setModal2(true)}>
          <span>create new trading plan</span>
          <IoIosAddCircleOutline className='text-base' />
        </button>
        <div className='relative overflow-x-auto shadow-xl rounded-lg scrollsdown'>
          <table className='w-full '>
            <thead >
              <tr className='bg-admin-page text-[0.8rem] font-bold text-white'>
                <td className='text-center truncate  capitalize p-2 '>title</td>
                <td className='text-center truncate  capitalize p-2 '>price start</td>
                <td className='text-center truncate  capitalize p-2 '>price limit</td>
                <td className='text-center truncate  capitalize p-2 '>bonus attainable</td>
                <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-base" /></td>
              </tr>
            </thead>
            {tradingPlans.length > 0 && <tbody>
              {tradingPlans.slice(start, end).map((item, i) => (
                <tr className='text-[0.8rem]  text-black font-[550] bg-white even:bg-semi-white' key={i}>
                  <td className='p-4  text-center truncate capitalize'>{item.title}</td>
                  <td className={`p-4  text-center truncate`}>${item.price_start.toLocaleString()}</td>
                  <td className='p-4  text-center truncate capitalize'>${item.price_limit.toLocaleString()}</td>
                  <td className='p-4  text-center truncate capitalize'>${item.plan_bonus.toLocaleString()}</td>
                  <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onClick={() => SinglePlanFunction(item)}> <BsThreeDots className="mx-auto text-base" /></td>
                </tr>
              ))}
            </tbody>}
          </table>
          {tradingPlans.length < 1 && <div className='flex gap-1 items-center text-black justify-center w-full h-fit bg-white py-2 text-sm italic'>
            <div>no trading plans found...</div>
            <img src={nothnyet} className='h-4 w-auto'></img>
          </div>}
        </div>
        {tradingPlans.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-admin-page '>
          {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
          {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
          {end < tradingPlans.length && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
        </div>}
      </div>
    </SettingsLayout>
  )
}

export default Package