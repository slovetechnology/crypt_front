import React, { useState } from 'react'
import Pagelayout from '../../PageComponents/Pagelayout'
import robotabt from '../../assets/images/robotabt.png'
import { SiPytest } from "react-icons/si";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import bitcoin from '../../assets/images/bitcoin.png'
import ethereum from '../../assets/images/ethereum.png'
import usdt from '../../assets/images/usdt.png'
import xrp from '../../assets/images/xrp.png'
import solana from '../../assets/images/solana.png'
import dogecoin from '../../assets/images/dogecoin.png'
import litecoin from '../../assets/images/litecoin.png'
import us from '../../assets/images/us.jpg'
import australia from '../../assets/images/austrialia.jpg'
import spanish from '../../assets/images/spanish.jfif'
import uk from '../../assets/images/uk.webp'
import blackUs from '../../assets/images/us-black.webp'
import india from '../../assets/images/india.avif'
import { MdJoinRight, MdExpandLess, MdExpandMore } from "react-icons/md";
import { BsFillChatQuoteFill } from "react-icons/bs";
import heart from '../../assets/images/heart.png'
import cash from '../../assets/images/cash.png'
import efficient from '../../assets/images/efficient.png'
import crown from '../../assets/images/crown.png'
import settings from '../../assets/images/setting.png'
import tplan from '../../assets/images/trading3d.png'
import bulb from '../../assets/images/bulb.png'
import assist from '../../assets/images/assist.png'
import { MoveToTop } from '../../utils/utils';


