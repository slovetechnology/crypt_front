import React, { useState } from 'react'
import LoadingAdmin from '../../../PageComponents/LoadingAdmin'
import { useAtom } from 'jotai'
import { PROFILE } from '../../../store'
import { MdOutlineHearing } from 'react-icons/md'
import { BiMailSend } from 'react-icons/bi'
import { Apis, UserPostApi } from '../../../services/API'
import { Alert } from '../../../utils/utils'
import contact from '../../../assets/images/contactus.png'

// import australia from '../../../assets/images/austrialia.jpg'
// import spanish from '../../../assets/images/spanish.jfif'
// import bg from '../../../assets/images/l-man.jpg'
// import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

const Feedback = () => {
    const [user] = useAtom(PROFILE)
    const [messageError, setMessageError] = useState(false)
    const [loading, setLoading] = useState(false)

    // let index = 0
    // const MoveImages = () => {
    //     let ImageDiv = document.querySelector('.imageDiv')
    //     if (index < 200) {
    //         index+= 100
    //     } else {
    //         index=0
    //     }
    //     ImageDiv.style.transform = `translateX(-${index}%)`
    //     ImageDiv.style.transition = 'all 0.6s ease-in-out'
    // }


    const [form, setForm] = useState({
        message: ''
    })
    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    const submitForm = async event => {
        event.preventDefault()
        setTimeout(() => {
            setMessageError(false)
        }, 1000)

        if (!form.message) return setMessageError(true)

        const formbody = {
            email: user.email,
            message: form.message
        }
        setLoading(true)
        try {
            const response = await UserPostApi(Apis.user.contact, formbody)
            if (response.status === 200) {
                Alert('Request Succcessful', response.msg, 'success')
                setForm({
                    message: ''
                })
            } else {
                return Alert('Request Failed', response.msg, 'error')
            }
        } catch (error) {
            Alert('Request Unsuccessful', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }



    document.documentElement.style.overflow = loading === true ? 'hidden' : 'auto'

    return (
        <div className='h-fit py-10 relative'>
            <div className='uppercase font-bold md:text-2xl text-lg text-semi-white '>send feedback</div>
            {loading && <LoadingAdmin />}
            <div className='md:w-[75%] w-11/12 mx-auto flex flex-col gap-12 mt-16'>
                <div>
                    <div className='flex items-center justify-center'>
                        <div className='md:text-[2rem] text-2xl capitalize font-bold text-[#a09f9f] '>get in touch</div>
                        <img src={contact} className='md:h-16 h-10 w-auto'></img>
                    </div>
                    <div className='md:text-[0.85rem] text-xs capitalize font-bold text-[#a09f9f] flex items-center justify-center gap-1 pt-2'>
                        <span>-</span>
                        <div>
                            send us a message; we are listening
                        </div>
                        <MdOutlineHearing className='text-light' />
                        <span>-</span>
                    </div>
                </div>
                <form onSubmit={submitForm}>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <div className='text-xs uppercase font-bold text-[#a09f9f]'>message</div>
                            <textarea placeholder='Type A Message' className={` p-2 h-36 text-semi-white lg:text-[0.9rem]  outline-none bg-[#0C091A] rounded-md resize-none border  ${messageError === true ? 'border-[#972424]' : 'border-light'} ipt`} name='message' value={form.message} onChange={inputHandler}></textarea>
                        </div>
                        <div className='flex justify-end'>
                            <button className='outline-none bg-light text-xs md:text-[0.9rem] text-white flex gap-1 items-center justify-center w-fit h-fit md:px-8 px-6 md:py-2 py-1.5 rounded-[3px] capitalize font-bold'>
                                <div>send</div>
                                <BiMailSend />
                            </button>
                        </div>
                    </div>
                </form>
                {/* <div className='flex flex-col gap-4'>
                    <div className='w-3/4 h-[40vh] mx-auto border-2 border-orange rounded-md'>
                        <div className='w-full h-full overflow-hidden'>
                            <div className='flex imageDiv'>
                                <img src={spanish} className='w-[100%] h-full'></img>
                                <img src={australia} className='w-[100%] h-full'></img>
                                <img src={bg} className='w-[100%] h-full object-cover'></img>
                            </div>
                        </div>
                    </div>
                    <div className='w-fit ml-auto py-1 px-2 rounded-md border border-light hover:bg-light hover:text-white cursor-pointer text-semi-white' onClick={MoveImages}><FaAngleRight /></div>
                </div> */}
            </div>
        </div>
    )
}

export default Feedback