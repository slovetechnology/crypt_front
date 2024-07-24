import React from 'react'
import Pagelayout from '../../PageComponents/Pagelayout'

const PerformancesPage = () => {
  return (
    <Pagelayout>
      <div className="bg-[whitesmoke] py-16 move">
        <div className='w-11/12 mx-auto'>
          <div className='flex justify-center'>
            <div className='px-8 py-4 bg-white rounded-t w-fit h-fit flex items-center justify-center sha'>
              <span className='z-20 font-bold uppercase text-[1.4rem] lg:text-[2.5rem]'>past performances</span>
            </div>
          </div>
          <div className='overflow-x-auto scrollsdown shadow-md rounded-lg'>
            <table className='table table-auto w-full'>
              <thead >
                <tr className='bg-[#30465c] text-[0.8rem] font-bold text-white'>
                  <td className='text-center  capitalize p-2 border-r truncate'>month-year</td>
                  <td className='text-center  capitalize p-2 border-r truncate'>amount invested</td>
                  <td className='text-center  capitalize p-2 border-r truncate'>profits generated</td>
                  <td className='text-center  capitalize p-2 border-r truncate'>withdrawals made</td>
                </tr>
              </thead>
              <tbody className='bg-white text-[#30465c]'>
                <tr className=' border-b'>
                  <td className='p-4 border-x text-center truncate'>
                    Oct-23
                  </td>
                  <td className='p-4 border-x text-center truncate'>
                    $411,522
                  </td>
                  <td className='p-4 border-r text-center truncate'>
                    $262,150
                  </td>
                  <td className='p-4 border-r text-center truncate'>
                    $647,007
                  </td>
                </tr>
                <tr className=' border-b'>
                  <td className='p-4 border-x text-center truncate'>
                    Nov-23
                  </td>
                  <td className='p-4 border-x text-center truncate'>
                    $357,659
                  </td>
                  <td className='p-4 border-r text-center truncate'>
                    $220,800
                  </td>
                  <td className='p-4 border-r text-center truncate'>
                    $527,332
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className='p-4 border-x text-center truncate'>
                    Dec-23
                  </td>
                  <td className='p-4 border-x text-center truncate'>
                    $501,480
                  </td>
                  <td className='p-4 border-r text-center truncate'>
                    $313,650
                  </td>
                  <td className='p-4 border-r text-center truncate'>
                    $975,546
                  </td>
                </tr>
                <tr className=' border-b'>
                  <td className='p-4 border-x text-center truncate'>
                    Jan-24
                  </td>
                  <td className='p-4 border-x text-center truncate'>
                    $278,133
                  </td>
                  <td className='p-4 border-r text-center truncate'>
                    $171,400
                  </td>
                  <td className='p-4 border-r text-center truncate'>
                    $443,988
                  </td>
                </tr>
                <tr className=' border-b'>
                  <td className='p-4 border-x text-center truncate'>
                    Feb-24
                  </td>
                  <td className='p-4 border-x text-center truncate'>
                    $335,744
                  </td>
                  <td className='p-4 border-r text-center truncate'>
                    $206,900
                  </td>
                  <td className='p-4 border-r text-center truncate'>
                    $488,250
                  </td>
                </tr>
                <tr className=' border-b'>
                  <td className='p-4 border-x text-center truncate'>
                    Mar-24
                  </td>
                  <td className='p-4 border-x text-center truncate'>
                    $467,605
                  </td>
                  <td className='p-4 border-r text-center truncate'>
                    $291,150
                  </td>
                  <td className='p-4 border-r text-center truncate'>
                    $710,780
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='mt-4 italic text-center'>
            - table only shows the most recent performances on the AI algorithm trading system -
          </div>
        </div>
      </div>
    </Pagelayout>
  )
}

export default PerformancesPage