const AboutPage = () => {
  const [over, setOver] = useState(false)
  const [over2, setOver2] = useState(false)
  const [userCount, setUserCount] = useState('0')
  const [investCount, setInvestCount] = useState('0')
  const [tradeCount, setTradeCount] = useState('0')
  const [more, setMore] = useState(false)

  let countIndexOne = 0
  let countIndexTwo = 0
  let countIndexThree = 0

  const countFunction = () => {
    if (userCount < 1) {
      let countOne = setInterval(() => {
        if (countIndexOne === 1200) {
          clearInterval(countOne)
        } else {
          countIndexOne += 100
          setUserCount(countIndexOne)
        }
      }, 100)

      let countTwo = setInterval(() => {
        if (countIndexTwo === 15) {
          clearInterval(countTwo)
        } else {
          countIndexTwo++
          setInvestCount(countIndexTwo)
        }
      }, 100)

      let countThree = setInterval(() => {
        if (countIndexThree === 95) {
          clearInterval(countThree)
        } else {
          countIndexThree += 5
          setTradeCount(countIndexThree)
        }
      }, 100)
    }
  }
  return (
    <Pagelayout>
      <div className="bg-[#1E2833] py-[5rem] ">
        <div className='w-[93%] mx-auto'>
          <div className='flex justify-between'>
            <div className='w-[50%]'>
              <div className='text-[0.8rem] text-[#E96E28] '>Who doesn't like easy?</div>
              <div className='text-[2.5rem] capitalize w-[70%] leading-[3.3rem] font-[800] text-[white]'>privately own crypto trading set-up</div>
              <div className='w-[70%] pt-[2rem] text-[#94A3B8]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit accusamus, tenetur magni minus earum nihil neque, repellendus ullam aliquam alias pariatur aspernatur quam reiciendis debitis quibusdam similique molestias.</div>
              <div className='flex gap-4 mt-[1.5rem]'>
                <Link to='/signup' onClick={MoveToTop}>
                  <button className={`outline-0 w-fit h-fit py-[0.6rem] px-[1.5rem] text-[0.9rem] text-[white] rounded-[7px] bg-[#E96E28] capitalize  flex gap-1 items-center font-[550] ${over === true ? 'translate-y-[-1px]' : 'translate-y-[1px]'} trans`} onMouseOver={() => setOver(true)} onMouseLeave={() => setOver(false)}>
                    <span>sign up for free</span> <FaLongArrowAltRight />
                  </button>
                </Link>
                <Link to='/trading' onClick={MoveToTop}>
                  <button className={`outline-0 w-fit h-fit py-[0.45rem] px-[1.5rem] text-[0.9rem] text-[white] rounded-[7px] border-2 border-[#E96E28] capitalize flex gap-1 items-center font-[550] ${over2 === true ? 'translate-y-[-1px]' : 'translate-y-[1px]'} trans`} onMouseOver={() => setOver2(true)} onMouseLeave={() => setOver2(false)}>
                    <SiPytest /><span>test run</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className='w-[50%]'>
              <div className='relative h-[fit] w-[fit] rounded-[20px] flex items-center justify-center bg-[#192633] overflow-hidden'>
                <img src={robotabt} className='h-[50vh]'></img>
                <div className='bda flex items-center justify-center rotate-90 w-[8rem] h-[8rem] border-2 bottom-[1rem] rounded-[50%] left-[-5rem] absolute'>
                  <div className='bdb w-[5rem] h-[5rem] border-2 rounded-[50%]'></div>
                </div>
                <div className='bda flex items-center justify-center rotate-90 w-[5rem] h-[5rem] border-2  rounded-[50%] absolute top-[-3rem] right-[-1rem]' >
                  <div className='bdb w-[3rem] h-[3rem] border-2 rounded-[50%]'></div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-fit h-[15vh] bg-[#192633] mt-[4rem] rounded-xl shll flex gap-[5rem] px-[3rem] overflow-hidden items-center mx-auto'>
            <img src={usdt} className='h-[3.5rem] w-auto'></img>
            <img src={bitcoin} className='h-[4rem] w-auto'></img>
            <img src={ethereum} className='h-[5rem] w-auto'></img>
            <img src={litecoin} className='h-[4rem] w-auto'></img>
            <img src={xrp} className='h-[3.5rem] w-auto'></img>
            <img src={solana} className='h-[4.5rem] w-auto'></img>
            <img src={dogecoin} className='h-[3.5rem] w-auto'></img>
          </div>
          <div className='w-[80%] mx-auto mt-[13rem]'>
            <div className='flex gap-[4rem]'>
              <div className='w-[40%] relative'>
                <div className=' ml-[4.5rem]  rounded-[15px] bgg'></div>
                <div className='w-[9rem] h-[9.5rem]  bg-[#192633]  rounded-[15px] absolute top-[-4.5rem] left-0 flex justify-center flex-col items-center gap-3 pt-[0.5rem] shll'>
                  <div className='rounded-[50%] w-[6rem] h-[6rem] flex flex-col gap-1 items-center justify-center bdd'>
                    <img src={crown} className='h-[1rem] w-auto'></img>
                    <div className='font-[800] text-[1.3rem] text-[white]'>75<span className='text-[0.6rem]'>%</span></div>
                  </div>
                  <div className='text-[#E96E28] text-[0.8rem] capitalize'>overall experiences</div>
                </div>
              </div>
              <div className='w-[60%]'>
                <div className='text-[0.95rem] text-[#E96E28] mt-[-3rem]'>About the System</div>
                <div className='text-[white] font-[600] capitalize text-[1.8rem] mt-[1.3rem]'>transparent, full-control & consistent market advantage</div>
                <div className='text-[#94A3B8] text-[0.9rem] pt-[1rem]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores necessitatibus voluptas qui alias quo eligendi reiciendis numquam, harum distinctio culpa illo praesentium similique veritatis dolorum pariatur dolor dignissimos molestias.</div>
                <div className='flex gap-3 mt-[2rem]'>
                  <div className='flex gap-4 w-[50%]'>
                    <div className='flex items-center justify-center w-[4rem] h-[2.6rem] rounded-[50%]  bg-[#192633]  shll'>
                      <img src={settings} className='h-[1.5rem] w-auto'></img>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <div className='text-[white] capitalize font-[600] text-[0.9rem]'>Lorem, ipsum dolor.</div>
                      <div className='text-[0.8rem] text-[#94A3B8]'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                    </div>
                  </div>
                  <div className='flex gap-4 w-[50%]'>
                    <div className='flex items-center justify-center w-[4rem] h-[2.6rem] rounded-[50%]  bg-[#192633]  shll'>
                      <img src={bulb} className='h-[1.5rem] w-auto'></img>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <div className='text-[white] capitalize font-[600] text-[0.9rem]'>Lorem, ipsum dolor.</div>
                      <div className='text-[0.8rem] text-[#94A3B8]'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 mt-[1.8rem]'>
                  <div className='text-[white] text-[0.9rem]'>Would love to own your set-up someday?</div>
                  <Link to='/signup' onClick={MoveToTop}>
                    <button className='outline-0 w-fit h-fit py-[0.2rem] px-[1.5rem] text-[0.8rem] text-[white] rounded-[25px] bg-[#E96E28] capitalize mt-[-0.1rem] flex gap-1 items-center font-[550] hover:bg-[#642626]'>
                      <MdJoinRight /><span>join us</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[70%] mx-auto mt-[10rem]'>
            <div className='relative flex items-center justify-center mb-[0.5rem]'>
              <div className='w-[4.2rem] h-[4.2rem] rounded-full bg-[#30465c] '></div>
              <div className='text-[3rem] text-[white] font-[550] capitalize text-center ml-[-3.5rem]'>our services</div>
            </div>
            <div className='text-center text-[#e0dfdf] text-[0.85rem] capitalize mb-[5rem]'>- this services are designed to give you an edge in crypto trading -</div>
            <div className='flex gap-[1.5rem]'>
              <div className='w-[17rem] h-fit  bg-[#192633]  rounded-[5px] p-[1rem] flex flex-col gap-4 items-center shlltw'>
                <div className='border-2 border-[#525151] rounded-full w-[4rem] h-[4rem] flex text-[2.2rem] text-[#E96E28] pt-[0.5rem] justify-center items-center'>
                  <img src={efficient} className='h-auto w-[2rem]'></img>
                </div>
                <div className='text-[white] capitalize font-bold'>artificial intelligence</div>
                <div className=' text-[#94A3B8] text-[0.8rem] text-center'>Lorem ipsum dolor sit amet adip adipisicing elit. Aliquid  asper.</div>
                <Link to='/signup' onClick={MoveToTop}>
                  <div className='flex gap-1 items-center text-[0.65rem] capitalize font-bold text-[#E96E28] pb-[1rem]'>
                    <div>try now</div>
                    <FaLongArrowAltRight />
                  </div>
                </Link>
              </div>
              <div className='w-[17rem] h-fit  bg-[#192633]  rounded-[5px] p-[1rem] flex flex-col gap-4 items-center mt-[-2.5rem] shlltw'>
                <div className='border-2 border-[#525151] rounded-full w-[4rem] h-[4rem] flex text-[2.1rem] text-[#E96E28] pt-[1rem] justify-center '>
                  <img src={tplan} className='h-[1.8rem] w-auto'></img>
                </div>
                <div className='text-[white] capitalize font-bold'>affordable trading plans</div>
                <div className=' text-[#94A3B8] text-[0.8rem] text-center'>Lorem ipsum dolor sit amet adip adipisicing elit. Aliquid  asper.</div>
                <Link to='/trading' onClick={MoveToTop}>
                  <div className='flex gap-1 items-center text-[0.65rem] capitalize font-bold text-[#E96E28] pb-[1rem]'>
                    <div>see plans</div>
                    <FaLongArrowAltRight />
                  </div>
                </Link>
              </div>
              <div className='w-[17rem] h-fit  bg-[#192633]  rounded-[5px] p-[1rem] flex flex-col gap-4 items-center shlltw'>
                <div className='border-2 border-[#525151] rounded-full w-[4rem] h-[4rem] flex text-[2.2rem] text-[#E96E28] pt-[0.5rem] justify-center items-center'>
                  <img src={assist} className='h-[2rem] w-auto'></img>
                </div>
                <div className='text-[white] capitalize font-bold'>trade assistance</div>
                <div className=' text-[#94A3B8] text-[0.8rem] text-center'>Lorem ipsum dolor sit amet adip adipisicing elit. Aliquid  asper.</div>
                <Link to='/signup' onClick={MoveToTop}>
                  <div className='flex gap-1 items-center text-[0.65rem] capitalize font-bold text-[#E96E28] pb-[1rem]'>
                    <div>try now</div>
                    <FaLongArrowAltRight />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className='mt-[7rem] w-full h-fit bg-[#192633] py-[4rem] rounded-md relative overflow-hidden' onMouseOver={countFunction}>
            <div className='bda flex items-center justify-center rotate-90 w-[8rem] h-[8rem] border-2 bottom-[1rem] rounded-[50%] left-[-5rem] absolute'>
              <div className='bdb w-[5rem] h-[5rem] border-2 rounded-[50%]'></div>
            </div>
            <div className='bda flex items-center justify-center rotate-90 w-[5rem] h-[5rem] border-2  rounded-[50%] absolute top-[-3rem] right-[-1rem]' >
              <div className='bdb w-[3rem] h-[3rem] border-2 rounded-[50%]'></div>
            </div>
            <div className='relative flex items-center justify-center mb-[0.5rem]'>
              <div className='w-[4.2rem] h-[4.2rem] rounded-full bg-[#30465c] '></div>
              <div className='text-[3rem] text-[white] font-[550] capitalize text-center ml-[-3.5rem]'>the numbers</div>
            </div>
            <div className='text-center text-[#e0dfdf] text-[0.85rem] capitalize mb-[2.5rem]'>- below are the numbers that makes us the standout trading system -</div>
            <div className='flex gap-[5rem] justify-center'>
              <div className='w-[8.2rem] h-[8.2rem] rounded-full border border-[#f0b28e] flex flex-col items-center pt-[1rem] relative'>
                <img src={heart} className='h-[2rem] w-auto'></img>
                <div className='text-[1.8rem] font-[800] text-[white]'>{userCount}<span className='font-[500]'>+</span></div>
                <div className='capitalize text-[0.6rem] font-bold text-[#c0bebe] '>satisfield users</div>
                <div className='w-[0.5rem] h-[0.5rem] bg-[#f0b28e] rounded-full absolute top-[-0.25rem] left-[4rem]'></div>
                <div className='w-[0.5rem] h-[0.5rem] bg-[#f0b28e] rounded-full absolute bottom-[-0.25rem] left-[4rem]'></div>
              </div>
              <div className='w-[8.2rem] h-[8.2rem] rounded-full border border-[#f0b28e] flex flex-col items-center pt-[1rem] relative'>
                <img src={cash} className='h-[2rem] w-auto'></img>
                <div className='text-[1.8rem] font-[800] text-[white]'>{investCount}M<span className='font-[500]'>+</span></div>
                <div className='capitalize text-[0.6rem] font-bold text-[#c0bebe] '>total investment</div>
                <div className='w-[0.5rem] h-[0.5rem] bg-[#f0b28e] rounded-full absolute top-[-0.25rem] left-[4rem]'></div>
                <div className='w-[0.5rem] h-[0.5rem] bg-[#f0b28e] rounded-full absolute bottom-[-0.25rem] left-[4rem]'></div>
              </div>
              <div className='w-[8.2rem] h-[8.2rem] rounded-full border border-[#f0b28e] flex flex-col items-center pt-[1rem] relative'>
                <img src={efficient} className='h-auto w-[1.5rem]'></img>
                <div className='text-[1.8rem] font-[800] text-[white]'>{tradeCount}<span className='font-[500] text-[1rem]'>%</span></div>
                <div className='capitalize text-[0.6rem] font-bold text-[#c0bebe] '>trade efficiency</div>
                <div className='w-[0.5rem] h-[0.5rem] bg-[#f0b28e] rounded-full absolute top-[-0.25rem] left-[4rem]'></div>
                <div className='w-[0.5rem] h-[0.5rem] bg-[#f0b28e] rounded-full absolute bottom-[-0.25rem] left-[4rem]'></div>
              </div>
            </div>
          </div>
          <div className={`w-[70%] mx-auto mt-[7rem] mb-[5rem] overflow-hidden ${more === true ? 'h-[125vh]' : 'h-[77vh]'} trans`}>
            <div className='relative flex items-center justify-center mb-[0.5rem]'>
              <div className='w-[4.2rem] h-[4.2rem] rounded-full bg-[#30465c] '></div>
              <div className='text-[3rem] text-[white] font-[550] capitalize text-center ml-[-3.5rem]'>customer reviews</div>
            </div>
            <div className='text-center text-[#e0dfdf] text-[0.85rem] capitalize mb-[3rem]'>- below are some of our customers reviews as a snippet of what you can expect -</div>
            <div className='flex gap-[1.5rem]'>
              <div className='w-[17rem] h-[fit]  bg-[#192633]  rounded-[5px] p-[1rem] flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={us} className='w-[4rem] h-[4rem] rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 right-[-0.8rem] text-[1.5rem] text-[#E96E28]' />
                </div>
                <div className=' text-[#94A3B8] text-[0.75rem] text-center mt-[0.3rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                <div className='border-b-[3px] w-[2.2rem] border-[#E96E28] mt-[0.7rem]'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-[white] capitalize'>henry calvin</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center uppercase'>nyc, us</div>
                </div>
              </div>
              <div className='w-[17rem] h-[fit]  bg-[#192633]  rounded-[5px] p-[1rem] flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={australia} className='w-[4rem] h-[4rem] rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 right-[-0.8rem] text-[1.5rem] text-[#E96E28]' />
                </div>
                <div className=' text-[#94A3B8] text-[0.75rem] text-center mt-[0.3rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                <div className='border-b-[3px] w-[2.2rem] border-[#E96E28] mt-[0.7rem]'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-[white] capitalize'>charlie brown</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>sydney, austrialia</div>
                </div>
              </div>
              <div className='w-[17rem] h-[fit]  bg-[#192633]  rounded-[5px] p-[1rem] flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={spanish} className='w-[4rem] h-[4rem] rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 right-[-0.8rem] text-[1.5rem] text-[#E96E28]' />
                </div>
                <div className=' text-[#94A3B8] text-[0.75rem] text-center mt-[0.3rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                <div className='border-b-[3px] w-[2.2rem] border-[#E96E28] mt-[0.7rem]'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-[white] capitalize'>carlos rivera</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>seville, spain</div>
                </div>
              </div>
            </div>
            {more === false && <div className='flex justify-center mt-[2rem]'>
              <button className='w-fit h-fit px-[2rem] py-[0.25rem] bg-[#E96E28] outline-none rounded-[3px] text-[0.85rem] capitalize text-[white] flex items-center justify-center  hover:bg-[#642626]' onClick={() => setMore(!more)}>
                <span>more</span>
                <MdExpandMore className='text-[1rem]' />
              </button>
            </div>}
            <div className='flex gap-[1.5rem] mt-[2rem]'>
              <div className='w-[17rem] h-[fit]  bg-[#192633]  rounded-[5px] p-[1rem] flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={uk} className='w-[4rem] h-[4rem] rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 right-[-0.8rem] text-[1.5rem] text-[#E96E28]' />
                </div>
                <div className=' text-[#94A3B8] text-[0.75rem] text-center mt-[0.3rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                <div className='border-b-[3px] w-[2.2rem] border-[#E96E28] mt-[0.7rem]'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-[white] capitalize'>arthur allen</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>manchester, UK</div>
                </div>
              </div>
              <div className='w-[17rem] h-[fit]  bg-[#192633]  rounded-[5px] p-[1rem] flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={blackUs} className='w-[4rem] h-[4rem] rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 right-[-0.8rem] text-[1.5rem] text-[#E96E28]' />
                </div>
                <div className=' text-[#94A3B8] text-[0.75rem] text-center mt-[0.3rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                <div className='border-b-[3px] w-[2.2rem] border-[#E96E28] mt-[0.7rem]'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-[white] capitalize'>jeremy davis</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>atlanta, us</div>
                </div>
              </div>
              <div className='w-[17rem] h-[fit]  bg-[#192633]  rounded-[5px] p-[1rem] flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={india} className='w-[4rem] h-[4rem] rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 right-[-0.8rem] text-[1.5rem] text-[#E96E28]' />
                </div>
                <div className=' text-[#94A3B8] text-[0.75rem] text-center mt-[0.3rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                <div className='border-b-[3px] w-[2.2rem] border-[#E96E28] mt-[0.7rem]'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-[white] capitalize'>kabir kumar</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>surat, india</div>
                </div>
              </div>
            </div>
            <div className='flex justify-center mt-[2rem]'>
              <button className='w-fit h-fit px-[2rem] py-[0.25rem] bg-[#E96E28] outline-none rounded-[3px] text-[0.85rem] capitalize text-[white] flex items-center justify-center hover:bg-[#642626]' onClick={() => setMore(!more)}>
                <span>less</span>
                <MdExpandLess className='text-[1rem]' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default AboutPage