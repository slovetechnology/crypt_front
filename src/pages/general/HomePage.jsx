import Pagelayout from '../../PageComponents/Pagelayout'
import { MdJoinRight } from "react-icons/md";
import { MdOutlineDiversity2 } from "react-icons/md";
import { Link } from 'react-router-dom';
import rocket from '../../assets/images/rocket.png'
import light from '../../assets/images/light.png'
import { FiPlus, FiMinus } from "react-icons/fi";
import { questions } from '../../services/Miscellaneous';
import { useState } from 'react';


const HomePage = () => {
  const [faq, setFaq] = useState('')

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
              <div className='capitalize text-white font-bold text-[2rem] md:text-[3rem] leading-[4rem] md:leading-[5rem] '>artificial intelligence algorithm  crypto trade</div>
              <Link to='/signup'>
                <button className='outline-0 w-fit h-fit py-1 px-6 text-[0.9rem] text-white rounded-full bg-orange capitalize mt-5 flex gap-1 items-center font-[550] hover:bg-[#642626]'>
                  <MdJoinRight /><span>join</span>
                </button>
              </Link>
            </div>
            <div className='lg:col-span-3 col-span-2 '>
              <div className='w-fit h-fit border rotate-90  uppercase text-[0.85rem] py-1 px-[0.4rem] text-white font-[550] tracking-[0.5rem] relative text-ellipsis text-nowrap mt-40'>
                <div> crypto trade made easy</div>
                <div className='h-1 w-1 bg-white rounded-full absolute top-[1.7rem] left-[-0.2rem]'></div>
                <div className='h-1 w-1 bg-white rounded-full absolute top-[-0.2rem] left-[-0.21rem]'></div>
                <div className='h-1 w-1 bg-white rounded-full absolute top-[1.7rem] right-[-0.21rem]'></div>
                <div className='h-1 w-1 bg-white rounded-full absolute top-[-0.2rem] right-[-0.21rem]'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='md:w-[95%] w-11/12 mx-auto'>
          <div className='w-full h-fit py-8 px-4 bg-[#1B2530] z-10 -mt-8 border rounded-xl border-dashed overflow-hidden relative'>
            <div className='bda flex items-center justify-center rotate-90 w-40 h-40 border-2 bottom-4 rounded-full -left-20 absolute'>
              <div className='bdb w-28 h-28 border-2 rounded-full'></div>
            </div>
            <div className='bda flex items-center justify-center rotate-90 w-20 h-20 border-2  rounded-full absolute -top-12 -right-4' >
              <div className='bdb w-12 h-12 border-2 rounded-full'></div>
            </div>
            <div className='flex items-center gap-4 flex-col'>
              <div className='text-white text-[2rem] capitalize text-center font-bold'>what is the al algo trade?</div>
              <div className='text-semi-white text-[0.95rem] text-center lg:w-[60%] tracking-[0.05rem]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam nesciunt ut voluptatum! Qui quae inventore non totam laudantium, error provident aliquid, repudiandae, reiciendis praesentium excepturi libero nobis nostrum a eligendi.</div>
            </div>
            <div className='lg:w-3/5 w-11/12 mx-auto'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-16 '>
                <div className='flex gap-4'>
                  <img src={rocket} className='w-auto h-12 z-20'></img>
                  <div className='flex flex-col gap-2'>
                    <div className='font-[550] text-[1.1rem] text-white'> Lorem, ipsum.</div>
                    <div className='text-xs text-white  tracking-[0.05rem]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat, harum?</div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <img src={light} className='w-auto h-12 z-20'></img>
                  <div className='flex flex-col gap-2'>
                    <div className='font-[550] text-[1.1rem] text-white'>Lorem, ipsum.</div>
                    <div className='text-white text-xs tracking-[0.05rem]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat, harum?</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-20 w-11/12 lg:w-3/4 mx-auto'>
            <div className='flex flex-col'>
              <div className=' flex flex-col gap-2 items-center justify-center text-white'>
                <span className='font-bold capitalize lg:text-[2.5rem] text-3xl '>have any questions?</span>
                <div className='text-center lg:w-[50%] mt-[1rem] text-semi-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem obcaecati, architecto numquam libero perspiciatis veniam!</div>
              </div>
              <div className='flex flex-col gap-4 mt-12'>
                {questions.map((item, i) => (
                  <div className={`w-full mx-auto h-fit bg-white rounded-md px-3 py-2 md:p-4 flex flex-col gap-4 overflow-hidden border border-[grey] shadow-sm trans`} key={i}>
                    <div onClick={() => handleQuestions(i)} className='flex justify-between w-full h-fit cursor-pointer md:text-lg text-base font-medium'>
                      <span>{item.title}</span>
                      <div className='w-fit h-fit p-1 rounded-md bg-[#e2e2e2] text-[0.8rem]'>
                        {faq !== i ?
                          <FiPlus />
                          :
                          <FiMinus/>
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
          <div className='mt-16'>
            <coingecko-coin-heatmap-widget height="400" locale="en" top="20"></coingecko-coin-heatmap-widget>
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default HomePage