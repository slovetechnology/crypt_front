import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { isExpired } from 'react-jwt'
import { useAtom } from 'jotai'
import { Alert, CookieName } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import { PROFILE } from '../store'
import { Apis, UserGetApi } from './API'

const AuthRoute = ({ children }) => {

    const [login, setLogin] = useState(false)
    const navigate = useNavigate()
    const [, setProfile] = useAtom(PROFILE)

    useEffect(() => {
        const ValidateEntrance = async () => {
        try {
            const token = Cookies.get(CookieName)
            const isinValid = isExpired(token)
            if (!token) {
                setLogin(false)
                return navigate('/login')
            }
            if (isinValid) {
                setLogin(false)
                return navigate('/login')
            }
            const response = await UserGetApi(Apis.user.profile)
            if (response.status === 200) {
                setLogin(true)
                setProfile(response.msg)
            }
        } catch (error) {
            Alert('request failed', error.msg, 'error')
        }
    }
    
    ValidateEntrance()

    }, [])

    if (login) return children
}

export default AuthRoute