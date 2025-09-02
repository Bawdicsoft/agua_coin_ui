import { IoCheckbox } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

function Preciousmetal() {
  return (
    <>
      <div id="metals" className="relative min-h-screen bg-white flex flex-col items-center pt-26 text-center px-4 md:px-10 lg:px-20">
        <div className="z-10 flex flex-col items-center w-full md:w-3/4 lg:w-2/4 space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
            WHY PRECIOUS METALS? Stability Through Gold & Silver
          </h1>
          <h2 className="text-sm md:text-base font-semibold font-mono text-gray-500">
            Gold and silver provide long-term stability, protecting wealth from
            inflation, economic downturns, and market volatility. As tangible
            assets, they retain value, offering security and diversification in
            uncertain financial conditions.
          </h2>
        </div>

        <ul className="timeline text-gray-700 mt-8">
          <li>
            <div className="timeline-start timeline-box bg-transparent p-0 shadow-none border-none">
              <div className="card bg-[#F4F7FA] w-40 lg:w-52 h-28 shadow-sm card-sm">
                <div className="card-body">
                  <p>
                    Unlike fiat currencies, which lose value due to inflation,
                    precious metals have stood the test of time.
                  </p>
                </div>
              </div>
            </div>
            <div className="timeline-middle flex flex-col items-center">
              <div className="h-8 w-8 bg-[#1A67B5] text-white flex items-center justify-center rounded-full">
                1
              </div>
            </div>
            <hr className="bg-[#638BCB]" />
          </li>
          <li>
            <hr className="bg-[#638BCB]" />
            <div className="timeline-middle flex flex-col items-center">
              <div className="h-8 w-8 bg-[#0082A8] text-white flex items-center justify-center rounded-full">
                2
              </div>
            </div>
            <div className="timeline-end timeline-box bg-transparent p-0 shadow-none border-none">
              <div className="card bg-[#F4F7FA] w-40 lg:w-52 h-28 shadow-sm card-sm">
                <div className="card-body lg:mt-3">
                  <p>
                    <b>SAG</b> Silver = Growth Potential Essential for
                    industries, price appreciation potential.
                  </p>
                </div>
              </div>
            </div>
            <hr className="bg-[#638BCB]" />
          </li>
          <li>
            <hr className="bg-[#638BCB]" />
            <div className="timeline-start timeline-box bg-transparent p-0 shadow-none border-none">
              <div className="card bg-[#F4F7FA] w-40 lg:w-52 h-28 shadow-sm card-sm">
                <div className="card-body lg:mt-4">
                  <p>
                    For centuries, gold & silver have been the foundation of
                    economic security.
                  </p>
                </div>
              </div>
            </div>
            <div className="timeline-middle flex flex-col items-center">
              <div className="h-8 w-8 bg-[#05937A] text-white flex items-center justify-center rounded-full">
                3
              </div>
            </div>
            <hr className="bg-[#638BCB]" />
          </li>
          <li>
            <hr className="bg-[#638BCB]" />
            <div className="timeline-middle flex flex-col items-center">
              <div className="h-8 w-8 bg-[#0D0E0E] text-white flex items-center justify-center rounded-full">
                4
              </div>
            </div>
            <div className="timeline-end timeline-box bg-transparent p-0 shadow-none border-none">
              <div className="card bg-[#F4F7FA] w-40 lg:w-52 h-28 shadow-sm card-sm">
                <div className="card-body lg:mt-6">
                  <p>
                    <b>SAU</b> Gold = Stability Protects wealth, resistant to
                    economic crashes.
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 text-gray-700 lg:gap-0 gap-4">
          <div className="card bg-[#F4F7FA] p-4 md:w-60 lg:order-1 lg:col-start-2">
            <div className="card-body text-start"> 
            <p>Unlike fiat currencies, which lose value due to inflation, precious metals have stood the test of time.</p>
            </div>
          </div>

          <div className="card bg-[#F4F7FA] p-4 md:w-60 lg:order-2 lg:col-start-4">
            <div className="card-body text-start">
            <p>Silver = Growth Potential Essential for industries, price appreciation potential.</p>  
            </div>
          </div>

          <div className="card bg-[#F4F7FA] p-4 md:w-60 lg:order-3 lg:col-start-1">
            <div className="card-body text-start">
            <p>For centuries, gold & silver have been the foundation of economic security.</p>
            </div>
          </div>

          <div className="card bg-[#F4F7FA] p-4 md:w-60 lg:order-4 lg:col-start-3">
            <div className="card-body text-start">
            <p>Gold = Stability Protects wealth, resistant to economic crashes.</p>
            </div>
          </div>
        </div> */}

        {/* <div className="w-full max-w-4xl mx-auto mt-8 px-2 sm:px-4">
  <table className="table text-black text-xs sm:text-sm md:text-base w-full rounded-lg overflow-hidden">
   
    <thead className="bg-gray-400 text-gray-900 first:rounded-t-lg">
      <tr>
        <th className="p-1 sm:p-2">Feature</th>
        <th className="p-1 sm:p-2">Gold</th>
        <th className="p-1 sm:p-2">Silver</th>
        <th className="p-1 sm:p-2">Flat Money</th>
        <th className="p-1 sm:p-2">SAG</th>
        <th className="p-1 sm:p-2">SAU</th>
      </tr>
    </thead>
    <tbody className="bg-white last:rounded-b-lg">
     
      <tr className="bg-white">
        <th className="p-1 sm:p-2 text-gray-800 font-extralight">Stable value</th>
        <td className="p-1 sm:p-2"><IoCheckbox size={14} /></td>
        <td className="p-1 sm:p-2"><IoCheckbox size={14} /></td>
        <td className="p-1 sm:p-2"><RxCross2 size={14} /></td>
        <th className="p-1 sm:p-2"><IoCheckbox size={14} /></th>
         <th className="p-1 sm:p-2"><IoCheckbox size={14} /></th>
      </tr>
    
      <tr className="bg-gray-300">
        <th className="p-1 sm:p-2 text-gray-800 font-extralight">Growth potential</th>
        <th className="p-1 sm:p-2"><RxCross2 size={14} /></th>
        <td className="p-1 sm:p-2"><IoCheckbox size={14} /></td>
        <td className="p-1 sm:p-2"><RxCross2 size={14} /></td>
        <td className="p-1 sm:p-2"><IoCheckbox size={14} /></td>
         <td className="p-1 sm:p-2"><IoCheckbox size={14} /></td>
      </tr>
      
      <tr className="bg-white">
        <th className="p-1 sm:p-2 text-gray-800 font-extralight">Inflation protection</th>
        <td className="p-1 sm:p-2"><IoCheckbox size={14} /></td>
        <th className="p-1 sm:p-2"><IoCheckbox size={14} /></th>
        <td className="p-1 sm:p-2"><RxCross2 size={14} /></td>
        <td className="p-1 sm:p-2"><IoCheckbox size={14} /></td>
         <td className="p-1 sm:p-2"><IoCheckbox size={14} /></td>
      </tr>
      <tr className="bg-gray-300">
        <th className="p-1 sm:p-2 text-gray-800 font-extralight">Blockchain security</th>
        <td className="p-1 sm:p-2"><RxCross2 size={14} /></td>
        <td className="p-1 sm:p-2"><RxCross2 size={14} /></td>
        <th className="p-1 sm:p-2"><RxCross2 size={14} /></th>
        <td className="p-1 sm:p-2"><IoCheckbox size={14} /></td>
         <td className="p-1 sm:p-2"><IoCheckbox size={14} /></td>
      </tr>
    </tbody>
  </table>
</div> */}

        <div className="w-full max-w-4xl mx-auto mt-8 px-2 sm:px-4">
          <table className="table-fixed w-full text-black text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg overflow-hidden">
            {/* head */}
            <thead className="bg-gray-400 text-gray-900">
              <tr>
                <th className="w-1/6 p-2 text-center">Feature</th>
                <th className="w-1/6 p-2 text-center">Gold</th>
                <th className="w-1/6 p-2 text-center">Silver</th>
                <th className="w-1/6 p-2 text-center">Flat Money</th>
                <th className="w-1/6 p-2 text-center">SAG</th>
                <th className="w-1/6 p-2 text-center">SAU</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="bg-white">
                <td className="w-1/6 p-1 text-gray-800 font-extralight text-center">
                  Stable value
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <IoCheckbox size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <IoCheckbox size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <RxCross2 size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <IoCheckbox size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <IoCheckbox size={14} />
                  </div>
                </td>
              </tr>

              {/* row 2 */}
              <tr className="bg-gray-300">
                <td className="w-1/6 p-1 text-gray-800 font-extralight text-center">
                  Growth potential
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <RxCross2 size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <IoCheckbox size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <RxCross2 size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <IoCheckbox size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <IoCheckbox size={14} />
                  </div>
                </td>
              </tr>
              {/* row 3 */}
              <tr className="bg-white">
                <td className="w-1/6 p-1 text-gray-800 font-extralight text-center">
                  Inflation protection
                </td>

                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <IoCheckbox size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <IoCheckbox size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <RxCross2 size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <IoCheckbox size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <IoCheckbox size={14} />
                  </div>
                </td>
              </tr>
              {/* row 4 */}
              <tr className="bg-gray-300">
                <td className="w-1/6  text-gray-800 font-extralight text-center">
                  Blockchain security
                </td>

                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <RxCross2 size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <RxCross2 size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <RxCross2 size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <IoCheckbox size={14} />
                  </div>
                </td>
                <td className="w-1/6 p-2">
                  <div className="flex justify-center items-center">
                    <IoCheckbox size={14} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Preciousmetal;
