import React, { useEffect, useRef } from 'react'

const CreateUsersModal = ({ closeView, setStart, setEnd, setpagestart, setpageend, setSearch, setWrite, refetchAllUsers }) => {
  const toggler = useRef()

  useEffect(() => {
    if (toggler) {
      window.addEventListener('click', (event) => {
        if (toggler.current !== null) {
          if (!toggler.current.contains(event.target)) {
            closeView()
          }
        }
      }, true)
    }
  }, [])

  return (
    <div className='w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-[#0000008a] z-20 '>
      <div className='xl:w-1/3 lg:w-2/5 md:w-1/2 w-11/12 h-60 bg-white rounded-lg overflow-hidden' ref={toggler}>
      </div>
    </div>
  )
}

export default CreateUsersModal