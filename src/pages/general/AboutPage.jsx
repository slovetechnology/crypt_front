import React, { useState } from 'react'
import Pagelayout from '../../PageComponents/Pagelayout'
import robotabt from '../../assets/images/robotabt.png'
import { SiSpeedtest } from "react-icons/si";
import { FaLongArrowAltRight } from "react-icons/fa";
import { VscSignIn } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import us from '../../assets/images/us.jfif'
import australia from '../../assets/images/austrialia.jpg'
import spanish from '../../assets/images/spanish.jfif'
import uk from '../../assets/images/uk.webp'
import blackUs from '../../assets/images/us-black.webp'
import india from '../../assets/images/india.jfif'
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
  const [userCount, setUserCount] = useState('0')
  const [investCount, setInvestCount] = useState('0')
  const [tradeCount, setTradeCount] = useState('0')
  const [more, setMore] = useState(false)

  let countIndexOne = 0
  let countIndexTwo = 0
  let countIndexThree = 0

  const CountFunction = () => {
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
      <div className="bg-[#1E2833] py-16 ">
        <div className='w-11/12 mx-auto'>
          <div className='grid gap-8 grid-cols-1 lg:grid-cols-2 relative'>
            <div className='col-span-1'>
              <div className='text-[0.8rem] text-orange '>Who doesn't like easy?</div>
              <div className='text-3xl lg:text-[2.5rem] capitalize lg:w-[75%] lg:leading-[3.3rem] font-[800] text-white'>privately own crypto trading set-up</div>
              <div className='lg:w-[75%] pt-6 text-ground'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit accusamus, tenetur magni minus earum nihil neque, repellendus ullam aliquam alias pariatur aspernatur quam reiciendis debitis quibusdam similique molestias.</div>
              <div className='flex gap-4 mt-[1.5rem]'>
                <Link to='/signup' onClick={MoveToTop}>
                  <button className={`outline-0 w-fit h-fit py-2 px-4 text-sm text-white rounded-md bg-orange border-2 border-orange capitalize  flex gap-1 items-center font-[550] hover:translate-y-[-1px] trans`}>
                    <span>sign up for free</span> <VscSignIn />
                  </button>
                </Link>
                <Link to='/trading' onClick={MoveToTop}>
                  <button className={`outline-0 w-fit h-fit py-2 px-4 text-sm text-white rounded-md border-2 border-orange capitalize flex gap-1 items-center font-[550] hover:translate-y-[-1px] trans`}>
                    <span>test run</span>
                    <SiSpeedtest />
                  </button>
                </Link>
              </div>
            </div>
            <div className='col-span-1 order-first lg:order-last'>
              <div className='relative h-fit w-full rounded-[20px] flex items-center justify-center bg-[#192633] overflow-hidden'>
                <img src={robotabt} className='h-[50vh] object-cover w-full '></img>
                <div className='bda flex items-center justify-center rotate-90 w-32 h-32 border-2 bottom-4 rounded-full -left-20 absolute'>
                  <div className='bdb w-20 h-20 border-2 rounded-full'></div>
                </div>
                <div className='bda flex items-center justify-center rotate-90 w-20 h-20 border-2  rounded-full absolute -top-12 -right-4' >
                  <div className='bdb w-12 h-12 border-2 rounded-full'></div>
                </div>
              </div>
            </div>
          </div>
          <div className='lg:w-4/5 mx-auto md:mt-48 mt-40'>
            <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-16 gap-20'>
              <div className='lg:col-span-1 relative'>
                <div className=' rounded-[15px] bgg'></div>
                <div className='w-[9rem] h-[9.5rem]  bg-[#192633]  rounded-[15px] absolute top-[-4.5rem] left-0 flex justify-center flex-col items-center gap-3 pt-2 shll lg:-ml-16 -ml-2'>
                  <div className='rounded-full w-24 h-24 flex flex-col gap-1 items-center justify-center bdd'>
                    <img src={crown} className='h-4 w-auto'></img>
                    <div className='font-[800] text-[1.3rem] text-white'>75<span className='text-[0.6rem]'>%</span></div>
                  </div>
                  <div className='text-orange text-[0.8rem] capitalize'>overall experiences</div>
                </div>
              </div>
              <div className='lg:col-span-2'>
                <div className='text-[0.95rem] text-orange -mt-10'>About the System</div>
                <div className='text-white font-[600] capitalize text-[1.4rem] lg:text-[1.8rem] mt-4'>transparent, full-control & consistent market advantage</div>
                <div className='text-ground text-[0.9rem] pt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores necessitatibus voluptas qui alias quo eligendi reiciendis numquam, harum distinctio culpa illo praesentium similique veritatis dolorum pariatur dolor dignissimos molestias.</div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
                  <div className='flex flex-col'>
                    <div className='flex gap-4 items-center'>
                      <div className='flex items-center justify-center w-10 h-10 rounded-full  bg-[#192633] shll '>
                        <img src={settings} className='h-[1.5rem] w-auto'></img>
                      </div>
                      <div className='text-white capitalize font-[600] text-[0.9rem]'>Lorem, ipsum dolor.</div>
                    </div>
                    <div className='text-[0.8rem] text-ground pl-14'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex gap-4 items-center'>
                      <div className='flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-full  bg-[#192633] shll '>
                        <img src={bulb} className='h-[1.5rem] w-auto'></img>
                      </div>
                      <div className='text-white capitalize font-[600] text-[0.9rem]'>Lorem, ipsum dolor.</div>
                    </div>
                    <div className='text-[0.8rem] text-ground pl-14'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                  </div>
                </div>
                <div className='flex gap-2 mt-6 items-center'>
                  <div className='text-white text-[0.9rem]'>Would love to own your set-up?</div>
                  <Link to='/signup' onClick={MoveToTop}>
                    <button className='outline-0 w-fit h-fit py-1 px-4 text-[0.8rem] text-white rounded-full bg-orange capitalize  flex gap-1 items-center font-[550] hover:bg-[#642626] truncate'>
                      <MdJoinRight /><span>join us</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='w-11/12 lg:w-[70%] mx-auto md:mt-28 mt-20'>
            <div className='text-[2rem] lg:text-[3rem] text-white font-[550] capitalize text-center'>our services</div>
            <div className='text-center text-semi-white text-[0.85rem] capitalize pt-2 pb-10 md:pb-20'>- this services are designed to give you an edge in crypto trading -</div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-[1.5rem]'>
              <div className='w-full h-fit  bg-[#192633]  rounded-[5px] p-4 flex flex-col gap-4 items-center shlltw'>
                <div className='border-2 border-[#525151] rounded-full w-[4rem] h-[4rem] flex text-[2.2rem] text-orange pt-2 justify-center items-center'>
                  <img src={efficient} className='h-auto w-[2rem]'></img>
                </div>
                <div className='text-white capitalize font-bold text-center'>artificial intelligence</div>
                <div className=' text-ground text-[0.8rem] text-center'>Lorem ipsum dolor sit amet adip adipisicing elit. Aliquid  asper.</div>
                <Link to='/signup' onClick={MoveToTop}>
                  <div className='flex gap-1 items-center text-[0.65rem] capitalize font-bold text-orange pb-4'>
                    <div>try now</div>
                    <FaLongArrowAltRight />
                  </div>
                </Link>
              </div>
              <div className='w-full h-fit  bg-[#192633]  rounded-[5px] p-4 flex flex-col gap-4 items-center shlltw md:-mt-10'>
                <div className='border-2 border-[#525151] rounded-full w-[4rem] h-[4rem] flex text-[2.1rem] text-orange pt-4 justify-center '>
                  <img src={tplan} className='h-[1.8rem] w-auto'></img>
                </div>
                <div className='text-white capitalize font-bold text-center'>affordable trading plans</div>
                <div className=' text-ground text-[0.8rem] text-center'>Lorem ipsum dolor sit amet adip adipisicing elit. Aliquid  asper.</div>
                <Link to='/trading' onClick={MoveToTop}>
                  <div className='flex gap-1 items-center text-[0.65rem] capitalize font-bold text-orange pb-4'>
                    <div>see plans</div>
                    <FaLongArrowAltRight />
                  </div>
                </Link>
              </div>
              <div className='w-full h-fit  bg-[#192633]  rounded-[5px] p-4 flex flex-col gap-4 items-center shlltw'>
                <div className='border-2 border-[#525151] rounded-full w-[4rem] h-[4rem] flex text-[2.2rem] text-orange pt-2 justify-center items-center'>
                  <img src={assist} className='h-[2rem] w-auto'></img>
                </div>
                <div className='text-white capitalize font-bold text-center'>trade assistance</div>
                <div className=' text-ground text-[0.8rem] text-center'>Lorem ipsum dolor sit amet adip adipisicing elit. Aliquid  asper.</div>
                <Link to='/signup' onClick={MoveToTop}>
                  <div className='flex gap-1 items-center text-[0.65rem] capitalize font-bold text-orange pb-4'>
                    <div>try now</div>
                    <FaLongArrowAltRight />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className='md:mt-28 mt-20 w-full h-fit bg-[#192633] py-16 px-4 rounded-md relative overflow-hidden' onMouseOver={CountFunction}>
            <div className='bda flex items-center justify-center rotate-90 w-[8rem] h-[8rem] border-2 bottom-4 rounded-[50%] left-[-5rem] absolute' >
              <div className='bdb w-[5rem] h-[5rem] border-2 rounded-[50%]'></div>
            </div>
            <div className='bda flex items-center justify-center rotate-90 w-[5rem] h-[5rem] border-2  rounded-[50%] absolute top-[-3rem] right-[-1rem]' >
              <div className='bdb w-[3rem] h-[3rem] border-2 rounded-[50%]'></div>
            </div>
            <div className='text-[2rem] lg:text-[3rem] text-white font-[550] capitalize text-center'>the numbers</div>
            <div className='text-center text-semi-white text-[0.85rem] capitalize pt-2 pb-10'>- below are the numbers that makes us the standout trading system -</div>
            <div className='flex items-center flex-wrap gap-8 md:gap-20 justify-center'>
              <div className='w-[8.2rem] h-[8.2rem] rounded-full border border-[#f0b28e] flex flex-col items-center pt-4 relative'>
                <img src={heart} className='h-[2rem] w-auto'></img>
                <div className='text-[1.8rem] font-[800] text-white'>{userCount}<span className='font-[500]'>+</span></div>
                <div className='capitalize text-[0.6rem] font-bold text-[#c0bebe] '>satisfield users</div>
                <div className='w-2 h-2 bg-[#f0b28e] rounded-full absolute top-[-0.25rem] left-[4rem]'></div>
                <div className='w-2 h-2 bg-[#f0b28e] rounded-full absolute bottom-[-0.25rem] left-[4rem]'></div>
              </div>
              <div className='w-[8.2rem] h-[8.2rem] rounded-full border border-[#f0b28e] flex flex-col items-center pt-4 relative'>
                <img src={cash} className='h-[2rem] w-auto'></img>
                <div className='text-[1.8rem] font-[800] text-white'>{investCount}M<span className='font-[500]'>+</span></div>
                <div className='capitalize text-[0.6rem] font-bold text-[#c0bebe] '>total investment</div>
                <div className='w-2 h-2 bg-[#f0b28e] rounded-full absolute top-[-0.25rem] left-[4rem]'></div>
                <div className='w-2 h-2 bg-[#f0b28e] rounded-full absolute bottom-[-0.25rem] left-[4rem]'></div>
              </div>
              <div className='w-[8.2rem] h-[8.2rem] rounded-full border border-[#f0b28e] flex flex-col items-center pt-4 relative'>
                <img src={efficient} className='h-auto w-[1.5rem]'></img>
                <div className='text-[1.8rem] font-[800] text-white'>{tradeCount}<span className='font-[500] text-4'>%</span></div>
                <div className='capitalize text-[0.6rem] font-bold text-[#c0bebe] '>trade efficiency</div>
                <div className='w-2 h-2 bg-[#f0b28e] rounded-full absolute top-[-0.25rem] left-[4rem]'></div>
                <div className='w-2 h-2 bg-[#f0b28e] rounded-full absolute bottom-[-0.25rem] left-[4rem]'></div>
              </div>
            </div>
          </div>
          <div className='w-11/12 lg:w-[70%] mx-auto md:mt-28 mt-20 overflow-hidden h-fit trans'>
            <div className='text-[2rem] lg:text-[3rem] text-white font-[550] capitalize text-center'>customer reviews</div>
            <div className='text-center text-semi-white text-[0.85rem] capitalize pt-2 pb-10 md:pb-12'>- below are some of our customers reviews as a snippet of what you can expect -</div>
            <div className='flex flex-wrap items-center justify-center gap-[1.5rem]'>
              <div className='w-[17rem] h-[fit]  bg-[#192633]  rounded-[5px] p-4 flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={us} className='w-[4rem] h-[4rem] rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 right-[-0.8rem] text-[1.5rem] text-orange' />
                </div>
                <div className=' text-ground text-[0.75rem] text-center mt-[0.3rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                <div className='border-b-[3px] w-[2.2rem] border-orange mt-[0.7rem]'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-white capitalize'>henry calvin</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center uppercase'>nyc, us</div>
                </div>
              </div>
              <div className='w-[17rem] h-[fit]  bg-[#192633]  rounded-[5px] p-4 flex flex-col gap-4 items-center  shlltw'>
                <div className='flex items-center relative'>
                  <img src={australia} className='w-[4rem] h-[4rem] rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 right-[-0.8rem] text-[1.5rem] text-orange' />
                </div>
                <div className=' text-ground text-[0.75rem] text-center mt-[0.3rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                <div className='border-b-[3px] w-[2.2rem] border-orange mt-[0.7rem]'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-white capitalize'>charlie brown</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>sydney, austrialia</div>
                </div>
              </div>
              <div className='w-[17rem] h-[fit]  bg-[#192633]  rounded-[5px] p-4 flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={spanish} className='w-[4rem] h-[4rem] rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 right-[-0.8rem] text-[1.5rem] text-orange' />
                </div>
                <div className=' text-ground text-[0.75rem] text-center mt-[0.3rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                <div className='border-b-[3px] w-[2.2rem] border-orange mt-[0.7rem]'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-white capitalize'>carlos rivera</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>seville, spain</div>
                </div>
              </div>
            </div>
            {!more && <div className='flex justify-center mt-8'>
              <button className='w-fit h-fit px-6 py-1 bg-orange outline-none rounded-[3px] text-[0.85rem] capitalize text-white flex items-center justify-center  hover:bg-[#642626]' onClick={() => setMore(!more)}>
                <span>more</span>
                <MdExpandMore />
              </button>
            </div>}
            {more && <div className='flex flex-wrap items-center justify-center gap-[1.5rem] mt-[2rem]'>
              <div className='w-[17rem] h-[fit]  bg-[#192633]  rounded-[5px] p-4 flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={uk} className='w-[4rem] h-[4rem] rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 right-[-0.8rem] text-[1.5rem] text-orange' />
                </div>
                <div className=' text-ground text-[0.75rem] text-center mt-[0.3rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                <div className='border-b-[3px] w-[2.2rem] border-orange mt-[0.7rem]'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-white capitalize'>arthur allen</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>manchester, UK</div>
                </div>
              </div>
              <div className='w-[17rem] h-[fit]  bg-[#192633]  rounded-[5px] p-4 flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={blackUs} className='w-[4rem] h-[4rem] rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 right-[-0.8rem] text-[1.5rem] text-orange' />
                </div>
                <div className=' text-ground text-[0.75rem] text-center mt-[0.3rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                <div className='border-b-[3px] w-[2.2rem] border-orange mt-[0.7rem]'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-white capitalize'>jeremy davis</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>atlanta, us</div>
                </div>
              </div>
              <div className='w-[17rem] h-[fit]  bg-[#192633]  rounded-[5px] p-4 flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={india} className='w-[4rem] h-[4rem] rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 right-[-0.8rem] text-[1.5rem] text-orange' />
                </div>
                <div className=' text-ground text-[0.75rem] text-center mt-[0.3rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro repellat nisi odit, corporis dicta deleniti nobis dolor omnis veritatis odio.</div>
                <div className='border-b-[3px] w-[2.2rem] border-orange mt-[0.7rem]'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-white capitalize'>kabir kumar</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>surat, india</div>
                </div>
              </div>
            </div>}
            {more && <div className='flex justify-center mt-8'>
              <button className='w-fit h-fit px-6 py-1 bg-orange outline-none rounded-[3px] text-[0.85rem] capitalize text-white flex items-center justify-center hover:bg-[#642626]' onClick={() => setMore(!more)}>
                <span>less</span>
                <MdExpandLess />
              </button>
            </div>}
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default AboutPage