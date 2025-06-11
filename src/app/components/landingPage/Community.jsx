import { MdOutlineSecurity, MdArrowOutward } from "react-icons/md";
import { FaXTwitter, FaTelegram, FaFacebookF } from "react-icons/fa6";

function Community() {
  const icons = [MdOutlineSecurity, FaXTwitter, FaTelegram, FaFacebookF];

  return (
    <section className="relative py-16 px-4 md:px-10 lg:px-20 bg-cover bg-center bg-no-repeat bg-gray-100">
      <div className="w-full lg:mr-24  mx-auto max-w-3xl md:mx-auto md:w-5/6 bg-[url('/community-pic.png')] bg-opacity-90 bg-cover rounded-lg shadow-lg p-6 md:p-10">
        <div className="text-center sm:text-left space-y-4">
          <h2 className="text-black text-2xl md:text-3xl font-bold leading-snug">
            JOIN THE COMMUNITY <br />- Stay Connected
          </h2>

          <div className="flex justify-center sm:justify-end gap-3 mt-4">
            {icons.map((Icon, index) => (
              <button
                key={index}
                className="w-10 h-10 rounded-full bg-[#E2BB57] flex items-center justify-center transition hover:scale-110"
              >
                <Icon className="text-[#1A2335] text-xl" />
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-center sm:justify-start">
            <NeumorphismButton />
          </div>
        </div>
      </div>
    </section>
  );
}

const NeumorphismButton = () => {
  return (
    <button
      className="
        px-4 py-2 md:px-5 md:py-3 rounded-lg
        bg-[#000919] text-white flex items-center gap-2
        text-sm md:text-base font-medium
        shadow-[4px_4px_10px_#0a0a0a,inset_-2px_-2px_4px_#1a1a1a]
        transition hover:bg-[#0a0f25]
      "
    >
      <span>Join the AGUA Movement</span>
      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white">
        <MdArrowOutward className="text-black text-base" />
      </div>
    </button>
  );
};

export default Community;
