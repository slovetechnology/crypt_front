import React, { useEffect, useRef, useState } from 'react'
import heart from '../assets/images/heart.png'
import cash from '../assets/images/cash.png'
import efficient from '../assets/images/efficient.png'

const CountComponent = () => {
    const [userCount, setUserCount] = useState(0)
    const [investCount, setInvestCount] = useState(0)
    const [tradeCount, setTradeCount] = useState(0)
    const ref = useRef()

    useEffect(() => {

        const element = ref.current

        let index = 0
        let index2 = 0
        let index3 = 0

        const countFunction = () => {

            if (userCount < 1) {
                let countOne = setInterval(() => {
                    if (index === 1200) {
                        clearInterval(countOne)
                    } else {
                        index += 100
                        setUserCount(index)
                    }
                }, 100)

                let countTwo = setInterval(() => {
                    if (index2 === 15) {
                        clearInterval(countTwo)
                    } else {
                        index2++
                        setInvestCount(index2)
                    }
                }, 100)

                let countThree = setInterval(() => {
                    if (index3 === 95) {
                        clearInterval(countThree)
                    } else {
                        index3 += 5
                        setTradeCount(index3)
                    }
                }, 100)
            }
        }

        const handleObserver = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                requestAnimationFrame(countFunction)
            }
        }

        const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 })
        observer.observe(element)

    }, [])


    return (
        <div className='w-full h-fit bg-[#192633] py-16 px-4 rounded-md relative overflow-hidden' ref={ref}>
            <div className='relative w-fit mx-auto text-semi-white'>
                <div className='text-[2rem] md:text-[3rem] text-white font-[550] capitalize'>the numbers</div>
                <div className='border-t-4 md:w-48 w-32 absolute top-0 left-0'></div>
                <div className='border-b-4 md:w-48 w-32 absolute bottom-0 right-0'></div>
            </div>
            <div className='flex items-center flex-wrap gap-8 md:gap-20 justify-center mt-10'>
                <div className='w-[8.2rem] h-[8.2rem] rounded-full border border-[#f0b28e] flex flex-col items-center pt-4 relative'>
                    <img src={heart} className='h-8 w-auto'></img>
                    <div className='text-[1.8rem] font-extrabold text-white'>{userCount}<span className='font-[500]'>+</span></div>
                    <div className='capitalize text-[0.6rem] font-bold text-[#c0bebe] '>satisfield users</div>
                    <div className='w-2 h-2 bg-[#f0b28e] rounded-full absolute -top-1 left-16'></div>
                    <div className='w-2 h-2 bg-[#f0b28e] rounded-full absolute -bottom-1 left-16'></div>
                </div>
                <div className='w-[8.2rem] h-[8.2rem] rounded-full border border-[#f0b28e] flex flex-col items-center pt-4 relative'>
                    <img src={cash} className='h-8 w-auto'></img>
                    <div className='text-[1.8rem] font-extrabold text-white'>{investCount}M<span className='font-[500]'>+</span></div>
                    <div className='capitalize text-[0.6rem] font-bold text-[#c0bebe] '>total investment</div>
                    <div className='w-2 h-2 bg-[#f0b28e] rounded-full absolute -top-1 left-16'></div>
                    <div className='w-2 h-2 bg-[#f0b28e] rounded-full absolute -bottom-1 left-16'></div>
                </div>
                <div className='w-[8.2rem] h-[8.2rem] rounded-full border border-[#f0b28e] flex flex-col items-center pt-4 relative'>
                    <img src={efficient} className='h-auto w-6'></img>
                    <div className='text-[1.8rem] font-extrabold text-white'>{tradeCount}<span className='font-[500] text-4'>%</span></div>
                    <div className='capitalize text-[0.6rem] font-bold text-[#c0bebe] '>trade efficiency</div>
                    <div className='w-2 h-2 bg-[#f0b28e] rounded-full absolute -top-1 left-16'></div>
                    <div className='w-2 h-2 bg-[#f0b28e] rounded-full absolute -bottom-1 left-16'></div>
                </div>
            </div>
        </div>
    )
}

export default CountComponent