import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Pagelayout = ({ children }) => {
  return (
    <>
      <div className='h-[11vh]'>
        <Header />
      </div>
      <div>
        {children}
      </div>
      <div>
      <Footer />
      </div>
    </>
  )
}

export default Pagelayout