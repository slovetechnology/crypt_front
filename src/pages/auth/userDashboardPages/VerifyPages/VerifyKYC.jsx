import React, { useCallback, useEffect, useRef, useState } from 'react'
import VerifyLayout from '../../../../UserComponents/VerifyLayout'
import LoadingAdmin from '../../../../GeneralComponents/LoadingAdmin'
import { NOTIFICATIONS, PROFILE, UNREADNOTIS } from '../../../../store'
import { MdVerified } from 'react-icons/md'
import { useAtom } from 'jotai'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { countryApi } from '../../../../services/CountryAPI'
import { PhoneCodesApi } from '../../../../services/PhoneCodes'
import { RiErrorWarningLine } from 'react-icons/ri'
import { FiUploadCloud } from 'react-icons/fi'
import { Apis, PostApi, UserGetApi } from '../../../../services/API'
import { Alert } from '../../../../utils/utils'

const Genders = [
    "male",
    "female",
    "non binary",
    "rather not say",
]

const MaritalStatus = [
    "single",
    "married",
    "divorced",
    "seperated"
]

const VerifyKYC = () => {
    const [, setUser] = useAtom(PROFILE)
    const [, setNotifications] = useAtom(NOTIFICATIONS)
    const [, setUnreadNotis] = useAtom(UNREADNOTIS)

    const [kyc, setKyc] = useState({})
    const [gender, setGender] = useState('select')
    const [genderShow, setGenderShow] = useState(false)
    const [marital, setMarital] = useState('select')
    const [maritalShow, setMaritalShow] = useState(false)
    const [countries, setCountries] = useState(countryApi)
    const [countryshow, setCountryShow] = useState(false)
    const [usercountry, setUserCountry] = useState({
        name: 'select',
        flag: null
    })
    const [searchCountry, setSearchCountry] = useState('')
    const [phones, setPhones] = useState(PhoneCodesApi)
    const [phoneCode, setPhoneCode] = useState('+44')
    const [phoneShow, setPhoneShow] = useState(false)
    const [searchPhone, setSearchPhone] = useState('')
    const [error, setError] = useState('')
    const idref = useRef()
    const [id, setId] = useState(null)
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        state: '',
        postal: '',
        address: '',
        id_number: '',
        phone_number: '',
    })

    const formHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const FetchKyc = useCallback(async () => {
        try {
            const response = await UserGetApi(Apis.kyc.user_kyc)
            if (response.status === 200) {
                setKyc(response.msg)
                setForm({
                    first_name: response.msg.first_name,
                    last_name: response.msg.last_name,
                    date_of_birth: response.msg.date_of_birth,
                    state: response.msg.state,
                    postal: response.msg.postal,
                    address: response.msg.address,
                    id_number: response.msg.id_number,
                    phone_number: response.msg.phone_number,
                })
                setGender(response.msg.gender)
                setMarital(response.msg.marital_status)
                setUserCountry({
                    name: response.msg.country,
                    flag: response.msg.country_flag
                })
                setPhoneCode(response.msg.phone_code)
                setId({
                    name: response.msg.valid_id
                })
            }

        } catch (error) {
            //
        }
    }, [])

    useEffect(() => {
        FetchKyc()
    }, [FetchKyc])

    const handleUpload = (event) => {
        setTimeout(() => {
            setError('')
        }, 2000)

        const file = event.target.files[0]

        if (!file.type.startsWith('image/')) {
            console.log('wrong')
            idref.current.value = null
            return setError('File error, invalid image format.')
        }
        setId(file)
    }

    const FilterCountry = () => {
        const altCountries = countryApi
        if (!searchCountry) {
            setCountries(countryApi)
        }
        else {
            let searchResult = altCountries.filter(item => item.name.toLowerCase().includes(searchCountry.toLowerCase()))
            setCountries(searchResult)
        }
    }

    const FilterPhone = () => {
        const altPhones = PhoneCodesApi
        if (!searchPhone) {
            setPhones(PhoneCodesApi)
        }
        else {
            let searchResult = altPhones.filter(item => item.name.toLowerCase().includes(searchPhone.toLowerCase()) || item.dial_code.includes(searchPhone))
            setPhones(searchResult)
        }
    }

    const Create_Update_KYC = async () => {
        setTimeout(() => {
            setError('')
        }, 2000)

        if (!form.first_name) return setError('Enter first name')
        if (!form.last_name) return setError('Enter last name')
        if (gender === 'select') return setError('Select gender')
        if (marital === 'select') return setError('Select marital status')
        if (!form.date_of_birth) return setError('Enter date of birth')
        if (usercountry.name === 'select') return setError('Select Country')
        if (!form.address) return setError('Enter address')
        if (!form.state) return setError('Enter state of residence')
        if (!form.postal) return setError('Enter postal / zipcode')
        if (!form.phone_number) return setError('Enter phone number')
        if (!form.id_number) return setError('Enter Identification number')
        if (id === null) return setError('Provide valid ID')

        if (form.first_name === kyc.first_name && form.last_name === kyc.last_name && form.address === kyc.address && form.state === kyc.state && form.postal === kyc.postal && form.date_of_birth === kyc.date_of_birth && form.phone_number === kyc.phone_number && form.id_number === kyc.id_number && phoneCode === kyc.phone_code && gender === kyc.gender && marital === kyc.marital_status && usercountry.name === kyc.country && id.name === kyc.valid_id) return setError('No changes made')

        const formbody = new FormData()
        formbody.append('valid_id', id)
        formbody.append('first_name', form.first_name)
        formbody.append('last_name', form.last_name)
        formbody.append('date_of_birth', form.date_of_birth)
        formbody.append('state', form.state)
        formbody.append('postal', form.postal)
        formbody.append('address', form.address)
        formbody.append('id_number', form.id_number)
        formbody.append('phone_code', phoneCode)
        formbody.append('phone_number', form.phone_number)
        formbody.append('gender', gender)
        formbody.append('marital_status', marital)
        formbody.append('country', usercountry.name)
        formbody.append('country_flag', usercountry.flag)

        setLoading(true)
        try {
            const response = await PostApi(Apis.kyc.create_update_kyc, formbody)
            if (response.status === 200) {
                Alert('Request Successful', `${response.msg}`, 'success')
                FetchKyc()
                setUser(response.profile)
                setNotifications(response.notis)
                setUnreadNotis(response.unread)
            } else {
                Alert('Request Failed', `${response.msg}`, 'error')
            }
        } catch (error) {
            Alert('Request Failed', `${error.message}`, 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <VerifyLayout>
            <div className='relative'>
                {loading && <LoadingAdmin />}
                <div className='flex flex-col gap-14 pt-16'>
                    <div className='flex flex-col gap-2 items-center text-semi-white'>
                        <div className='flex gap-2 items-center md:text-4xl text-2xl capitalize font-bold'>
                            <span>verify kyc</span>
                            <MdVerified className='text-[#b19e34]' />
                        </div>
                        <div className='italic text-sm flex items-center gap-2'>
                            <span>Status:</span>
                            {Object.values(kyc).length !== 0 ?
                                <span className={`${kyc.status === 'failed' ? 'text-[#c42e2e]' : 'text-light'}`}>{kyc.status}</span>
                                :
                                <span className='text-[#c42e2e]'>unverified</span>
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 text-black md:w-3/4 w-[95%] mx-auto bg-semi-white py-6 md:px-8 px-5 rounded-md relative'>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 items-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold '>first name:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.first_name} name='first_name' onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold '>last name:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.last_name} name='last_name' onChange={formHandler}></input>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 items-center'>
                            <div className='relative'>
                                <div className='flex flex-col gap-1'>
                                    <div className='md:text-sm text-xs capitalize font-semibold'>gender:</div>
                                    <div className='px-2 py-1 h-fit w-full bg-white shantf cursor-pointer rounded-[3px]' onClick={() => setGenderShow(!genderShow)} >
                                        <div className='flex justify-between items-center text-[0.8rem] text-black'>
                                            <span className='font-semibold'>{gender}</span>
                                            <div className='text-sm'>
                                                {!genderShow ? <TiArrowSortedDown />
                                                    :
                                                    <TiArrowSortedUp />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {genderShow && <div className='h-fit w-full absolute  top-12 md:top-[3.4rem] left-0 bg-white border border-[lightgrey] rounded-md z-50'>
                                    {Genders.map((item, i) => (
                                        <div key={i} className={`flex flex-col px-2 py-0.5 text-black hover:bg-[#f8f8f8] ${i === Genders.length - 1 ? 'hover:rounded-b-md' : 'border-b border-[#ebeaea]'} ${i === 0 && 'hover:rounded-t-md'}`}>
                                            <div className='flex items-center cursor-pointer' onClick={() => { setGender(item); setGenderShow(false) }}>
                                                <div className='text-[0.85rem] font-bold'>{item}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>}
                            </div>
                            <div className='relative'>
                                <div className='flex flex-col gap-1'>
                                    <div className='md:text-sm text-xs capitalize font-semibold'>marital status:</div>
                                    <div className='px-2 py-1 h-fit w-full bg-white shantf cursor-pointer rounded-[3px]' onClick={() => setMaritalShow(!maritalShow)} >
                                        <div className='flex justify-between items-center text-[0.8rem] text-black'>
                                            <span className='font-semibold'>{marital}</span>
                                            <div className='text-sm'>
                                                {!maritalShow ? <TiArrowSortedDown />
                                                    :
                                                    <TiArrowSortedUp />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {maritalShow && <div className='h-fit w-full absolute top-12 md:top-[3.4rem] left-0 bg-white border border-[lightgrey] rounded-md z-50'>
                                    {MaritalStatus.map((item, i) => (
                                        <div key={i} className={`flex flex-col px-2 py-0.5 text-black hover:bg-[#f8f8f8] ${i === MaritalStatus.length - 1 ? 'hover:rounded-b-md' : 'border-b border-[#ebeaea]'} ${i === 0 && 'hover:rounded-t-md'}`}>
                                            <div className='flex items-center cursor-pointer' onClick={() => { setMarital(item); setMaritalShow(false) }}>
                                                <div className='text-[0.85rem] font-bold'>{item}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>}
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 items-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold '>date of birth:</div>
                                <input type='date' value={form.date_of_birth} name='date_of_birth' className='w-full h-fit text-black py-1 px-2 rounded-[3px] shantf outline-none text-[0.8rem] font-semibold bg-white text-left' placeholder={`${!form.date_of_birth ? 'select' : ''}`} onChange={formHandler} />
                            </div>
                            <div className='relative'>
                                <div className='flex flex-col gap-1'>
                                    <div className='text-sm capitalize font-semibold'>country:</div>
                                    <div className='flex gap-1 items-center'>
                                        {usercountry.flag !== null && <img className='h-5 w-auto' src={usercountry.flag}></img>}
                                        <div className='px-2 py-1 h-fit w-full bg-white shantf cursor-pointer rounded-sm' onClick={() => { setCountryShow(!countryshow); setSearchCountry(''); setCountries(countryApi) }}>
                                            <div className='flex justify-between items-center text-[0.8rem] text-black'>
                                                <span className='font-semibold'>{usercountry.name}</span>
                                                <div className='text-sm'>
                                                    {!countryshow ? <TiArrowSortedDown />
                                                        :
                                                        <TiArrowSortedUp />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {countryshow &&
                                    <div className='h-fit w-full bg-white shantf absolute top-[3.4rem] left-0 z-10 py-2 rounded-sm '>
                                        <div className='px-4'>
                                            <input className='ipt border border-[#a7a6a6] bg-transparent text-black px-2 py-1 w-full outline-none md:text-[0.85rem] text-base md:h-6 h-7 rounded-sm mb-1' type='text' placeholder='search' value={searchCountry} onChange={(e) => setSearchCountry(e.target.value)} onKeyUp={FilterCountry}></input>
                                        </div>
                                        <div className='overflow-y-auto scroll h-28 px-4'>
                                            {countries.map((item, i) => (
                                                <div className='flex flex-col mt-2' key={i}>
                                                    <div className='flex gap-2 items-center text-black cursor-pointer hover:bg-semi-white' onClick={() => { setUserCountry(item); setCountryShow(false) }}>
                                                        <img src={item.flag} className='w-4 h-auto object-cover'></img>
                                                        <div className='text-[0.85rem] font-bold'>{item.name}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 items-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold '>address & city:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.address} name='address' onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold '>state / province:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.state} name='state' onChange={formHandler}></input>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 items-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>postal / zipcode:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.postal} name='postal' onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>phone number:</div>
                                <div className='flex gap-2 items-center'>
                                    <div className='relative'>
                                        <div className='py-1 px-2 h-fit w-fit bg-white shantf cursor-pointer rounded-sm' onClick={() => { setPhoneShow(!phoneShow); setSearchPhone(''); setPhones(PhoneCodesApi) }}>
                                            <div className='flex gap-1 items-center text-[0.8rem] text-black'>
                                                <span className='font-semibold'>{phoneCode}</span>
                                                <div className='text-sm'>
                                                    {!phoneShow ? <TiArrowSortedDown />
                                                        :
                                                        <TiArrowSortedUp />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {phoneShow &&
                                            <div className='h-fit w-full bg-white shantf absolute top-[1.85rem] left-0 z-10 py-2 rounded-sm '>
                                                <div className='px-1'>
                                                    <input className='ipt border border-[#a7a6a6] bg-transparent text-black px-1 py-1 w-full outline-none md:text-[0.85rem] text-base md:h-6 h-7 rounded-sm mb-1' type='text' placeholder='search' value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} onKeyUp={FilterPhone}></input>
                                                </div>
                                                <div className='overflow-y-auto scrollDiv h-28 px-2'>
                                                    {phones.map((item, i) => (
                                                        <div className='flex flex-col mt-2' key={i}>
                                                            <div className='flex gap-2 items-center text-black cursor-pointer hover:bg-semi-white' onClick={() => { setPhoneCode(item.dial_code); setPhoneShow(false) }}>
                                                                <div className='text-[0.85rem] font-bold'>{item.dial_code}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div>
                                        <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.phone_number} name='phone_number' onChange={formHandler}></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-6 items-center'>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>identification number:</div>
                                <input className='outline-none bg-transparent border border-light w-full px-2 md:py-2 py-1.5 lg:text-sm text-base rounded-sm' value={form.id_number} name='id_number' onChange={formHandler}></input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <div className='md:text-sm text-xs capitalize font-semibold'>valid identity document:</div>
                                <div className='w-full rounded-sm h-fit flex items-center gap-4 relative p-1 border border-light'>
                                    <label className='cursor-pointer'>
                                        <div className='bg-white h-fit w-fit px-2 py-1 text-sm rounded-sm font-medium shantf'>
                                            <div className='bg-semi-white rounded-full p-2'><FiUploadCloud /></div>
                                        </div>
                                        <input ref={idref} type="file" onChange={handleUpload} hidden />
                                    </label>
                                    <div className='text-sm text-center'>{id === null ? 'No file choosen' : id.name}</div>
                                </div>
                            </div>
                        </div>
                        <button className='outline-none bg-[#252525] py-2 px-8 h-fit w-fit rounded-md capitalize md:text-sm text-xs text-white cursor-pointer font-[600] mt-6 mx-auto' onClick={Create_Update_KYC}>upload details</button>
                        {error !== '' &&
                            <div className='md:text-sm text-xs absolute bottom-10 left-2 text-[#eb2e2e] bg-white sha px-4 py-1 flex items-center gap-1 rounded-sm text-center z-10'>
                                <RiErrorWarningLine />
                                <span>{error}</span>
                                <div className='error-progress2 absolute -bottom-1 left-0 rounded-sm z-10'></div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </VerifyLayout>
    )
}

export default VerifyKYC