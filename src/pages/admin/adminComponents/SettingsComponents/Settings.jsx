import React, { useState } from 'react'
import AddWallet from './AddWallet'
import Personalize from './Personalize'



const SettingsLinks = [
  { path: 'add wallet', component: AddWallet },
  { path: 'personalize', component: Personalize },
]



const Settings = () => {
  const [settingsToggle, setSettingsToggle] = useState('add wallet')

  return (
    <div className='h-screen'>
      <div className='uppercase font-bold md:text-2xl text-lg text-black pt-10'>settings</div>
      <div className="flex items-center gap-2 mt-4">
        {SettingsLinks.map((item, index) => (
          <div key={index} className={`py-1.5 px-4 rounded-lg capitalize text-sm font-medium cursor-pointer ${item.path === settingsToggle ? ' bg-zinc-100' : ''} `} onClick={() => setSettingsToggle(item.path)}>{item.path}</div>
        ))}
      </div>
      <div className='mt-10'>
        {SettingsLinks.map((item, i) => (
          <div key={i}>
            {settingsToggle === item.path && <item.component
            />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Settings