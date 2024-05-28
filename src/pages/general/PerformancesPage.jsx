import React from 'react'
import Pagelayout from '../../PageComponents/Pagelayout'

const PerformancesPage = () => {
  return (
    <Pagelayout>
      <div className="bg-[whitesmoke] py-[5rem] move">
        <div className='w-[90%] mx-auto'>
          <div className='mx-auto px-[2rem] py-[1rem] bg-white rounded-t w-fit h-fit flex items-center shabox'>
            <div className='w-[3.5rem] h-[3.5rem] bg-[#e4e3e3] rounded-full'></div>
            <span className='z-20 ml-[-2.4rem] font-bold uppercase  text-[2.5rem]'>past performances</span>
          </div>
          <div>
            <table className='table table-auto w-full'>
              <thead >
                <tr className='bg-[#30465c] text-[0.8rem] font-bold text-[white]'>
                  <td className='text-center  capitalize p-2 border-r'>month-year</td>
                  <td className='text-center  capitalize p-2 border-r'>amount invested</td>
                  <td className='text-center  capitalize p-2 border-r'>profits generated</td>
                  <td className='text-center  capitalize p-2 border-r'>withdrawals made</td>
                </tr>
              </thead>
              <tr className=' border-b text-black '>
                <td className='p-4 border-x text-center'>
                  Oct-23
                </td>
                <td className='p-4 border-x text-center'>
                  $411,522
                </td>
                <td className='p-4 border-r text-center'>
                  $262,150
                </td>
                <td className='p-4 border-r text-center'>
                  $647,007
                </td>
              </tr>
              <tr className=' border-b text-black '>
                <td className='p-4 border-x text-center'>
                  Nov-23
                </td>
                <td className='p-4 border-x text-center'>
                  $357,659
                </td>
                <td className='p-4 border-r text-center'>
                  $220,800
                </td>
                <td className='p-4 border-r text-center'>
                  $527,332
                </td>
              </tr>
              <tr className='text-[1rem] border-b text-black '>
                <td className='p-4 border-x text-center'>
                  Dec-23
                </td>
                <td className='p-4 border-x text-center'>
                  $501,480
                </td>
                <td className='p-4 border-r text-center'>
                  $313,650
                </td>
                <td className='p-4 border-r text-center'>
                  $975,546
                </td>
              </tr>
              <tr className=' border-b text-black '>
                <td className='p-4 border-x text-center'>
                  Jan-24
                </td>
                <td className='p-4 border-x text-center'>
                  $278,133
                </td>
                <td className='p-4 border-r text-center'>
                  $171,400
                </td>
                <td className='p-4 border-r text-center'>
                  $443,988
                </td>
              </tr>
              <tr className=' border-b text-black '>
                <td className='p-4 border-x text-center'>
                  Feb-24
                </td>
                <td className='p-4 border-x text-center'>
                  $335,744
                </td>
                <td className='p-4 border-r text-center'>
                  $206,900
                </td>
                <td className='p-4 border-r text-center'>
                  $488,250
                </td>
              </tr>
              <tr className=' border-b text-black '>
                <td className='p-4 border-x text-center'>
                  Mar-24
                </td>
                <td className='p-4 border-x text-center'>
                  $467,605
                </td>
                <td className='p-4 border-r text-center'>
                  $291,150
                </td>
                <td className='p-4 border-r text-center'>
                  $710,780
                </td>
              </tr>
            </table>
            <div className='mt-[1rem] italic text-center'>
              - table only shows the most recent performances on the AI algorithm trading system -
            </div>
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default PerformancesPage