import React, { useEffect, useState } from 'react'
import Pagelayout from '../../GeneralComponents/Pagelayout'
import { Link } from 'react-router-dom'
import { MoveToTop } from '../../utils/utils'
import { Apis, UserGetApi } from '../../services/API'
import noplans from '../../assets/images/noplans.png'
import { SiteName } from '../../services/PageLinks'

const TradingPlansPage = () => {
  const [tradingPlans, setTradingPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const FetchTradingPlans = async () => {
      try {
        const response = await UserGetApi(Apis.admin.get_trading_plans)
        if (response.status === 200) {
          setTradingPlans(response.msg)
        }
  
      } catch (error) {
        //
      }finally{
        setLoading(false)
      }
    }
    FetchTradingPlans()
  }, [])

  return (
    <Pagelayout>
      <div className="bg-[whitesmoke] py-16">
        <div className='w-11/12 mx-auto'>
          <div className='flex flex-col gap-4 items-center justify-center'>
            <div className='z-20 font-bold capitalize text-4xl lg:text-5xl text-center'>trading plans</div>
            <div className='md:text-[1.1rem] text-center'>- Below are the different trading plans on the {SiteName} AI Algorithm Trading System -</div>
          </div>
          <div className='flex flex-wrap gap-12 mt-20 text-[#30465c] justify-center'>
            {loading ?
              <>
                {new Array(3).fill(0).map((ele, i) => (
                  <div className='w-[23rem] md:h-[27.5rem] h-[26rem] rounded-md bg-slate-300 animate-pulse' key={i}>
                  </div>
                ))
                }
              </>
              :
              <>
                {tradingPlans.length > 0 ?
                  <>
                    {tradingPlans.map((item, i) => (
                      <div key={i} className={`w-[23rem] h-fit rounded-md ${item.price_start === 1000 || item.title === 'test run' ? 'bg-[#30465c] text-white shabox' : 'bg-transparent'}`}>
                        {item.price_start === 1000 && <div className='mt-4 '>
                          <div className='w-[4.4rem] h-[1.7185rem] flex items-center justify-center bg-white rotate-[320deg]  text-xs uppercase plan text-[#30465c]'>popular</div>
                        </div>}
                        {item.title === 'test run' && <div className='mt-4 '>
                          <div className='w-[4.4rem] h-[1.7185rem] flex items-center justify-center bg-white rotate-[320deg]  text-xs uppercase plan text-[#30465c]'>one trial</div>
                        </div>}
                        <div className={`flex flex-col items-center md:p-10 p-8 ${item.price_start === 1000 || item.title === 'test run' ? 'mt-[-2.8rem]' : ''}`}>
                          <div className='capitalize text'>{item.title}</div>
                          <div className='flex gap-1 my-12 items-center'>
                            <span className='-mt-8'>from</span>
                            <span className={`text-[3rem] font-bold ${item.price_start === 1000 || item.title === 'test run' ? 'text-white' : 'text-black'}`}>${item.price_start}</span>
                            <span className='pt-8 text text-[1.1rem]'>/per week</span>
                          </div>
                          <div className='flex flex-col gap-8 w-full'>
                            <div className='border-b border-[#a5a3a3] w-full'></div>
                            <div className='text text-center'><span className='italic text-[0.8rem]'>Profit:</span> {item.profit_return}% return on investment plus additional bonus up to ${item.plan_bonus}.</div>
                            <Link to='/signup' onClick={MoveToTop} className='flex items-center justify-center'>
                              <button className={`w-fit h-fit py-4 px-8 rounded-full capitalize  hover:translate-y-[-2px] transition-all ${item.price_start === 1000 || item.title === 'test run' ? 'bg-white text-[#30465c]  ' : 'bg-[#30465c] text-white'}`}>
                                join now
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                  :
                  <div className='flex flex-col gap-4 items-center'>
                    <img src={noplans} className=''></img>
                    <div className='text-center text-xl'>Oops! No trading plans yet...</div>
                  </div>
                }
              </>

            }
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default TradingPlansPage