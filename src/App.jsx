import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/general/HomePage'
import ContactPage from './pages/general/ContactPage'
import AboutPage from './pages/general/AboutPage'
import LegalSecurityPage from './pages/general/LegalSecurityPage'
import LoginPage from './pages/general/LoginPage'
import SignupPage from './pages/general/SignupPage'
import TradingPlansPage from './pages/general/TradingPlansPage'
import PerformancesPage from './pages/general/PerformancesPage'
import AuthRoute from './services/AuthRoute'
import TermsPage from './pages/general/TermsPage'
import PrivacyPage from './pages/general/PrivacyPage'
import Dashboard from './pages/admin/dashboardComponents/Dashboard'
import AdminHome from './pages/admin/adminComponents/AdminHome'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage/>} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/legal" element={<LegalSecurityPage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path='/trading' element={<TradingPlansPage/>} />
      <Route path='/performances' element={<PerformancesPage/>} />
      <Route path='/terms' element={<TermsPage/>} />
      <Route path='/privacy' element={<PrivacyPage/>} />
      <Route path='/dashboard' element={<AuthRoute><Dashboard/></AuthRoute>} />
      <Route path='/admin-controls' element={<AuthRoute><AdminHome/></AuthRoute>} />
    </Routes>
    
  )
}

export default App