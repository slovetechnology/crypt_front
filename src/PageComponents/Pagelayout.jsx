import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Pagelayout = ({ children }) => {
  return (
    <>
      <div className='h-[10.9vh]'>
        <Header />
      </div>
      <div className=''>
        {children}
      </div>
      <div className=''>
      <Footer />
      </div>
    </>
  )
}

export default Pagelayout