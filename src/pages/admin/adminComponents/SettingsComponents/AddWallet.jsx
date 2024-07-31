import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import nothnyet from '../../../../assets/images/nothn.png'
import { IoIosSettings } from 'react-icons/io';
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsThreeDots } from 'react-icons/bs';
import CreateWalletModal from './CreateWalletModal';
import UpdateWalletModal from './UpdateWalletModal';
import { useAtom } from 'jotai';
import { ADMINWALLETS } from '../../../../store';
import { imageurl } from '../../../../services/API';

const AddWallet = () => {
  const [adminWallets, setAdminWallets] = useAtom(ADMINWALLETS)

  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [singleWallet, setSingleWallet] = useState({})
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(5)
  const [pagestart, setpagestart] = useState(1)
  const [pageend, setpageend] = useState(adminWallets.length / end)


  const SingleWalletFunction = (item) => {
    setSingleWallet(item)
    setModal(true)
  }

  let MovePage = () => {

    if (end < adminWallets.length) {
      let altstart = start
      let altend = end
      let altlengthstart = pagestart

      altend += 5
      setEnd(altend)

      altstart += 5
      setStart(altstart)

      altlengthstart += 1
      setpagestart(altlengthstart)
    }
  }

  let BackPage = () => {

    if (end > 5) {
      let altstart = start
      let altend = end
      let altlengthstart = pagestart

      altend -= 5
      setEnd(altend)

      altstart -= 5
      setStart(altstart)

      altlengthstart -= 1
      setpagestart(altlengthstart)
    }
  }



  return (
    <div className='mt-4'>
      {modal && <UpdateWalletModal closeView={() => setModal(false)} singleWallet={singleWallet} setAdminWallets={setAdminWallets} setStart={setStart} setEnd={setEnd} setpagestart={setpagestart} setpageend={setpageend} />}
      {modal2 && <CreateWalletModal closeView={() => setModal2(false)} setAdminWallets={setAdminWallets} setStart={setStart} setEnd={setEnd} setpagestart={setpagestart} setpageend={setpageend} />}

      <button className='w-fit h-fit py-2.5 px-4 md:text-sm text-xs capitalize bg-[#462c7c] rounded-md text-white font-medium flex items-center gap-1 justify-center ml-auto mb-2' onClick={() => setModal2(true)}>
        <span>create new wallet</span>
        <IoIosAddCircleOutline className='text-base' />
      </button>
      <div className='relative overflow-x-auto shadow-xl rounded-lg scrollsdown'>
        <table className='w-full '>
          <thead >
            <tr className='bg-admin-page text-[0.8rem] font-bold text-white'>
              <td className='text-center truncate  capitalize p-2 '>image</td>
              <td className='text-center truncate  capitalize p-2 '>crypto</td>
              <td className='text-center truncate  capitalize p-2 '>address</td>
              <td className='text-center truncate  capitalize p-2 '>network</td>
              <td className='text-center truncate  capitalize p-2 '>qr code</td>
              <td className='text-center truncate  capitalize p-2'> <IoIosSettings className="mx-auto text-base" /></td>
            </tr>
          </thead>
          {adminWallets.length > 0 && <tbody>
            {adminWallets.slice(start, end).map((item, i) => (
              <tr className='text-[0.8rem]  text-black font-[550] bg-white even:bg-semi-white' key={i}>
                <td className='p-4  text-center truncate'><img src={`${imageurl}/cryptocurrency/${item.crypto_img}`} className='w-4 h-auto mx-auto'></img></td>
                <td className='p-4  text-center truncate capitalize'>{item.crypto}</td>
                <td className={`p-4  text-center truncate`}>{item.address?.slice(0, 7)}.....{item.address?.slice(-8)}</td>
                <td className='p-4  text-center truncate capitalize'>{item.network}</td>
                <td className='p-4  text-center truncate'><img src={`${imageurl}/cryptocurrency/${item.qrcode_img}`} className='w-4 h-auto mx-auto'></img></td>
                <td className='text-center truncate  capitalize p-2  cursor-pointer text-black hover:text-[#895ee0]' onClick={() => SingleWalletFunction(item)}> <BsThreeDots className="mx-auto text-base" /></td>
              </tr>
            ))}
          </tbody>}
        </table>
        {adminWallets.length < 1 && <div className='flex gap-1 items-center text-black justify-center w-full h-fit bg-white py-2 text-sm italic'>
          <div>no transactions found...</div>
          <img src={nothnyet} className='h-4 w-auto'></img>
        </div>}
      </div>
      {adminWallets.length > 0 && <div className='flex gap-2 items-center md:text-xs text-sm mt-4 justify-end text-admin-page '>
        {pagestart > 1 && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={BackPage}><FaAngleLeft /></div>}
        {Math.ceil(pageend) > 1 && <div className='font-bold text-[grey]'>{pagestart} of {Math.ceil(pageend)}</div>}
        {end < adminWallets.length && <div className='py-1 px-2 rounded-md border border-admin-page hover:bg-admin-page hover:text-white cursor-pointer' onClick={MovePage}><FaAngleRight /></div>}
      </div>}
    </div>
  )
}

export default AddWallet