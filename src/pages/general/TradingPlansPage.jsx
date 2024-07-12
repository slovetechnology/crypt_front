import React from 'react'
import Pagelayout from '../../PageComponents/Pagelayout'
import { Link } from 'react-router-dom'
import { MoveToTop } from '../../utils/utils'

const TradingPlansPage = () => {
  return (
    <Pagelayout>
      <div className="bg-[whitesmoke] py-16 move">
        <div className='w-[90%] mx-auto'>
          <div className='flex flex-col gap-3 items-center justify-center'>
            <div className=' flex items-center'>
              <div className='w-[4.2rem] h-[4.2rem] bg-[#e4e3e3] rounded-full'></div>
              <span className='z-20 ml-[-3rem] font-bold capitalize text-[2.5rem] lg:text-[3rem]'>trading plans</span>
            </div>
            <div className='text-[0.9rem] md:text-[1.1rem] text-center'>- Below are the different trading plans on the AI Algorithm Trading System -</div>
          </div>
          <div className='flex flex-wrap gap-12 mt-20 text-[#30465c] justify-center'>
            <div className='w-[23rem] h-fit bg-[whitesmoke] rounded-md'>
              <div className='flex flex-col items-center p-10'>
                <div className='capitalize'>starter plan</div>
                <div className='flex gap-1 my-[3rem] items-center'>
                  <span className='mt-[-2rem]'>from</span>
                  <span className='text-[3rem] font-bold text-black'>$100</span>
                  <span className='pt-[2rem]  text-[1.1rem]'>/per week</span>
                </div>
                <div className='flex flex-col gap-[2rem] w-full'>
                  <div className='border-b-[0.1px] border-[#c0bfbf] w-full'></div>
                  <div className=' text-center'><span className='italic text-[0.85rem]'>Profit:</span> 60% return on investment weekly plus additional bonus up to $60.</div>
                  <Link to='/signup' onClick={MoveToTop} className='flex items-center justify-center'>
                    <button className='w-fit h-fit py-[1rem] px-[2rem] bg-[#30465c] rounded-[30px] capitalize text-[white] hover:translate-y-[-2px] transition-all'>
                      join now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className='w-[23rem] h-fit bg-[#30465c] rounded-md text-white shabox'>
              <div className='mt-4 '>
                <div className='w-[4.4rem] h-[1.7185rem] flex items-center justify-center bg-white rotate-[320deg]  text-xs uppercase plan text-[#30465c]'>popular</div>
              </div>
              <div className='flex flex-col items-center p-10 mt-[-2.8rem]'>
                <div className='capitalize text'>premier plan</div>
                <div className='flex gap-1 my-[3rem] items-center'>
                  <span className='mt-[-2rem]'>from</span>
                  <span className='text-[3rem] font-bold text-white'>$1000</span>
                  <span className='pt-[2rem] text text-[1.1rem]'>/per week</span>
                </div>
                <div className='flex flex-col gap-[2rem] w-full'>
                  <div className='border-b-[0.1px] border-[#a5a3a3] w-full'></div>
                  <div className='text text-center'><span className='italic text-[0.8rem]'>Profit:</span> 60% return on investment weekly plus additional bonus up to $210.</div>
                  <Link to='/signup' onClick={MoveToTop} className='flex items-center justify-center'>
                    <button className='w-fit h-fit py-[1rem] px-[2rem] text-[#30465c] rounded-[30px] capitalize bg-white hover:translate-y-[-2px] transition-all'>
                      join now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className='w-[23rem] h-fit bg-[whitesmoke] rounded-md text-[#30465c]'>
              <div className='flex flex-col items-center p-10'>
                <div className='capitalize '>business plan</div>
                <div className='flex gap-1 my-[3rem] items-center'>
                  <span className='mt-[-2rem]'>from</span>
                  <span className='text-[3rem] font-bold text-black'>$500</span>
                  <span className='pt-[2rem] text-[1.1rem]'>/per week</span>
                </div>
                <div className='flex flex-col gap-[2rem] w-full'>
                  <div className='border-b-[0.1px] border-[#c0bfbf] w-full'></div>
                  <div className='text-center'><span className='italic text-[0.85rem]'>Profit:</span> 60% return on investment weekly plus additional bonus up to $130.</div>
                  <Link to='/signup' onClick={MoveToTop} className='flex items-center justify-center'>
                    <button className='w-fit h-fit py-[1rem] px-[2rem] bg-[#30465c] rounded-[30px] capitalize text-white hover:translate-y-[-2px] transition-all '>
                      join now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className='w-[23rem] h-fit bg-[whitesmoke] rounded-md text-[#30465c]'>
              <div className='flex flex-col items-center p-10'>
                <div className='capitalize '>pro plan</div>
                <div className='flex gap-1 my-[3rem] items-center'>
                  <span className='mt-[-2rem]'>from</span>
                  <span className='text-[3rem] font-bold text-black'>$1500</span>
                  <span className='pt-[2rem] text-[1.1rem]'>/per week</span>
                </div>
                <div className='flex flex-col gap-[2rem] w-full'>
                  <div className='border-b-[0.1px] border-[#c0bfbf] w-full'></div>
                  <div className=' text-center'><span className='italic text-[0.85rem]'>Profit:</span> 60% return on investment weekly plus additional bonus up to $440.</div>
                  <Link to='/signup' onClick={MoveToTop} className='flex items-center justify-center'>
                    <button className='w-fit h-fit py-[1rem] px-[2rem] bg-[#30465c] rounded-[30px] capitalize text-white hover:translate-y-[-2px] transition-all hover:bg-[#30465c] hover:text-white'>
                      join now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className='w-[23rem] h-fit bg-[whitesmoke] rounded-md text-[#30465c]'>
              <div className='flex flex-col items-center p-10'>
                <div className='capitalize '>diamond plan</div>
                <div className='flex gap-1 my-[3rem] items-center'>
                  <span className='mt-[-2rem]'>from</span>
                  <span className='text-[3rem] font-bold text-black'>$3000</span>
                  <span className='pt-[2rem] text-[1.1rem]'>/per week</span>
                </div>
                <div className='flex flex-col gap-[2rem] w-full'>
                  <div className='border-b-[0.1px] border-[#c0bfbf] w-full'></div>
                  <div className=' text-center'><span className='italic text-[0.85rem]'>Profit:</span> 60% return on investment weekly plus additional bonus up to $1500.</div>
                  <Link to='/signup' onClick={MoveToTop} className='flex items-center justify-center'>
                    <button className='w-fit h-fit py-[1rem] px-[2rem] bg-[#30465c] rounded-[30px] capitalize text-white hover:translate-y-[-2px] transition-all hover:bg-[#30465c] hover:text-white'>
                      join now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className='w-[23rem] h-fit bg-[#30465c] rounded-md shabox text-white'>
              <div className='mt-4 '>
                <div className='w-[4.4rem] h-[1.7185rem] flex items-center justify-center bg-white rotate-[320deg]  text-xs uppercase plan text-[#30465c]'>one trial</div>
              </div>
              <div className='flex flex-col items-center p-10 mt-[-2.8rem]'>
                <div className='capitalize'>test run</div>
                <div className='flex gap-1 my-[3rem] items-center'>
                  <span className='mt-[-2rem]'>from</span>
                  <span className='text-[3rem] font-bol'>$20</span>
                  <span className='pt-[2rem] text-[1.1rem]'>/per week</span>
                </div>
                <div className='flex flex-col gap-[2rem] w-full'>
                  <div className='border-b-[0.1px] border-[#a5a3a3] w-full'></div>
                  <div className=' text-center'><span className='italic text-[0.8rem]'>Profit:</span> 60% return on investment weekly plus additional bonus up to $12.</div>
                  <Link to='/signup' onClick={MoveToTop} className='flex items-center justify-center'>
                    <button className='w-fit h-fit py-[1rem] px-[2rem] text-[#30465c] rounded-[30px] capitalize bg-white hover:translate-y-[-2px] transition-all'>
                      join now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default TradingPlansPage