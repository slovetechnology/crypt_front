import AddWallet from "../pages/admin/adminDashboardPages/SettingsPages/AddWallet";
import Package from "../pages/admin/adminDashboardPages/SettingsPages/Package";
import Personalize from "../pages/admin/adminDashboardPages/SettingsPages/Personalize";
import Taxes from "../pages/admin/adminDashboardPages/Taxes";
import UpdateDeposits from "../pages/admin/adminDashboardPages/UpdateDeposits";
import UpdateInvestment from "../pages/admin/adminDashboardPages/UpdateInvestment";
import Users from "../pages/admin/adminDashboardPages/Users";
import Withdrawals from "../pages/admin/adminDashboardPages/Withdrawals";
import Deposit from "../pages/admin/userDashboardPages/Deposit";
import Feedback from "../pages/admin/userDashboardPages/Feedback";
import Investment from "../pages/admin/userDashboardPages/Investment";
import Profile from "../pages/admin/userDashboardPages/Profile";
import TaxPayment from "../pages/admin/userDashboardPages/TaxPayment";
import VerifyEmail from "../pages/admin/userDashboardPages/VerifyPages/VerifyEmail";
import VerifyKYC from "../pages/admin/userDashboardPages/VerifyPages/VerifyKYC";
import Wallet from "../pages/admin/userDashboardPages/Wallet";
import Withdraw from "../pages/admin/userDashboardPages/Withdraw";
import AboutPage from "../pages/general/AboutPage";
import ContactPage from "../pages/general/ContactPage";
import HomePage from "../pages/general/HomePage";
import LegalSecurityPage from "../pages/general/LegalSecurityPage";
import LoginPage from "../pages/general/LoginPage";
import PrivacyPage from "../pages/general/PrivacyPage";
import SignupPage from "../pages/general/SignupPage";
import TermsPage from "../pages/general/TermsPage";
import TradingPlansPage from "../pages/general/TradingPlansPage";

export const GeneralPagesLinks = [
    { path: '/', component: HomePage },
    { path: '/contact', component: ContactPage },
    { path: '/login', component: LoginPage },
    { path: '/about', component: AboutPage },
    { path: '/signup', component: SignupPage },
    { path: '/trading', component: TradingPlansPage },
    { path: '/terms', component: TermsPage },
    { path: '/privacy', component: PrivacyPage },
    { path: '/legal', component: LegalSecurityPage }
]

const dashboard = '/dashboard'
const verify = '/verify-account'

export const UserDashboardPagesLinks = [
    { path: dashboard, component: Wallet },
    { path: dashboard + '/investment', component: Investment },
    { path: dashboard + '/deposit', component: Deposit },
    { path: dashboard + '/withdraw', component: Withdraw },
    { path: dashboard + '/profile', component: Profile },
    { path: dashboard + '/feedback', component: Feedback },
    { path: dashboard + '/tax-payment', component: TaxPayment },
    { path: dashboard + verify, component: VerifyEmail },
    { path: dashboard + verify + '/kyc', component: VerifyKYC },
]

const admin = '/admin-controls'
const settings = '/settings'

export const AdminDashboardPagesLinks = [
    { path: admin, component: UpdateDeposits },
    { path: admin + '/investments', component: UpdateInvestment },
    { path: admin + '/withdrawals', component: Withdrawals },
    { path: admin + '/users', component: Users },
    { path: admin + '/taxes', component: Taxes },
    { path: admin + settings, component: AddWallet },
    { path: admin + settings + '/packages', component: Package },
    { path: admin + settings + '/personalize', component: Personalize },
]