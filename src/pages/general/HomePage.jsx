import React, { useState } from 'react'
import Pagelayout from '../../GeneralComponents/Pagelayout'
import { MdOutlineDiversity2 } from "react-icons/md";
import { Link } from 'react-router-dom';
import rocket from '../../assets/images/rocket.png'
import light from '../../assets/images/light.png'
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdJoinRight, MdExpandLess, MdExpandMore } from "react-icons/md";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { questions } from '../../services/Miscellaneous';
import CountComponent from '../../GeneralComponents/CountComponent';
import us from '../../assets/images/us.jfif'
import australia from '../../assets/images/austrialia.jpg'
import spanish from '../../assets/images/spanish.jfif'
import uk from '../../assets/images/uk.webp'
import blackUs from '../../assets/images/us-black.webp'
import india from '../../assets/images/india.jfif'
import { SiteName } from '../../services/PageLinks';


const HomePage = () => {
  const [faq, setFaq] = useState('')
  const [view, setView] = useState(false)

  const handleQuestions = i => {
    if (i !== faq) {
      setFaq(i)
    } else {
      setFaq('')
    }
  }

  return (
    <Pagelayout>
      <div className='bg-[#1E2833] pb-16'>
        <div className='bgi'>
          <div className='w-11/12 mx-auto pt-20  grid grid-cols-3 lg:grid-cols-4'>
            <div className='col-span-1'>
              <div className='relative w-fit'>
                <div className='capitalize text-orange text-[0.7rem] font-[550] tracking-widest '> tech & crypto</div>
                <MdOutlineDiversity2 className='text-white absolute top-0 -right-8  text-[1.1rem]' />
              </div>
              <div className='capitalize text-white font-bold text-[2rem] md:text-[3rem] leading-[4rem] md:leading-[5rem] '>{SiteName} artificial intelligence algorithm  crypto trade</div>
              <Link to='/signup'>
                <button className='outline-0 w-fit h-fit py-1 px-6 text-[0.9rem] text-white rounded-full bg-orange capitalize mt-5 flex gap-1 items-center font-[550] hover:bg-[#642626]'>
                  <MdJoinRight /><span>join</span>
                </button>
              </Link>
            </div>
            <div className='lg:col-span-3 col-span-2 '>
              <div className='w-fit h-fit border rotate-90 uppercase text-[0.85rem]  py-1 px-2 text-white font-[550] tracking-[0.5rem] relative text-ellipsis text-nowrap mt-40'>
                <div> crypto trade made easy</div>
                <div className='h-1 w-1 bg-white rounded-full absolute top-7 -left-[0.2rem]'></div>
                <div className='h-1 w-1 bg-white rounded-full absolute -top-1 -left-1'></div>
                <div className='h-1 w-1 bg-white rounded-full absolute top-7 -right-1'></div>
                <div className='h-1 w-1 bg-white rounded-full absolute -top-1 -right-1'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='md:w-[95%] w-11/12 mx-auto'>
          <div className='w-full h-fit py-8 px-4 bg-gradient-to-br from-[#1B2530] from-55% to-[#273f5e] z-10 -mt-8 border rounded-xl border-dashed overflow-hidden relative'>
            <div className='bda flex items-center justify-center rotate-90 w-40 h-40 border-2 bottom-4 rounded-full -left-20 absolute'>
              <div className='bdb w-28 h-28 border-2 rounded-full'></div>
            </div>
            <div className='bda flex items-center justify-center rotate-90 w-20 h-20 border-2  rounded-full absolute -top-12 -right-4' >
              <div className='bdb w-12 h-12 border-2 rounded-full'></div>
            </div>
            <div className='flex items-center gap-4 flex-col'>
              <div className='text-white md:text-[2rem] text-2xl capitalize text-center font-bold'>what is the al algo trade?</div>
              <div className='text-semi-white text-[0.95rem] text-center lg:w-[60%] tracking-[0.05rem]'>At Cryptoville, we specialize in AI algorithmic trading, a cutting-edge technology that is transforming the way cryptocurrency markets are navigated. So, what exactly is AI algorithmic trading? In simple terms, it`s the use of advanced artificial intelligence to automate and optimize the process of buying and selling assets in the crypto market. Traditional trading requires human effort—analyzing charts, watching the market 24/7, and making decisions based on patterns. However, AI-driven algorithms take that to the next level. These intelligent systems are capable of processing massive amounts of data in real-time, identifying trends, and predicting market movements faster than any human could.</div>
            </div>
            <div className='lg:w-3/5 w-11/12 mx-auto'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-16 '>
                <div className='flex gap-4'>
                  <img src={rocket} className='w-auto h-12 z-20'></img>
                  <div className='flex flex-col gap-2'>
                    <div className='font-[550] text-[1.1rem] text-white'> Scale through</div>
                    <div className='text-xs text-white  tracking-[0.05rem]'>Business innovative boost and security guaranteed</div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <img src={light} className='w-auto h-12 z-20'></img>
                  <div className='flex flex-col gap-2'>
                    <div className='font-[550] text-[1.1rem] text-white'>Power packed trading</div>
                    <div className='text-white text-xs tracking-[0.05rem]'>Explore an unending, trivilling crypto trading at your finger tips</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-20 w-11/12 mx-auto'>
            <CountComponent />
          </div>
          <div className='mt-20 w-full md:w-5/6 lg:w-3/4 mx-auto'>
            <div className='flex flex-col'>
              <div className='relative w-fit mx-auto text-semi-white'>
                <div className='text-[2rem] md:text-[3rem] text-white font-[550] capitalize'>faq questions</div>
                <div className='border-t-4 md:w-48 w-32 absolute top-0 right-0'></div>
                <div className='border-b-4 md:w-48 w-32 absolute bottom-0 left-0'></div>
              </div>
              <div className='flex flex-col gap-4 mt-8 h-fit w-full bg-[#182531] md:p-10 px-4 py-6'>
                {questions.map((item, i) => (
                  <div className={`w-full mx-auto h-fit bg-white rounded-md px-3 py-2 md:p-4 flex flex-col gap-4 overflow-hidden border border-[grey] shadow-sm trans`} key={i}>
                    <div onClick={() => handleQuestions(i)} className='flex justify-between w-full h-fit cursor-pointer md:text-lg text-base font-medium'>
                      <span>{item.title}</span>
                      <div className='w-fit h-fit p-1 rounded-md bg-[#ecbd75] text-[0.8rem] text-[#192633]'>
                        {faq !== i ?
                          <FiPlus />
                          :
                          <FiMinus />
                        }

                      </div>
                    </div>
                    <div className={`md:text-[0.95rem] text-sm ${faq === i ? 'block' : 'hidden'} `}>{item.content}</div>
                  </div>
                ))
                }
              </div>
            </div>
          </div>
          <div className='w-11/12 lg:w-[70%] mx-auto mt-20 overflow-hidden h-fit trans'>
            <div className='relative w-fit mx-auto text-semi-white'>
              <div className='text-[2rem] md:text-[3rem] text-white font-[550] capitalize'>Testimonials</div>
              <div className='border-t-4 md:w-40 w-28 absolute top-0 right-0'></div>
              <div className='border-b-4 md:w-40 w-28 absolute bottom-0 left-0'></div>
            </div>
            <div className='flex flex-wrap items-center justify-center gap-6 mt-10'>
              <div className='w-[17rem] h-fit  bg-[#192633]  rounded-md p-4 flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={us} className='w-16 h-16 rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 -right-3 text-2xl text-orange' />
                </div>
                <div className=' text-ground text-xs text-center mt-1'>I`ve been trading cryptocurrencies for years, but Cryptoville`s AI-powered trading system has revolutionized my strategy. The precision and speed of the algorithms helped me achieve consistent returns while minimizing risk. It`s like having a team of expert traders working around the clock!</div>
                <div className='border-b-[3px] w-9 border-orange mt-3'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-white capitalize'>henry calvin</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center uppercase'>nyc, us</div>
                </div>
              </div>
              <div className='w-[17rem] h-fit  bg-[#192633]  rounded-md p-4 flex flex-col gap-4 items-center  shlltw'>
                <div className='flex items-center relative'>
                  <img src={australia} className='w-16 h-16 rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 -right-3 text-2xl text-orange' />
                </div>
                <div className=' text-ground text-xs text-center mt-1'>What impressed me most about Cryptoville is its user-friendly interface and how it empowers traders with AI-backed insights. As someone relatively new to crypto, I felt confident in my trades, knowing that the AI was analyzing market data in real-time and guiding me toward smart decisions.</div>
                <div className='border-b-[3px] w-9 border-orange mt-3'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-white capitalize'>charlie brown</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>sydney, austrialia</div>
                </div>
              </div>
              <div className='w-[17rem] h-fit  bg-[#192633]  rounded-md p-4 flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={spanish} className='w-16 h-16 rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 -right-3 text-2xl text-orange' />
                </div>
                <div className=' text-ground text-xs text-center mt-1'>Cryptoville’s AI algorithms have an uncanny ability to detect market trends before they happen. I’ve seen huge improvements in my portfolio, with profits I never thought possible. It’s the most innovative platform out there for serious crypto traders.</div>
                <div className='border-b-[3px] w-9 border-orange mt-3'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-white capitalize'>carlos rivera</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>seville, spain</div>
                </div>
              </div>
            </div>
            {!view && <div className='flex justify-center mt-8'>
              <button className='w-fit h-fit px-6 py-1 bg-orange outline-none rounded-[3px] text-[0.85rem] capitalize text-white flex items-center justify-center  hover:bg-[#642626]' onClick={() => setView(!view)}>
                <span>more</span>
                <MdExpandMore />
              </button>
            </div>}
            {view && <div className='flex flex-wrap items-center justify-center gap-6 mt-8'>
              <div className='w-[17rem] h-fit  bg-[#192633]  rounded-md p-4 flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={uk} className='w-16 h-16 rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 -right-3 text-2xl text-orange' />
                </div>
                <div className=' text-ground text-xs text-center mt-1'>I was initially skeptical of using an AI trading platform, but Cryptoville has completely changed my perspective. The results speak for themselves—my returns have increased by 35% in just a few months. The AI is spot-on with market predictions!</div>
                <div className='border-b-[3px] w-9 border-orange mt-3'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-white capitalize'>arthur allen</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>manchester, UK</div>
                </div>
              </div>
              <div className='w-[17rem] h-fit  bg-[#192633]  rounded-md p-4 flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={blackUs} className='w-16 h-16 rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 -right-3 text-2xl text-orange' />
                </div>
                <div className=' text-ground text-xs text-center mt-1'>The level of automation Cryptoville offers is a game changer. With the AI monitoring and executing trades 24/7, I no longer worry about missing important market shifts. It’s allowed me to maximize gains without being glued to my computer all day.</div>
                <div className='border-b-[3px] w-9 border-orange mt-3'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-white capitalize'>jeremy davis</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>atlanta, us</div>
                </div>
              </div>
              <div className='w-[17rem] h-fit  bg-[#192633]  rounded-md p-4 flex flex-col gap-4 items-center shlltw'>
                <div className='flex items-center relative'>
                  <img src={india} className='w-16 h-16 rounded-full object-cover'></img>
                  <BsFillChatQuoteFill className='absolute bottom-2 -right-3 text-2xl text-orange' />
                </div>
                <div className=' text-ground text-xs text-center mt-1'>What sets Cryptoville apart is its AI’s ability to adapt to market volatility. Even in choppy markets, the platform adjusted my strategy dynamically, protecting my capital while seizing growth opportunities. I`ve never felt so secure in crypto trading.</div>
                <div className='border-b-[3px] w-9 border-orange mt-3'></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-white capitalize'>kabir kumar</div>
                  <div className='text-[#c0bebe] text-[0.65rem] text-center capitalize'>surat, india</div>
                </div>
              </div>
            </div>}
            {view && <div className='flex justify-center mt-8'>
              <button className='w-fit h-fit px-6 py-1 bg-orange outline-none rounded-[3px] text-[0.85rem] capitalize text-white flex items-center justify-center hover:bg-[#642626]' onClick={() => setView(!view)}>
                <span>less</span>
                <MdExpandLess />
              </button>
            </div>}
          </div>
          <div className='mt-16'>
            <coingecko-coin-heatmap-widget height="400" locale="en" top="20"></coingecko-coin-heatmap-widget>
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default HomePage

