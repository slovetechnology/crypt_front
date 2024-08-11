import axios from 'axios'
import Cookies from 'js-cookie'
import { CookieName } from '../utils/utils'

export const URL = import.meta.env.VITE_API_URL
export const imageurl = import.meta.env.VITE_API_URL


const user = 'api/user/'
const user_urls = {
    signup: user + 'create-account',
    login: user + 'login-account',
    profile: user + 'profile',
    validate_email: user + 'validate-email',
    resend_otp: user + 'resend-otp',
    find_email: user + 'find-email',
    verify_email: user + 'verify-email',
    change_password: user + 'change-password',
    contact: user + 'contact',
    update: user + 'update-profile',
    delete: user + 'delete-account',
    wallet: user + 'user-wallet',
    ups: user + 'user-ups',
}

const deposit = 'api/deposit/'
const deposit_urls = {
    create_deposit: deposit + 'create-deposit',
    user_deposits: deposit + 'user-deposits',
}

const notification = 'api/notification/'
const notification_urls = {
    user_notifications: notification + 'user-notifications',
    admin_notifications: notification + 'admin-notifications',
    unread_notis: notification + 'unread-notis',
    admin_unread_notis: notification + 'admin-unread-notis',
    delete_notification: notification + 'delete-notification',
    update_all: notification + 'update-all',
    update_admin_all: notification + 'update-admin-all',
    update_single: notification + 'update-single',
    update_admin_single: notification + 'update-admin-single'
}

const withdrawal = 'api/withdrawal/'
const withdrawal_urls = {
    user_withdrawals: withdrawal + 'user-withdrawals',
    make_withdrawal: withdrawal + 'make-withdrawal'
}

const investment = 'api/investment/'
const investment_urls = {
    user_investment: investment + 'user-investment',
    user_unclaim: investment + 'user-unclaim-investment',
    create_investment: investment + 'create-investment',
    claim_investment: investment + 'claim-investment'
}

const admin = 'api/admin/'
const admin_urls = {
    all_users: admin + 'all-users',
    all_deposits: admin + 'all-deposits',
    all_investments: admin + 'all-investments',
    all_withdrawals: admin + 'all-withdrawals',
    update_deposits: admin + 'update-deposits',
    update_investments: admin + 'update-investments',
    delete_users: admin + 'delete-users',
    get_user_figures: admin + 'get-user-total',
    update_withdrawals: admin + 'update-withdrawals',
    get_admin_wallets: admin + 'all-admin-wallets',
    create_admin_wallet: admin + 'create-admin-wallet',
    update_admin_wallet: admin + 'update-admin-wallet',
    delete_admin_wallet: admin + 'delete-admin-wallet',
    get_trading_plans: admin + 'all-trading-plans',
    create_trading_plan: admin + 'create-trading-plan',
    update_trading_plan: admin + 'update-trading-plan',
    delete_trading_plan: admin + 'delete-trading-plan',
    fund_user_account: admin + 'fund-user-account',
    get_admin_store: admin + 'admin-store',
}

export const Apis = {
    user: user_urls,
    deposit: deposit_urls,
    notification: notification_urls,
    withdrawal: withdrawal_urls,
    investment: investment_urls,
    admin: admin_urls
}


export const UserPostApi = async (endpoint, data) => {
    const response = await axios.post(`${URL}/${endpoint}`, data)
    return response.data
}

export const UserGetApi = async (endpoint) => {
    const token = Cookies.get(CookieName)
    const response = await axios.get(`${URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const UserPutApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.put(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const PostApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.post(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

