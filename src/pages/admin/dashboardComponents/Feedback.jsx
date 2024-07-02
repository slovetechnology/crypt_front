import React, { useState } from 'react'
import LoadingAdmin from '../../../PageComponents/LoadingAdmin'
import { useAtom } from 'jotai'
import { PROFILE } from '../../../store'
import { MdOutlineHearing } from 'react-icons/md'
import { BiMailSend } from 'react-icons/bi'
import { Apis, UserPostApi } from '../../../services/API'
import { Alert } from '../../../utils/utils'
import contact from '../../../assets/images/contactus.png'

const Feedback = () => {
    const [user, setUser] = useAtom(PROFILE)
    const [messageError, setMessageError] = useState(false)
    const [loading, setLoading] = useState(false)


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
                    message: ''                })
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
        <div className='h-screen pt-[2.5rem] relative '>
            <div className='uppercase font-bold text-[1.5rem] text-[#e0dfdf] '>send feedback</div>
            {loading && <LoadingAdmin />}
            <div className='w-[75%] mx-auto pt-[5rem] flex flex-col gap-[3rem]'>
                <div>
                    <div className='flex items-center justify-center'>
                    <div className='text-[2rem] capitalize font-bold text-[#a09f9f] '>get in touch</div>
                    <img src={contact} className='h-[5rem] w-auto'></img>
                    </div>
                    <div className='text-[0.85rem] capitalize font-bold text-[#a09f9f] flex items-center justify-center gap-1 pt-[0.5rem]'>
                        <div>
                            - send us a message; we are listening
                        </div>
                        <MdOutlineHearing className='text-[#7665D5]' />
                        <span>-</span>
                    </div>
                </div>
                <form onSubmit={submitForm}>
                    <div className='flex flex-col gap-4 '>
                        <div className='flex flex-col gap-2'>
                            <div className='text-[0.75rem] uppercase font-bold text-[#a09f9f]'>message</div>
                            <textarea placeholder='Type A Message' className={` p-[0.5rem] h-[9rem] text-[#e0dfdf] text-[0.9rem]   outline-none bg-[#0C091A] rounded-[3px]  ${messageError === true ? ' border border-[red]' : 'border border-[#7665D5] resize-none'} ipt`} name='message' value={form.message} onChange={inputHandler}></textarea>
                        </div>
                        <div className='flex justify-end'>
                            <button className='outline-none bg-[#7665D5] text-[0.9rem] text-[white] flex gap-1 items-center justify-center w-fit h-fit px-[2rem] py-[0.25rem] rounded-[3px] capitalize font-bold'>
                                <div>send</div>
                                <BiMailSend />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Feedback