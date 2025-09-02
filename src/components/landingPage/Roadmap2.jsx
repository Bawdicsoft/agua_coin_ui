import { MdOutlineSecurity } from "react-icons/md";

function Roadmaptwo() {
  return (
    <>
      <div id="roadmap" className="relative bg-white flex flex-col items-center pt-26 text-center px-4 w-full">
        <div className="z-10 flex flex-col items-center w-full max-w-2xl space-y-4 md:space-y-6">
          <h1 className="text-3xl font-semibold text-black">
            ROADMAP - Our Vision for the Future
          </h1>
          <h2 className="text-sm text-gray-600 font-extralight">
            Our roadmap defines our vision to innovate, empower individuals, and create a sustainable, decentralized ecosystem for a brighter future.
          </h2>
        </div>
      </div>

      <div className="flex flex-col bg-white items-center w-full pt-8">
  <ul className="timeline timeline-vertical">
    <li>
      <div className="timeline-middle flex items-center">
        <div className="w-3 h-3 bg-[#0EA2BB] rounded-full"></div>
      </div>
      <div className="timeline-end">
        <div className="card h-full sm:w-80 shadow-sm bg-gradient-to-r from-[#2F70B0] via-[#1F88B5] to-[#0EA2BB]">
          <div className="card-body">
          <h2 className="text-white text-2xl">Q1 2025</h2>
                    <p className="text-white mt-2 text-md">
                      Launch AGUA on major exchanges & integrate with wallets.
                    </p>
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1A2335]">
              <MdOutlineSecurity className="text-white text-3xl" />
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-[#D6E5FF]" />
    </li>

    <li>
      <hr className="bg-[#D6E5FF]" />
      <div className="timeline-start">
        <div className="card h-full sm:w-80 shadow-sm bg-gradient-to-r from-[#2F70B0] via-[#1F88B5] to-[#0EA2BB]">
          <div className="card-body">
          <h2 className="text-white text-2xl">Q2 2025</h2>
                    <p className="text-white mt-2 text-md">
                      Expand mining partnerships & implement DAO voting.
                    </p>
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1A2335]">
              <MdOutlineSecurity className="text-white text-3xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="timeline-middle flex items-center">
        <div className="w-3 h-3 bg-[#0EA2BB] rounded-full"></div>
      </div>
      <hr className="bg-[#D6E5FF]" />
    </li>

    <li>
      <hr className="bg-[#D6E5FF]" />
      <div className="timeline-middle flex items-center">
        <div className="w-3 h-3 bg-[#D9A522] rounded-full"></div>
      </div>
      <div className="timeline-end">
        <div className="card h-full sm:w-80 shadow-sm bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
          <div className="card-body">
          <h2 className="text-white text-2xl">Q3 2025</h2>
                    <p className="text-white mt-2 text-md">
                      Develop cross-border payments & real-world adoption initiatives.
                    </p>
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1A2335]">
              <MdOutlineSecurity className="text-white text-3xl" />
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-[#D6E5FF]" />
    </li>

    <li>
      <hr className="bg-[#D6E5FF]" />
      <div className="timeline-start">
        <div className="card sm:w-80 h-full shadow-sm bg-[#000B1F]">
          <div className="card-body">
          <h2 className="text-white text-2xl">Q4 2025</h2>
                    <p className="text-white mt-2 text-md">
                     Full on-chain proof-of-reserves & NFT-backed silver/gold certificates.
                    </p>
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1A2335]">
              <MdOutlineSecurity className="text-white text-3xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="timeline-middle flex items-center">
        <div className="w-3 h-3 bg-[#000B1F] rounded-full"></div>
      </div>
    </li>
  </ul>
</div>

    </>
  );
}

export default Roadmaptwo;
