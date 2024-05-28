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

  const handleQuestions = id => {
    if (id !== faq) {
      setFaq(id)
    } else {
      setFaq('')
    }
  }

  return (
    <Pagelayout>
      <div className='bg-[#1E2833] pb-[5rem]'>
        <div className='bgi'>
          <div className='w-11/12 mx-auto pt-[5rem] relative flex'>
            <div className='w-[30%]'>
              <div className='capitalize text-[#E96E28] text-[0.7rem] font-[550] tracking-widest ml-[0.5rem]'> technology & crypto</div>
              <MdOutlineDiversity2 className='text-[white] absolute top-[5rem] left-[12rem]  text-[1.1rem]' />
              <div className='capitalize text-[white] font-bold text-[3rem] leading-[5rem] mt-[-1rem]'>artificial intelligence algorithm  crypto trade</div>
              <Link to='/signup'>
                <button className='outline-0 w-fit h-fit py-[0.3rem] px-[1.5rem] text-[0.9rem] text-[white] rounded-[25px] bg-[#E96E28] capitalize mt-[1.5rem] flex gap-1 items-center font-[550] hover:bg-[#642626]'>
                  <MdJoinRight /><span>join</span>
                </button>
              </Link>
            </div>
            <div className='w-[70%] relative'>
              <div className='absolute top-0 left-[-3rem]'>
                <div className='w-fit h-fit border rotate-90  uppercase text-[0.85rem] mt-[10rem] py-[0.25rem] px-[0.4rem] text-[white] font-[550] tracking-[0.5rem] relative'>
                  <div> crypto trade made easy</div>
                  <div className='h-[0.25rem] w-[0.25rem] bg-[white] rounded-[50%] absolute top-[1.7rem] left-[-0.2rem]'></div>
                  <div className='h-[0.25rem] w-[0.25rem] bg-[white] rounded-[50%] absolute top-[-0.2rem] left-[-0.21rem]'></div>
                  <div className='h-[0.25rem] w-[0.25rem] bg-[white] rounded-[50%] absolute top-[1.7rem] right-[-0.21rem]'></div>
                  <div className='h-[0.25rem] w-[0.25rem] bg-[white] rounded-[50%] absolute top-[-0.2rem] right-[-0.21rem]'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[90%] mx-auto'>
          <div className='w-[full] h-[fit] pb-[2rem] bg-[#1B2530] z-10 mt-[-2rem] border rounded-xl border-dashed overflow-hidden relative pt-[2rem]'>
            <div className='bda flex items-center justify-center rotate-90 w-[10rem] h-[10rem] border-2 bottom-[1rem] rounded-[50%] left-[-5rem] absolute'>
              <div className='bdb w-[7rem] h-[7rem] border-2 rounded-[50%]'></div>
            </div>
            <div className='bda flex items-center justify-center rotate-90 w-[5rem] h-[5rem] border-2  rounded-[50%] absolute top-[-3rem] right-[-1rem]' >
              <div className='bdb w-[3rem] h-[3rem] border-2 rounded-[50%]'></div>
            </div>
            <div className='flex items-center gap-[1rem] flex-col'>
              <div className='text-[white] text-[2rem] capitalize text-center font-bold'>what is the al algo trade?</div>
              <div className='text-[#bbb9b9] text-[0.95rem] text-center w-[60%] pt-[1rem] tracking-[0.05rem]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam nesciunt ut voluptatum! Qui quae inventore non totam laudantium, error provident aliquid, repudiandae, reiciendis praesentium excepturi libero nobis nostrum a eligendi.</div>
            </div>
            <div className='w-[50%] mx-auto mt-[4rem]'>
              <div className='flex items-center justify-center'>
                <div className='flex gap-4'>
                  <img src={rocket} className='w-auto h-[3rem]'></img>
                  <div className='flex flex-col'>
                    <div className='font-[550] text-[1.1rem] text-[white]'> Lorem, ipsum.</div>
                    <div className='w-[80%] text-[0.75rem] text-[white] mt-[0.5rem] tracking-[0.05rem]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat, harum?</div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <img src={light} className='w-auto h-[3rem]'></img>
                  <div className='flex flex-col'>
                    <div className='font-[550] text-[1.1rem] text-[white]'>Lorem, ipsum.</div>
                    <div className='w-[80%] text-[white] mt-[0.5rem] text-[0.75rem] tracking-[0.05rem]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat, harum?</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-[5rem] flex flex-col justify-center items-center'>
            <div className=' flex items-center text-white'>
              <span className=' font-bold capitalize text-[2.5rem]'>have any questions?</span>
            </div>
            <div className='text-center w-[50%] mt-[1rem] text-[#bbb9b9]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem obcaecati, architecto numquam libero perspiciatis veniam!</div>
            <div className='flex flex-col gap-[1rem] mt-[3rem]'>
              {
                questions.map((item, i) => (
                  <div
                    className={`w-[40rem] ${faq === i ? 'h-[8rem]' : ' h-[3.8rem]'} bg-[white] rounded-md px-[1.5rem] py-[1rem] flex flex-col gap-4 overflow-hidden border border-[grey] trans`} key={i}>
                    <div
                      onClick={() => handleQuestions(i)}
                      className='flex justify-between w-full items-center h-fit cursor-pointer text-[1.2rem] font-[550] dropclck'>
                      <span>{item.title}</span>
                      {faq !== i ? <div className='w-fit h-fit p-1 rounded-md bg-[#e2e2e2] text-[0.8rem]'><FiPlus /></div> :
                        <div className='w-fit h-fit p-1 rounded-md bg-[#e2e2e2] text-[0.8rem]'><FiMinus /></div>}
                    </div>
                    <div className='text-[0.95rem]'>{item.content}</div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className='mt-[5rem]'>
            <coingecko-coin-heatmap-widget height="400" locale="en" top="20"></coingecko-coin-heatmap-widget>
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default HomePage