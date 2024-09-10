import { Route, Routes } from 'react-router-dom'
import Notfound from './utils/Notfound'
import { AdminDashboardPagesLinks, GeneralPagesLinks, UserDashboardPagesLinks } from './services/PageLinks'
import AuthRoute from './services/AuthRoute'

const App = () => {
  return (
    <Routes>

      <Route path="*" element={<Notfound />} />

      {GeneralPagesLinks.map((item, index) => (
        <Route key={index} path={`${item.path}`} element={<item.component />} />
      ))}

      {UserDashboardPagesLinks.map((item, index) => (
        <Route key={index} path={`${item.path}`} element={<AuthRoute><item.component /></AuthRoute>} />
      ))}

      {AdminDashboardPagesLinks.map((item, index) => (
        <Route key={index} path={`${item.path}`} element={<AuthRoute><item.component /></AuthRoute>} />
      ))}

    </Routes>

  )
}

export default App